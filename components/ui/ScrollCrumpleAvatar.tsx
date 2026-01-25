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

      let scale = 1;
      let rotation = 0;

      // Un-crumple faster (0% - 12%)
      if (percent < 0.12) {
        const p = percent / 0.12;
        scale = lerp(0.15, 1, p);
        rotation = (1 - p) * 220;
      } 
      // Re-crumple (88% - 100%)
      else if (percent > 0.88) {
        const p = (percent - 0.88) / 0.12;
        scale = lerp(1, 0.15, p);
        rotation = p * 220;
      }

      // Scale avatar to 0.6 size
      ctx.scale(scale * 0.6, scale * 0.6);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(currentImg, -currentImg.naturalWidth / 2, -currentImg.naturalHeight / 2);

      ctx.restore();

      // --- C. DRAW DOODLES AROUND THE AVATAR (not on it) ---
      ctx.restore(); // Restore from crumple transforms first
      
      const w = currentImg.naturalWidth / dpr;
      const h = currentImg.naturalHeight / dpr;
      const wiggle = Math.sin(percent * 10) * 8;
      const canvasW = canvas.width / dpr;
      const canvasCx = canvasW / 2;
      const canvasH = canvas.height / dpr;
      const canvasCy = canvasH / 2;

      ctx.fillStyle = "rgba(43, 43, 43, 0.5)";
      ctx.strokeStyle = "rgba(43, 43, 43, 0.5)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Top left: Curved connectors with dots
      const tl1X = canvasCx - (w * 0.4) - 60;
      const tl1Y = canvasCy - (h * 0.35) - 100;
      ctx.beginPath();
      ctx.moveTo(tl1X, tl1Y);
      ctx.quadraticCurveTo(tl1X - 40, tl1Y - 40, tl1X - 80, tl1Y - 20);
      ctx.stroke();
      ctx.fillRect(tl1X - 85, tl1Y - 25, 8, 8); // endpoint dot
      ctx.fillRect(tl1X - 5, tl1Y - 5, 8, 8); // startpoint dot

      // Top right: Wavy line
      const tr1X = canvasCx + (w * 0.4) + 60;
      const tr1Y = canvasCy - (h * 0.3) - 80 + wiggle;
      ctx.strokeStyle = "rgba(255, 71, 87, 0.5)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 5; i++) {
        const x = tr1X - (i * 30);
        const y = tr1Y + Math.sin(i * 0.6) * 20;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Left: Scattered small circles in a column
      const leftX = canvasCx - (w * 0.45) - 140;
      ctx.strokeStyle = "rgba(43, 43, 43, 0.4)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(leftX, canvasCy - 50 + (i * 35) + wiggle * (i % 2 === 0 ? 1 : -1), 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Right: Minimal bracket design
      const rightX = canvasCx + (w * 0.42) + 150;
      const rightY = canvasCy + (h * 0.2) + 60;
      ctx.strokeStyle = "rgba(255, 71, 87, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rightX, rightY - 40);
      ctx.lineTo(rightX - 20, rightY - 40);
      ctx.lineTo(rightX - 20, rightY + 40);
      ctx.lineTo(rightX, rightY + 40);
      ctx.stroke();

      // Bottom left: Dashed line with label
      const blX = canvasCx - (w * 0.35) - 100;
      const blY = canvasCy + (h * 0.4) + 80;
      ctx.strokeStyle = "rgba(43, 43, 43, 0.4)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(blX - 60, blY);
      ctx.lineTo(blX + 60, blY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(43, 43, 43, 0.5)";
      ctx.font = "italic 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText("code", blX, blY - 15);

      // Bottom right: Minimal "✓" checkmark
      const brX = canvasCx + (w * 0.35) + 120;
      const brY = canvasCy + (h * 0.38) + 70;
      ctx.strokeStyle = "rgba(255, 71, 87, 0.5)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(brX - 15, brY);
      ctx.lineTo(brX - 5, brY + 10);
      ctx.lineTo(brX + 20, brY - 15);
      ctx.stroke();
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