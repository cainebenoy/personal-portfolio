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

    // Phase 5: Make wipe overlay visible and position it at the i-dot
    tl.set("#wipe-overlay", {
      opacity: 1,
    }, 2.0);

    // Phase 6: Expand the wipe overlay to fill screen (creates zoom-in effect)
    tl.to("#wipe-overlay", {
      width: "300vw",
      height: "300vh",
      duration: 1.2,
      ease: "power4.in",
    }, 2.0);

    // Phase 7: Fade out the entire preloader
    tl.to("#preloader-container", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 2.8);

    // Phase 8: Set display none after fade
    tl.set("#preloader-container", {
      display: "none",
    }, 3.8);

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
            style={{
              // Hide the default dot on 'i' character
              textRendering: 'optimizeLegibility',
            }}
          >
            <span className="relative inline-block">
              {displayText.split('').map((char, index) => (
                <span 
                  key={index}
                  className={char.toLowerCase() === 'i' ? 'relative' : ''}
                  style={char.toLowerCase() === 'i' ? {
                    position: 'relative',
                    display: 'inline-block',
                  } : {}}
                >
                  {char.toLowerCase() === 'i' ? (
                    <>
                      {/* Render 'i' without the dot */}
                      <span style={{ 
                        display: 'inline-block',
                        position: 'relative',
                      }}>
                        ı
                      </span>
                      {/* Custom dot that will expand */}
                      <span 
                        id="i-dot"
                        className="absolute bg-paper rounded-full"
                        style={{ 
                          width: '0.18em',
                          height: '0.18em',
                          left: '50%',
                          top: '0.05em',
                          transform: 'translateX(-50%)',
                          zIndex: 9999,
                        }}
                      />
                    </>
                  ) : char}
                </span>
              ))}
            </span>
            <span 
              ref={cursorRef}
              className="inline-block w-1 h-24 bg-highlight ml-2 align-middle"
            />
          </h1>
        </div>

        {/* Expanding dot overlay for wipe effect */}
        <div 
          id="wipe-overlay"
          className="absolute bg-paper rounded-full pointer-events-none"
          style={{
            width: '1px',
            height: '1px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9998,
            opacity: 0,
          }}
        />

        {/* Status text */}
        <div className="absolute bottom-12 font-code text-xs text-paper/50 tracking-widest animate-pulse">
          LOADING_CANVAS...
        </div>
      </div>
    </div>
  );
}