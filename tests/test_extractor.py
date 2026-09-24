from ocr.pdf_reader import read_pdf
from ocr.extractor import extract_all_values

text = read_pdf("ocr/sample_reports/report.pdf")

values = extract_all_values(text)

for feature, value in values.items():
    print(f"{feature}: {value}")