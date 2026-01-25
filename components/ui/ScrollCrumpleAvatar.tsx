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

      // --- D. DRAW FUN ELEMENTS (The Doodles) - Scattered AROUND the avatar ---
      // IMPORTANT: Draw doodles BEFORE ctx.restore() so they use same coordinate space as avatar
      const w = currentImg.naturalWidth / dpr;
      const h = currentImg.naturalHeight / dpr;
      const wiggle = Math.sin(percent * 15) * 5; // Fast jitter
      const float = Math.sin(percent * 5) * 10;  // Slow float

      ctx.save(); // Isolate doodle styles

      // Common Doodle Style
      ctx.strokeStyle = "rgba(30, 30, 30, 0.8)"; 
      ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.font = "bold 24px monospace"; 

      // 1. "NOT A BUG" Tag (Top Left - Far)
      ctx.save();
      ctx.translate(-w * 0.5, -h * 0.45 + float);
      ctx.rotate(-0.1);
      ctx.strokeRect(0, 0, 160, 50); 
      ctx.fillText("NOT A BUG", 15, 32);
      ctx.beginPath();
      ctx.moveTo(160, 25);
      ctx.quadraticCurveTo(200, 25, 220, 80);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(220, 80);
      ctx.lineTo(210, 65);
      ctx.moveTo(220, 80);
      ctx.lineTo(200, 75);
      ctx.stroke();
      ctx.restore();

      // 2. "// TODO: Sleep" (Top Middle)
      ctx.save();
      ctx.translate(0, -h * 0.48 + wiggle);
      ctx.rotate(0.05);
      ctx.font = "18px monospace";
      ctx.fillText("// TODO: sleep()", 0, 0);
      ctx.restore();

      // 3. "404" Sticker (Top Right - Far)
      ctx.save();
      ctx.translate(w * 0.48, -h * 0.42 + float);
      ctx.rotate(0.2);
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
      ctx.fill();
      ctx.strokeStyle = "rgba(30, 30, 30, 0.8)";
      ctx.stroke();
      ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
      ctx.fillText("404", -20, 10);
      ctx.font = "12px monospace";
      ctx.fillText("SLEEP NOT FOUND", -50, 30);
      ctx.restore();

      // 4. "SHIP IT" Stamp (Left Side - Far)
      ctx.save();
      ctx.translate(-w * 0.55, 0 + wiggle);
      ctx.rotate(-0.25);
      ctx.strokeStyle = "rgba(200, 0, 0, 0.8)";
      ctx.fillStyle = "rgba(200, 0, 0, 0.8)";
      ctx.lineWidth = 4;
      ctx.strokeRect(-80, -30, 160, 60);
      ctx.font = "bold 26px monospace";
      ctx.fillText("SHIP IT", -60, 8);
      ctx.restore();

      // 5. "Stack Overflow" Bookmark (Right Side - Far)
      ctx.save();
      ctx.translate(w * 0.52, -h * 0.15 + float * 0.2);
      ctx.rotate(-0.4);
      ctx.strokeStyle = "rgba(30, 30, 30, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, 40);
      ctx.lineTo(40, 55);
      ctx.lineTo(0, 40);
      ctx.closePath();
      ctx.stroke();
      ctx.font = "14px monospace";
      ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
      ctx.fillText("Stack", 10, 18);
      ctx.fillText("Overflow", 10, 34);
      ctx.restore();

      // 6. Battery 1% (Bottom Right - Far)
      ctx.save();
      ctx.translate(w * 0.45, h * 0.45 + float * 0.3);
      ctx.rotate(-0.05);
      ctx.strokeStyle = "rgba(30, 30, 30, 0.8)";
      ctx.lineWidth = 3;
      ctx.strokeRect(0, -15, 80, 30);
      ctx.beginPath();
      ctx.moveTo(80, -8);
      ctx.lineTo(90, -8);
      ctx.lineTo(90, 8);
      ctx.lineTo(80, 8);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "#e74c3c";
      ctx.fillRect(3, -12, 14, 24);
      ctx.font = "14px monospace";
      ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
      ctx.fillText("1%", 30, 5);
      ctx.restore();

      // 7. Infinite Loop Code (Bottom Left - Far)
      ctx.save();
      ctx.translate(-w * 0.48, h * 0.38);
      ctx.font = "20px monospace";
      ctx.fillStyle = "#c0392b";
      ctx.fillText("while(alive) {", 0, 0);
      ctx.fillText("  build();", 20, 25);
      ctx.fillText("}", 0, 50);
      ctx.restore();

      // 8. Brain CPU Loading (Top Left - Far)
      ctx.save();
      ctx.translate(-w * 0.4, -h * 0.35 + float * 0.4);
      ctx.rotate(0.02);
      ctx.font = "16px monospace";
      ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
      ctx.fillText("brain.cpu", 0, 0);
      ctx.translate(0, 10);
      ctx.strokeStyle = "rgba(30, 30, 30, 0.8)";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 140, 18);
      const load = 0.73;
      ctx.fillStyle = "rgba(52, 152, 219, 0.8)";
      ctx.fillRect(2, 2, (140 - 4) * load, 18 - 4);
      ctx.font = "12px monospace";
      ctx.fillStyle = "rgba(30, 30, 30, 0.9)";
      ctx.fillText("73%", 55, 14);
      ctx.restore();

      // 9. Tiny Bug With Label (Top Right Area)
      ctx.save();
      ctx.translate(w * 0.35, -h * 0.28 + wiggle * 0.4);
      ctx.rotate(-0.08);
      ctx.strokeStyle = "rgba(30, 30, 30, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-12, 0, 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(5, -8); ctx.lineTo(15, -14);
      ctx.moveTo(5, 8);  ctx.lineTo(15, 14);
      ctx.moveTo(-5, -8); ctx.lineTo(-15, -14);
      ctx.moveTo(-5, 8);  ctx.lineTo(-15, 14);
      ctx.stroke();
      ctx.font = "12px monospace";
      ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
      ctx.fillText("bug()", 20, -5);
      ctx.restore();

      // 10. Caffeine Formula (Bottom Area)
      ctx.save();
      ctx.translate(0, h * 0.5 + wiggle);
      ctx.rotate(0.1);
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
      ctx.fillText("C₈H₁₀N₄O₂", 0, 0);
      ctx.font = "italic 16px serif";
      ctx.fillText("(Fuel Source)", 10, 20);
      ctx.beginPath();
      ctx.moveTo(-10, 25);
      ctx.bezierCurveTo(50, 35, 100, 15, 140, 25);
      ctx.stroke();
      ctx.restore();

      // 11. Extra Scribble Cluster (Bottom Right Corner)
      ctx.save();
      ctx.translate(w * 0.4, h * 0.28);
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