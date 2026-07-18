"use client";

import { useRef } from "react";
import Glyph from "@/components/Glyph";
import SectionHeader from "@/components/SectionHeader";
import { PROJECTS } from "@/content/projects";
import { TRADES } from "@/content/trades";
import { gsap, useGSAP } from "@/lib/motion";

// Chapter 03 — the legend. The six trades are laid out as one list; on
// desktop the section pins and scroll moves a "current" state down the
// list, drawing each glyph as its trade takes focus, while the big roman
// numeral on the left keeps count. The list itself is ordinary, complete
// markup — no JS, reduced motion, and mobile all read it as a plain page.
export default function Range() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const rows = q<HTMLElement>(".range-row");
      const romans = q<HTMLElement>(".range-roman");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(rows, { autoAlpha: 0.24 });
        gsap.set(romans[0], { autoAlpha: 1 });
        rows.forEach((row) =>
          gsap.set(row.querySelectorAll(".draw"), { drawSVG: "0%" }),
        );

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=320%",
            pin: ".range-pin",
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        rows.forEach((row, i) => {
          const at = i; // one scrub-beat per trade
          tl.to(row, { autoAlpha: 1, duration: 0.35 }, at);
          tl.to(
            row.querySelectorAll(".draw"),
            { drawSVG: "100%", duration: 0.5, stagger: 0.08 },
            at + 0.05,
          );
          if (i > 0) {
            tl.to(rows[i - 1], { autoAlpha: 0.24, duration: 0.35 }, at);
            tl.to(romans[i - 1], { autoAlpha: 0, duration: 0.2 }, at);
            tl.to(romans[i], { autoAlpha: 1, duration: 0.2 }, at + 0.1);
          }
        });
        // A beat of rest on the last trade before the pin releases.
        tl.to({}, { duration: 0.5 });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        rows.forEach((row) => {
          const shapes = row.querySelectorAll(".draw");
          gsap.fromTo(
            row,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 85%", once: true },
            },
          );
          gsap.fromTo(
            shapes,
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 1.3,
              ease: "expo.out",
              stagger: 0.1,
              scrollTrigger: { trigger: row, start: "top 80%", once: true },
            },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="range" ref={sectionRef} aria-label="Range — the six trades">
      <div className="range-pin px-page flex min-h-svh items-center py-24 lg:py-0 lg:pt-16">
        <div className="mx-auto grid w-full max-w-7xl gap-x-16 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="range"
              lines={["Six trades,", "one operator."]}
              titleClassName="text-[clamp(2.4rem,3.3vw,3.2rem)]"
              note="The legend for everything that follows — every build on this page draws on at least two of these."
            />
            {/* The count-keeper: stacked roman numerals, one lit at a time
                by the scrub. Desktop-only flourish — opacity is owned by the
                timeline, so they start hidden and stay hidden without it. */}
            <div
              aria-hidden="true"
              className="relative mt-12 hidden h-28 lg:block"
            >
              {TRADES.map((trade) => (
                <span
                  key={trade.id}
                  className="range-roman absolute top-0 left-0 font-display text-[7rem] leading-none text-brass/85 opacity-0"
                >
                  {trade.numeral}
                </span>
              ))}
            </div>
          </div>

          <ol className="flex flex-col lg:col-span-8">
            {TRADES.map((trade) => {
              const applied = PROJECTS.filter((p) =>
                p.trades.includes(trade.id),
              );
              return (
                <li
                  key={trade.id}
                  className="range-row flex items-start gap-6 border-t border-line-faint py-5 last:border-b sm:gap-8 lg:py-4"
                >
                  <div className="mt-1 h-10 w-10 shrink-0 text-brass sm:h-12 sm:w-12">
                    <Glyph id={trade.id} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[clamp(1.5rem,2.2vw,1.9rem)] leading-tight text-ivory">
                      {trade.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-ivory/60">
                      {trade.line}
                    </p>
                    <p className="mono-tag mt-2 truncate text-ivory/40">
                      {applied.map((p) => p.title).join("  ·  ")}
                    </p>
                  </div>
                  <span className="mono-tag mt-2 shrink-0 text-ivory/35">
                    {trade.numeral}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
