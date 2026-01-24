"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Avatar from "@/components/ui/Avatar"; // Import Added

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
      className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left relative z-10 gap-12"
    >
      {/* Avatar Column */}
      <div className="relative order-1 md:order-2 reveal-text">
        <Avatar />
      </div>

      {/* Text Column */}
      <div className="order-2 md:order-1 flex flex-col items-center md:items-start">
        {/* Introduction Badge */}
        <div className="font-hand text-2xl md:text-4xl text-gray-500 mb-6 rotate-[-3deg] inline-block reveal-text bg-paper px-2">
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
            <span className="inline-block text-gray-800 reveal-text relative">
              BENOY
              <svg className="absolute -bottom-4 left-0 w-full h-8 pointer-events-none overflow-visible">
                <path className="doodle-path" d="M0,10 Q100,20 200,5 T400,10" />
              </svg>
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-lg md:text-xl mt-8 max-w-2xl leading-relaxed text-gray-700 reveal-text">
          I&apos;m a generalist Computer Science student who loves building at the intersection of AI, automation, and whatever domain the problem lives in. I move fluidly across projects, from AI-based exam evaluation tools to hands-on hackathon prototypes and community-first tech initiatives.
          <span className="font-marker text-xl md:text-2xl text-highlight block mt-4 rotate-[2deg]">
            Whether it&apos;s backend logic, quick prototypes, or stitching together tools—I ship working solutions.
          </span>
        </p>
      </div>
    </section>
  );
}