"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

// --- DATA ---
const techRadarData = {
  Adopt: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "REST APIs",
    "Git",
    "GitHub",
    "Docker",
    "Vercel",
    "Tailwind CSS",
    "Arduino",
    "Raspberry Pi",
    "VS Code",
    "Linux",
  ],
  Trial: [
    "LangChain",
    "LlamaIndex",
    "Vector DBs",
    "LLM APIs",
    "AI agents",
    "FastAPI",
    "NestJS",
    "tRPC",
    "GraphQL",
    "Prisma",
    "Supabase",
    "Rust",
    "Go",
    "Docker Compose",
    "Kubernetes",
    "Terraform",
    "Flutter",
    "React Native",
    "WebSockets",
    "MQTT",
    "Hardhat",
    "Solidity",
    "GitHub Actions",
  ],
  Assess: [
    "Small LLMs",
    "On-device LLMs",
    "Prod RAG patterns",
    "Multi-agent systems",
    "AI eval & guardrails",
    "Quantum SDKs",
    "Spatial/XR",
    "WASM edge",
    "Kafka",
    "Serverless scale",
    "Blockchain L2s",
    "ZK proofs",
    "Green infra",
    "AI code assist",
  ],
};

// Flatten data with auto-calculated angles
const radarData = [
  ...techRadarData.Adopt.map((name, idx) => ({
    name,
    ring: 0,
    angle: (idx / techRadarData.Adopt.length) * 360,
  })),
  ...techRadarData.Trial.map((name, idx) => ({
    name,
    ring: 1,
    angle: (idx / techRadarData.Trial.length) * 360,
  })),
  ...techRadarData.Assess.map((name, idx) => ({
    name,
    ring: 2,
    angle: (idx / techRadarData.Assess.length) * 360,
  })),
];

export default function TechRadar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const PROXIMITY_RADIUS_INNER = 40; // pixels for ring 0 (tighter)
  const PROXIMITY_RADIUS_OUTER = 80; // pixels for rings 1-2

  // Helper to position items with consistent rounding
  const getPosition = (ring: number, angle: number) => {
    // Ring radii: 0=15%, 1=35%, 2=48%
    const radius = ring === 0 ? 15 : ring === 1 ? 35 : 48; 
    const rad = (angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = 50 + radius * Math.sin(rad);
    // Round to 2 decimal places to prevent hydration mismatch
    return { x: `${Math.round(x * 100) / 100}%`, y: `${Math.round(y * 100) / 100}%` };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();

    // Check proximity to all items
    const closestItem = radarData.find((item) => {
      const pos = getPosition(item.ring, item.angle);
      const itemX = parseFloat(pos.x) / 100 * rect.width;
      const itemY = parseFloat(pos.y) / 100 * rect.height;
      
      const dx = e.clientX - rect.left - itemX;
      const dy = e.clientY - rect.top - itemY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Use different proximity radius based on ring
      const proximityThreshold = item.ring === 0 ? PROXIMITY_RADIUS_INNER : PROXIMITY_RADIUS_OUTER;
      return distance < proximityThreshold;
    });

    setActiveItem(closestItem?.name || null);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <section id="radar" className="relative z-10 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-6xl text-ink">Tech Radar</h2>
          <p className="mt-2 font-hand text-xl text-gray-500">
            What I use, what I&apos;m learning, and what I&apos;m watching.
          </p>
        </div>

        {/* The Radar Container with Background */}
        <div 
          ref={containerRef}
          className="relative aspect-square max-w-[900px] mx-auto bg-paper shadow-lg border-4 border-ink rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><defs><pattern id=\"dots\" x=\"0\" y=\"0\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"><circle cx=\"5\" cy=\"5\" r=\"1\" fill=\"%23000\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23dots)\"/></svg>')"
          }} />

          {/* Hand-Drawn Rings (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
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
              >
                {/* The Blip */}
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer shadow-md",
                    item.ring === 0 ? "bg-ink border-ink" : 
                    item.ring === 1 ? "bg-highlight border-highlight" : 
                    "bg-white border-gray-400",
                    isHovered ? "scale-150 shadow-xl" : "scale-100 hover:scale-125"
                  )}
                  style={isHovered ? {
                    boxShadow: item.ring === 0 ? '0 0 20px rgba(0,0,0,0.4)' : item.ring === 1 ? '0 0 20px rgba(255,203,5,0.4)' : '0 0 20px rgba(150,150,150,0.4)'
                  } : {}}
                />

                {/* The Label */}
                <div
                  className={cn(
                    "absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap font-hand text-sm transition-all duration-200 z-20 pointer-events-none",
                    isHovered ? "opacity-100 translate-x-2 text-ink scale-110" : "opacity-0 scale-90"
                  )}
                >
                  <span className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded shadow-lg border-2 border-ink font-medium">
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
            <span className="w-2 h-2 rounded-full bg-ink" /> Adopt ({techRadarData.Adopt.length})
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-highlight" /> Trial ({techRadarData.Trial.length})
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border border-gray-400" /> Assess ({techRadarData.Assess.length})
          </div>
        </div>

      </div>
    </section>
  );
}