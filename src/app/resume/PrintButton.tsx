"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mono-tag cursor-pointer border border-line px-4 py-2.5 text-ink/70 transition-colors duration-300 hover:border-ink/40 hover:text-ink"
    >
      Print this page
    </button>
  );
}
