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

      ctx.scale(scale, scale);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(currentImg, -currentImg.naturalWidth / 2, -currentImg.naturalHeight / 2);

      // --- C. DRAW FUN DOODLES (hand-drawn aesthetic) ---
      const w = currentImg.naturalWidth / dpr;
      const h = currentImg.naturalHeight / dpr;
      const wiggle = Math.sin(percent * 10) * 8; // Subtle alive movement

      ctx.fillStyle = "rgba(43, 43, 43, 0.7)";
      ctx.strokeStyle = "rgba(43, 43, 43, 0.7)";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // 1. Left side: "</> CODE" tag with hand-drawn feel
      ctx.font = "bold 32px monospace";
      ctx.fillStyle = "rgba(43, 43, 43, 0.6)";
      ctx.fillText("<code>", -w * 0.35 + wiggle, -h * 0.25);
      
      // 2. Right side: Arrow annotation
      const arrowX = w * 0.28;
      const arrowY = -h * 0.2 + wiggle;
      ctx.strokeStyle = "rgba(255, 71, 87, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(arrowX - 30, arrowY);
      ctx.lineTo(arrowX - 80, arrowY + 60);
      ctx.stroke();
      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(arrowX - 80, arrowY + 60);
      ctx.lineTo(arrowX - 75, arrowY + 50);
      ctx.lineTo(arrowX - 85, arrowY + 55);
      ctx.fill();
      
      // Arrow label
      ctx.fillStyle = "rgba(43, 43, 43, 0.6)";
      ctx.font = "italic 24px monospace";
      ctx.fillText("thinking...", arrowX + 20, arrowY - 15);

      // 3. Bottom left: Geometric doodles (squares & circles)
      ctx.strokeStyle = "rgba(43, 43, 43, 0.5)";
      ctx.lineWidth = 2.5;
      // Square
      ctx.strokeRect(-w * 0.38, h * 0.15 + wiggle, 50, 50);
      // Circle
      ctx.beginPath();
      ctx.arc(-w * 0.25, h * 0.28 - wiggle, 28, 0, Math.PI * 2);
      ctx.stroke();
      // Triangle
      ctx.beginPath();
      ctx.moveTo(-w * 0.15, h * 0.35);
      ctx.lineTo(-w * 0.05, h * 0.15 + wiggle);
      ctx.lineTo(-w * 0.02, h * 0.35);
      ctx.closePath();
      ctx.stroke();

      // 4. Top right: "MAKER" stamp (hand-drawn style)
      ctx.save();
      ctx.translate(w * 0.32, -h * 0.28);
      ctx.rotate(-0.15 + (wiggle * 0.002));
      ctx.strokeStyle = "rgba(255, 71, 87, 0.6)";
      ctx.lineWidth = 3;
      // Stamp border
      ctx.beginPath();
      ctx.ellipse(0, 0, 70, 35, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 71, 87, 0.5)";
      ctx.font = "bold 28px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MAKER", 0, 0);
      ctx.restore();

      // 5. Bottom right: Stack of tech tags
      ctx.fillStyle = "rgba(43, 43, 43, 0.5)";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "left";
      ctx.fillText("React", w * 0.2, h * 0.3 + wiggle);
      ctx.fillText("Next.js", w * 0.2, h * 0.36 + wiggle * 0.5);
      ctx.fillText("Canvas", w * 0.2, h * 0.42 - wiggle * 0.3);

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