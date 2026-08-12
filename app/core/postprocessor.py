from typing import List, Dict, Any
from app.schemas.document import DocumentAnalysisResponse, OverwrittenDetail

class PostProcessor:
    """
    Post-processing & Authenticity Score Synthesis (Joo)
    Combines outputs from Stage 0, Stage 1, and Stage 2 into JSON response payload.
    """
    @staticmethod
    def synthesize_response(
        is_edited: bool,
        authenticity_score: float,
        details_list: List[Dict[str, Any]]
    ) -> DocumentAnalysisResponse:
        
        details = [OverwrittenDetail(**item) for item in details_list]
        summary_text = (
            "Dokumen Asli / Bersih (Skor 100%)"
            if not is_edited
            else f"Terdeteksi {len(details)} area teks tertimpa"
        )
        
        return DocumentAnalysisResponse(
            status="success",
            is_edited=is_edited,
            authenticity_score=authenticity_score,
            summary=summary_text,
            details=details
        )
