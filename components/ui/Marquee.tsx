"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const firstText = useRef<HTMLDivElement>(null);
  const secondText = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      }
      if (xPercent > 0) {
        xPercent = -100;
      }
      
      if(firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercent });
        gsap.set(secondText.current, { xPercent: xPercent });
      }
      
      xPercent += 0.05 * direction;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative z-0 flex overflow-hidden border-y-2 border-ink bg-highlight py-2 text-white mix-blend-multiply opacity-80">
      <div ref={slider} className="relative whitespace-nowrap">
        <p ref={firstText} className="m-0 pr-12 font-display text-4xl">
          FULL STACK • CREATIVE DEV • BLOCKCHAIN • COMMUNITY • DESIGN • SLEEP IS FOR THE WEAK • 
        </p>
        <p ref={secondText} className="absolute left-full top-0 m-0 pr-12 font-display text-4xl">
          FULL STACK • CREATIVE DEV • BLOCKCHAIN • COMMUNITY • DESIGN • SLEEP IS FOR THE WEAK • 
        </p>
      </div>
    </div>
  );
}