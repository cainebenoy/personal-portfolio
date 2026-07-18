"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

// Sun/moon in the same stroke language as the trade glyphs. The <html>
// class list is the single source of truth (the init script sets it before
// hydration); this component just observes and flips it.

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

// Dark is the server-rendered default.
function serverIsDark() {
  return true;
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, serverIsDark);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Private mode — the choice just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`flex h-11 w-11 cursor-pointer items-center justify-center text-ink/60 transition-colors duration-300 hover:text-brass ${className}`}
    >
      {dark ? (
        // Sun — a cousin of the operator's crosshair.
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4.25" />
            <path d="M12 2.75 V5" />
            <path d="M12 19 V21.25" />
            <path d="M2.75 12 H5" />
            <path d="M19 12 H21.25" />
            <path d="M5.4 5.4 L7 7" />
            <path d="M17 17 L18.6 18.6" />
            <path d="M18.6 5.4 L17 7" />
            <path d="M7 17 L5.4 18.6" />
          </g>
        </svg>
      ) : (
        // Moon.
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path
            d="M19.5 13.5 A8 8 0 1 1 10.5 4.5 A6.5 6.5 0 0 0 19.5 13.5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
