"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/ui/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const skills = [
  "Next.js", "TypeScript", "React", "Python", "Solidity", 
  "Blockchain", "AI/ML", "Firebase", "Tailwind", "Three.js",
  "Community", "Events", "Figma", "Node.js", "Systems", 
  "Public Speaking", "Hackathons", "Problem Solving", "Dart", 
  "Flutter", "Smart Contracts", "Web3", "Gemini API", "GCP"
];

const projects = [
  {
    title: "TruthChain",
    description: "AI & Blockchain Content Authenticity Platform built during The Big Hack at Tech Habba 2025. Features AI detection layer using FastAPI & Transformers, Solidity smart contracts on Sepolia Testnet, and dual-user workflow for creators and consumers.",
    tags: ["React", "Solidity", "FastAPI", "Blockchain", "AI/ML"],
    emoji: "🛡️",
    color: "#1f2937",
    rotate: "rotate-[-2deg]",
  },
  {
    title: "Veritas Vault",
    description: "Decentralized archiving tool built for SFLC.in Nationwide Hackathon 2025. One-click content archiving with IPFS simulation and Polygon blockchain proof-of-existence. Features real-time gallery with Firebase Firestore and debounced search.",
    tags: ["Next.js", "Firebase", "TypeScript", "Web3"],
    emoji: "🏛️",
    color: "#1e3a8a",
    rotate: "rotate-[1deg]",
  },
  {
    title: "YU Playbook",
    description: "Unified sports management platform built for Tech4Social Good Hackathon. Features role-based dashboards for admins, coaches, and players. Real-time tournament scoring, automated standings, and unified player profiles linking coaching and tournament stats.",
    tags: ["Next.js", "React", "Firebase", "TypeScript", "Tailwind"],
    emoji: "⚽",
    color: "#14532d",
    rotate: "rotate-[2deg]",
  },
  {
    title: "Scold Me Amma!",
    description: "A humorous, AI-powered scolding bot built for #UselessProjectsHackathon with teammate Adhityan Vembanat. Perfect for those missing familiar voices reminding them about life choices. Vibe coding at its finest.",
    tags: ["Gemini API", "Problem Solving", "Vibe Coding"],
    emoji: "👵",
    color: "#6b3410",
    rotate: "rotate-[-1.5deg]",
  },
  {
    title: "Lo-Fi Study Timer",
    description: "Beautiful Pomodoro timer with smooth gradient animations and ambient sounds. Features dark/light modes, keyboard shortcuts, and session tracking. Built with vanilla JavaScript to prove that simplicity is productivity.",
    tags: ["JavaScript", "HTML5", "CSS", "Git"],
    emoji: "🎵",
    color: "#2a4620",
    rotate: "rotate-[1.5deg]",
  },
  {
    title: "Roast Me Daddy",
    description: "'Best Useless Project' winner at Vibe Coding Hackathon by TinkerHub. Leverages Google Gemini's API for satirical roasts. Features fashion analysis from photos, profile-based roasts from GitHub/LinkedIn/Instagram, and typing speed assessments.",
    tags: ["Gemini API", "Problem Solving", "Vibe Coding"],
    emoji: "🔥",
    color: "#7f1d1d",
    rotate: "rotate-[-1deg]",
  },
];

export default function WorkAndSkills() {
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Random float animation for skills
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-word").forEach((el) => {
        gsap.to(el, {
          rotation: Math.random() * 10 - 5,
          duration: 0,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="relative z-10 py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT COL: Skills (Sticky) */}
          <div className="lg:w-5/12 relative">
            <div className="sticky top-32 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <div className="mb-8">
                <h2 className="font-display text-5xl md:text-7xl text-ink">The Arsenal</h2>
                <p className="mt-4 font-hand text-xl text-gray-500">
                  Hover over the projects &rarr; <br className="lg:hidden"/>
                  <span className="hidden lg:inline">to trace the stack.</span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 transition-all duration-500 bg-white/40 p-6 rounded-2xl border-2 border-dashed border-gray-300 backdrop-blur-sm">
                {skills.map((skill) => {
                  const isHighlighted = highlightedSkills.some(s => 
                    skill.toLowerCase().includes(s.toLowerCase()) || 
                    s.toLowerCase().includes(skill.toLowerCase())
                  );
                  
                  const isDimmed = highlightedSkills.length > 0 && !isHighlighted;

                  return (
                    <div
                      key={skill}
                      className={cn(
                        "skill-word cursor-default font-display text-2xl md:text-3xl transition-all duration-300",
                        isHighlighted ? "text-highlight scale-125 z-20 font-bold" : "text-gray-300",
                        isDimmed ? "opacity-20 blur-[1px]" : "opacity-100 hover:text-gray-400"
                      )}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
              
              {/* Decor */}
              <div className="mt-8 hidden lg:block rotate-3">
                 <span className="font-marker text-ink text-sm border-b-2 border-ink">68+ TOOLS MASTERED</span>
              </div>

            </div>
          </div>

          {/* RIGHT COL: Projects (Scrollable) */}
          <div className="lg:w-7/12 flex flex-col gap-24 lg:pt-32">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={cn(
                  "transition-all duration-500",
                  index % 2 === 0 ? "lg:ml-12" : "" // Slight stagger
                )}
                onMouseEnter={() => setHighlightedSkills(project.tags)}
                onMouseLeave={() => setHighlightedSkills([])}
              >
                <div className="relative group">
                    {/* Connection Line (Visual Connector) */}
                    <div className={cn(
                        "hidden lg:block absolute top-1/2 -left-32 w-32 h-[2px] bg-highlight origin-right transition-all duration-300",
                        highlightedSkills.length > 0 && highlightedSkills === project.tags ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    )} />
                    
                    <ProjectCard
                        {...project}
                        className={project.rotate}
                    />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}