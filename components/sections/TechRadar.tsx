"use client";

import { useState } from "react";
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
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-6xl text-ink">Tech Radar</h2>
          <p className="mt-2 font-hand text-xl text-gray-500">
            What I use, what I&apos;m learning, and what I&apos;m watching.
          </p>
        </div>

        {/* The Radar Container */}
        <div className="relative aspect-square max-w-[900px] mx-auto">
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
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {/* The Blip */}
                <div
                  className={cn(
                    "w-2 h-2 rounded-full border transition-all duration-300 cursor-pointer",
                    item.ring === 0 ? "bg-ink border-ink" : 
                    item.ring === 1 ? "bg-highlight border-highlight" : 
                    "bg-white border-gray-400",
                    isHovered ? "scale-200 shadow-lg" : "scale-100"
                  )}
                />

                {/* The Label */}
                <div
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-hand text-sm transition-all duration-300 z-20 pointer-events-none",
                    isHovered ? "opacity-100 translate-x-2 text-ink scale-110" : "opacity-0 scale-90"
                  )}
                >
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-md border border-gray-200">
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