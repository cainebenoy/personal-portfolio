"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true),
    });

    // 1. Scribble Animation (SVG Path)
    // Simulating a chaotic scribble filling the screen
    tl.to("#scribble-path", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // 2. Expand/Fill to White (Wipe)
    tl.to("#preloader-overlay", {
      scale: 50,
      duration: 0.8,
      ease: "power4.in",
      delay: 0.2,
    });

    // 3. Fade Out container
    tl.to("#preloader-container", {
      opacity: 0,
      duration: 0.5,
      display: "none",
    });
  }, []);

  if (complete) return null;

  return (
    <div 
        id="preloader-container" 
        className="fixed inset-0 z-[9999] bg-ink flex items-center justify-center overflow-hidden"
    >
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* The expanding dot for the wipe effect */}
            <div id="preloader-overlay" className="absolute w-4 h-4 bg-paper rounded-full" />
            
            <svg className="w-full h-full relative z-10" viewBox="0 0 200 200">
                <path 
                    id="scribble-path"
                    d="M 20 100 Q 50 10 90 100 T 180 100 T 90 180 T 20 100 T 100 20 T 180 100" 
                    fill="none" 
                    stroke="#f4f1ea" 
                    strokeWidth="4" 
                    strokeDasharray="1000" 
                    strokeDashoffset="1000"
                    strokeLinecap="round"
                />
            </svg>

            <div className="absolute bottom-0 font-code text-xs text-paper/50 tracking-widest animate-pulse">
                SHARPENING_PENCILS...
            </div>
        </div>
    </div>
  );
}