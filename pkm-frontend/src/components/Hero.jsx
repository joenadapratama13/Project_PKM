import { ScanEye, Globe, BrainCircuit, ArrowRight } from "lucide-react";

const STAGES = [
  {
    icon: ScanEye,
    label: "Stage 0",
    title: "Gatekeeper",
    desc: "Memindai kerapatan & ketebalan goresan tinta untuk mendeteksi area yang tertimpa.",
    active: true,
  },
  {
    icon: Globe,
    label: "Stage 1",
    title: "Web Retrieval",
    desc: "Mencocokkan kata di sekitar area timpaan dengan sumber di internet.",
    active: false,
  },
  {
    icon: BrainCircuit,
    label: "Stage 2",
    title: "TrOCR Vision",
    desc: "Merekonstruksi tulisan tangan tertimpa memakai model AI visual.",
    active: false,
  },
];

export function Hero() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-scan/30 bg-scan/5 px-3 py-1 font-mono text-[11px] tracking-wide text-scan">
          Program Kreativitas Mahasiswa
        </span>
        <h2 className="max-w-lg font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          Deteksi dokumen tertimpa, terbaca kembali.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Unggah foto dokumen. Sistem memeriksa keasliannya dan menandai area yang
          tercoret atau tertimpa tulisan lain.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STAGES.map(({ icon: Icon, label, title, desc, active }) => (
          <div
            key={label}
            className={`relative flex flex-col gap-2 rounded-sm border p-4 transition-colors
              ${active ? "border-scan/40 bg-scan/[0.04]" : "border-line bg-surface"}`}
          >
            <div className="flex items-center justify-between">
              <Icon
                size={18}
                strokeWidth={1.75}
                className={active ? "text-scan" : "text-muted"}
              />
              <span
                className={`font-mono text-[10px] tracking-wide ${
                  active ? "text-scan" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
            <p className="font-display text-sm font-semibold text-ink">{title}</p>
            <p className="text-xs leading-relaxed text-muted">{desc}</p>
            {!active && (
              <span className="mt-auto w-fit rounded-sm border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-muted">
                Segera hadir
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-muted">
        <span>Mulai dengan mengunggah dokumen di bawah</span>
        <ArrowRight size={14} className="animate-pulse" />
      </div>
    </section>
  );
}
