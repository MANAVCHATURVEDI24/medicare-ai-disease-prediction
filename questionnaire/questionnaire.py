from patient.patient import Patient
QUESTIONS = {
    # ----- Diabetes ----------------
    "pregnancies": {
        "question": "How many times have you been pregnant?",
        "type": "number",
    },
    "glucose": {
        "question": "What is your glucose level (mg/dL)?",
        "type": "number",
    },
    "bloodpressure": {
        "question": "What is your blood pressure (mmHg)?",
        "type": "number",
    },
    "skinthickness": {
        "question": "What is your skin thickness (mm)?",
        "type": "number",
    },
    "insulin": {
        "question": "What is your insulin level (μU/mL)?",
        "type": "number",
    },
    "bmi": {
        "question": "What is your BMI?",
        "type": "number",
    },
    "diabetespedigreefunction": {
        "question": "What is your Diabetes Pedigree Function value?",
        "type": "number",
    },
    "age": {
        "question": "What is your age?",
        "type": "number",
    },

    # ----- Common ----------------
    "gender": {
        "question": "What is your gender?",
        "type": "select",
        "options": ["Male", "Female"],
    },
    "height": {
        "question": "What is your height (cm)?",
        "type": "number",
    },
    "weight": {
        "question": "What is your weight (kg)?",
        "type": "number",
    },

    # ----- Cardiovascular ----------------
    "systolic_bp": {
        "question": "What is your systolic blood pressure (mmHg)?",
        "type": "number",
    },
    "diastolic_bp": {
        "question": "What is your diastolic blood pressure (mmHg)?",
        "type": "number",
    },
    "cholesterol": {
        "question": "What is your cholesterol level category?",
        "type": "select",
        "options": [1, 2, 3],
    },
    "gluc": {
        "question": "What is your glucose level category?",
        "type": "select",
        "options": [1, 2, 3],
    },
    "smoke": {
        "question": "Do you smoke?",
        "type": "boolean",
    },
    "alco": {
        "question": "Do you consume alcohol?",
        "type": "boolean",
    },
    "active": {
        "question": "Are you physically active?",
        "type": "boolean",
    },

    # ---- Liver ----------------
    "total_bilirubin": {
        "question": "What is your total bilirubin (mg/dL)?",
        "type": "number",
    },
    "direct_bilirubin": {
        "question": "What is your direct bilirubin (mg/dL)?",
        "type": "number",
    },
    "alkaline_phosphatase": {
        "question": "What is your alkaline phosphotase (IU/L)?",
        "type": "number",
    },
    "alt": {
        "question": "What is your ALT (SGPT) level (IU/L)?",
        "type": "number",
    },
    "ast": {
        "question": "What is your AST (SGOT) level (IU/L)?",
        "type": "number",
    },
    "total_proteins": {
        "question": "What is your total proteins level (g/dL)?",
        "type": "number",
    },
    "albumin": {
        "question": "What is your albumin level (g/dL)?",
        "type": "number",
    },
    "albumin_globulin_ratio": {
        "question": "What is your albumin/globulin ratio?",
        "type": "number",
    },
}

DIABETES_FIELDS = {
    "pregnancies",
    "glucose",
    "bloodpressure",
    "skinthickness",
    "insulin",
    "bmi",
    "diabetespedigreefunction",
    "age",
}

LIVER_FIELDS = {
    "age",
    "gender",
    "total_bilirubin",
    "direct_bilirubin",
    "alkaline_phosphatase",
    "alt",
    "ast",
    "total_proteins",
    "albumin",
    "albumin_globulin_ratio",
}

CARDIO_FIELDS = {
    "age",
    "gender",
    "height",
    "weight",
    "systolic_bp",
    "diastolic_bp",
    "cholesterol",
    "gluc",
    "smoke",
    "alco",
    "active",
}

REQUIRED_FIELDS = (
    DIABETES_FIELDS
    | LIVER_FIELDS
    | CARDIO_FIELDS
)
from typing import Any

def get_missing_questions(patient: Patient,required_fields: set[str],) -> list[dict[str, Any]]:
    missing_questions = []

    for field in required_fields:
        if getattr(patient, field) is None:
            question = QUESTIONS.get(field)

            if question:
                missing_questions.append({
                "field": field,
                **question
            })

    return missing_questions

