import { useEffect, useState } from "react";

const MESSAGES = [
  "Memeriksa kerapatan goresan…",
  "Menghitung ketebalan tinta lokal…",
  "Membandingkan dengan baseline goresan tunggal…",
];

export function ScanOverlay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm">
      <div className="absolute inset-0 bg-bg/30" />
      <div className="absolute inset-x-0 top-0 h-24 animate-sweep bg-gradient-to-b from-transparent via-scan/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-3 flex justify-center px-4">
        <span
          key={index}
          className="animate-stampIn rounded-sm bg-bg/85 px-3 py-1 text-center font-mono text-[11px] tracking-wide text-scan"
        >
          {MESSAGES[index]}
        </span>
      </div>
    </div>
  );
}
