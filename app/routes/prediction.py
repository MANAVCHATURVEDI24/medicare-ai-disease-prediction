from pathlib import Path
from ocr.reader import process_report
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from patient.patient import Patient
from patient.validator import validate_patient
from questionnaire.questionnaire import (
    get_missing_questions,
    REQUIRED_FIELDS,
)

from app.schemas.continue_request import ContinuePredictionRequest

from patient.merger import merge_patient_data

from prediction.predictor import predict_all
from app.schemas.prediction_response import PredictionResponse
from app.schemas.questionnaire_response import QuestionnaireResponse
from app.schemas.validation_response import ValidationResponse

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

UPLOAD_DIR = Path("temp_uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post(
    "/",
    response_model=QuestionnaireResponse | PredictionResponse | ValidationResponse,
)
async def predict(file: UploadFile = File(...)):

    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    try:

        try:
            values = process_report(str(file_path))
        except Exception:
            raise HTTPException(
            status_code=400,
            detail="Unable to process uploaded report."
            )
        
        patient = Patient(**values)

        errors = validate_patient(patient)

        if errors:
            return ValidationResponse(
                status="validation_error",
                errors=errors,
            )

        missing_questions = get_missing_questions(
            patient,
            REQUIRED_FIELDS,
        )

        if missing_questions:
            return QuestionnaireResponse(
                status="need_more_information",
                questions=missing_questions,
                report_data=patient.model_dump(),
            )

        return PredictionResponse(
            status="success",
            predictions=predict_all(patient),
        )

    finally:
        if file_path.exists():
            file_path.unlink()

@router.post(
    "/continue",
    response_model=PredictionResponse | ValidationResponse,
)
async def continue_prediction(request: ContinuePredictionRequest):

    patient = merge_patient_data(
        request.report_data,
        request.user_answers,
    )

    errors = validate_patient(patient)

    if errors:
        return ValidationResponse(
            status="validation_error",
            errors=errors,
        )

    try:
        predictions = predict_all(patient)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Prediction failed."
        )

    return PredictionResponse(
        status="success",
        predictions=predictions,
    )