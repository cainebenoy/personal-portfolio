"use client";

import { useRef } from "react";
import Glyph from "@/components/Glyph";
import { TRADES } from "@/content/trades";
import { gsap, useGSAP } from "@/lib/motion";

// Chapter 01 — the person first, the thesis second.
//
// The name sets at full display scale as the page opens (pure CSS, so the
// entrance plays even before JS). The family quote sits lower-right as a
// supporting line: a breath after the entrance, a brass stroke strikes
// through "master of none" and the correction warms into brass — the same
// edit as always, now performed on load instead of holding the scroll
// hostage. No pin here anymore; the page gets to the work sooner.
//
// Without JS (or with reduced motion) the finished state renders statically:
// struck through, corrected, complete.

// Deterministic placement for the six background glyphs — a loose orbit
// around the lockup. Parallax speeds are handled by the generic manager.
const FIELD = [
  { left: "38%", top: "12%", size: 64, speed: -14 },
  { left: "84%", top: "13%", size: 44, speed: -22 },
  { left: "91%", top: "55%", size: 78, speed: -10 },
  { left: "72%", top: "84%", size: 40, speed: -18 },
  { left: "14%", top: "82%", size: 56, speed: -12 },
  { left: "4%", top: "46%", size: 36, speed: -24 },
] as const;

const STRIKE_PATH = "M2 7.5 Q 26 4.5 52 6.5 T 98 5";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const strike = q<SVGPathElement>(".hero-strike");
      const struck = q(".hero-struck");
      const correction = q(".hero-correction");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hidden starting states are applied at runtime only — the
        // server-rendered page is the finished scene.
        gsap.set(strike, { drawSVG: "0%" });
        gsap.set(correction, { autoAlpha: 0 });

        gsap
          .timeline({ delay: 1.7 })
          .to(strike, {
            drawSVG: "100%",
            duration: 0.65,
            ease: "power2.inOut",
          })
          .to(struck, { opacity: 0.5, duration: 0.4 }, "<0.15")
          .to(
            correction,
            { autoAlpha: 1, duration: 0.9, ease: "power2.out" },
            ">-0.15",
          );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="thesis" ref={sectionRef} aria-label="Introduction">
      <div className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-24">
        {/* Background glyph field — the six trades, present from the first
            frame, faint until their chapter. */}
        <div aria-hidden="true" className="absolute inset-0">
          {FIELD.map((spot, i) => (
            <div
              key={TRADES[i].id}
              data-parallax={spot.speed}
              className="absolute text-ink/14"
              style={{
                left: spot.left,
                top: spot.top,
                width: spot.size,
                height: spot.size,
              }}
            >
              <Glyph
                id={TRADES[i].id}
                strokeWidth={0.9}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>

        <div className="px-page relative mx-auto w-full max-w-7xl">
          <p
            className="mono-tag hero-fade text-ink/50 [--fade-delay:150ms]"
          >
            Portfolio · Index of range · 2023–2026
          </p>

          <h1
            className="hero-rise mt-7 font-display text-[clamp(4.5rem,14.5vw,12.5rem)] leading-[0.88] tracking-[-0.03em] text-ink"
          >
            <span className="mask-line" style={{ "--line-i": 0 } as React.CSSProperties}>
              <span>Caine</span>
            </span>
            <span className="mask-line" style={{ "--line-i": 1 } as React.CSSProperties}>
              <span>
                Benoy<span className="text-brass">.</span>
              </span>
            </span>
          </h1>

          <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="hero-fade lg:col-span-5 [--fade-delay:750ms]">
              <p className="max-w-md text-lg leading-8 text-ink/75">
                Product engineer and generalist in Kerala, India. I pick up
                whichever trade the problem needs: AI, blockchain, hardware,
                web, community ops.
              </p>
              <p className="mono-tag mt-6 flex items-center gap-3 text-ink/55">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brass"
                />
                Open to work · graduating 2026
              </p>
              <p className="mono-tag mt-2.5 text-ink/45">
                Currently · Junior Product Engineer, CRAV
              </p>
            </div>

            {/* The family motto, and the edit it deserves. */}
            <blockquote
              className="hero-fade self-end lg:col-span-6 lg:col-start-7 [--fade-delay:1050ms]"
            >
              <p
                className="max-w-md font-display text-[clamp(1.3rem,2.1vw,1.65rem)] leading-[1.5] text-ink/80 italic"
                style={{ fontVariationSettings: '"SOFT" 55, "WONK" 1' }}
              >
                &ldquo;A jack of all trades is a{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="hero-struck">master of none</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    className="absolute top-1/2 -left-[2%] h-[0.4em] w-[104%] -translate-y-1/2"
                  >
                    {/* Stroke width is in viewBox units — the non-uniform
                        stretch renders it as a marker-weight line. */}
                    <path
                      d={STRIKE_PATH}
                      className="hero-strike"
                      fill="none"
                      stroke="var(--color-brass)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="hero-correction text-brass-bright">
                  , but oftentimes better than a master of one.&rdquo;
                </span>
              </p>
            </blockquote>
          </div>
        </div>

        <div className="hero-fade px-page absolute inset-x-0 bottom-8 flex items-end justify-end [--fade-delay:1300ms]">
          <div className="flex items-center gap-3">
            <span className="mono-tag text-ink/40">Scroll</span>
            <span
              aria-hidden="true"
              className="block h-10 w-px bg-gradient-to-b from-brass to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
