"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase-config";

// Resolve the same catalog entry as the diet viewer, without its legacy cache.
export default function useNutritionPlanFile({ userId, userProfile, enabled }) {
  const { objetivoFisico, comidasXdia, genero } = userProfile || {};
  const key = userId && objetivoFisico && comidasXdia && genero
    ? JSON.stringify([userId, objetivoFisico, comidasXdia, genero])
    : "";
  const [result, setResult] = useState({ key: "", fileUrl: "", error: null });

  useEffect(() => {
    if (!enabled || !key) return;
    let cancelled = false;
    setResult({ key: "", fileUrl: "", error: null });

    async function loadPlan() {
      try {
        const snapshot = await getDocs(query(
          collection(db, "alimentacion"),
          where("nombre", "==", objetivoFisico),
          where("comidas", "==", comidasXdia),
          where("genero", "==", genero),
        ));
        const fileUrl = snapshot.docs[0]?.data()?.fileIa;
        if (typeof fileUrl !== "string" || !fileUrl.trim()) {
          throw new Error("No readable plan assigned");
        }
        if (!cancelled) setResult({ key, fileUrl: fileUrl.trim(), error: null });
      } catch {
        if (!cancelled) setResult({
          key,
          fileUrl: "",
          error: "No pudimos obtener el documento de tu plan. Puedes seguir consultando con los datos de tu perfil.",
        });
      }
    }

    loadPlan();
    return () => { cancelled = true; };
  }, [enabled, key, objetivoFisico, comidasXdia, genero]);

  const current = Boolean(key) && result.key === key;
  return {
    fileUrl: current ? result.fileUrl : "",
    loading: Boolean(enabled && key && !current),
    error: current ? result.error : null,
  };
}
