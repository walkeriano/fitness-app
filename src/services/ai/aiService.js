import { getOpenAIClient } from "./openai";
import { askMockAI } from "./mockAI";
import { NUTRITION_ASSISTANT_INSTRUCTIONS } from "./instructions";

const SUPPORTED_PROVIDERS = new Set(["mock", "openai"]);

const DEFAULT_MODEL = "gpt-5-nano";
const DEFAULT_MAX_OUTPUT_TOKENS = 350;
const MAX_ALLOWED_OUTPUT_TOKENS = 1000;

function getAIProvider() {
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase();

  if (!SUPPORTED_PROVIDERS.has(provider)) {
    throw new Error(
      `AI_PROVIDER debe ser "mock" u "openai". Valor recibido: ${
        provider || "vacío"
      }`
    );
  }

  return provider;
}

function getModel() {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
}

function getMaxOutputTokens() {
  const configuredValue = Number(
    process.env.OPENAI_MAX_OUTPUT_TOKENS
  );

  if (
    Number.isInteger(configuredValue) &&
    configuredValue > 0 &&
    configuredValue <= MAX_ALLOWED_OUTPUT_TOKENS
  ) {
    return configuredValue;
  }

  return DEFAULT_MAX_OUTPUT_TOKENS;
}

export async function askAI(messages) {
  const provider = getAIProvider();

  if (provider === "mock") {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    return askMockAI(lastUserMessage?.content || "");
  }

  const openai = getOpenAIClient();

  const response = await openai.responses.create({
    model: getModel(),
    instructions: NUTRITION_ASSISTANT_INSTRUCTIONS,
    input: messages,
    reasoning: {
      effort: "minimal",
    },
    max_output_tokens: getMaxOutputTokens(),
    store: false,
  });

  if (response.status === "incomplete") {
    const error = new Error(
      `OpenAI devolvió una respuesta incompleta: ${
        response.incomplete_details?.reason || "unknown"
      }`
    );

    error.code = "AI_INCOMPLETE_RESPONSE";

    throw error;
  }

  const answer = response.output_text?.trim();

  if (!answer) {
    throw new Error(
      "OpenAI devolvió una respuesta sin contenido de texto"
    );
  }

  return answer;
}