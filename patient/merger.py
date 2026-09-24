from patient.patient import Patient

def merge_patient_data(report_data: dict, user_data: dict)-> Patient:
    merged_data= {}
    merged_data.update(report_data)
    merged_data.update(user_data)

    return Patient(**merged_data)
