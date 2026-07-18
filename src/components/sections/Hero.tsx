"use client";

import Image from "next/image";
import { useRef } from "react";
import AvatarSequence from "@/components/AvatarSequence";
import Glyph from "@/components/Glyph";
import { TRADES } from "@/content/trades";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion";

// Chapter 01 — the person, on the working sheet.
//
// The name sets at display scale as the page opens (pure CSS, so the
// entrance plays even before JS), with the portrait mounted beside it like
// a print clipped to the sheet. The family quote sits under the name as a
// typed line: a breath after the entrance, the red pen strikes "master of
// none" and writes the correction — on load, not holding the scroll.
//
// Without JS (or with reduced motion) the finished state renders statically:
// struck through, corrected, complete.

// Deterministic placement for the six background glyphs — a loose orbit
// around the lockup. Parallax speeds are handled by the generic manager.
const FIELD = [
  { left: "38%", top: "11%", size: 64, speed: -14 },
  { left: "88%", top: "9%", size: 44, speed: -22 },
  { left: "93%", top: "60%", size: 78, speed: -10 },
  { left: "66%", top: "86%", size: 40, speed: -18 },
  { left: "12%", top: "86%", size: 56, speed: -12 },
  { left: "3%", top: "42%", size: 36, speed: -24 },
] as const;

const STRIKE_PATH = "M2 7.5 Q 26 4.5 52 6.5 T 98 5";

// How much scroll the pinned hero holds while the tape rolls — the page
// doesn't move on until the sequence has played through.
const SEQUENCE_TRACK = "+=130%";

export default function Hero({
  portraitSrc,
  sequenceFrames = 0,
}: {
  portraitSrc?: string;
  /** Frame count of public/avatar-sequence — 0 falls back to the still. */
  sequenceFrames?: number;
}) {
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
            ">-0.1",
          );

      });

      // Hold the page while the tape rolls — desktop only: the stacked
      // mobile hero is taller than one viewport, so pinning would clip it.
      // The sequence scrub itself runs at every size over the same track.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (sequenceFrames === 0) return;
          const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: SEQUENCE_TRACK,
            pin: ".hero-stage",
            anticipatePin: 1,
          });
          return () => st.kill();
        },
      );
    },
    { scope: sectionRef, dependencies: [sequenceFrames] },
  );

  return (
    <section id="thesis" ref={sectionRef} aria-label="Introduction">
      <div className="hero-stage relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-24">
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
          <p className="mono-tag hero-fade text-ink/65 [--fade-delay:150ms]">
            Portfolio · Index of range · 2023–2026
          </p>

          <div className="mt-7 grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="hero-rise font-display text-[clamp(3.9rem,11.5vw,10.5rem)] leading-[0.95] text-ink">
                <span
                  className="mask-line"
                  style={{ "--line-i": 0 } as React.CSSProperties}
                >
                  <span>Caine</span>
                </span>
                <span
                  className="mask-line"
                  style={{ "--line-i": 1 } as React.CSSProperties}
                >
                  <span>
                    Benoy<span className="text-red">.</span>
                  </span>
                </span>
              </h1>

              <div className="hero-fade [--fade-delay:750ms]">
                <p className="mt-8 max-w-md text-lg leading-8 text-ink/75">
                  Product engineer and generalist in Kerala, India. I pick up
                  whichever trade the problem needs: AI, blockchain, hardware,
                  web, community ops.
                </p>
                <p className="mono-tag mt-6 flex items-center gap-3 text-ink/70">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-red"
                  />
                  <span className="highlight">Open to work · graduating 2026</span>
                </p>
                <p className="mono-tag mt-2.5 text-ink/60">
                  Currently · Junior Product Engineer, CRAV
                </p>
              </div>

              {/* The family motto, and the edit the red pen owes it. */}
              <blockquote className="hero-fade mt-12 [--fade-delay:1050ms]">
                <p className="max-w-lg font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.3] text-ink/85">
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
                        stroke="var(--color-red)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="hero-correction text-red">
                    , but oftentimes better than a master of one.&rdquo;
                  </span>
                </p>
              </blockquote>
            </div>

            {/* The figure on the sheet: background-removed cutout frames
                scrubbed by scroll — no mount, no frame, the person stands
                straight on the graph paper. Falls back to the taped still
                from public/images/portrait.jpg when no frames exist. */}
            {sequenceFrames > 0 ? (
              <figure className="hero-fade w-full lg:col-span-5 lg:col-start-8 lg:self-end [--fade-delay:550ms]">
                <div className="relative mx-auto aspect-[9/16] h-[70svh] max-w-full grayscale transition-[filter] duration-700 ease-out hover:grayscale-0 lg:h-[84svh]">
                  <AvatarSequence
                    frameCount={sequenceFrames}
                    end={SEQUENCE_TRACK}
                    className="absolute inset-0"
                  />
                </div>
                <figcaption className="mt-2 flex items-baseline justify-center gap-4">
                  <span className="mono-tag text-red">Fig. 01</span>
                  <span className="mono-tag text-ink/70">LUFTETAR 2026, on stage</span>
                </figcaption>
              </figure>
            ) : portraitSrc ? (
              <figure className="hero-fade w-full max-w-sm -rotate-[0.9deg] lg:col-span-4 lg:col-start-9 lg:max-w-none lg:self-center [--fade-delay:550ms]">
                <div className="relative border border-line bg-raised p-3">
                  {/* Taped to the sheet. */}
                  <span
                    aria-hidden="true"
                    className="tape -top-3 -left-7 -rotate-[38deg]"
                  />
                  <span
                    aria-hidden="true"
                    className="tape -right-7 -bottom-3 -rotate-[40deg]"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden grayscale transition-[filter] duration-700 ease-out hover:grayscale-0">
                    <div
                      data-parallax="-5"
                      className="absolute inset-x-0 -inset-y-[6%]"
                    >
                      <Image
                        src={portraitSrc}
                        alt="Caine Benoy"
                        fill
                        priority
                        sizes="(max-width: 1024px) 84vw, 30vw"
                        className="object-cover"
                        style={{ objectPosition: "center 32%" }}
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="mt-3 flex items-baseline gap-4">
                  <span className="mono-tag text-red">Fig. 01</span>
                  <span className="mono-tag text-ink/70">
                    The operator, on record
                  </span>
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>

        <div className="hero-fade px-page absolute inset-x-0 bottom-8 flex items-end justify-end [--fade-delay:1300ms]">
          <div className="flex items-center gap-3">
            <span className="mono-tag text-ink/55">Scroll</span>
            <span
              aria-hidden="true"
              className="block h-10 w-px bg-gradient-to-b from-red to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
