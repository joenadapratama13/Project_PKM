import { useEffect, useState } from "react";
import { RefreshCcw, X, ScanLine } from "lucide-react";
import { UploadZone } from "./components/UploadZone.jsx";
import { ScanOverlay } from "./components/ScanOverlay.jsx";
import { StampBadge } from "./components/StampBadge.jsx";
import { ScoreGauge } from "./components/ScoreGauge.jsx";
import { ErrorBanner } from "./components/ErrorBanner.jsx";
import { DetailList } from "./components/DetailList.jsx";
import { Reticle } from "./components/Reticle.jsx";
import { FilePreview } from "./components/FilePreview.jsx";
import { ImageWithBoxes } from "./components/ImageWithBoxes.jsx";
import { Hero } from "./components/Hero.jsx";
import { validateFile, ValidationError } from "./api/documentApi.js";
import { useAnalyzeDocument } from "./hooks/useAnalyzeDocument.js";

export default function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const { status, data, error, run, reset } = useAnalyzeDocument();

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFileSelected(selected) {
    setValidationError(null);
    try {
      validateFile(selected);
      setFile(selected);
    } catch (err) {
      if (err instanceof ValidationError) setValidationError(err.message);
      else throw err;
    }
  }

  function handleAnalyze() {
    if (file) run(file);
  }

  function handleReset() {
    setFile(null);
    setPreviewUrl(null);
    setValidationError(null);
    reset();
  }

  const isClean = data && !data.is_edited;
  const isFlagged = data && data.is_edited;
  const hasBoxes = isFlagged && data.details?.length > 0;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      <header className="mb-10 flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-scan/40 bg-scan/5">
            <ScanLine size={16} strokeWidth={1.75} className="text-scan" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight text-ink">
              DOKUMEN<span className="text-scan">.SCAN</span>
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Deteksi &amp; Rekonstruksi Timpa Teks
            </p>
          </div>
        </div>
        <span className="rounded-sm border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
          Stage 0 · Gatekeeper
        </span>
      </header>

      <main className="flex flex-1 flex-col gap-8">
        {!file && (
          <div className="animate-fadeIn">
            <Hero />
            <div className="mt-6">
              <UploadZone onFileSelected={handleFileSelected} />
              {validationError && (
                <div className="mt-4">
                  <ErrorBanner message={validationError} onRetry={null} />
                </div>
              )}
            </div>
          </div>
        )}

        {file && (
          <section className="flex animate-fadeIn flex-col gap-5">
            <div className="relative overflow-hidden rounded-sm border border-line bg-surface">
              {status === "idle" && (
                <button
                  onClick={handleReset}
                  aria-label="Hapus file"
                  className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-bg/80 text-muted transition-colors hover:border-flag/50 hover:text-flag"
                >
                  <X size={14} strokeWidth={1.75} />
                </button>
              )}

              {status === "success" && hasBoxes ? (
                <ImageWithBoxes src={previewUrl} boxes={data.details} />
              ) : (
                <FilePreview previewUrl={previewUrl} />
              )}

              <Reticle />
              {status === "loading" && <ScanOverlay />}
            </div>

            {status === "success" && hasBoxes && (
              <p className="-mt-3 flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="h-2 w-2 rounded-sm border border-flag" />
                Kotak amber menandai area dengan indikasi teks tertimpa
              </p>
            )}

            {status === "idle" && (
              <button
                onClick={handleAnalyze}
                className="w-full rounded-sm bg-scan px-5 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90 active:opacity-80"
              >
                Analisis Dokumen →
              </button>
            )}

            {status === "loading" && (
              <div className="relative w-full overflow-hidden rounded-sm bg-surface2 px-5 py-3 text-center font-mono text-sm text-muted">
                <div className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-scan/10" />
                <span className="relative">Memproses…</span>
              </div>
            )}

            {status === "error" && <ErrorBanner message={error} onRetry={handleAnalyze} />}

            {status === "success" && data && (
              <div className="flex animate-fadeIn flex-col gap-5 rounded-sm border border-line bg-surface p-5">
                <div className="flex items-center justify-between gap-4">
                  <StampBadge variant={isClean ? "clean" : "flagged"} />
                  <ScoreGauge score={data.authenticity_score} />
                </div>

                <p className="text-sm text-ink">{data.summary}</p>

                {isFlagged && (
                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-muted">
                      Area teridentifikasi
                    </p>
                    <DetailList details={data.details} />
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="flex w-fit items-center gap-1.5 self-start font-mono text-xs text-scan underline underline-offset-4"
                >
                  <RefreshCcw size={12} strokeWidth={1.75} />
                  Analisis dokumen lain
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="mt-12 border-t border-line pt-4 font-mono text-[11px] text-muted">
        Program Kreativitas Mahasiswa — Backend FastAPI · ONNX Runtime CPU
      </footer>
    </div>
  );
}
