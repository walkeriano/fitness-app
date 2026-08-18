import { getOpenAIClient } from "./openai";
import { askMockAI } from "./mockAI";
import { NUTRITION_ASSISTANT_INSTRUCTIONS } from "./instructions";
import { buildPersonalizedInstructions } from "./promptBuilder";

const SUPPORTED_PROVIDERS = new Set(["mock", "openai"]);

const DEFAULT_MODEL = "gpt-5-nano";
const DEFAULT_MAX_OUTPUT_TOKENS = 800;
const MAX_ALLOWED_OUTPUT_TOKENS = 1200;
const MAX_ANSWER_CHARACTERS = 1000;
const RESPONSE_FORMAT = {
  type: "json_schema",
  name: "nutrition_assistant_response",
  strict: true,
  schema: {
    type: "object",
    properties: {
      answer: {
        type: "string",
        description: "Respuesta nutricional breve y práctica en español.",
      },
      imageQuery: {
        type: "string",
        description:
          "Consulta visual en inglés de 2 a 7 palabras para buscar una fotografía relacionada.",
      },
    },
    required: ["answer", "imageQuery"],
    additionalProperties: false,
  },
};

function getAIProvider() {
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase();

  if (!SUPPORTED_PROVIDERS.has(provider)) {
    throw new Error(
      `AI_PROVIDER debe ser "mock" u "openai". Valor recibido: ${
        provider || "vacío"
      }`,
    );
  }

  return provider;
}

function getModel() {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
}

function getMaxOutputTokens() {
  const configuredValue = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS);

  if (
    Number.isInteger(configuredValue) &&
    configuredValue > 0 &&
    configuredValue <= MAX_ALLOWED_OUTPUT_TOKENS
  ) {
    return configuredValue;
  }

  return DEFAULT_MAX_OUTPUT_TOKENS;
}

export function limitAnswerLength(answer) {
  const normalizedAnswer = answer.trim();

  if (normalizedAnswer.length <= MAX_ANSWER_CHARACTERS) {
    return normalizedAnswer;
  }

  const availableText = normalizedAnswer.slice(
    0,
    MAX_ANSWER_CHARACTERS - 1,
  );
  const sentenceBoundaries = [". ", "! ", "? ", ".\n", "!\n", "?\n"];
  const lastSentence = Math.max(
    ...sentenceBoundaries.map((boundary) => availableText.lastIndexOf(boundary)),
  );
  const lastWord = availableText.lastIndexOf(" ");
  const cutoff =
    lastSentence >= MAX_ANSWER_CHARACTERS * 0.6
      ? lastSentence + 1
      : lastWord > 0
        ? lastWord
        : availableText.length;

  return `${availableText.slice(0, cutoff).trim()}…`;
}

export async function askAI({ messages, userContext }) {
  const provider = getAIProvider();

  if (provider === "mock") {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    return askMockAI(lastUserMessage?.content || "");
  }

  const personalizedInstructions = buildPersonalizedInstructions(
    NUTRITION_ASSISTANT_INSTRUCTIONS,
    userContext,
  );

  const openai = getOpenAIClient();

  const response = await openai.responses.create({
    model: getModel(),
    instructions: personalizedInstructions,
    input: messages,
    reasoning: {
      effort: "minimal",
    },
    text: {
      format: RESPONSE_FORMAT,
    },
    max_output_tokens: getMaxOutputTokens(),
    store: false,
  });

  if (response.status === "incomplete") {
    const incompleteReason = response.incomplete_details?.reason || "unknown";

    const error = new Error(
      `OpenAI devolvió una respuesta incompleta: ${incompleteReason}`,
    );

    error.code = "AI_INCOMPLETE_RESPONSE";
    error.incompleteReason = incompleteReason;
    error.usage = response.usage;

    throw error;
  }

  const outputText = response.output_text?.trim();

  if (!outputText) {
    throw new Error("OpenAI devolvió una respuesta sin contenido de texto");
  }

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(outputText);
  } catch {
    const error = new Error("OpenAI devolvió una respuesta con formato inválido");
    error.code = "AI_INVALID_RESPONSE_FORMAT";
    throw error;
  }

  const rawAnswer = parsedResponse.answer?.trim();
  const imageQuery = parsedResponse.imageQuery?.trim();

  if (!rawAnswer || !imageQuery) {
    const error = new Error("OpenAI devolvió una respuesta incompleta");
    error.code = "AI_INVALID_RESPONSE_FORMAT";
    throw error;
  }

  const answer = limitAnswerLength(rawAnswer);

  return { answer, imageQuery };
}
