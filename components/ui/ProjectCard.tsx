"use client";

/* eslint-disable no-inline-styles */
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  color: string;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  emoji,
  color,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "polaroid group relative bg-white p-4 pb-12 shadow-lg transition-all duration-500 ease-out hover:z-20 hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl cursor-none",
        className
      )}
    >
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 h-8 w-32 -translate-x-1/2 -rotate-2 bg-white/40 backdrop-blur-sm shadow-sm" />

      {/* Image Placeholder area */}
      <div
        className="relative flex h-64 w-full items-center justify-center overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0 project-card-image"
        style={{ backgroundColor: color }}
      >
        <div className="text-center text-white">
          <div className="mb-2 text-6xl">{emoji}</div>
          <div className="font-mono text-xl tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {title.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 text-center">
        <h3 className="font-marker text-3xl text-ink">{title}</h3>
        <p className="mt-2 font-hand text-xl text-gray-600">{description}</p>
        
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 px-2 py-1 font-code text-xs text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}