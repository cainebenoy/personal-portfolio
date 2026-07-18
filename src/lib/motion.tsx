"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

// Sections that build bespoke scenes import gsap through here so plugin
// registration happens exactly once.
export { gsap, ScrollTrigger, useGSAP };

/* ----------------------------------------------------------------------------
   Lenis — eased momentum scrolling (wheel only; touch stays native). One
   instance owned by MotionProvider, shared through a module singleton so
   anchor navigation routes through the same easing.
---------------------------------------------------------------------------- */

let lenis: Lenis | null = null;

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
    return;
  }
  target.scrollIntoView({ behavior: "auto", block: "start" });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The console gets a page of the file too. Module-level flag so React's
// dev-mode double effect doesn't print it twice.
let consoleNoteLogged = false;

function logConsoleNote() {
  if (consoleNoteLogged) return;
  consoleNoteLogged = true;
  console.log(
    "%cCAINE BENOY — WORKING FILE%c\n" +
      "09 chapters · 6 trades · built by hand\n" +
      "Reading the source? The internals are documented at /colophon.\n" +
      "Hiring? projects@crav.world",
    "font-family: monospace; font-weight: bold; color: #b23b2e;",
    "font-family: monospace; color: #2e4a7a;",
  );
}

/* ----------------------------------------------------------------------------
   MotionProvider — mounts once in the root layout, after all sections, and
   drives every *generic* scroll behavior from data attributes so most
   sections can stay server components:

     data-mask          container: its .mask-line spans rise in, staggered
     data-reveal        element fades and rises when it enters
     data-reveal-group  container: [data-reveal-item] children stagger in
     data-rule          hairline draws from scale 0 (data-axis="y" for vertical)
     data-draw          container: .draw shapes (with pathLength=1) stroke in
     data-parallax="n"  drifts n percent over its traversal of the viewport
     data-counter       numeric text counts up from zero on entry

   Everything is SSR-visible by default; hidden states are only ever applied
   by GSAP at runtime, inside a prefers-reduced-motion media context — so
   no-JS and reduced-motion readers get the complete, static page.
---------------------------------------------------------------------------- */

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Scroll engine. Deliberately outside useGSAP: it isn't an animation, and
  // it must not be reverted by matchMedia context changes.
  useEffect(() => {
    logConsoleNote();
    if (prefersReducedMotion()) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const enter = (el: Element) => ({
        trigger: el,
        start: "top 86%",
        once: true,
      });

      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        const lines = el.querySelectorAll(".mask-line > span");
        if (!lines.length) return;
        gsap.fromTo(
          lines,
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 1.15,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: enter(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: parseFloat(el.dataset.revealDelay ?? "0"),
            scrollTrigger: enter(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((el) => {
        const items = el.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: enter(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        const vertical = el.dataset.axis === "y";
        gsap.fromTo(
          el,
          vertical ? { scaleY: 0 } : { scaleX: 0 },
          {
            [vertical ? "scaleY" : "scaleX"]: 1,
            transformOrigin: "left top",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: enter(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        const shapes = el.querySelectorAll(".draw");
        if (!shapes.length) return;
        gsap.fromTo(
          shapes,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.6,
            ease: "expo.out",
            stagger: 0.14,
            scrollTrigger: enter(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.parallax ?? "-10"),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        // SSR renders the final value; split it into number + suffix and
        // only zero it out at the moment the count actually starts.
        const raw = el.textContent ?? "";
        const match = raw.match(/^([\d,]+)(.*)$/);
        if (!match) return;
        const target = parseInt(match[1].replace(/,/g, ""), 10);
        const suffix = match[2];
        const state = { n: target };
        gsap.fromTo(
          state,
          { n: 0 },
          {
            n: target,
            duration: 1.6,
            ease: "power2.out",
            snap: { n: 1 },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = `${state.n.toLocaleString("en-US")}${suffix}`;
            },
          },
        );
      });
    });

    // Fraunces at display sizes shifts metrics enough to move pin points —
    // re-measure once the real fonts are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  });

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={400}>
      {children}
    </TooltipProvider>
  );
}
