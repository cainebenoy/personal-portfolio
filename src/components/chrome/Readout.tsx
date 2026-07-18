"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "@/lib/chapters";

// The instrument panel: a 1px accent progress line along the top edge, and a
// bottom-left coordinate readout naming the chapter under the viewport
// center. Both write straight to the DOM — no re-render per scroll frame.
export default function Readout() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      }
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
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

  // Scrollspy: the chapter whose band crosses the viewport's vertical center
  // owns the readout — contiguous sections, so exactly one at a time.
  useEffect(() => {
    const elements = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = elements.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActive(idx);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // The readout lives in the footer's corner — step aside once it arrives.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearEnd(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const current = CHAPTERS[active];

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-px bg-line-faint print:hidden"
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* The chapter coordinate only means something on the index page. */}
      {onHome && (
        <div
          aria-hidden="true"
          className={`mono-tag fixed bottom-6 left-6 z-40 hidden items-baseline gap-3 text-ink/65 transition-opacity duration-500 lg:flex print:hidden ${
            nearEnd ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-red">{current.num}</span>
          <span className="tracking-[0.2em]">{current.label}</span>
          <span className="text-ink/40">/ 09</span>
        </div>
      )}
    </>
  );
}
