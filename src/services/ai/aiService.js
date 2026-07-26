import openai from "./openai";
import { askMockAI } from "./mockAI";

export async function askAI(prompt) {
  if (process.env.AI_PROVIDER === "mock") {
    return askMockAI(prompt);
  }

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  return response.output_text;
}