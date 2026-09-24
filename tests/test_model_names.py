from prediction.model_loader import (
    DIABETES_MODEL,
    LIVER_MODEL,
    CARDIOVASCULAR_MODEL,
)

print("Diabetes:")
print(DIABETES_MODEL.feature_names_in_)

print("\nLiver:")
print(LIVER_MODEL.feature_names_in_)

print("\nCardio:")
print(CARDIOVASCULAR_MODEL.feature_names_in_)