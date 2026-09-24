import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { continuePrediction } from "../services/api";
import QuestionForm from "../components/questionnaire/QuestionForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorAlert from "../components/common/ErrorAlert";

export function deriveGlucoseCategory(glucoseValue) {
  if (glucoseValue === undefined || glucoseValue === null || glucoseValue === "") {
    return null;
  }
  const val = Number(glucoseValue);
  if (isNaN(val)) return null;
  if (val < 100) return 1;
  if (val <= 125) return 2;
  return 3;
}

function Questionnaire() {
  const navigate = useNavigate();
  const { questions, reportData, setPredictions } = useAppContext();

  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const hasReportGlucose = reportData?.glucose !== undefined && reportData?.glucose !== null && reportData?.glucose !== "";
  const hasUserGlucose = answers.glucose !== undefined && answers.glucose !== null && answers.glucose !== "";
  const isGlucoseAsked = (questions || []).some((q) => q.field === "glucose");

  const shouldHideGlucQuestion = hasReportGlucose || hasUserGlucose || isGlucoseAsked;

  const displayedQuestions = (questions || []).filter((q) => {
    if (q.field === "gluc" && shouldHideGlucQuestion) {
      return false;
    }
    return true;
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors([]);

    const finalAnswers = { ...answers };
    const effectiveGlucose = answers.glucose ?? reportData?.glucose;
    if (effectiveGlucose !== undefined && effectiveGlucose !== null && effectiveGlucose !== "") {
      const derivedGluc = deriveGlucoseCategory(effectiveGlucose);
      if (derivedGluc !== null) {
        finalAnswers.gluc = derivedGluc;
      }
    }

    try {
      const result = await continuePrediction(reportData, finalAnswers);

      switch (result.status) {
        case "success":
          setPredictions(result.predictions);
          navigate("/dashboard");
          break;

        case "validation_error":
          setErrors(result.errors);
          break;

        default:
          setErrors(["Unexpected response from server."]);
      }
    } catch (error) {
      console.error(error);
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (questions && questions.length > 0 && displayedQuestions.length === 0 && !isLoading) {
      handleSubmit();
    }
  }, [questions, displayedQuestions.length]);

  /* ── Empty-context guard ────────────────────────────── */
  if (!questions || questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-slate-800">No questions to answer</h2>
        <p className="mt-2 text-sm text-slate-500">
          Please upload a lab report first to begin the prediction flow.
        </p>
        <button
          type="button"
          onClick={() => navigate("/upload")}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  /* ── Progress ───────────────────────────────────────── */
  const answeredCount = displayedQuestions.filter((q) => {
    const val = answers[q.field];
    return val !== undefined && val !== "";
  }).length;

  const progressPct = displayedQuestions.length > 0
    ? Math.round((answeredCount / displayedQuestions.length) * 100)
    : 100;

  /* ── Main page ──────────────────────────────────────── */
  return (
    <div className="mx-auto max-w-2xl">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Additional Information
        </h1>
        <p className="mt-2 text-slate-500">
          We need a few more details to complete your prediction. Please answer
          all the questions below.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Progress</span>
          <span className="text-slate-500">
            {answeredCount} of {displayedQuestions.length} answered
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Questions answered"
        >
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <QuestionForm
          questions={displayedQuestions}
          answers={answers}
          onChange={handleChange}
        />

        {/* Inline errors */}
        {errors.length > 0 && (
          <div className="mt-2">
            <ErrorAlert errors={errors} onDismiss={() => setErrors([])} />
          </div>
        )}

        {/* Submit */}
        <div className="mt-4 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {isLoading
              ? <LoadingSpinner label="Calculating your results…" />
              : "Get My Prediction"
            }
          </button>
        </div>
      </div>

    </div>
  );
}

export default Questionnaire;