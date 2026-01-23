"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Move cursor - INSTANT MOVEMENT FIX
    const onMouseMove = (e: MouseEvent) => {
      // Using .set() instead of .to() removes the tween delay entirely
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Detect hoverables
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".magnetic") ||
        target.closest(".project-card");

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Fixed: Removed transition-all which was causing the position update to lag.
      // Now explicitly transitioning only visual properties (size, color, border).
      className={`fixed top-0 left-0 w-3 h-3 bg-ink rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,border-width] duration-200 ${
        isHovering ? "w-10 h-10 bg-transparent border-2 border-highlight" : ""
      }`}
    />
  );
}