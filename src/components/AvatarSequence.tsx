"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion";

// Scroll-scrubbed frame sequence of background-removed cutouts: the figure
// stands directly on the sheet (transparent WebP frames, canvas cleared
// between draws, contain-fit anchored to the bottom so the full figure is
// always visible). A real <Image> of frame 0 sits under the canvas as the
// no-JS / reduced-motion / still-loading state.
//
// Frames live in public/avatar-sequence/frame_NNN.webp (see
// scripts/encode-avatar-sequence.mjs for regenerating them from the raw
// cutout PNGs).

const pad = (i: number) => String(i).padStart(3, "0");
const src = (i: number) => `/avatar-sequence/frame_${pad(i)}.webp`;

export default function AvatarSequence({
  frameCount,
  triggerId = "thesis",
  end = "bottom 25%",
  className = "",
}: {
  frameCount: number;
  /** Section whose scroll-through drives the scrub. */
  triggerId?: string;
  /** ScrollTrigger end for the scrub — match the section's pin track. */
  end?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const currentRef = useRef(0);
  // Once the canvas has painted, the fallback still must hide — the frames
  // are transparent cutouts, so anything left underneath shows through.
  // Ref-guarded so the scrub's draw loop only ever sets state once.
  const paintedRef = useRef(false);
  const [painted, setPainted] = useState(false);

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
        // Contain-fit, feet on the floor: the whole cutout stays visible,
        // anchored to the bottom edge.
        const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - dw) / 2, ch - dh, dw, dh);
        currentRef.current = index;
        if (!paintedRef.current) {
          paintedRef.current = true;
          setPainted(true);
        }
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
          end,
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
        sizes="(max-width: 1024px) 70vw, 24vw"
        className={`object-contain object-bottom ${painted ? "invisible" : ""}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
