"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const hiddenContents = [
  {
    title: "The Generalist's Manifesto",
    text: '"Specialization is for insects. In a world of AI, connecting the dots matters more than drawing them. I thrive in the chaos between disciplines, translating \'what if\' into \'here it is\'."',
    meta: "VERIFIED REALITY: TRUE"
  },
  {
    title: "Secret Code #404",
    text: '"You found the hidden layer. Not all truths are displayed on the surface. Sometimes the best insights come from looking deeper, asking why, and being comfortable with the uncertainty."',
    meta: "STATUS: DECLASSIFIED"
  },
  {
    title: "The \'Glue\' Theory",
    text: '"Great products aren\'t built in silos. The people who win are the ones who can speak design, development, and data. The magic happens at the intersections where disciplines collide."',
    meta: "SYSTEM: INTEGRATED"
  },
  {
    title: "Why \'Master of None\'?",
    text: '"...is oftentimes better than a master of one. Depth in one area + adaptability across many = unpredictable advantage. In chaos, the specialists get stuck. We keep moving."',
    meta: "SKILL_TREE: INFINITE"
  },
  {
    title: "Easter Egg Found",
    text: '"Congrats! You scratched the surface. If you\'re reading this, you\'re the type of person who investigates beyond what\'s visible. That\'s exactly the energy this portfolio is built for."',
    meta: "ACHIEVEMENT: UNLOCKED"
  }
];

export default function ScratchManifesto() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(hiddenContents[0]);

  useLayoutEffect(() => {
    // Randomly select a hidden message on mount (client-side only)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContent(hiddenContents[Math.floor(Math.random() * hiddenContents.length)]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill with "Scratchable" surface
      ctx.fillStyle = "#d4d4d4"; // Grey-ish scratch card color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some "Noise" texture text
      ctx.font = "20px monospace";
      ctx.fillStyle = "#a3a3a3";
      for(let i=0; i<50; i++) {
        ctx.fillText(
            "HIDDEN_LAYER_V1 // ", 
            Math.random() * canvas.width, 
            Math.random() * canvas.height
        );
      }
      
      ctx.globalCompositeOperation = "destination-out";
    };

    resize();
    window.addEventListener("resize", resize);

    // Scratch Logic
    let isDrawing = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();

      // Check if enough is scratched (Optimization: check rarely)
      if (Math.random() > 0.9) checkReveal();
    };

    const start = () => isDrawing = true;
    const end = () => isDrawing = false;

    const checkReveal = () => {
        // Simple heuristic: if we've scratched enough, fade out the rest
        // For performance, we usually sample pixels, but here we'll just let the user scratch freely
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("touchstart", start);
    
    window.addEventListener("mousemove", scratch);
    window.addEventListener("touchmove", scratch);
    
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", scratch);
      window.removeEventListener("touchmove", scratch);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchend", end);
    };
  }, []);

  return (
    <section id="manifesto" className="relative z-10 py-12 md:py-24 flex justify-center px-2 sm:px-4">
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl min-h-[300px] sm:min-h-[400px] bg-white shadow-xl rotate-1 border-2 sm:border-4 border-ink p-4 sm:p-8 md:p-16 overflow-hidden"
      >
        {/* Hidden Content (Underneath) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 select-none pointer-events-none">
          <div className="font-marker text-xl text-highlight mb-4">CONFIDENTIAL • THE PHILOSOPHY</div>
          <h2 className="font-display text-4xl md:text-6xl text-ink mb-6">
            {content.title}
          </h2>
          <p className="font-hand text-2xl text-gray-600 max-w-xl leading-relaxed">
            {content.text}
          </p>
          <div className="mt-8 font-code text-xs text-gray-400">
            {content.meta}
          </div>
        </div>

        {/* Scratch Canvas (Overlay) */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-20 cursor-crosshair touch-none"
        />
        
        {/* Helper Hint */}
        <div className="absolute top-4 left-4 z-30 font-code text-xs bg-ink text-white px-2 py-1 rounded pointer-events-none animate-pulse">
            SCRATCH TO REVEAL
        </div>
      </div>
    </section>
  );
}