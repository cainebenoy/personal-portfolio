"use client";

import { useEffect, useRef } from "react";

export default function InkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    type Point = { x: number; y: number; age: number; speed: number };
    let points: Point[] = [];
    let isDrawing = false;
    let animationId: number;
    let lastTime = performance.now();
    let smoothedSpeed = 0;

    const resetTrail = () => {
      isDrawing = false;
      points = [];
      smoothedSpeed = 0;
      lastTime = performance.now();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Ignore bogus events
      if (e.clientX === 0 && e.clientY === 0) return;

      const now = performance.now();
      const dt = (now - lastTime) || 16; // ms
      lastTime = now;

      const x = e.clientX;
      const y = e.clientY;

      // First point after reset / initial move
      if (!isDrawing || points.length === 0) {
        isDrawing = true;
        points.push({ x, y, age: 0, speed: 0 });
        return;
      }

      const last = points[points.length - 1];
      if (!last) {
        // Extra guard
        points.push({ x, y, age: 0, speed: 0 });
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);

      // px per ms
      const rawSpeed = dist / dt;

      // Interpolate for smoothness on fast motion
      const maxStep = 6; // smaller => smoother curve
      const steps = Math.max(1, Math.floor(dist / maxStep));

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const ix = last.x + dx * t;
        const iy = last.y + dy * t;
        points.push({ x: ix, y: iy, age: 0, speed: rawSpeed });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetTrail);
    window.addEventListener("mouseenter", resetTrail);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) resetTrail();
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Age + fade (slower aging + longer life for smoother trail)
      points = points
        .map((p) => ({ ...p, age: p.age + 0.9 })) // was +1
        .filter((p) => p.age < 60);               // was < 20

      if (points.length > 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;

          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        }

        // Speed → dynamic thickness ("speed warp", pencil feel)
        if (points.length > 3) {
          const recent = points.slice(-12); // slightly longer window
          const avgSpeed =
            recent.reduce((acc, p) => acc + p.speed, 0) /
            (recent.length || 1);

          // Low-pass filter for smooth transitions
          const alpha = 0.18; // slightly smoother
          smoothedSpeed = smoothedSpeed * (1 - alpha) + avgSpeed * alpha;

          // Bigger when slow, thinner when fast
          const minWidth = 2.0;   // thinnest at highest speed
          const maxWidth = 10.0;   // starting / slow width (pencil nib feel)
          const speedForThinnest = 1.1; // px/ms where it reaches minWidth

          const t = Math.min(smoothedSpeed / speedForThinnest, 1);
          const dynamicWidth = maxWidth - (maxWidth - minWidth) * t;

          // Graphite-ish color: dark gray with a bit of softness
          ctx.strokeStyle = "rgba(75, 78, 83, 0.8)";
          ctx.lineWidth = dynamicWidth;
        } else {
          // First few points: use the "slow" fat size
          ctx.strokeStyle = "rgba(75, 78, 83, 0.8)";
          ctx.lineWidth = 5.0;
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetTrail);
      window.removeEventListener("mouseenter", resetTrail);
      document.removeEventListener("visibilitychange", resetTrail as any);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none mix-blend-multiply"
    />
  );
}
