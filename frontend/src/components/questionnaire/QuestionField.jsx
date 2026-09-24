const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

const OPTION_LABELS = {
  cholesterol: {
    1: "Normal",
    2: "Borderline High",
    3: "High",
    "1": "Normal",
    "2": "Borderline High",
    "3": "High",
  },
  gluc: {
    1: "Normal",
    2: "Above Normal",
    3: "Well Above Normal",
    "1": "Normal",
    "2": "Above Normal",
    "3": "Well Above Normal",
  },
};

function QuestionField({ question, value, onChange }) {
  switch (question.type) {

    case "number":
      return (
        <div className="mb-6">
          <label className={labelClass}>{question.question}</label>
          <input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(question.field, e.target.value)}
            className={inputClass}
          />
        </div>
      );

    case "text":
      return (
        <div className="mb-6">
          <label className={labelClass}>{question.question}</label>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(question.field, e.target.value)}
            className={inputClass}
          />
        </div>
      );

    case "select":
      return (
        <div className="mb-6">
          <label className={labelClass}>{question.question}</label>
          <select
            value={value || ""}
            onChange={(e) => onChange(question.field, e.target.value)}
            className={inputClass}
          >
            <option value="">Select…</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {OPTION_LABELS[question.field]?.[option] ?? option}
              </option>
            ))}
          </select>
        </div>
      );

    case "boolean":
      return (
        <div className="mb-6">
          <label className={labelClass}>{question.question}</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onChange(question.field, true)}
              className={`flex-1 rounded-lg border-2 py-2.5 text-sm font-medium transition-colors ${
                value === true
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onChange(question.field, false)}
              className={`flex-1 rounded-lg border-2 py-2.5 text-sm font-medium transition-colors ${
                value === false
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              No
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default QuestionField;