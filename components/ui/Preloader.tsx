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
          viewBox="0 0 350 150"
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
            cx="175"
            cy="75"
            r="120"
            fill="none"
            stroke="rgba(255, 71, 87, 0.15)"
            strokeWidth="1"
            opacity="0"
            filter="url(#glow)"
          />

          {/* Sketchbook signature path */}
          <path
            id="signature-path"
            d="M 60 40 
               C 30 20, 10 50, 30 80 
               C 40 95, 65 95, 75 80 
               C 85 65, 95 65, 90 80 
               C 85 95, 105 95, 110 80 
               L 110 65 
               L 110 80 
               C 115 65, 125 65, 125 80 
               C 130 65, 140 65, 140 80 
               C 145 65, 160 55, 165 70 
               C 170 85, 155 85, 180 85"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeDasharray="450"
            strokeDashoffset="450"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pencil-texture)"
          />

          {/* Dot over the i */}
          <circle
            id="signature-dot"
            cx="110"
            cy="50"
            r="3"
            fill="var(--ink)"
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