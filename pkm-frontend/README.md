# DOKUMEN.SCAN — Frontend (Fase 1: Gatekeeper)

Frontend React + Vite + Tailwind untuk mengonsumsi endpoint `POST /api/v1/analyze-document`
dari backend FastAPI (Stage 0 – Gatekeeper).

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Secara default, request ke `/api/...` diteruskan (proxy) ke `http://127.0.0.1:8000`
— sesuaikan target ini di `vite.config.js` jika backend kalian jalan di alamat lain.

## Build untuk produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`, siap di-deploy ke Vercel/Netlify/static hosting apa pun.
Saat production, atur environment/reverse-proxy supaya path `/api` diarahkan ke backend
FastAPI kalian (atau ganti base URL di `src/api/documentApi.js`).

## Struktur

```
src/
├── api/documentApi.js       # validasi file + pemanggilan endpoint
├── hooks/useAnalyzeDocument.js  # state loading/success/error
├── components/
│   ├── UploadZone.jsx        # drag & drop + pilih file
│   ├── ScanOverlay.jsx       # animasi garis pemindai saat loading
│   ├── StampBadge.jsx        # stempel verdict (Asli / Terdeteksi)
│   ├── ScoreReadout.jsx      # angka skor keaslian
│   ├── DetailList.jsx        # daftar area timpaan (siap untuk Stage 1/2)
│   ├── ErrorBanner.jsx
│   └── Reticle.jsx           # bracket sudut dekoratif (tema scanner)
└── App.jsx                   # alur: idle → loading → hasil
```

## Kompatibilitas dengan roadmap backend

Field `details[]`, `recovered_text`, dan `recovery_method` pada skema respons
sudah dirender secara toleran — jika Stage 1 (Web Retrieval) atau Stage 2 (TrOCR ONNX)
belum aktif dan `details` masih kosong meski `is_edited: true`, UI menampilkan pesan
placeholder alih-alih error. Tidak perlu perubahan struktur besar saat stage berikutnya
diaktifkan di backend — cukup datanya yang bertambah.

## Yang belum termasuk di Fase 1 ini (lihat roadmap)

- Autentikasi / riwayat per pengguna
- Kompresi gambar sisi klien sebelum upload
- Overlay bounding box visual di atas gambar (baru relevan saat Stage 1/2 aktif)
