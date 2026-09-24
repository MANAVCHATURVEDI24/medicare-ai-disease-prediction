from pathlib import Path
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

DIABETES_MODEL = joblib.load(MODELS_DIR / "diabetes_model.pkl")
DIABETES_SCALER = joblib.load(MODELS_DIR / "diabetes_scaler.pkl")

LIVER_MODEL = joblib.load(MODELS_DIR / "liver_model.pkl")

CARDIOVASCULAR_MODEL = joblib.load(
    MODELS_DIR / "cardiovascular_model.pkl"
)