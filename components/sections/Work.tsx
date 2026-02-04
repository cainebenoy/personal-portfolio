"use client";

import { useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { useAppStore } from "@/lib/useAppStore";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  emoji: string;
  color: string;
  rotate: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "TruthChain",
    description: "AI & Blockchain Content Authenticity Platform built during The Big Hack at Tech Habba 2025.",
    longDescription: "A cutting-edge platform leveraging blockchain and AI to verify content authenticity. Users can upload media, and the system verifies provenance using smart contracts and machine learning models. Built with React for intuitive UX and Solidity for immutable records.",
    tags: ["React", "Solidity", "FastAPI", "Blockchain", "AI/ML"],
    emoji: "🛡️",
    color: "#1f2937",
    rotate: "rotate-[-2deg]",
    liveUrl: "https://truthchain-demo.vercel.app",
    githubUrl: "https://github.com/cainebenoy/truthchain",
  },
  {
    title: "Veritas Vault",
    description: "Decentralized archiving tool built for SFLC.in Nationwide Hackathon 2025.",
    longDescription: "A secure decentralized archive powered by Firebase and Web3 technology. Allows users to store and verify documents with cryptographic proofs. Perfect for legal, academic, and institutional record-keeping with blockchain timestamps.",
    tags: ["Next.js", "Firebase", "TypeScript", "Web3"],
    emoji: "🏛️",
    color: "#1e3a8a",
    rotate: "rotate-[1deg]",
    liveUrl: "https://veritas-vault.vercel.app",
    githubUrl: "https://github.com/cainebenoy/veritas-vault",
  },
  {
    title: "YU Playbook",
    description: "Unified sports management platform built for Tech4Social Good Hackathon.",
    longDescription: "An all-in-one sports management ecosystem. Handles team logistics, schedules, player stats, and community engagement. Built with Next.js and Firebase for real-time updates and scalable infrastructure.",
    tags: ["Next.js", "React", "Firebase", "TypeScript", "Tailwind"],
    emoji: "⚽",
    color: "#14532d",
    rotate: "rotate-[2deg]",
    liveUrl: "https://yuplaybook.vercel.app",
    githubUrl: "https://github.com/cainebenoy/yu-playbook",
  },
  {
    title: "Scold Me Amma!",
    description: "Humorous AI-powered scolding bot built for #UselessProjectsHackathon.",
    longDescription: "A fun, sarcastic AI bot powered by Google's Gemini API that delivers personalized scolding based on your actions. Built with problem-solving creativity and 'Vibe Coding' philosophy—pure chaotic fun!",
    tags: ["Gemini API", "Problem Solving", "Vibe Coding"],
    emoji: "👵",
    color: "#6b3410",
    rotate: "rotate-[-1.5deg]",
    liveUrl: "https://scold-me-amma.vercel.app",
    githubUrl: "https://github.com/cainebenoy/scold-me-amma",
  },
  {
    title: "Lo-Fi Study Timer",
    description: "Beautiful Pomodoro timer with animations and ambient sounds.",
    longDescription: "A zen productivity tool combining lo-fi music with the Pomodoro technique. Features smooth animations, customizable intervals, and atmospheric soundscapes to keep you focused without distractions.",
    tags: ["JavaScript", "HTML5", "CSS", "Git"],
    emoji: "🎵",
    color: "#2a4620",
    rotate: "rotate-[1.5deg]",
    liveUrl: "https://lofi-study-timer.vercel.app",
    githubUrl: "https://github.com/cainebenoy/lofi-study-timer",
  },
  {
    title: "Roast Me Daddy",
    description: "'Best Useless Project' winner at Vibe Coding Hackathon by TinkerHub.",
    longDescription: "A hilariously creative hackathon entry that won 'Best Useless Project'. Uses Gemini API to generate witty, personalized roasts. Pure comedy wrapped in code—because not everything needs to solve a problem!",
    tags: ["Gemini API", "Problem Solving", "Vibe Coding"],
    emoji: "🔥",
    color: "#7f1d1d",
    rotate: "rotate-[-1deg]",
    liveUrl: "https://roast-me-daddy.vercel.app",
    githubUrl: "https://github.com/cainebenoy/roast-me-daddy",
  },
];

export default function Work() {
  const { setHighlightedSkills } = useAppStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="work" className="relative z-10 min-h-screen py-16 animate-fade-in">
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
                onClick={() => handleProjectClick(project)}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={selectedProject} 
      />
    </section>
  );
}