import re
from ocr.lab_aliases import LAB_ALIASES


def extract_value(text: str, parameter: str):
    pattern = (
        rf"{re.escape(parameter)}"
        rf"\s*[:\-]?\s*"
        rf"([\d]+(?:\.\d+)?)"
    )

    match = re.search(pattern, text, re.IGNORECASE)

    if match:
        return float(match.group(1))

    return None


def extract_text_value(text: str, parameter: str):
    pattern = (
        rf"{re.escape(parameter)}"
        rf"\s*[:\-]?\s*"
        rf"([a-zA-Z]+)"
    )

    match = re.search(pattern, text, re.IGNORECASE)

    if match:
        return match.group(1).capitalize()

    return None


def extract_all_values(text: str):
    extracted = {}
    string_fields = {"gender"}

    for feature, aliases in LAB_ALIASES.items():

        extracted[feature] = None

        for alias in aliases:

            if feature in string_fields:
                value = extract_text_value(text, alias)
            else:
                value = extract_value(text, alias)

            if value is not None:
                extracted[feature] = value
                break

    return extracted