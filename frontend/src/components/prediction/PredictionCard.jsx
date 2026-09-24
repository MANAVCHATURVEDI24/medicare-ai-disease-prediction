import { useState, useEffect } from "react";

function getDiseaseIcon(diseaseName) {
  const name = (diseaseName || "").toLowerCase();

  if (name.includes("diabet")) {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  }

  if (name.includes("liver")) {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    );
  }

  // Default / Cardiovascular / Heart icon
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function getRiskInfo(percent) {
  if (percent <= 30) {
    return {
      label: "Low Risk",
      badgeClass: "bg-teal-100 text-teal-700",
      iconBgClass: "bg-teal-50 text-teal-600",
      textClass: "text-teal-600",
      barClass: "bg-teal-500",
    };
  }
  if (percent <= 70) {
    return {
      label: "Moderate Risk",
      badgeClass: "bg-amber-100 text-amber-700",
      iconBgClass: "bg-amber-50 text-amber-600",
      textClass: "text-amber-600",
      barClass: "bg-amber-500",
    };
  }
  return {
    label: "High Risk",
    badgeClass: "bg-rose-100 text-rose-700",
    iconBgClass: "bg-rose-50 text-rose-600",
    textClass: "text-rose-600",
    barClass: "bg-rose-500",
  };
}

function PredictionCard({ result }) {
  const { disease, probability } = result || {};
  const [animatedWidth, setAnimatedWidth] = useState(0);

  const percent = Math.round((probability || 0) * 100);
  const risk = getRiskInfo(percent);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(percent);
    }, 100);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div>
        {/* Header: Icon + Disease name + Risk Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${risk.iconBgClass}`}>
              {getDiseaseIcon(disease)}
            </div>
            <h3 className="font-semibold text-slate-800 text-lg">
              {disease}
            </h3>
          </div>

          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${risk.badgeClass}`}>
            {risk.label}
          </span>
        </div>

        {/* Risk Probability section */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Risk Probability
            </span>
            <span className={`text-2xl font-bold tracking-tight ${risk.textClass}`}>
              {percent}%
            </span>
          </div>

          {/* Progress bar container */}
          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${disease} risk probability`}
          >
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${risk.barClass}`}
              style={{ width: `${animatedWidth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionCard;
