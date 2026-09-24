from patient.patient import Patient
from prediction.diabetes import predict

patient = Patient(
    pregnancies=2,
    glucose=140,
    bloodpressure=80,
    skinthickness=20,
    insulin=90,
    bmi=28.5,
    diabetespedigreefunction=0.5,
    age=45,
)

result = predict(patient)

print(result)

from prediction.model_loader import DIABETES_MODEL

print(DIABETES_MODEL.classes_)