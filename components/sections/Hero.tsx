"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Fallback: ensure text is visible even if GSAP bails
    const nodes = el.querySelectorAll<HTMLElement>(".reveal-text");
    nodes.forEach((n) => {
      n.style.opacity = "1";
      n.style.transform = "translateY(0)";
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-text",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center relative z-10"
    >
      {/* Introduction Badge */}
      <div className="font-hand text-2xl md:text-4xl text-gray-500 mb-6 rotate-[-3deg] inline-block reveal-text">
        Generalist | SOF Insider | TinkerHub Lead
      </div>

      {/* Main Title */}
      <h1 className="font-display text-6xl md:text-9xl leading-[0.9] mix-blend-multiply text-ink">
        <div className="overflow-hidden">
          <span className="inline-block hover:skew-x-12 transition-transform duration-500 reveal-text">
            CAINE
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="inline-block text-gray-800 reveal-text">BENOY</span>
        </div>
      </h1>

      {/* Subtitle */}
      <p className="font-sans text-lg md:text-xl mt-8 max-w-xl mx-auto leading-relaxed text-gray-700 reveal-text">
        Building at the intersection of AI, Blockchain, and Community.
        <span className="font-marker text-xl md:text-2xl text-highlight block mt-4 rotate-[2deg]">
          A jack of all trades... better than a master of one.
        </span>
      </p>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 animate-bounce font-hand text-gray-400 reveal-text">
        Scratch the paper to verify reality &darr;
      </div>
    </section>
  );
}