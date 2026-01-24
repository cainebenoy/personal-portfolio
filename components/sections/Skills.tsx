"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAppStore } from "@/lib/useAppStore";
import { cn } from "@/lib/utils";

const skills = [
  "Next.js", "TypeScript", "React", "Python", "Solidity", 
  "Blockchain", "AI/ML", "Firebase", "Tailwind", "Three.js",
  "Community", "Events", "Figma", "Node.js", "Systems", 
  "Public Speaking", "Hackathons", "Problem Solving", "Dart", 
  "Flutter", "Smart Contracts", "Web3", "Gemini API", "GCP"
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { highlightedSkills } = useAppStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Randomly rotate elements for messy feel
      gsap.utils.toArray<HTMLElement>(".skill-word").forEach((el) => {
        gsap.to(el, {
          rotation: Math.random() * 10 - 5, // -5 to 5 deg
          duration: 0,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative z-10 min-h-[80vh] flex items-center justify-center py-24">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        
        <div className="mb-16 relative inline-block reveal">
          <span className="font-hand text-4xl text-ink underline decoration-wavy decoration-highlight decoration-2 underline-offset-8">
            The Arsenal (68+ Skills)
          </span>
          <p className="mt-4 font-sans text-sm text-gray-500">
            Hover over projects to trace the stack
          </p>

          {/* Stamp Badge Decoration */}
          <div className="hidden lg:block absolute -top-12 -right-32 rotate-12 opacity-80 pointer-events-none select-none">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-double border-blueInk p-2 text-center font-marker text-xs leading-tight text-blueInk mask-image-grunge">
              GOOGLE<br />CYBER<br />SECURITY
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 transition-all duration-300">
          {skills.map((skill) => {
            // Check if this skill should be highlighted
            const isHighlighted = highlightedSkills.some(s => 
              skill.toLowerCase().includes(s.toLowerCase()) || 
              s.toLowerCase().includes(skill.toLowerCase())
            );
            
            // If something is highlighted, but NOT this one, dim this one
            const isDimmed = highlightedSkills.length > 0 && !isHighlighted;

            return (
              <div
                key={skill}
                className={cn(
                  "skill-word cursor-default font-display text-3xl transition-all duration-300 md:text-5xl",
                  isHighlighted 
                    ? "text-highlight scale-125 z-20" 
                    : "text-gray-300 hover:scale-110 hover:text-ink",
                  isDimmed ? "opacity-20 blur-[1px]" : "opacity-100"
                )}
              >
                {skill}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}