import { useCallback, useRef, useState } from "react";
import { analyzeDocument } from "../api/documentApi.js";

/**
 * Hook ringan tanpa dependency tambahan (React Query opsional untuk fase berikutnya).
 * Cukup untuk MVP Stage 0: satu request per analisis, dengan status jelas.
 */
export function useAnalyzeDocument() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const run = useCallback(async (file) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    setError(null);
    try {
      const result = await analyzeDocument(file, { signal: controller.signal });
      setData(result);
      setStatus("success");
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "Terjadi kesalahan tak terduga.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setStatus("idle");
    setData(null);
    setError(null);
  }, []);

  return { status, data, error, run, reset };
}
