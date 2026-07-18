"use client";

import { PROJECTS } from "@/content/projects";
import { scrollToId } from "@/lib/motion";

// The case index — a jump list for the six spreads below. Real anchors, so
// it works without JS; clicks are upgraded to the site's eased scroll.
export default function WorkIndex() {
  return (
    <ol data-reveal-group className="mt-16 flex flex-col">
      {PROJECTS.map((project, i) => (
        <li key={project.slug} data-reveal-item>
          <a
            href={`#p-${project.slug}`}
            onClick={(e) => {
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
                return;
              e.preventDefault();
              scrollToId(`p-${project.slug}`);
            }}
            className="group flex cursor-pointer items-baseline gap-5 border-t border-line-faint py-4 transition-colors duration-300 last:border-b hover:bg-raised/60 sm:gap-8"
          >
            <span className="mono-tag text-red">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 truncate font-display text-xl text-ink transition-colors duration-300 group-hover:text-accent-bright sm:text-2xl">
              {project.title}
            </span>
            <span
              aria-hidden="true"
              className="hidden min-w-8 flex-1 border-b border-dashed border-line-faint sm:block"
            />
            <span className="mono-tag hidden shrink-0 text-ink/55 sm:block">
              {project.status}
            </span>
            <span
              aria-hidden="true"
              className="mono-tag shrink-0 text-ink/55 transition-[color,translate] duration-300 group-hover:translate-y-0.5 group-hover:text-accent"
            >
              ↓
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
