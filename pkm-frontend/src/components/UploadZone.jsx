import { useRef, useState } from "react";
import { UploadCloud, FileImage } from "lucide-react";
import { Reticle } from "./Reticle.jsx";

export function UploadZone({ onFileSelected }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(fileList) {
    const file = fileList?.[0];
    if (file) onFileSelected(file);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-3
        overflow-hidden rounded-sm border border-dashed px-8 py-12 text-center transition-all duration-200
        ${
          isDragging
            ? "scale-[1.01] border-scan bg-scan/[0.06]"
            : "border-line bg-surface hover:border-muted hover:bg-surface2"
        }`}
    >
      <Reticle />
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors
          ${isDragging ? "border-scan bg-scan/10" : "border-line bg-surface2 group-hover:border-muted"}`}
      >
        {isDragging ? (
          <FileImage size={20} strokeWidth={1.75} className="text-scan" />
        ) : (
          <UploadCloud size={20} strokeWidth={1.75} className="text-muted" />
        )}
      </div>
      <p className="font-body text-sm text-ink">
        {isDragging ? (
          "Lepaskan untuk mengunggah"
        ) : (
          <>
            Seret gambar dokumen ke sini, atau{" "}
            <span className="text-scan underline underline-offset-4">pilih file</span>
          </>
        )}
      </p>
      <p className="font-mono text-xs text-muted">PNG · JPG · JPEG — maks. 10MB</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
