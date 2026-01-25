"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true),
    });

    // Phase 1: Animate the name "Caine" being drawn (1.8s)
    tl.to("#caine-path", {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power1.inOut",
    }, 0);

    // Phase 2: Animate the decorative underline (0.6s, starts after name)
    tl.to("#underline-path", {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 1.5);

    // Phase 3: Glow effect (fade in the glow)
    tl.to("#name-glow", {
      opacity: 1,
      duration: 0.4,
    }, 1.8);

    // Phase 4: Small flourish circles animation
    tl.to("#flourish-left", {
      opacity: 1,
      scale: 1,
      duration: 0.4,
    }, 1.8);

    tl.to("#flourish-right", {
      opacity: 1,
      scale: 1,
      duration: 0.4,
    }, 1.9);

    // Phase 5: Subtle pulse on the name
    tl.to("#caine-path", {
      filter: "drop-shadow(0 0 8px rgba(255, 71, 87, 0.6))",
      duration: 0.5,
    }, 2.2);

    tl.to("#caine-path", {
      filter: "drop-shadow(0 0 4px rgba(255, 71, 87, 0.3))",
      duration: 0.5,
    }, 2.7);

    // Phase 6: Expand/Fill to paper (Wipe effect)
    tl.to("#preloader-overlay", {
      scale: 60,
      duration: 0.9,
      ease: "power4.in",
    }, 3.0);

    // Phase 7: Fade Out container
    tl.to("#preloader-container", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    }, 3.5);

    // Phase 8: Set display none after fade
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
          className="relative z-10 w-96 h-48" 
          viewBox="0 0 600 300" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Glow effect filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow background circle */}
          <circle
            id="name-glow"
            cx="300"
            cy="150"
            r="180"
            fill="none"
            stroke="rgba(255, 71, 87, 0.15)"
            strokeWidth="1"
            opacity="0"
            filter="url(#glow)"
          />

          {/* The name "Caine" in beautiful cursive/script style */}
          <path
            id="caine-path"
            d="M 80 180 Q 95 80 140 100 Q 160 110 170 140 Q 175 160 165 170 Q 150 180 135 165 Q 125 155 130 140 M 170 100 L 185 170 M 185 100 L 200 170 Q 210 180 225 170 L 225 100 M 245 170 Q 245 80 290 80 Q 320 80 330 110 Q 335 130 320 160 Q 305 175 280 175 Q 250 175 245 150 M 350 170 Q 350 80 385 100 Q 410 115 420 160 L 350 140"
            fill="none"
            stroke="#f4f1ea"
            strokeWidth="6"
            strokeDasharray="800"
            strokeDashoffset="800"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Decorative underline */}
          <path
            id="underline-path"
            d="M 70 200 Q 300 190 530 200"
            fill="none"
            stroke="#ff4757"
            strokeWidth="3"
            strokeDasharray="500"
            strokeDashoffset="500"
            strokeLinecap="round"
          />

          {/* Left flourish circle */}
          <circle
            id="flourish-left"
            cx="50"
            cy="140"
            r="8"
            fill="none"
            stroke="#ff4757"
            strokeWidth="2"
            opacity="0"
            style={{ transform: "scale(0)", transformOrigin: "50px 140px" }}
          />

          {/* Right flourish circle */}
          <circle
            id="flourish-right"
            cx="550"
            cy="160"
            r="8"
            fill="none"
            stroke="#ff4757"
            strokeWidth="2"
            opacity="0"
            style={{ transform: "scale(0)", transformOrigin: "550px 160px" }}
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