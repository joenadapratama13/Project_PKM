from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.document import DocumentAnalysisResponse
from app.utils.image_processing import normalize_image
from app.core.gatekeeper import GatekeeperEvaluator
from app.core.web_retriever import WebRetrievalMatcher
from app.core.onnx_engine import TrOCRONNXEngine
from app.core.postprocessor import PostProcessor

app = FastAPI(
    title="Sistem Deteksi & Rekonstruksi Timpa Teks (PKM API)",
    description="3-Stage Hybrid Engine untuk deteksi keaslian dokumen dan rekonstruksi teks tertimpa",
    version="1.0.0"
)

# Enable CORS for Frontend Development (React/Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Core Engines
gatekeeper = GatekeeperEvaluator()
web_matcher = WebRetrievalMatcher()
trocr_engine = TrOCRONNXEngine()

@app.on_event("startup")
def startup_event():
    trocr_engine.load_model()

@app.get("/")
def root():
    return {
        "message": "Welcome to PKM Text Overwrite Detection API",
        "docs_url": "/docs",
        "status": "online"
    }

@app.post("/api/v1/analyze-document", response_model=DocumentAnalysisResponse)
async def analyze_document(file: UploadFile = File(...)):
    # 1. Validate File Format
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File type must be an image (.png, .jpg, .jpeg)"
        )
    
    image_bytes = await file.read()
    if len(image_bytes) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 10MB limit"
        )

    try:
        img = normalize_image(image_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image content: {str(e)}"
        )

    # Stage 0: Contour & Overlay Density Analysis (OpenCV) - Aidil
    is_edited, authenticity_score, boxes = gatekeeper.evaluate(img)

    if not is_edited:
        return PostProcessor.synthesize_response(
            is_edited=False,
            authenticity_score=100.0,
            details_list=[]
        )

    details = []
    for box in boxes:
        # Stage 1: Try Web Retrieval Matcher - Aidil
        found_web, web_text, web_conf = web_matcher.search_and_match(anchor_keywords="")
        
        if found_web and web_text:
            details.append({
                "box": box,
                "is_overwritten": True,
                "recovered_text": web_text,
                "recovery_method": "Internet Retrieval Match",
                "confidence": web_conf
            })
        else:
            # Stage 2: Fallback to Vision Transformer TrOCR ONNX Engine - Joo
            x, y, w, h = box
            crop_img = img[y:y+h, x:x+w]
            predicted_text, trocr_conf = trocr_engine.predict_word(crop_img)
            
            details.append({
                "box": box,
                "is_overwritten": True,
                "recovered_text": predicted_text,
                "recovery_method": "TrOCR ONNX Engine",
                "confidence": trocr_conf
            })

    return PostProcessor.synthesize_response(
        is_edited=True,
        authenticity_score=authenticity_score,
        details_list=details
    )
