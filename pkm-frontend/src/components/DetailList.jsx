import { MapPin } from "lucide-react";

export function DetailList({ details }) {
  if (!details || details.length === 0) {
    return (
      <div className="rounded-sm border border-line bg-surface2 px-4 py-3">
        <p className="text-sm text-muted">Tidak ada area yang tercatat.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {details.map((item, i) => (
        <li
          key={i}
          className="group rounded-sm border border-line bg-surface2 px-4 py-3 text-sm transition-colors hover:border-flag/40"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
              <MapPin size={12} strokeWidth={1.75} />
              x:{item.box?.[0]} y:{item.box?.[1]} w:{item.box?.[2]} h:{item.box?.[3]}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-flag">
              <span className="h-1.5 w-1.5 rounded-full bg-flag" />
              conf. {Math.round((item.confidence ?? 0) * 100)}%
            </span>
          </div>
          <p className="mt-1.5 font-display text-base text-ink">
            {item.recovered_text || "—"}
          </p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted">
            {item.recovery_method}
          </p>
        </li>
      ))}
    </ul>
  );
}
