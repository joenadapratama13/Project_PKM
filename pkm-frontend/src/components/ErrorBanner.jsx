import { AlertTriangle, RotateCcw } from "lucide-react";

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-start gap-3 rounded-sm border border-flag/40 bg-flag/5 px-4 py-3">
      <AlertTriangle size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-flag" />
      <div className="flex-1">
        <p className="font-mono text-xs uppercase tracking-wide text-flag">Analisis gagal</p>
        <p className="mt-1 text-sm text-ink">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex shrink-0 items-center gap-1.5 rounded-sm border border-flag/50 px-3 py-1.5 font-mono text-xs text-flag transition-colors hover:bg-flag/10"
        >
          <RotateCcw size={12} strokeWidth={1.75} />
          Coba lagi
        </button>
      )}
    </div>
  );
}
