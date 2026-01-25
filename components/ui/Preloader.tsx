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
          className="relative z-10 w-full max-w-2xl" 
          viewBox="0 0 400 200" 
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
            
            {/* Pencil sketch effect - creates wobbly, hand-drawn look */}
            <filter id="pencil-sketch">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>

          {/* Glow background circle */}
          <circle
            id="name-glow"
            cx="200"
            cy="100"
            r="140"
            fill="none"
            stroke="rgba(255, 71, 87, 0.15)"
            strokeWidth="1"
            opacity="0"
            filter="url(#glow)"
          />

          {/* The sketchy "Caine" signature */}
          <path
            id="caine-path"
            d="M40 90
               Q45 40 70 40
               Q95 40 95 70
               Q95 95 75 95
               Q55 95 50 80

               M105 70
               q15 -20 30 0
               q10 15 22 0
               m-52 0
               q10 25 30 25
               q18 0 28 -18

               M175 70
               q12 -25 30 0
               q8 15 18 0
               m-48 0
               q10 25 30 25
               q20 0 28 -22

               M240 70
               q10 -20 26 0
               q5 8 11 0
               m-37 0
               q8 25 26 25
               q15 0 23 -20

               M295 70
               q12 -20 28 0
               q6 10 14 0
               m-42 0
               q10 26 30 26
               q18 0 26 -22
               q3 -8 3 -15"
            fill="none"
            stroke="#f4f1ea"
            strokeWidth="4"
            strokeDasharray="800"
            strokeDashoffset="800"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pencil-sketch)"
          />

          {/* Decorative underline with sketchy effect */}
          <path
            id="underline-path"
            d="M30 115 Q200 110 370 115"
            fill="none"
            stroke="#ff4757"
            strokeWidth="3"
            strokeDasharray="500"
            strokeDashoffset="500"
            strokeLinecap="round"
            filter="url(#pencil-sketch)"
          />

          {/* Left flourish circle */}
          <circle
            id="flourish-left"
            cx="15"
            cy="85"
            r="6"
            fill="none"
            stroke="#ff4757"
            strokeWidth="2"
            opacity="0"
            style={{ transform: "scale(0)", transformOrigin: "15px 85px" }}
          />

          {/* Right flourish circle */}
          <circle
            id="flourish-right"
            cx="385"
            cy="110"
            r="6"
            fill="none"
            stroke="#ff4757"
            strokeWidth="2"
            opacity="0"
            style={{ transform: "scale(0)", transformOrigin: "385px 110px" }}
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