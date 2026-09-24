import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { uploadReport } from "../services/api";
import FileUploader from "../components/common/FileUploader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorAlert from "../components/common/ErrorAlert";

function Upload() {
  const navigate = useNavigate();

  const {
    setReportData,
    setQuestions,
    setPredictions,
  } = useAppContext();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setErrors([]);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setErrors([]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrors([]);

    try {
      const result = await uploadReport(selectedFile);

      switch (result.status) {
        case "need_more_information":
          setReportData(result.report_data);
          setQuestions(result.questions);
          navigate("/questionnaire");
          break;

        case "success":
          setPredictions(result.predictions);
          navigate("/dashboard");
          break;

        case "validation_error":
          setErrors(result.errors);
          break;

        default:
          setErrors(["Unknown response from server."]);
      }
    } catch (error) {
      console.error(error);
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Upload Lab Report
        </h1>
        <p className="mt-2 text-slate-500">
          Upload a PDF or image of your lab report. Our AI will extract the values
          and calculate your personalised disease risk.
        </p>
      </div>

      {/* Upload card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <FileUploader
          onFileSelect={handleFileSelect}
          file={selectedFile}
          onClear={handleRemove}
        />

        {/* Inline errors */}
        {errors.length > 0 && (
          <div className="mt-4">
            <ErrorAlert errors={errors} onDismiss={() => setErrors([])} />
          </div>
        )}

        {/* Analyse button */}
        <div className="mt-5">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {isLoading
              ? <LoadingSpinner label="Analysing report…" />
              : "Analyse Report"
            }
          </button>
        </div>
      </div>

      {/* Info panel */}
      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex gap-3">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-800">What happens next?</p>
            <p className="mt-1 text-sm text-blue-700">
              Our OCR engine extracts values from your report. If any required fields
              are missing you'll answer a few quick questions, then receive your
              personalised risk prediction for Diabetes, Liver Disease, and
              Cardiovascular conditions.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Upload;