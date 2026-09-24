import { useState, useRef } from "react";

const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"];

function FileUploader({ onFileSelect, file, onClear }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateAndSelect = (f) => {
    if (!f) return;
    if (!ALLOWED_TYPES.includes(f.type)) {
      alert("Please upload a PDF or image file (PNG, JPG, JPEG).");
      return;
    }
    onFileSelect(f);
  };

  const handleChange = (e) => {
    validateAndSelect(e.target.files[0]);
    e.target.value = "";
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragActive(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    validateAndSelect(e.dataTransfer.files[0]);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* ── File selected state ─────────────────────────────── */
  if (file) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
        {/* File icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
          <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* File info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
          <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
        </div>

        {/* Clear button */}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
            aria-label="Remove file"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  /* ── Drop zone state ─────────────────────────────────── */
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors duration-200 ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleChange}
        className="hidden"
      />

      {/* Upload icon */}
      <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
        isDragActive ? "bg-blue-100" : "bg-slate-100"
      }`}>
        <svg
          className={`h-8 w-8 transition-colors ${isDragActive ? "text-blue-500" : "text-slate-400"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </div>

      <p className="text-sm font-semibold text-slate-700">
        {isDragActive ? "Drop your file here" : "Drag & drop your lab report"}
      </p>
      <p className="mt-1 text-sm text-slate-500">or click to browse files</p>

      {/* Supported formats */}
      <div className="mt-4 flex justify-center gap-2">
        {["PDF", "PNG", "JPG"].map((fmt) => (
          <span
            key={fmt}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500"
          >
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FileUploader;