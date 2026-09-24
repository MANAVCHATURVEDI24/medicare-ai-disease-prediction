from patient.patient import Patient

from prediction.cardiovascular import predict
from prediction.model_loader import CARDIOVASCULAR_MODEL


patient = Patient(
    age=45,
    gender="Male",
    height=170,
    weight=70,
    bmi=24.22,
    systolic_bp=120,
    diastolic_bp=80,
    cholesterol=180,
    glucose=95,
    smoke=False,
    alco=False,
    active=True,
)

result = predict(patient)

print(result)
print(CARDIOVASCULAR_MODEL.classes_)
