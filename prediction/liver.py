from patient.patient import Patient

from prediction.feature_mapper import get_liver_features
from prediction.model_loader import LIVER_MODEL
from prediction.prediction_result import PredictionResult

def predict(patient: Patient) -> PredictionResult:
    X = get_liver_features(patient)
    prediction = bool(
    LIVER_MODEL.predict(X)[0]
    )
    probability = float(
    LIVER_MODEL.predict_proba(X)[0][1]
    )
    return PredictionResult(
    disease="Liver Disease",
    prediction=prediction,
    probability=probability,
    )
