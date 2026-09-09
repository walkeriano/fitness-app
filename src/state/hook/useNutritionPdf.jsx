"use client";

import { useEffect, useState } from "react";
import { extractNutritionPdfText } from "@/services/ai/pdfText";

export default function useNutritionPdf({ userId, fileUrl, enabled = true }) {
  const url = typeof fileUrl === "string" ? fileUrl.trim() : "";
  const key = userId && url ? JSON.stringify([userId, url]) : "";
  const [result, setResult] = useState({ key: "", text: "", error: null });

  useEffect(() => {
    if (!enabled || !key) return;

    let cancelled = false;
    let task;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    setResult({ key: "", text: "", error: null });

    async function readPlan() {
      try {
        const response = await fetch("/api/nutrition-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("PDF unavailable");
        const data = new Uint8Array(await response.arrayBuffer());
        const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/${pdfjs.version}/pdf.worker.min.mjs`;
        task = pdfjs.getDocument({ data, isEvalSupported: false });
        const pdf = await task.promise;
        const text = await extractNutritionPdfText(pdf, () => cancelled);
        if (!text) throw new Error("PDF has no text");
        if (!cancelled) setResult({ key, text, error: null });
      } catch {
        if (!cancelled) {
          setResult({
            key,
            text: "",
            error: "No pudimos leer tu plan de alimentación. Puedes seguir consultando con los datos de tu perfil.",
          });
        }
      } finally {
        clearTimeout(timeout);
        if (task) await task.destroy().catch(() => {});
      }
    }

    readPlan();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
      if (task) void task.destroy().catch(() => {});
    };
  }, [enabled, key, url]);

  const current = Boolean(key) && result.key === key;
  return {
    text: current ? result.text : "",
    loading: Boolean(enabled && key && !current),
    error: current ? result.error : null,
  };
}
