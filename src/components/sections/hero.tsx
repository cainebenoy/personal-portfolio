"use client";

import { useEffect, useRef, useState } from "react";

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

// A few of the dots get connected once the reveal fires.
const CONNECTIONS: Connection[] = [
  { from: 0, to: 1, bend: 4 },
  { from: 1, to: 2, bend: -3 },
  { from: 3, to: 5, bend: 5 },
  { from: 6, to: 7, bend: -4 },
  { from: 4, to: 8, bend: 3 },
];

function curvePath(a: Dot, b: Dot, bend: number) {
  const midX = (a.x + b.x) / 2 + bend;
  const midY = (a.y + b.y) / 2 - bend;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
}

const REVEAL_DELAY_MS = 2500;
const SCROLL_THRESHOLD_PX = 24;

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const hasRevealed = useRef(false);

  useEffect(() => {
    const reveal = () => {
      if (hasRevealed.current) return;
      hasRevealed.current = true;
      setRevealed(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const timer = window.setTimeout(reveal, REVEAL_DELAY_MS);

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD_PX) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
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
              strokeDashoffset: revealed ? 0 : 1,
              opacity: revealed ? 0.65 : 0,
              transition: "stroke-dashoffset 600ms ease, opacity 600ms ease",
              transitionDelay: `${i * 100}ms`,
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
            opacity: revealed ? 0.35 : 0.12,
            transition: "opacity 900ms ease",
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
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          ...but oftentimes better than a master of one.
        </p>

        <p
          className="mt-8 font-handwritten text-base text-ink/70"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 700ms ease, transform 700ms ease",
            transitionDelay: "500ms",
          }}
        >
          Caine Benoy.
        </p>
      </div>
    </section>
  );
}
