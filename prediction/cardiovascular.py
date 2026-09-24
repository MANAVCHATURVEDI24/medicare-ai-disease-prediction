from patient.patient import Patient

from prediction.feature_mapper import get_cardio_features
from prediction.model_loader import CARDIOVASCULAR_MODEL
from prediction.prediction_result import PredictionResult


def predict(patient: Patient) -> PredictionResult:
    X = get_cardio_features(patient)

    prediction = bool(
        CARDIOVASCULAR_MODEL.predict(X)[0]
    )

    probability = float(
        CARDIOVASCULAR_MODEL.predict_proba(X)[0][1]
    )

    return PredictionResult(
        disease="Cardiovascular Disease",
        prediction=prediction,
        probability=probability,
    )