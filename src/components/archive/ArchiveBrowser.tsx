"use client";

import { useState } from "react";
import IndexCard from "@/components/archive/IndexCard";
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

export default function ArchiveBrowser() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("highlights");

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
    </div>
  );
}
