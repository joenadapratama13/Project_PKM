import cv2
import numpy as np

def normalize_image(image_bytes: bytes) -> np.ndarray:
    """
    Converts raw image bytes to an OpenCV BGR matrix and normalizes orientation/size.
    """
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Failed to decode image bytes")
    return img

def preprocess_grayscale(img: np.ndarray) -> np.ndarray:
    """
    Converts image to grayscale and applies Gaussian blurring for noise reduction.
    """
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    return blurred
