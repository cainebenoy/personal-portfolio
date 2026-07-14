"use client";

import { useState } from "react";
import IndexCard from "@/components/archive/IndexCard";
import {
  ARCHIVE_ENTRIES,
  CATEGORIES,
  HIGHLIGHT_CREDENTIALS,
  REMAINING_COUNT,
  REMAINING_PLACEHOLDER_CREDENTIALS,
  type ArchiveCategory,
} from "@/content/archive";

type FilterId = "highlights" | ArchiveCategory | "all";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  { id: "all", label: "All" },
];

export default function ArchiveBrowser() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("highlights");
  const [expanded, setExpanded] = useState(false);

  const filtered =
    activeFilter === "highlights"
      ? HIGHLIGHT_CREDENTIALS
      : activeFilter === "all"
        ? ARCHIVE_ENTRIES
        : ARCHIVE_ENTRIES.filter((entry) => entry.category === activeFilter);

  return (
    <div className="mt-16">
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((filter) => {
          const isActive = filter.id === activeFilter;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-3 py-1 font-handwritten text-sm transition-colors ${
                isActive
                  ? "border-accent text-accent"
                  : "border-ink/20 text-ink/60 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-5">
        {filtered.length === 0 ? (
          <p className="font-structural text-sm text-ink/40">
            Nothing catalogued here yet.
          </p>
        ) : (
          filtered.map((entry, i) => (
            <IndexCard
              key={entry.name}
              name={entry.name}
              issuer={entry.issuer}
              index={i}
            />
          ))
        )}
      </div>

      <div className="mt-16 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="font-handwritten text-lg text-accent underline decoration-dashed underline-offset-4 hover:text-ink"
        >
          {expanded
            ? "Collapse the archive ↑"
            : `Declassify the remaining ${REMAINING_COUNT} ↓`}
        </button>

        {expanded && (
          <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {REMAINING_PLACEHOLDER_CREDENTIALS.map((entry, i) => (
              <div
                key={i}
                className="border border-ink/10 bg-cream/60 px-3 py-2"
              >
                <p className="font-structural text-xs text-ink/70">
                  {entry.name}
                </p>
                <p className="mt-1 font-structural text-[11px] text-ink/40">
                  {entry.issuer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
