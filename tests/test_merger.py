from patient.merger import merge_patient_data

report_data = {
    "glucose": 142,
    "albumin": 3.8
}

user_data = {
    "age": 45,
    "gender": "Male",
    "height": 172,
    "weight": 74
}

patient = merge_patient_data(report_data, user_data)

print(patient)