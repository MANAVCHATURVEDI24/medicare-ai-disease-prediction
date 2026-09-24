from patient.patient import Patient
from patient.validator import validate_patient

patient = Patient(
    age=-5,
    glucose=-120,
    height=170,
    weight=70
)

errors = validate_patient(patient)

print(errors)