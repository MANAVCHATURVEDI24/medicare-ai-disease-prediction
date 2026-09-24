from typing import Any

from pydantic import BaseModel


class Question(BaseModel):
    field: str
    question: str
    type: str
    options: list[Any] | None = None


class QuestionnaireResponse(BaseModel):
    status: str
    questions: list[Question]
    report_data: dict[str, Any]