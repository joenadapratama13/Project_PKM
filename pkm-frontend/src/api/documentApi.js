/**
 * Client untuk endpoint backend Gatekeeper (Stage 0).
 * Skema ini mengikuti backend app/main.py + app/schemas/document.py:
 * - box format: [x, y, w, h] (posisi kiri-atas + lebar/tinggi)
 * - hanya menerima image/* (PNG, JPEG) - tidak ada dukungan PDF
 * - recovered_text & recovery_method selalu ada (bisa berisi placeholder
 *   dari Stage 1/2 yang masih stub, mis. "TEKS_TERTETAPKAN")
 */

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/png", "image/jpeg"];

export class ValidationError extends Error {}

export function validateFile(file) {
  if (!file) throw new ValidationError("Tidak ada file yang dipilih.");
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new ValidationError("Format harus .png, .jpg, atau .jpeg.");
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new ValidationError(`Ukuran file melebihi ${MAX_FILE_SIZE_MB}MB.`);
  }
  return true;
}

export async function analyzeDocument(file, { signal } = {}) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/v1/analyze-document", {
    method: "POST",
    body: formData,
    signal,
  });

  if (!res.ok) {
    let message = `Server merespons dengan status ${res.status}.`;
    try {
      const body = await res.json();
      if (body?.detail) message = body.detail;
    } catch {
      /* respons bukan JSON, gunakan pesan default */
    }
    throw new Error(message);
  }

  return res.json();
}
