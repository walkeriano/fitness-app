import { proxyNutritionPdf } from "@/services/nutrition/pdfProxy";

export const runtime = "nodejs";

export async function POST(request) {
  return proxyNutritionPdf(request);
}
