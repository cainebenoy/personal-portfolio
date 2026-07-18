"use client";

import { useRef } from "react";
import Glyph from "@/components/Glyph";
import { TRADES } from "@/content/trades";
import { gsap, useGSAP } from "@/lib/motion";

// Chapter 01 — the thesis, staged in two movements.
//
// Movement one plays on load as pure CSS: the statement rises line by line
// out of masks ("A jack of all trades / is a master of none.").
//
// Movement two belongs to the scroll: on desktop the scene pins while a
// brass stroke strikes through "master of none." and the correction sets
// itself in italic underneath — the reader performs the edit by scrolling.
// On mobile the correction plays as a timed sequence instead of a pin.
//
// Without JS (or with reduced motion) the finished state renders statically:
// struck through, corrected, complete.

// Deterministic placement for the six background glyphs — a loose orbit
// around the lockup, each with its own drift speed for the scrub.
const FIELD = [
  { left: "8%", top: "18%", size: 64, drift: -70 },
  { left: "84%", top: "14%", size: 44, drift: -110 },
  { left: "91%", top: "58%", size: 78, drift: -50 },
  { left: "72%", top: "82%", size: 40, drift: -90 },
  { left: "16%", top: "78%", size: 56, drift: -60 },
  { left: "4%", top: "48%", size: 36, drift: -120 },
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
      const glyphs = q(".hero-glyph");
      const lockup = q(".hero-lockup");
      const meta = q(".hero-meta");
      const cue = q(".hero-cue");

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };

          // Hidden starting states are applied here, at runtime only — the
          // server-rendered page is the finished scene.
          gsap.set(strike, { drawSVG: "0%" });
          gsap.set(correction, { autoAlpha: 0, y: 26 });

          if (desktop) {
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=115%",
                pin: ".hero-stage",
                scrub: 0.6,
                anticipatePin: 1,
              },
            });

            tl.to(strike, { drawSVG: "100%", duration: 0.28 }, 0.06)
              .to(struck, { opacity: 0.45, duration: 0.2 }, 0.14)
              .to(cue, { autoAlpha: 0, duration: 0.08 }, 0.02)
              .to(
                correction,
                { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" },
                0.4,
              )
              .to(lockup, { y: "-5vh", duration: 0.45 }, 0.55)
              .to(meta, { autoAlpha: 0, duration: 0.25 }, 0.7);

            glyphs.forEach((el, i) => {
              tl.to(el, { y: FIELD[i].drift, duration: 1 }, 0);
            });
          } else {
            // One breath after the entrance, the edit performs itself.
            gsap
              .timeline({ delay: 1.6 })
              .to(strike, {
                drawSVG: "100%",
                duration: 0.7,
                ease: "power2.inOut",
              })
              .to(struck, { opacity: 0.45, duration: 0.4 }, "<0.2")
              .to(
                correction,
                { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
                ">-0.1",
              );
          }
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="thesis" ref={sectionRef} aria-label="Thesis">
      <div className="hero-stage relative flex min-h-svh flex-col justify-center overflow-hidden">
        {/* Background glyph field — the six trades, present from the first
            frame, faint until their chapter. */}
        <div aria-hidden="true" className="absolute inset-0">
          {TRADES.map((trade, i) => (
            <div
              key={trade.id}
              className="hero-glyph absolute text-ivory/14"
              style={{
                left: FIELD[i].left,
                top: FIELD[i].top,
                width: FIELD[i].size,
                height: FIELD[i].size,
              }}
            >
              <Glyph id={trade.id} strokeWidth={0.9} className="h-full w-full" />
            </div>
          ))}
        </div>

        <div className="hero-meta px-page hero-fade absolute inset-x-0 top-24 flex items-baseline justify-between [--fade-delay:1100ms]">
          <p className="mono-tag text-ivory/50">
            Portfolio — index of range
          </p>
          <p className="mono-tag hidden text-ivory/35 sm:block">2023 → 2026</p>
        </div>

        <div className="hero-lockup px-page relative">
          <h1
            className="hero-rise max-w-[15ch] font-display text-[clamp(2.85rem,9vw,8rem)] leading-[0.97] tracking-[-0.02em] text-ivory"
          >
            <span className="mask-line" style={{ "--line-i": 0 } as React.CSSProperties}>
              <span>A jack of all trades</span>
            </span>
            <span className="mask-line" style={{ "--line-i": 1 } as React.CSSProperties}>
              <span>
                is a{" "}
                <span className="relative inline-block">
                  <span className="hero-struck">master of none.</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    className="absolute top-1/2 -left-[2%] h-[0.36em] w-[104%] -translate-y-1/2"
                  >
                    {/* Stroke width is in viewBox units — the non-uniform
                        stretch renders it as a marker-weight line. */}
                    <path
                      d={STRIKE_PATH}
                      className="hero-strike"
                      fill="none"
                      stroke="var(--color-brass)"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </span>
          </h1>

          <p
            className="hero-correction mt-9 max-w-[36ch] font-display text-[clamp(1.4rem,3.2vw,2.6rem)] leading-[1.25] text-brass-bright italic"
            style={{ fontVariationSettings: '"SOFT" 55, "WONK" 1' }}
          >
            …but oftentimes better than a master of one.
          </p>
        </div>

        <div className="hero-meta px-page hero-fade absolute inset-x-0 bottom-9 flex items-end justify-between [--fade-delay:1250ms]">
          <p className="mono-tag text-ivory/50">
            Caine Benoy — product engineer
            <span className="hidden sm:inline"> &amp; generalist</span>
          </p>
          <div className="hero-cue flex items-center gap-3">
            <span className="mono-tag text-ivory/40">Scroll</span>
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
