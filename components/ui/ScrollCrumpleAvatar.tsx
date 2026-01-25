"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// --- CONFIGURATION ---
const FRAME_COUNT = 82; 
const PATH_PREFIX = "/avatar-sequence/VID20260114135947 - Trim_";
const FILE_EXT = ".png"; 

export default function ScrollCrumpleAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Smooth scroll interpolation
  const targetPercentRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // 1. PRELOAD IMAGES
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      // Spaces in filenames are URL-encoded to avoid 404s when served statically
      img.src = `${PATH_PREFIX}${frameNumber}${FILE_EXT}`.replace(/ /g, "%20");
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      imgs[i] = img; 
    }
    setImages(imgs);
  }, []);

  // 2. HANDLE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = clamp01((windowHeight - rect.top) / (rect.height + windowHeight));
      targetPercentRef.current = progress;
    };

    const tick = () => {
      setPercent((prev) => lerp(prev, targetPercentRef.current, 0.18));
      rafRef.current = requestAnimationFrame(tick);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 3. RENDER FRAME WITH CRUMPLE TRANSFORM
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || images.length === 0) return;

    // A. Frame Logic: Map scroll to video frames
    let frameIndex = 0;
    // Play video during the middle 80% (10% to 90%)
    if (percent < 0.1) frameIndex = 0;
    else if (percent > 0.9) frameIndex = FRAME_COUNT - 1;
    else {
      const normalized = (percent - 0.1) / 0.8;
      frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(normalized * FRAME_COUNT));
    }

    const currentImg = images[frameIndex];

    if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = currentImg.naturalWidth * dpr;
      canvas.height = currentImg.naturalHeight * dpr;
      canvas.style.width = `${currentImg.naturalWidth}px`;
      canvas.style.height = `${currentImg.naturalHeight}px`;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // B. Crumple Logic (Transformations)
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.translate(cx, cy);
      ctx.scale(dpr, dpr);

      let opacity = 1;

      // Fade in during first 12%
      if (percent < 0.12) {
        opacity = percent / 0.12;
      } 
      // Fade out during last 12%
      else if (percent > 0.88) {
        opacity = 1 - ((percent - 0.88) / 0.12);
      }

      // Apply opacity
      ctx.globalAlpha = opacity;

      // Scale avatar to 0.6 size (no rotation, no scale animation)
      ctx.scale(0.6, 0.6);
      ctx.drawImage(currentImg, -currentImg.naturalWidth / 2, -currentImg.naturalHeight / 2);
      
      // Reset opacity for doodles
      ctx.globalAlpha = 1;

      // --- D. DRAW FUN ELEMENTS (The Doodles) - Just SHIP IT and while(alive) ---
      // IMPORTANT: Draw doodles BEFORE ctx.restore() so they use same coordinate space as avatar
      const w = currentImg.naturalWidth / dpr;
      const h = currentImg.naturalHeight / dpr;
      const wiggle = Math.sin(percent * 15) * 5; // Fast jitter
      const float = Math.sin(percent * 5) * 10;  // Slow float

      ctx.save(); // Isolate doodle styles

      // 1. "SHIP IT" Stamp (Left Side)
      ctx.save();
      ctx.translate(-w * 0.8, 0 + wiggle);
      ctx.rotate(-0.25);
      ctx.strokeStyle = "rgba(200, 0, 0, 0.8)";
      ctx.fillStyle = "rgba(200, 0, 0, 0.8)";
      ctx.lineWidth = 4;
      ctx.strokeRect(-80, -30, 160, 60);
      ctx.font = "bold 26px monospace";
      ctx.fillText("SHIP IT", -60, 8);
      ctx.restore();

      // 2. Infinite Loop Code (Bottom Left)
      ctx.save();
      ctx.translate(-w * 0.72, h * 0.55);
      ctx.font = "20px monospace";
      ctx.fillStyle = "#c0392b";
      ctx.fillText("while(alive) {", 0, 0);
      ctx.fillText("  build();", 20, 25);
      ctx.fillText("}", 0, 50);
      ctx.restore();

      // 3. Scribble Cluster (Right Side)
      ctx.save();
      ctx.translate(w * 0.6, h * 0.42);
      ctx.rotate(0.1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let i = 0; i < 14; i++) {
        const dx = Math.sin(i * 0.7) * 20;
        const dy = Math.cos(i * 0.5) * 10;
        ctx.quadraticCurveTo(dx, dy, i * 10, (i % 2 === 0 ? 10 : -10));
      }
      ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // Restore doodle context

      ctx.restore();
    }
  }, [percent, images, loaded]);

  return (
    <section 
      ref={containerRef} 
      // Reduced height from 300vh to 150vh for faster scroll completion
      className="relative z-20 h-[150vh] w-full bg-transparent"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden pointer-events-none">
        
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center font-code text-xs text-gray-400 bg-paper/80 z-20">
            <div className="animate-spin mr-2">⚙️</div> LOADING AVATAR...
          </div>
        )}

        <canvas
            ref={canvasRef}
            className="h-[80vh] w-auto object-contain max-w-full drop-shadow-2xl"
        />

        <div 
            className={cn(
                "absolute bottom-20 left-1/2 -translate-x-1/2 text-center transition-all duration-300 transform",
                // Adjusted text visibility window to match new speed
                percent > 0.2 && percent < 0.8 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
            )}
        >
            <div className="font-marker text-3xl md:text-5xl text-ink bg-paper px-6 py-3 rotate-[-2deg] shadow-paper border-2 border-ink">
                THE BUILDER
            </div>
        </div>

      </div>
    </section>
  );
}