from pydantic import BaseModel, Field
from typing import List, Optional

class OverwrittenDetail(BaseModel):
    box: List[int] = Field(..., description="Bounding box coordinates [x, y, w, h]")
    is_overwritten: bool = Field(True, description="Indicates if text in bounding box is overwritten")
    recovered_text: str = Field(..., description="Recovered text output")
    recovery_method: str = Field(..., description="Method used: Clean Document / Internet Retrieval Match / TrOCR ONNX Engine")
    confidence: float = Field(..., description="Confidence score between 0.0 and 1.0")

class DocumentAnalysisResponse(BaseModel):
    status: str = Field("success", description="Response status")
    is_edited: bool = Field(..., description="True if document contains overwritten strokes")
    authenticity_score: float = Field(..., description="Document authenticity percentage (0.0 to 100.0)")
    summary: str = Field(..., description="Human readable analysis summary")
    details: List[OverwrittenDetail] = Field(default_factory=list, description="List of detected & reconstructed areas")
