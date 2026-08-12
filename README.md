# 🦁 PKM: Sistem Deteksi & Rekonstruksi Timpa Teks

Program Kreativitas Mahasiswa (PKM) - Sistem backend berbasi FastAPI dan 3-Stage Hybrid Engine untuk deteksi keaslian dokumen serta rekonstruksi teks yang tertimpa / dicoret (cetak maupun tulisan tangan).

---

## 📌 Pembagian Tugas Tim

### 🛠️ BACKEND TEAM (2 Orang)
- **👑 Joo (Lead Backend & AI Model Engineer):**
  - FastAPI Core Gateway & Routing (`app/main.py`)
  - Stage 2: Vision Transformer TrOCR ONNX Engine (`app/core/onnx_engine.py`)
  - 3-Stage Hybrid Orchestrator Pipeline
  - Post-processing & Authenticity Score (`app/core/postprocessor.py`)
- **🔬 Aidil (Backend Engine & Algorithmic Specialist):**
  - Stage 0: Gatekeeper Evaluator OpenCV (`app/core/gatekeeper.py`)
  - Stage 1: Web Retrieval Matcher (`app/core/web_retriever.py`)
  - Image Preprocessing Utilities (`app/utils/image_processing.py`)

### 🎨 FRONTEND TEAM (3 Orang)
- **💻 Anggota 3 (UI Layout & Upload Handler):** Web Layouting, Theme, Drag & Drop Upload Component & Image Preview.
- **📊 Anggota 4 (Canvas & Visualizer Engineer):** Dynamic Bounding Box Overlay & Authenticity Score Dashboard.
- **🔄 Anggota 5 (API Integration & Export Feature):** Integration API (`axios`/`fetch`), State Loading Handler, & Export Report PDF.

---

## 🏗️ Struktur Proyek

```
PKM/
├── app/
│   ├── main.py                # FastAPI Gateway Utama & Endpoint /api/v1/analyze-document
│   ├── core/
│   │   ├── gatekeeper.py      # Stage 0: OpenCV Contour & Stroke Density Evaluator (Aidil)
│   │   ├── web_retriever.py   # Stage 1: Anchor Words & Web Search Matcher (Aidil)
│   │   ├── onnx_engine.py     # Stage 2: TrOCR Vision Transformer ONNX CPU Engine (Joo)
│   │   └── postprocessor.py   # Token Decoding & Authenticity Score Synthesis (Joo)
│   ├── schemas/
│   │   └── document.py        # Pydantic Request & Response Schemas
│   └── utils/
│       └── image_processing.py# Preprocessing Gambar (Aidil)
├── docs/
│   └── spesifikasi.md
├── requirements.txt
├── .gitignore
└── README.md
```

---

## 🚀 Cara Menjalankan Backend Local

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Jalankan Server FastAPI:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

3. **Buka Dokumentasi Interactive API (Swagger UI):**
   [http://localhost:8000/docs](http://localhost:8000/docs)
