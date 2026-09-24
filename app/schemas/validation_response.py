from pydantic import BaseModel


class ValidationResponse(BaseModel):
    status: str
    errors: list[str]