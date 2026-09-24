from prediction.diabetes import predict as predict_diabetes
from prediction.liver import predict as predict_liver
from prediction.cardiovascular import predict as predict_cardiovascular


def predict_all(patient):
    return {
        "diabetes": predict_diabetes(patient),
        "liver": predict_liver(patient),
        "cardiovascular": predict_cardiovascular(patient),
    }