"use client";

import ProjectCard from "@/components/ui/ProjectCard";

const projects = [
  {
    title: "TruthChain",
    description: "AI + Blockchain Deepfake Detection.",
    tags: ["React", "Solidity", "FastAPI"],
    emoji: "🛡️",
    color: "#1f2937", // Gray-900
    rotate: "rotate-[-2deg]",
  },
  {
    title: "Veritas Vault",
    description: "Decentralized archiving for digital rights.",
    tags: ["Next.js", "IPFS", "Firebase"],
    emoji: "🏛️",
    color: "#1e3a8a", // Blue-900
    rotate: "rotate-[1deg]",
  },
  {
    title: "Roast Me Daddy",
    description: "'Best Useless Project' Winner.",
    tags: ["Gemini API", "Vibe Coding"],
    emoji: "🔥",
    color: "#7f1d1d", // Red-900
    rotate: "rotate-[-1deg]",
  },
  {
    title: "YU Playbook",
    description: "Unified sports management platform.",
    tags: ["Next.js 15", "ShadCN", "Auth"],
    emoji: "⚽",
    color: "#14532d", // Green-900
    rotate: "rotate-[2deg]",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative z-10 min-h-screen py-32">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <h2 className="relative inline-block font-display text-6xl text-ink md:text-8xl">
            The Evidence
            {/* Doodle Decoration */}
            <svg
              className="absolute -right-12 -top-8 h-24 w-24 rotate-12 opacity-80"
              viewBox="0 0 100 100"
              fill="none"
              stroke="var(--highlight)"
              strokeWidth="2"
            >
              <path d="M10,50 A40,40 0 1,1 90,50 A40,40 0 1,1 10,50" strokeDasharray="5,5" />
            </svg>
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`${index % 2 === 1 ? "md:mt-32" : ""}`} // Stagger effect
            >
              <ProjectCard
                {...project}
                className={project.rotate}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}