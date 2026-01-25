"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// --- DATA ---
const radarData = [
  // ADOPT (Core Stack)
  { name: "Next.js", ring: 0, angle: 45 },
  { name: "TypeScript", ring: 0, angle: 135 },
  { name: "Tailwind", ring: 0, angle: 225 },
  { name: "Supabase", ring: 0, angle: 315 },
  
  // TRIAL (Experimenting)
  { name: "AI Agents", ring: 1, angle: 20 },
  { name: "Solidity", ring: 1, angle: 100 },
  { name: "Three.js", ring: 1, angle: 190 },
  { name: "Rust", ring: 1, angle: 280 },
  
  // ASSESS (Watching)
  { name: "WebGPU", ring: 2, angle: 60 },
  { name: "Bun", ring: 2, angle: 150 },
  { name: "Spatial Comp.", ring: 2, angle: 250 },
  { name: "ZK Proofs", ring: 2, angle: 340 },
];

export default function TechRadar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Helper to position items
  const getPosition = (ring: number, angle: number) => {
    // Ring radii: 0=15%, 1=35%, 2=48%
    const radius = ring === 0 ? 15 : ring === 1 ? 35 : 48; 
    const rad = (angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = 50 + radius * Math.sin(rad);
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <section id="radar" className="relative z-10 py-24 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 text-center">
        
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-6xl text-ink">Tech Radar</h2>
          <p className="mt-2 font-hand text-xl text-gray-500">
            What I use, what I&apos;m learning, and what I&apos;m watching.
          </p>
        </div>

        {/* The Radar Container */}
        <div className="relative aspect-square max-w-[600px] mx-auto">
          
          {/* Hand-Drawn Rings (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow [animation-duration:60s]" viewBox="0 0 100 100">
            {/* Ring 1 (Adopt) */}
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink opacity-30" strokeDasharray="4 2" />
            {/* Ring 2 (Trial) */}
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink opacity-20" strokeDasharray="6 3" />
            {/* Ring 3 (Assess) */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink opacity-10" />
            
            {/* Crosshairs */}
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.1" className="text-ink opacity-10" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.1" className="text-ink opacity-10" />
          </svg>

          {/* Labels for Rings */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-code text-[10px] text-gray-400">ADOPT</div>
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-code text-[10px] text-gray-400">TRIAL</div>
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-code text-[10px] text-gray-400">ASSESS</div>

          {/* Radar Blips */}
          {radarData.map((item) => {
            const pos = getPosition(item.ring, item.angle);
            const isHovered = activeItem === item.name;

            return (
              <div
                key={item.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: pos.x, top: pos.y }}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {/* The Blip */}
                <div className={cn(
                  "w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-none",
                  item.ring === 0 ? "bg-ink border-ink" : 
                  item.ring === 1 ? "bg-highlight border-highlight" : 
                  "bg-white border-gray-400",
                  isHovered ? "scale-150" : "scale-100"
                )} />

                {/* The Label */}
                <div className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-hand text-lg transition-all duration-300 z-20",
                  isHovered ? "opacity-100 translate-x-2 text-ink scale-110" : "opacity-0 scale-90 pointer-events-none"
                )}>
                  <span className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-gray-100">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Legend */}
        <div className="mt-12 flex justify-center gap-8 font-code text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ink" /> Core
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-highlight" /> Learning
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border border-gray-400" /> Watching
          </div>
        </div>

      </div>
    </section>
  );
}