import { NextResponse } from "next/server";
import { askAI } from "@/services/ai/aiService";
import { evaluateChatScope } from "@/services/ai/scopePolicy";
import {
  getMissingUserContextFields,
  normalizeUserContext,
} from "@/services/ai/userContext";

export const runtime = "nodejs";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;
const ALLOWED_ROLES = new Set(["user", "assistant"]);

function createErrorResponse(status, code, message) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status },
  );
}

function getOpenAIErrorCode(error) {
  return error?.code || error?.error?.code || null;
}

function validateMessages(messages) {
  if (!Array.isArray(messages)) {
    return {
      valid: false,
      code: "INVALID_MESSAGES",
      message: "La petición debe contener un historial de mensajes.",
    };
  }

  if (messages.length === 0) {
    return {
      valid: false,
      code: "EMPTY_MESSAGES",
      message: "Escribe un mensaje antes de enviarlo.",
    };
  }

  if (messages.length > MAX_MESSAGES) {
    return {
      valid: false,
      code: "TOO_MANY_MESSAGES",
      message: `La conversación no puede superar ${MAX_MESSAGES} mensajes.`,
    };
  }

  for (const message of messages) {
    if (
      !message ||
      typeof message !== "object" ||
      !ALLOWED_ROLES.has(message.role)
    ) {
      return {
        valid: false,
        code: "INVALID_MESSAGE_ROLE",
        message: "La conversación contiene un tipo de mensaje inválido.",
      };
    }

    if (typeof message.content !== "string" || !message.content.trim()) {
      return {
        valid: false,
        code: "EMPTY_MESSAGE",
        message: "La conversación contiene un mensaje vacío.",
      };
    }

    if (message.content.trim().length > MAX_MESSAGE_LENGTH) {
      return {
        valid: false,
        code: "MESSAGE_TOO_LONG",
        message: `Cada mensaje puede contener como máximo ${MAX_MESSAGE_LENGTH} caracteres.`,
      };
    }
  }

  const lastMessage = messages[messages.length - 1];

  if (lastMessage.role !== "user") {
    return {
      valid: false,
      code: "INVALID_LAST_MESSAGE",
      message: "El último mensaje debe pertenecer al usuario.",
    };
  }

  return {
    valid: true,
    messages: messages.map((message) => ({
      role: message.role,
      content: message.content.trim(),
    })),
  };
}

export async function POST(request) {
  try {
    let body;

    try {
      body = await request.json();
    } catch {
      return createErrorResponse(
        400,
        "INVALID_JSON",
        "La petición no contiene un JSON válido.",
      );
    }

    const validation = validateMessages(body?.messages);

    if (!validation.valid) {
      return createErrorResponse(400, validation.code, validation.message);
    }

    const userContext = normalizeUserContext(body?.userContext);

    const missingFields = getMissingUserContextFields(userContext);

    if (missingFields.length > 0) {
      return createErrorResponse(
        422,
        "PROFILE_INCOMPLETE",
        "Completa tu nombre, edad, número de comidas, peso y objetivo físico para recibir respuestas personalizadas.",
      );
    }

    const scopeEvaluation = evaluateChatScope(
      validation.messages,
      userContext.name,
    );

    if (!scopeEvaluation.allowAI) {
      return NextResponse.json({
        success: true,
        answer: scopeEvaluation.localAnswer,
        source: "local",
      });
    }

    const answer = await askAI({
      messages: validation.messages,
      userContext,
    });

    return NextResponse.json({
      success: true,
      answer,
      source: "openai",
    });
  } catch (error) {
    const status = error?.status;
    const code = getOpenAIErrorCode(error);
    const requestId = error?.request_id || error?.requestID || null;

    console.error("Error generando respuesta de IA", {
      status,
      code,
      requestId,
      message: error?.message,
      incompleteReason: error?.incompleteReason || null,
      usage: error?.usage || null,
    });

    if (code === "AI_INCOMPLETE_RESPONSE") {
      return createErrorResponse(
        502,
        "AI_INCOMPLETE_RESPONSE",
        "La respuesta quedó incompleta. Inténtalo nuevamente.",
      );
    }

    if (status === 429) {
      const quotaCodes = new Set([
        "credit_balance_exhausted",
        "organization_spend_limit_exceeded",
        "project_spend_limit_exceeded",
        "organization_usage_limit_exceeded",
      ]);

      if (quotaCodes.has(code)) {
        return createErrorResponse(
          503,
          "AI_QUOTA_EXHAUSTED",
          "El asistente no está disponible temporalmente.",
        );
      }

      return createErrorResponse(
        429,
        "AI_RATE_LIMITED",
        "Se han enviado demasiadas solicitudes. Inténtalo nuevamente en unos momentos.",
      );
    }

    if (status === 401) {
      return createErrorResponse(
        502,
        "AI_AUTHENTICATION_ERROR",
        "El asistente no está disponible temporalmente.",
      );
    }

    if (status === 403 && code === "model_not_found") {
      return createErrorResponse(
        503,
        "AI_MODEL_UNAVAILABLE",
        "El modelo configurado no está disponible.",
      );
    }

    if (status === 403) {
      return createErrorResponse(
        502,
        "AI_PERMISSION_ERROR",
        "El asistente no está disponible temporalmente.",
      );
    }

    if (status >= 500) {
      return createErrorResponse(
        502,
        "AI_PROVIDER_ERROR",
        "El servicio de IA no respondió correctamente.",
      );
    }

    return createErrorResponse(
      500,
      "AI_INTERNAL_ERROR",
      "No se pudo generar una respuesta.",
    );
  }
}
