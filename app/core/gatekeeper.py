import cv2
import numpy as np
from typing import Tuple, List
from app.utils.image_processing import preprocess_grayscale

class GatekeeperEvaluator:
    """
    Stage 0: Contour Analysis & Stroke Density Evaluator (Aidil)
    Determines if a document is clean or contains overwritten strokes.
    """
    def __init__(self, stroke_density_threshold: float = 0.15):
        self.threshold = stroke_density_threshold

    def evaluate(self, img: np.ndarray) -> Tuple[bool, float, List[List[int]]]:
        """
        Returns:
            is_edited (bool): True if overwriting detected.
            authenticity_score (float): 100.0 for clean, lower for edited.
            bounding_boxes (List[List[int]]): List of [x, y, w, h] boxes where overwriting occurred.
        """
        gray = preprocess_grayscale(img)
        # Adaptive Thresholding for stroke detection
        thresh = cv2.adaptiveThreshold(
            gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2
        )
        
        # Contour detection for irregular stroke overlaps
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        boxes = []
        stroke_area = 0
        total_area = img.shape[0] * img.shape[1]
        
        for cnt in contours:
            area = cv2.contourArea(cnt)
            if area > 100:  # Filter noise
                x, y, w, h = cv2.boundingRect(cnt)
                aspect_ratio = float(w) / h
                # Irregular stroke shapes indicative of crossing out / overwriting
                if area > 300 and (aspect_ratio < 0.2 or aspect_ratio > 5.0 or cv2.arcLength(cnt, True) > 200):
                    boxes.append([int(x), int(y), int(w), int(h)])
                    stroke_area += area

        density_score = stroke_area / float(total_area) if total_area > 0 else 0.0
        is_edited = len(boxes) > 0 and density_score > self.threshold
        
        if not is_edited:
            return False, 100.0, []
        
        authenticity_score = max(0.0, round((1.0 - density_score * 5) * 100, 1))
        return True, authenticity_score, boxes
