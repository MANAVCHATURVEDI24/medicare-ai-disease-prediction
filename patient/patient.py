from pydantic import BaseModel

class Patient(BaseModel):
    age:int | None= None
    gender: str | None = None
    height: float | None = None
    weight: float | None = None

    #----For Diabetes---

    pregnancies: int | None = None
    glucose: float | None = None
    bloodpressure: float | None = None
    skinthickness: float | None = None
    insulin: float | None = None
    bmi: float | None = None
    diabetespedigreefunction: float | None = None

    #----For Liver---

    total_bilirubin: float | None = None
    direct_bilirubin: float | None = None
    alkaline_phosphatase: float | None = None
    alt: float | None = None
    ast: float | None = None
    total_proteins: float | None = None
    albumin: float | None = None
    albumin_globulin_ratio: float | None = None

    #---For Cardiovascular---

    systolic_bp: int | None = None
    diastolic_bp: int | None = None
    cholesterol: int | None = None
    gluc: int | None = None
    smoke: bool | None = None
    alco: bool | None = None
    active: bool | None = None