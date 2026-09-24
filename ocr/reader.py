from ocr.pdf_reader import read_pdf
from ocr.extractor import extract_all_values

def process_report(file_path: str):
    text = read_pdf(file_path)
    values = extract_all_values(text)
    return values