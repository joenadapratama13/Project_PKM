export function FilePreview({ previewUrl, imgRef, onLoad, className }) {
  return (
    <img
      ref={imgRef}
      src={previewUrl}
      alt="Pratinjau dokumen yang diunggah"
      onLoad={onLoad}
      className={className ?? "max-h-[420px] w-full object-contain"}
    />
  );
}
