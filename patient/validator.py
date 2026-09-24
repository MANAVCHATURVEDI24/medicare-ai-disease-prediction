from patient.patient import Patient

def validate_patient(patient: Patient) -> list[str]:
    errors= []

    if patient.age is not None and patient.age <=0:
        errors.append("Age must be greater than 0")

    if patient.height is not None and patient.height <= 0:
        errors.append("Height must be greater than 0.")

    if patient.weight is not None and patient.weight <= 0:
        errors.append("Weight must be greater than 0.")

    #--For Diabetes----

    if patient.glucose is not None and patient.glucose < 0:
        errors.append("Glucose cannot be negative.")

    if patient.bmi is not None and patient.bmi < 0:
        errors.append("BMI cannot be negative.")

    if patient.bloodpressure is not None and patient.bloodpressure < 0:
        errors.append("Blood Pressure cannot be negative.")

    #-- For Liver----

    if patient.total_bilirubin is not None and patient.total_bilirubin < 0:
        errors.append("Total Bilirubin cannot be negative.")

    if patient.albumin is not None and patient.albumin < 0:
        errors.append("Albumin cannot be negative.")

    #-- For Cardiovascular---

    if patient.systolic_bp is not None and patient.systolic_bp < 0:
        errors.append("Systolic BP cannot be negative.")

    if patient.diastolic_bp is not None and patient.diastolic_bp < 0:
        errors.append("Diastolic BP cannot be negative.")

    return errors