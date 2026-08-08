import OpenAI from "openai";

let openaiClient;

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada");
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey,
      timeout: 20_000,
      maxRetries: 1,
    });
  }

  return openaiClient;
}
