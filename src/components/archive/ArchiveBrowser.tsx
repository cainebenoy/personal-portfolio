"use client";

import { useState } from "react";
import {
  ARCHIVE_ENTRIES,
  CATEGORIES,
  HIGHLIGHT_CREDENTIALS,
  type ArchiveCategory,
} from "@/content/archive";

type FilterId = "highlights" | ArchiveCategory | "all";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  { id: "all", label: "All" },
];

// The drawers: a filter row over a ruled ledger of credentials. Switching
// drawers re-deals the rows (plain CSS animation — this interaction should
// feel instant, not choreographed).
export default function ArchiveBrowser() {
  const [active, setActive] = useState<FilterId>("highlights");

  const filtered =
    active === "highlights"
      ? HIGHLIGHT_CREDENTIALS
      : active === "all"
        ? ARCHIVE_ENTRIES
        : ARCHIVE_ENTRIES.filter((entry) => entry.category === active);

  return (
    <div data-reveal className="mt-14">
      <div
        role="group"
        aria-label="Filter credentials"
        className="flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-4"
      >
        {FILTERS.map((filter) => {
          const isActive = filter.id === active;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              aria-pressed={isActive}
              className={`mono-tag relative cursor-pointer py-1.5 transition-colors duration-300 ${
                isActive ? "text-accent" : "text-ink/50 hover:text-ink"
              }`}
            >
              {filter.label}
              <span
                aria-hidden="true"
                className={`absolute right-0 -bottom-[calc(1rem+1px)] left-0 h-px bg-accent transition-transform duration-300 ease-out-expo ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transformOrigin: "left" }}
              />
            </button>
          );
        })}
      </div>

      {/* Keyed by filter so a drawer switch re-deals the rows. */}
      <ol key={active} className="flex flex-col">
        {filtered.map((entry, i) => (
          <li
            key={entry.name}
            className="deal-in flex items-baseline justify-between gap-6 border-b border-line-faint py-3.5"
            style={{ "--deal-i": Math.min(i, 14) } as React.CSSProperties}
          >
            <span className="min-w-0 text-[0.925rem] leading-6 text-ink/85">
              {entry.name}
            </span>
            <span className="mono-tag shrink-0 text-ink/40">
              {entry.issuer}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
