"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollPencil() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  // Smooth out the scroll value
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll to vertical percentage (stop slightly before bottom)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "85vh"]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* The Line Container */}
      <div className="fixed top-0 right-[20px] h-full w-[2px] bg-gray-200 z-40 hidden md:block">
        {/* The Drawn Ink */}
        <motion.div 
          className="absolute top-0 left-0 w-full bg-ink origin-top"
          style={{ height: "100%", scaleY }}
        />
      </div>

      {/* The Pencil */}
      <motion.div
        className="fixed top-0 right-[2px] z-50 hidden md:block pointer-events-none"
        style={{ y }}
      >
        <svg 
          width="50" 
          height="50" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-ink -rotate-45 drop-shadow-md"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" fill="var(--paper)" />
        </svg>
      </motion.div>
    </>
  );
}