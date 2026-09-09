import test from "node:test";
import assert from "node:assert/strict";
import { extractNutritionPdfText } from "../src/services/ai/pdfText.js";
import { evaluateChatScope } from "../src/services/ai/scopePolicy.js";
import { calculateMealTargets, buildPersonalizedInstructions } from "../src/services/ai/promptBuilder.js";

function createPdf() {
  const stream = "BT /F1 12 Tf 50 750 Td (Desayuno: avena 60 g) Tj 0 -20 Td (Almuerzo: arroz 100 g) Tj ET";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let content = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(content.length);
    content += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = content.length;
  content += `xref\n0 6\n0000000000 65535 f \n`;
  content += offsets.slice(1).map(offset => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  content += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(content);
}

test("extracts foods, quantities and page references from a real text PDF", async () => {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const task = getDocument({ data: createPdf(), useSystemFonts: true });
  try {
    const text = await extractNutritionPdfText(await task.promise);
    assert.match(text, /Página 1/);
    assert.match(text, /Desayuno: avena 60 g/);
    assert.match(text, /Almuerzo: arroz 100 g/);
  } finally {
    await task.destroy();
  }
});

test("discards text if the user or PDF changes during extraction", async () => {
  let cancelled = false;
  let cleaned = false;
  const pdf = { numPages: 1, getPage: async () => ({
    getTextContent: async () => { cancelled = true; return {items:[{str:"Old user plan"}]}; },
    cleanup: () => { cleaned = true; },
  })};
  assert.equal(await extractNutritionPdfText(pdf, () => cancelled), "");
  assert.equal(cleaned, true);
});

test("allows document questions only with a plan and preserves topic boundaries", () => {
  const scope = (text, hasPlan) => evaluateChatScope([{role:"user", content:text}], "Ana", hasPlan).allowAI;
  assert.equal(scope("¿Qué dice mi PDF?", true), true);
  assert.equal(scope("¿Qué dice mi PDF?", false), false);
  assert.equal(scope("Programa en javascript según mi PDF", true), false);
  assert.equal(scope("Hola", true), false);
  assert.equal(scope("Una receta de pollo", false), true);
});

test("preserves existing daily and per-meal targets", () => {
  const context = {name:"Ana", edad:30, peso:60, comidasXdia:3, objetivoFisico:"masa muscular", tdee:2100, proteinas:120, carbohidratos:270, grasas:60};
  assert.deepEqual(calculateMealTargets(context), {mealsPerDay:3, calories:700, protein:40, carbs:90, fat:20});
  assert.match(buildPersonalizedInstructions("Chef", context), /No los reemplaces ni recalcules usando el PDF/);
});
