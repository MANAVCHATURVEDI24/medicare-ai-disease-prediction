const BASE_URL = "http://127.0.0.1:8000/predict";

export async function uploadReport(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Upload failed.");
  }

  return data;
}

export async function continuePrediction(reportData, userAnswers) {
  const response = await fetch(`${BASE_URL}/continue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      report_data: reportData,
      user_answers: userAnswers,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Submission failed.");
  }

  return data;
}