"use client";

import { useRef, useState } from "react";
import Plate from "@/components/work/Plate";
import { PROJECTS } from "@/content/projects";
import { gsap, scrollToId, useGSAP } from "@/lib/motion";

// The case index — a jump list for the spreads below, with a cursor-
// following plate preview on hover (adapted from 21st.dev's
// @jatin-yadav05/project-showcase, rebuilt on GSAP quickTo instead of
// per-frame setState, and floating each project's drafting plate instead
// of a stock photo). Pointer-fine + full-motion devices only; touch and
// reduced motion get the plain list. Real anchors throughout, upgraded to
// eased scroll.
export default function WorkIndex() {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = previewRef.current;
          if (!el) return;
          const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
          const move = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
          };
          window.addEventListener("mousemove", move, { passive: true });
          return () => window.removeEventListener("mousemove", move);
        },
      );
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef}>
      {/* Floating plate preview — fixed to the viewport, eased after the
          cursor, one plate per project stacked and cross-faded. Display is
          gated to pointer-fine, motion-safe environments in CSS so touch
          and reduced-motion never see a stuck panel. */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[65] hidden w-[300px] transition-[opacity,scale] duration-300 ease-out-expo [@media(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:block ${
          active !== null ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="relative translate-x-6 -translate-y-1/2 border border-line bg-lifted p-1.5 shadow-[0_18px_44px_-22px_rgba(0,0,0,0.4)]">
          <div className="relative aspect-[4/3]">
            {PROJECTS.map((project, i) => (
              <div
                key={project.slug}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Plate project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol data-reveal-group className="mt-16 flex flex-col">
        {PROJECTS.map((project, i) => (
          <li key={project.slug} data-reveal-item>
            <a
              href={`#p-${project.slug}`}
              onClick={(e) => {
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
                  return;
                e.preventDefault();
                scrollToId(`p-${project.slug}`);
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group flex cursor-pointer items-baseline gap-5 border-t border-line-faint py-4 transition-colors duration-300 last:border-b hover:bg-raised/60 sm:gap-8"
            >
              <span className="mono-tag text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative min-w-0 truncate font-display text-xl font-semibold text-ink sm:text-2xl">
                {project.title}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 ease-out-expo group-hover:w-full"
                />
              </span>
              <span
                aria-hidden="true"
                className="hidden min-w-8 flex-1 border-b border-dashed border-line-faint sm:block"
              />
              <span className="mono-tag hidden shrink-0 text-ink/55 sm:block">
                {project.status}
              </span>
              <span
                aria-hidden="true"
                className="mono-tag shrink-0 text-ink/55 transition-[color,translate] duration-300 group-hover:translate-y-0.5 group-hover:text-accent"
              >
                ↓
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
