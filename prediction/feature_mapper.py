import pandas as pd

from patient.patient import Patient

from prediction.encoders import (
    liver_gender_encoder,
    cardio_gender_encoder,
    bool_to_int,
)

def get_diabetes_features(patient: Patient) -> pd.DataFrame:

    data = {
        "pregnancies": patient.pregnancies,
        "glucose": patient.glucose,
        "bloodpressure": patient.bloodpressure,
        "skinthickness": patient.skinthickness,
        "insulin": patient.insulin,
        "bmi": patient.bmi,
        "diabetespedigreefunction": patient.diabetespedigreefunction,
        "age": patient.age,
    }

    return pd.DataFrame([data])

def get_liver_features(patient: Patient) -> pd.DataFrame:

    data = {
        "Age": patient.age,
        "Gender": liver_gender_encoder(patient.gender),
        "Total_Bilirubin": patient.total_bilirubin,
        "Direct_Bilirubin": patient.direct_bilirubin,
        "Alkaline_Phosphotase": patient.alkaline_phosphatase,
        "Alamine_Aminotransferase": patient.alt,
        "Aspartate_Aminotransferase": patient.ast,
        "Total_Protiens": patient.total_proteins,
        "Albumin": patient.albumin,
        "Albumin_and_Globulin_Ratio": patient.albumin_globulin_ratio,
    }

    return pd.DataFrame([data])

def get_cardio_features(patient: Patient) -> pd.DataFrame:

    data = {
        "gender": cardio_gender_encoder(patient.gender),
        "height": patient.height,
        "weight": patient.weight,
        "ap_hi": patient.systolic_bp,
        "ap_lo": patient.diastolic_bp,
        "cholesterol": patient.cholesterol,
        "gluc": patient.gluc,
        "smoke": bool_to_int(patient.smoke),
        "alco": bool_to_int(patient.alco),
        "active": bool_to_int(patient.active),
        "age_years": patient.age,
        "bmi": patient.bmi,
    }

    return pd.DataFrame([data])

