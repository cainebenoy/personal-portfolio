"use client";

import { useEffect, useRef } from "react";

export default function ScratchManifesto() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="manifesto" className="relative z-10 py-24 flex justify-center">
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl min-h-[400px] mx-4 bg-white shadow-xl rotate-1 border-4 border-ink p-8 md:p-16 overflow-hidden"
      >
        {/* Hidden Content (Underneath) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 select-none pointer-events-none">
          <div className="font-marker text-xl text-highlight mb-4">CONFIDENTIAL • THE PHILOSOPHY</div>
          <h2 className="font-display text-4xl md:text-6xl text-ink mb-6">
            The Generalist&apos;s<br/>Manifesto
          </h2>
          <p className="font-hand text-2xl text-gray-600 max-w-xl leading-relaxed">
            &quot;Specialization is for insects. In a world of AI, connecting the dots matters more than drawing them. 
            I thrive in the chaos between disciplines, translating &apos;what if&apos; into &apos;here it is&apos;.&quot;
          </p>
          <div className="mt-8 font-code text-xs text-gray-400">
            VERIFIED REALITY: TRUE
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