"use client";

import { useEffect, useRef, useState } from "react";
import { getCaseFile } from "@/content/case-files";
import { CASE_FILE_ORDER } from "@/lib/case-file-order";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "hero", label: "Hero" },
  { id: "trades", label: "Map" },
  ...CASE_FILE_ORDER.map((slug) => ({
    id: slug,
    label: getCaseFile(slug)?.title ?? slug,
  })),
  { id: "about", label: "About" },
  { id: "archive", label: "Archive" },
];

export default function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Scrollspy: track which section's band currently sits at the vertical
  // center of the viewport, via a zero-height intersection band there —
  // exactly one (contiguous, non-overlapping) section owns it at a time.
  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = elements.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Overall scroll percentage, for the mobile bar only. Written straight to
  // the DOM via a transform (not React state) so this never triggers a
  // re-render on every scroll frame — the same rAF-throttled, ref-based
  // pattern as useScrollProgress, just driving scaleX instead of --p.
  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, pct));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <nav
        aria-label="Page sections"
        className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 md:block"
      >
        <ol className="relative flex flex-col items-center gap-4">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-ink/15"
          />
          {SECTIONS.map((section, i) => {
            const state =
              i === activeIndex
                ? "active"
                : i < activeIndex
                  ? "done"
                  : "upcoming";
            return (
              <li key={section.id} className="relative">
                <button
                  type="button"
                  onClick={() => goTo(section.id)}
                  aria-label={`Jump to ${section.label}`}
                  aria-current={state === "active" ? "true" : undefined}
                  className="group relative flex h-4 w-4 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {state === "done" ? (
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5 text-ink/40 transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6.5 5 9.5 10 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span
                      aria-hidden="true"
                      className={
                        state === "active"
                          ? "block h-2.5 w-2.5 rounded-full bg-accent"
                          : "block h-1.5 w-1.5 rounded-full border border-ink/30 bg-surface transition-colors group-hover:border-accent"
                      }
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 h-[3px] bg-ink/10 md:hidden"
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}
