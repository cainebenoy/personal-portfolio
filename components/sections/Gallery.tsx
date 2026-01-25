"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

// Replace with your actual photos in /public/gallery/
// Adding more items to make the pile look fuller
const photos = [
  { id: 1, src: "/gallery/Yukthi_2.0.jpg", label: "HackFit '24" },
  { id: 2, src: "/gallery/Yukthi_2.0.jpg", label: "TinkerHub Keynote" },
  { id: 3, src: "/gallery/Yukthi_2.0.jpg", label: "Late Nights" },
  { id: 4, src: "/gallery/Yukthi_2.0.jpg", label: "Community Meetup" },
  { id: 5, src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=600&auto=format&fit=crop", label: "Panel Discussion" },
  { id: 6, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop", label: "Innovation Award" },
  { id: 7, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop", label: "Workshop Lead" },
  { id: 8, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop", label: "Team Brainstorm" },
  { id: 9, src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop", label: "Office Vibes" },
  { id: 10, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop", label: "Presentation Day" },
];

export default function Gallery() {
  // Deterministic random layout to avoid hydration mismatch
  const pileLayout = useMemo(() => {
    return photos.map((_, i) => ({
      // Spread them out across the FULL width end to end
      x: (i * 80 % 220) - 110, // -110% to 110% horizontal spread (full width + overflow)
      y: (i * 45 % 60) - 30, // -30% to 30% vertical spread
      // Random rotation
      rotate: (i * 13 % 40) - 20, // -20deg to 20deg
      // Z-index stacking
      zIndex: i,
    }));
  }, []);

  return (
    <section id="gallery" className="relative z-10 py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12 text-center relative z-20">
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl text-ink">Field Notes</h2>
          <p className="mt-2 sm:mt-3 md:mt-4 font-hand text-lg sm:text-xl md:text-2xl text-gray-500">
            Moments from the arena.
          </p>
        </div>

        {/* The Scatter Pile */}
        <div className="relative h-[400px] sm:h-[500px] md:h-[700px] w-full flex items-center justify-center overflow-hidden">
          
          {/* Background hint of a desk or surface */}
          <div className="absolute inset-0 rounded-full bg-ink/5 blur-3xl transform scale-75 pointer-events-none" />

          {photos.map((photo, i) => {
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