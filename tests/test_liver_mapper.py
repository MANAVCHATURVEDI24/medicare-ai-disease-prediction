from patient.patient import Patient
from prediction.liver import predict
from prediction.model_loader import LIVER_MODEL

patient = Patient(
    age=45,
    gender="Male",
    total_bilirubin=1.2,
    direct_bilirubin=0.4,
    alkaline_phosphatase=220,
    alt=45,
    ast=38,
    total_proteins=6.8,
    albumin=3.8,
    albumin_globulin_ratio=1.2,
)

result = predict(patient)

print(result)
print(LIVER_MODEL.classes_)