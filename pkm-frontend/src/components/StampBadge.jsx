import { ShieldCheck, ShieldAlert } from "lucide-react";

const VARIANTS = {
  clean: {
    text: "DOKUMEN ASLI",
    colorClass: "border-clean text-clean",
    Icon: ShieldCheck,
  },
  flagged: {
    text: "TERDETEKSI TIMPAAN",
    colorClass: "border-flag text-flag",
    Icon: ShieldAlert,
  },
};

export function StampBadge({ variant = "clean" }) {
  const { text, colorClass, Icon } = VARIANTS[variant];
  return (
    <div
      className={`inline-flex origin-center -rotate-6 animate-stampIn items-center gap-2
        rounded-sm border-[3px] px-4 py-2 font-mono text-sm font-semibold tracking-widest
        ${colorClass}`}
      style={{ boxShadow: "inset 0 0 0 1px currentColor" }}
    >
      <Icon size={16} strokeWidth={2} />
      {text}
    </div>
  );
}
