"use client";

import { curvePath } from "@/lib/curve-path";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useScrollProgress } from "@/lib/use-scroll-progress";

type Dot = { x: number; y: number };
type Connection = { from: number; to: number; bend: number };

// Scattered "unconnected pencil marks" — later these become trades-map nodes.
const DOTS: Dot[] = [
  { x: 12, y: 20 },
  { x: 23, y: 55 },
  { x: 9, y: 80 },
  { x: 36, y: 12 },
  { x: 50, y: 88 },
  { x: 66, y: 16 },
  { x: 79, y: 50 },
  { x: 90, y: 26 },
  { x: 87, y: 82 },
];

// A few of the dots get connected as the reveal progresses.
const CONNECTIONS: Connection[] = [
  { from: 0, to: 1, bend: 4 },
  { from: 1, to: 2, bend: -3 },
  { from: 3, to: 5, bend: 5 },
  { from: 6, to: 7, bend: -4 },
  { from: 4, to: 8, bend: 3 },
];

// Extra scroll track the section is pinned across — the reveal plays out
// over this much scroll distance before the page moves on.
const SCROLL_TRACK_VH = 220;

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const wrapperRef = useScrollProgress<HTMLElement>(!reducedMotion);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={reducedMotion ? undefined : { height: `${SCROLL_TRACK_VH}vh` }}
    >
      <div
        className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6"
        style={reducedMotion ? undefined : { position: "sticky", top: 0 }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {CONNECTIONS.map((line, i) => (
            <path
              key={i}
              d={curvePath(DOTS[line.from], DOTS[line.to], line.bend)}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="0.3"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: reducedMotion ? 0 : "calc(1 - var(--p))",
                opacity: reducedMotion ? 0.65 : "calc(var(--p) * 0.65)",
              }}
            />
          ))}
        </svg>

        {/* Dots are plain elements (not SVG) so they stay circular regardless
            of the non-uniform SVG scaling used for the connecting lines. */}
        {DOTS.map((dot, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              opacity: reducedMotion ? 0.35 : "calc(0.12 + var(--p) * 0.23)",
            }}
          />
        ))}

        <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          <h1 className="font-structural text-2xl leading-snug text-ink sm:text-3xl">
            A jack of all trades is a master of none.
          </h1>

          <p
            className="mt-6 font-handwritten text-xl text-accent sm:text-2xl"
            style={{
              opacity: reducedMotion ? 1 : "var(--p)",
              transform: reducedMotion
                ? "translateY(0)"
                : "translateY(calc((1 - var(--p)) * 8px))",
            }}
          >
            ...but oftentimes better than a master of one.
          </p>

          <p
            className="mt-8 font-handwritten text-base text-ink/70"
            style={{
              opacity: reducedMotion ? 1 : "var(--p)",
              transform: reducedMotion
                ? "translateY(0)"
                : "translateY(calc((1 - var(--p)) * 6px))",
            }}
          >
            Caine Benoy.
          </p>
        </div>
      </div>
    </section>
  );
}
