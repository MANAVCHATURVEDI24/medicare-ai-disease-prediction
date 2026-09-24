from typing import Any

from pydantic import BaseModel


class ContinuePredictionRequest(BaseModel):
    report_data: dict[str, Any]
    user_answers: dict[str, Any]