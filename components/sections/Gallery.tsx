"use client";

import { useMemo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Replace with your actual photos in /public/gallery/
// Adding more items to make the pile look fuller
const photos = [
  { id: 1, src: "/gallery/Yukthi_2.0.jpg", label: "St Mary's Fest" },
  { id: 2, src: "/gallery/Aroha_25.jpg", label: "SCMS Fest" },
  { id: 3, src: "/gallery/Nursery_Medal.jpg", label: "Cute Caine" },
  { id: 4, src: "/gallery/Eleven'sCodeSurge.png", label: "Hackathon Organizer" },
  { id: 5, src: "/gallery/BlockHash_Live.jpg", label: "KBA BlockHash Live 2025" },
  { id: 6, src: "/gallery/TheBigHack.jpg", label: "The Big Hack '25 @ Acharya Bangalore" },
  { id: 7, src: "/gallery/IndiaFoss '25.jpg", label: "India Foss '25" },
  { id: 8, src: "/gallery/Chaya&Pupz.jpg", label: "TinkerHub SCAS Chaya&Pupz" },
  { id: 9, src: "/gallery/VibeCodingHackathon.jpg", label: "Best Useless Project @ Vibe Coding Hackathon" },
  { id: 10, src: "/gallery/LeadsCampTVM.jpg", label: "Selection Camp for TinkerHub Leads" },
  // Extra entries to reach 30; replace these placeholders with your own assets when ready
  { id: 11, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop", label: "Workshop Day" },
  { id: 12, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80&auto=format&fit=crop", label: "Team Meetup" },
  { id: 13, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop", label: "Presentation" },
  { id: 14, src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop", label: "Office Vibes" },
  { id: 15, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80&auto=format&fit=crop", label: "Brainstorm" },
  { id: 16, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80&auto=format&fit=crop", label: "Innovation Award" },
  { id: 17, src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=900&q=80&auto=format&fit=crop", label: "Panel Discussion" },
  { id: 18, src: "https://images.unsplash.com/photo-1521737604893-ffcf9f1a5d87?w=900&q=80&auto=format&fit=crop", label: "Design Session" },
  { id: 19, src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900&q=80&auto=format&fit=crop", label: "Whiteboard Jam" },
  { id: 20, src: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=900&q=80&auto=format&fit=crop", label: "Product Review" },
  { id: 21, src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&q=80&auto=format&fit=crop", label: "Project Demo" },
  { id: 22, src: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=900&q=80&auto=format&fit=crop", label: "Code Sprint" },
  { id: 23, src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&q=80&auto=format&fit=crop", label: "Hack Night" },
  { id: 24, src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&auto=format&fit=crop", label: "Team Workshop" },
  { id: 25, src: "https://images.unsplash.com/photo-1521737604893-ffcf9f1a5d87?w=900&q=80&auto=format&fit=crop", label: "Launch Day" },
  { id: 26, src: "https://images.unsplash.com/photo-1556761175-4ffd16f3d8fd?w=900&q=80&auto=format&fit=crop", label: "Retro Board" },
  { id: 27, src: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?w=900&q=80&auto=format&fit=crop", label: "Dev Standup" },
  { id: 28, src: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=900&q=80&auto=format&fit=crop", label: "Pair Programming" },
  { id: 29, src: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=900&q=80&auto=format&fit=crop", label: "Strategy" },
  { id: 30, src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80&auto=format&fit=crop", label: "Coffee Break" },
];

export default function Gallery() {
  // Hydration-safe shuffle + responsive layout
  const [hydrated, setHydrated] = useState(false);
  const [order, setOrder] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else if ((mq as any).addListener) (mq as any).addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else if ((mq as any).removeListener) (mq as any).removeListener(update);
    };
  }, []);

  useEffect(() => {
    const indices = photos.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setOrder(indices);
  }, [photos.length]);

  const items = hydrated && order.length === photos.length ? order.map((i) => photos[i]) : photos;

  const pileLayout = useMemo(() => {
    const n = items.length;
    if (!isMobile) {
      // Desktop/laptop: 3 rows x 10 columns, wider horizontal spread
      const cols = 10;
      const rows = Math.ceil(n / cols);
      const xPositions = Array.from({ length: cols }, (_, c) => {
        const t = (c - (cols - 1) / 2) / ((cols - 1) / 2);
        return Math.round(t * 90); // -90..90%
      });
      const yPositions = [-35, 0, 35]; // 3 rows
      const rotatePattern: number[][] = [
        [-3, -2, -1, 0, 1, 2, 1, 0, -1, -2],
        [-2, -1, 0, 1, 2, 1, 0, -1, -2, -1],
        [-1, 0, 1, 2, 1, 0, -1, -2, -1, 0],
      ];
      return items.map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = xPositions[col];
        const y = yPositions[row] ?? 0;
        const rotate = (rotatePattern[row % rotatePattern.length][col]) ?? 0;
        return { x, y, rotate, zIndex: i };
      });
    } else {
      // Mobile: 6 rows x 5 columns
      const cols = 5;
      const rows = Math.ceil(n / cols);
      const xPositions = [-48, -24, 0, 24, 48];
      const maxYSpread = 70; // -70..70% vertically
      const rotatePattern = [-2, -1, 0, 1, 2];
      return items.map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = xPositions[col];
        const normRow = rows > 1 ? (row - (rows - 1) / 2) / ((rows - 1) / 2) : 0;
        const y = Math.round(normRow * maxYSpread);
        const rotate = rotatePattern[col] ?? 0;
        return { x, y, rotate, zIndex: i };
      });
    }
  }, [items.length, isMobile]);

  const containerHeightPx = useMemo(() => {
    if (!isMobile) {
      const rows = Math.ceil(items.length / 10); // 3 rows for 30
      // Reduced baseline and gentler per-row increase to avoid excess whitespace
      return 560 + Math.max(0, rows - 1) * 140;
    } else {
      const rows = Math.ceil(items.length / 5); // 6 rows for 30
      // Tighter mobile baseline; small adjustment only if rows exceed 6
      return 720 + Math.max(0, rows - 6) * 120;
    }
  }, [items.length, isMobile]);

  return (
    <section id="gallery" className="relative z-10 py-16 overflow-visible">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12 text-center relative z-20">
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl text-ink">Field Notes</h2>
          <p className="mt-2 sm:mt-3 md:mt-4 font-hand text-lg sm:text-xl md:text-2xl text-gray-500">
            Moments from the arena.
          </p>
        </div>

        {/* The Scatter Pile */}
        <div className="relative w-full flex items-center justify-center overflow-visible transition-opacity duration-300" style={{ height: containerHeightPx, opacity: hydrated ? 1 : 0 }}>
          
          {/* Background hint of a desk or surface */}
          <div className="absolute inset-0 rounded-full bg-ink/5 blur-3xl transform scale-75 pointer-events-none" />

          {items.map((photo, i) => {
            const style = pileLayout[i];
            
            return (
              <div
                key={photo.id}
                className={cn(
                  "absolute w-48 md:w-64 aspect-[4/5] p-3 pb-8 transition-all duration-300 ease-out cursor-none group",
                  "border-4 border-ink shadow-lg",
                  "hover:z-50 hover:scale-100 hover:rotate-0 hover:shadow-2xl gallery-style"
                )}
                style={{
                  transform: `translate(${style.x}%, ${style.y}%) rotate(${style.rotate}deg) scale(0.9)`,
                  zIndex: style.zIndex,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = `translate(${style.x}%, ${style.y}%) rotate(0deg) scale(1)`;
                  el.style.zIndex = "50";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = `translate(${style.x}%, ${style.y}%) rotate(${style.rotate}deg) scale(0.9)`;
                  el.style.zIndex = style.zIndex.toString();
                }}
              >
                {/* Photo */}
                <div className="w-full h-full bg-gray-200 overflow-hidden relative filter sepia-[.3] group-hover:sepia-0 transition-all duration-300">
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover"
                    loading="eager"
                    draggable={false}
                  />
                  
                  {/* Glossy Overlay (visible on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Label (appears on hover) */}
                <div className="absolute bottom-2 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                  <p className="font-hand text-sm text-ink truncate px-2">{photo.label}</p>
                </div>
              </div>
            );
          })}

          {/* Decor: "Memories" Stamp */}
          <div className="absolute bottom-0 right-10 md:right-32 pointer-events-none opacity-20 rotate-[-12deg] z-0">
             <div className="border-[6px] border-ink p-4 rounded-full w-40 h-40 flex items-center justify-center mask-image-grunge">
                 <span className="font-marker text-2xl text-center leading-none">
                     NO<br/>FILTER
                 </span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}