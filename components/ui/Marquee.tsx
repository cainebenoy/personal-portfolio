"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const firstText = useRef<HTMLDivElement>(null);
  const secondText = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (xPercent.current <= -100) {
        xPercent.current = 0;
      }
      if (xPercent.current > 0) {
        xPercent.current = -100;
      }
      
      if(firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercent.current });
        gsap.set(secondText.current, { xPercent: xPercent.current });
      }
      
      xPercent.current += 0.05 * direction.current;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative z-0 flex overflow-hidden border-y-2 border-ink bg-highlight py-1 sm:py-2 text-white mix-blend-multiply opacity-80">
      <div ref={slider} className="relative whitespace-nowrap">
        <p ref={firstText} className="m-0 pr-6 sm:pr-12 font-display text-lg sm:text-2xl md:text-4xl">
          FULL STACK • CREATIVE DEV • BLOCKCHAIN • COMMUNITY • DESIGN • SHIP IT • 
        </p>
        <p ref={secondText} className="absolute left-full top-0 m-0 pr-6 sm:pr-12 font-display text-lg sm:text-2xl md:text-4xl">
          FULL STACK • CREATIVE DEV • BLOCKCHAIN • COMMUNITY • DESIGN • SHIP IT • 
        </p>
      </div>
    </div>
  );
}