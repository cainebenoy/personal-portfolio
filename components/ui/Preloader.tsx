"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const name = "Caine";
    const tl = gsap.timeline({
      onComplete: () => setComplete(true),
    });

    // Phase 1: Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= name.length) {
        setDisplayText(name.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    // Phase 2: Cursor blink animation
    if (cursorRef.current) {
      tl.to(cursorRef.current, {
        opacity: 0,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }, 0);
    }

    // Phase 3: Stop cursor blink and fade it out
    tl.to(cursorRef.current, {
      opacity: 0,
      duration: 0.3,
    }, 1.5);

    // Phase 4: Scale up text slightly
    tl.to("#typed-name", {
      scale: 1.1,
      duration: 0.4,
      ease: "back.out(1.5)",
    }, 1.2);

    // Phase 5: Expand the i-dot to fill screen (Wipe effect)
    tl.to("#i-dot", {
      scale: 60,
      duration: 0.9,
      ease: "power4.in",
    }, 2.0);

    // Phase 6: Fade Out container
    tl.to("#preloader-container", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    }, 2.5);

    // Phase 7: Set display none after fade
    tl.set("#preloader-container", {
      display: "none",
    }, 3.2);

    return () => clearInterval(typingInterval);
  }, []);

  if (complete) return null;

  return (
    <div 
      id="preloader-container" 
      className="fixed inset-0 z-[9999] bg-ink flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Typing animation */}
        <div className="relative z-10 flex items-center justify-center">
          <h1 
            id="typed-name" 
            className="font-display text-8xl text-paper tracking-wide relative"
          >
            {displayText.split('').map((char, index) => (
              <span 
                key={index} 
                className="relative inline-block"
              >
                {char}
                {/* Dot over the 'i' that will expand */}
                {char.toLowerCase() === 'i' && (
                  <span 
                    id="i-dot"
                    className="absolute left-1/2 -translate-x-1/2 -top-4 w-3 h-3 bg-paper rounded-full"
                  />
                )}
              </span>
            ))}
            <span 
              ref={cursorRef}
              className="inline-block w-1 h-24 bg-highlight ml-2 align-middle"
            />
          </h1>
        </div>

        {/* Status text */}
        <div className="absolute bottom-12 font-code text-xs text-paper/50 tracking-widest animate-pulse">
          LOADING_CANVAS...
        </div>
      </div>
    </div>
  );
}