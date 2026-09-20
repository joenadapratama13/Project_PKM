import { useEffect, useRef, useState } from "react";

const BOX_COLOR = "#E8A33D"; // amber, senada dengan token 'flag' di tailwind config
const LABEL_TEXT_COLOR = "#14171C"; // senada dengan token 'bg'

/**
 * Menampilkan gambar dokumen dengan kotak area timpaan digambar di atasnya.
 * Backend tim (app/schemas/document.py) mengirim `box` sebagai [x, y, w, h]
 * dalam koordinat piksel gambar ASLI (bukan gambar yang sudah di-resize di
 * browser) - jadi kita perlu tahu ukuran asli gambar untuk menghitung skala
 * ke ukuran tampilnya, dan menggambar ulang tiap kali ukurannya berubah
 * (mis. resize window) supaya kotaknya tetap pas.
 */
export function ImageWithBoxes({ src, boxes }) {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [naturalSize, setNaturalSize] = useState(null);

  function draw() {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || !naturalSize) return;

    const { clientWidth, clientHeight } = img;
    if (!clientWidth || !clientHeight) return;

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const scaleX = clientWidth / naturalSize.width;
    const scaleY = clientHeight / naturalSize.height;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = BOX_COLOR;
    ctx.lineWidth = 2;
    ctx.font = "600 11px 'IBM Plex Mono', monospace";
    ctx.textBaseline = "middle";

    boxes.forEach(({ box, confidence }) => {
      const [x, y, w, h] = box;
      const rx = x * scaleX;
      const ry = y * scaleY;
      const rw = w * scaleX;
      const rh = h * scaleY;

      ctx.strokeRect(rx, ry, rw, rh);

      const label = `${Math.round((confidence ?? 0) * 100)}%`;
      const textWidth = ctx.measureText(label).width;
      const labelH = 15;
      const labelY = ry - labelH >= 0 ? ry - labelH : ry + rh;

      ctx.fillStyle = BOX_COLOR;
      ctx.fillRect(rx, labelY, textWidth + 8, labelH);
      ctx.fillStyle = LABEL_TEXT_COLOR;
      ctx.fillText(label, rx + 4, labelY + labelH / 2 + 1);
    });
  }

  useEffect(() => {
    draw();
    const el = imgRef.current;
    if (!el) return;
    const observer = new ResizeObserver(draw);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naturalSize, boxes]);

  return (
    <div className="relative mx-auto w-fit max-w-full">
      <img
        ref={imgRef}
        src={src}
        alt="Dokumen dengan area timpaan ditandai kotak amber"
        className="block h-auto max-h-[420px] w-auto max-w-full"
        onLoad={(e) =>
          setNaturalSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          })
        }
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
    </div>
  );
}
