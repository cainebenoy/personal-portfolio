"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true),
    });

    // Phase 1: Draw the signature stroke (sketchy pencil look)
    tl.to("#signature-path", {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.out",
    }, 0);

    // Phase 2: Pop the dot over the "i"
    tl.set("#signature-dot", { opacity: 0, scale: 0 }, 0);
    tl.to("#signature-dot", {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(2)",
    }, 2.2);

    // Phase 3: Soft glow
    tl.to("#name-glow", {
      opacity: 1,
      duration: 0.4,
    }, 1.8);

    // Phase 4: Expand/Fill to paper (Wipe effect)
    tl.to("#preloader-overlay", {
      scale: 60,
      duration: 0.9,
      ease: "power4.in",
    }, 3.0);

    // Phase 5: Fade Out container
    tl.to("#preloader-container", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    }, 3.5);

    // Phase 6: Set display none after fade
    tl.set("#preloader-container", {
      display: "none",
    }, 4.2);
  }, []);

  if (complete) return null;

  return (
    <div 
      id="preloader-container" 
      className="fixed inset-0 z-[9999] bg-ink flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* The expanding dot for the wipe effect */}
        <div id="preloader-overlay" className="absolute w-6 h-6 bg-paper rounded-full" />
        
        {/* Main SVG for the name animation */}
        <svg 
          className="relative z-10 w-full max-w-2xl"
          viewBox="0 0 600 260"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow and pencil sketch filters */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="pencil-texture">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
          </defs>

          {/* Glow background circle */}
          <circle
            id="name-glow"
            cx="300"
            cy="130"
            r="180"
            fill="none"
            stroke="rgba(255, 71, 87, 0.15)"
            strokeWidth="1"
            opacity="0"
            filter="url(#glow)"
          />

          {/* Sketchbook signature path (traced from provided photo) */}
          <path
            id="signature-path"
            d="M 90 220
               C 40 150, 60 60, 170 70
               C 250 80, 270 200, 190 210
               C 120 220, 100 160, 150 130

               M 220 170
               C 230 130, 280 120, 295 165
               C 300 200, 250 215, 235 185

               M 320 200
               C 330 150, 360 140, 365 180
               C 370 210, 330 220, 320 200

               M 400 200
               C 410 150, 450 145, 455 180
               C 460 220, 420 220, 410 195
               M 455 180
               C 470 140, 520 135, 525 185
               C 528 220, 485 230, 470 200

               M 550 200
               C 555 150, 600 140, 610 180
               C 620 240, 550 240, 545 190
               C 548 150, 600 150, 610 190"
            fill="none"
            stroke="var(--paper)"
            strokeWidth="5"
            strokeDasharray="1400"
            strokeDashoffset="1400"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pencil-texture)"
          />

          {/* Dot over the i */}
          <circle
            id="signature-dot"
            cx="340"
            cy="130"
            r="6"
            fill="var(--paper)"
            filter="url(#pencil-texture)"
          />
        </svg>

        {/* Status text */}
        <div className="absolute bottom-12 font-code text-xs text-paper/50 tracking-widest animate-pulse">
          LOADING_CANVAS...
        </div>
      </div>
    </div>
  );
}