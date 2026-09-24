from patient.patient import Patient
from prediction.prediction_result import PredictionResult

from prediction.feature_mapper import get_diabetes_features
from prediction.model_loader import (
    DIABETES_MODEL,
    DIABETES_SCALER,
)

def predict(patient: Patient):
    X = get_diabetes_features(patient)
    X_scaled = DIABETES_SCALER.transform(X)
    prediction = DIABETES_MODEL.predict(X_scaled)
    prediction = int(prediction[0])
    probability = DIABETES_MODEL.predict_proba(X_scaled)
    probability = float(probability[0][1])
    return PredictionResult(
    disease="Diabetes",
    prediction=bool(prediction),
    probability=probability,
    )

