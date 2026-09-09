// Preserve page boundaries and PDF.js line endings for quantities and meal lists.
export async function extractNutritionPdfText(pdf, isCancelled = () => false) {
  const pages = [];
  for (let number = 1; number <= pdf.numPages; number += 1) {
    if (isCancelled()) return "";
    const page = await pdf.getPage(number);
    try {
      const content = await page.getTextContent();
      const text = content.items
        .filter((item) => typeof item.str === "string")
        .map((item) => item.str + (item.hasEOL ? "\n" : " "))
        .join("")
        .trim();
      if (text) pages.push(`Página ${number}\n${text}`);
    } finally {
      page.cleanup();
    }
  }
  return isCancelled() ? "" : pages.join("\n\n");
}
