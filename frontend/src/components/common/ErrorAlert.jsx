function ErrorAlert({ errors, onDismiss }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4" role="alert">
      <div className="flex items-start gap-3">

        {/* Icon */}
        <div className="mt-0.5 shrink-0">
          <svg className="h-5 w-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-rose-800">
            {errors.length === 1 ? "Something went wrong" : "Please fix the following issues"}
          </p>

          {errors.length === 1 ? (
            <p className="mt-1 text-sm text-rose-700">{errors[0]}</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {errors.map((error, i) => (
                <li key={i} className="text-sm text-rose-700">
                  · {error}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dismiss */}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-lg p-1 text-rose-400 transition-colors hover:bg-rose-100 hover:text-rose-600"
            aria-label="Dismiss error"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

      </div>
    </div>
  );
}

export default ErrorAlert;
