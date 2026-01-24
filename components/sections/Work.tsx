"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { useAppStore } from "@/lib/useAppStore";

const projects = [
  {
    title: "TruthChain",
    description: "AI & Blockchain Content Authenticity Platform built during The Big Hack at Tech Habba 2025.",
    tags: ["React", "Solidity", "FastAPI", "Blockchain", "AI/ML"],
    emoji: "🛡️",
    color: "#1f2937",
    rotate: "rotate-[-2deg]",
  },
  {
    title: "Veritas Vault",
    description: "Decentralized archiving tool built for SFLC.in Nationwide Hackathon 2025.",
    tags: ["Next.js", "Firebase", "TypeScript", "Web3"],
    emoji: "🏛️",
    color: "#1e3a8a",
    rotate: "rotate-[1deg]",
  },
  {
    title: "YU Playbook",
    description: "Unified sports management platform built for Tech4Social Good Hackathon.",
    tags: ["Next.js", "React", "Firebase", "TypeScript", "Tailwind"],
    emoji: "⚽",
    color: "#14532d",
    rotate: "rotate-[2deg]",
  },
  {
    title: "Scold Me Amma!",
    description: "Humorous AI-powered scolding bot built for #UselessProjectsHackathon.",
    tags: ["Gemini API", "Problem Solving", "Vibe Coding"],
    emoji: "👵",
    color: "#6b3410",
    rotate: "rotate-[-1.5deg]",
  },
  {
    title: "Lo-Fi Study Timer",
    description: "Beautiful Pomodoro timer with animations and ambient sounds.",
    tags: ["JavaScript", "HTML5", "CSS", "Git"],
    emoji: "🎵",
    color: "#2a4620",
    rotate: "rotate-[1.5deg]",
  },
  {
    title: "Roast Me Daddy",
    description: "'Best Useless Project' winner at Vibe Coding Hackathon by TinkerHub.",
    tags: ["Gemini API", "Problem Solving", "Vibe Coding"],
    emoji: "🔥",
    color: "#7f1d1d",
    rotate: "rotate-[-1deg]",
  },
];

export default function Work() {
  const { setHighlightedSkills } = useAppStore();

  return (
    <section id="work" className="relative z-10 min-h-screen py-32">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Section Header */}
        <div className="mb-24 text-center reveal">
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
              className={`${index % 2 === 1 ? "md:mt-32" : ""}`}
              onMouseEnter={() => setHighlightedSkills(project.tags)}
              onMouseLeave={() => setHighlightedSkills([])}
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