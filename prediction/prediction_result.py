from pydantic import BaseModel

class PredictionResult(BaseModel):
    disease: str
    prediction: bool
    probability: float