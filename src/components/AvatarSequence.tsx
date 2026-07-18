"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion";

// Scroll-scrubbed frame sequence: as the hero scrolls away, the print
// plays like a strip of film being pulled. A real <Image> of frame 0 sits
// under the canvas as the no-JS / reduced-motion / still-loading state, so
// there is always a picture.
//
// Frames live in public/avatar-sequence/frame_NNN.jpg (see
// scripts/encode-avatar-sequence.mjs for regenerating them from raw video
// frames).

const pad = (i: number) => String(i).padStart(3, "0");
const src = (i: number) => `/avatar-sequence/frame_${pad(i)}.jpg`;

// Crop bias: faces sit in the upper third of these frames.
const FOCUS_Y = 0.3;

export default function AvatarSequence({
  frameCount,
  triggerId = "thesis",
  className = "",
}: {
  frameCount: number;
  /** Section whose scroll-through drives the scrub. */
  triggerId?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const currentRef = useRef(0);

  useGSAP(
    () => {
      const draw = (index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];
        if (!canvas || !img || !img.naturalWidth) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cw = Math.round(canvas.clientWidth * dpr);
        const ch = Math.round(canvas.clientHeight * dpr);
        if (cw === 0 || ch === 0) return;
        if (canvas.width !== cw || canvas.height !== ch) {
          canvas.width = cw;
          canvas.height = ch;
        }
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) * FOCUS_Y, dw, dh);
        currentRef.current = index;
      };

      const load = (i: number) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = src(i);
          img.onload = () => {
            imagesRef.current[i] = img;
            resolve();
          };
          img.onerror = () => resolve();
        });

      // Frame 0 paints immediately; the rest stream in behind it in small
      // batches so the scrub finds most frames ready by the time it runs.
      load(0).then(async () => {
        draw(0);
        const batch = 8;
        for (let start = 1; start < frameCount; start += batch) {
          const jobs = [];
          for (let i = start; i < Math.min(start + batch, frameCount); i++) {
            jobs.push(load(i));
          }
          await Promise.all(jobs);
        }
        // Everything's in — repaint whatever the scrub currently wants.
        draw(currentRef.current);
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          trigger: `#${triggerId}`,
          start: "top top",
          end: "bottom 25%",
          scrub: 0.35,
          onUpdate: (self) => {
            const target = Math.round(self.progress * (frameCount - 1));
            // Fall back to the nearest already-loaded frame below target.
            let i = target;
            while (i > 0 && !imagesRef.current[i]) i--;
            if (imagesRef.current[i]) draw(i);
          },
        });
        return () => st.kill();
      });

      const ro = new ResizeObserver(() => draw(currentRef.current));
      if (canvasRef.current) ro.observe(canvasRef.current);
      return () => {
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className={className}>
      <Image
        src={src(0)}
        alt="Caine Benoy speaking on stage at LUFTETAR 2026"
        fill
        priority
        sizes="(max-width: 1024px) 84vw, 30vw"
        className="object-cover"
        style={{ objectPosition: `center ${FOCUS_Y * 100}%` }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
