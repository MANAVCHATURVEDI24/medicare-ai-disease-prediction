from pydantic import BaseModel

from prediction.prediction_result import PredictionResult


class PredictionResponse(BaseModel):
    status: str

    predictions: dict[str, PredictionResult]