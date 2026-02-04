"use client";

import { Award, Trophy } from "lucide-react";

const honors = [
  {
    title: "IIC Ideathon 2nd Prize",
    category: "Innovation & Ideation",
    icon: Trophy,
  },
  {
    title: "Best Marketing Team",
    category: "Event Excellence",
    icon: Award,
  },
  {
    title: "9x College Fest Winner",
    category: "Hackathons & Competitions",
    icon: Trophy,
  },
];

export default function Honors() {
  return (
    <section id="honors" className="relative z-10 py-16 animate-fade-in">
      <div className="mx-auto max-w-6xl px-4">
        
        <h2 className="mb-16 font-display text-5xl text-ink md:text-7xl text-center reveal">
          Honors & Awards
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {honors.map((honor, i) => {
            const IconComponent = honor.icon;
            return (
              <div
                key={i}
                className="group relative rounded-xl border-2 border-dashed theme-border theme-surface-alt p-8 backdrop-blur-sm transition-all duration-300 hover:border-highlight hover:theme-surface hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6 inline-block rounded-full bg-highlight/10 p-4 text-highlight group-hover:bg-highlight/20 transition-all">
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-marker text-2xl text-ink mb-2">{honor.title}</h3>
                <p className="font-hand text-lg theme-muted mb-4">{honor.category}</p>

                {/* Decorative Element */}
                <div className="absolute -top-3 -right-3 h-6 w-6 rotate-45 border-2 border-highlight opacity-0 transition-all group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
