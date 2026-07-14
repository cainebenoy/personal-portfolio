"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export default function ThemeToggle() {
  // Matches the server-rendered default (light) so hydration never mismatches;
  // corrected immediately on mount from the class the init script already set.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const syncFromDom = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    syncFromDom();
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private browsing, etc.) — toggle still
      // works for the session, it just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-4 right-4 z-50 rounded-sm border border-ink/20 bg-surface px-3 py-1.5 font-handwritten text-sm text-ink shadow-sm transition-colors hover:text-accent [transform:rotate(-2deg)]"
    >
      {isDark ? "lights on" : "lights out"}
    </button>
  );
}
