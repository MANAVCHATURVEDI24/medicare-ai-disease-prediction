from patient.patient import Patient
from prediction.feature_mapper import get_cardio_features

patient = Patient(
    age=45,
    gender="Male",
    height=172,
    weight=74,
    systolic_bp=130,
    diastolic_bp=85,
    cholesterol=215,
    glucose=142,
    smoke=False,
    alco=False,
    active=True,
    bmi=24.8,
)

print(get_cardio_features(patient))