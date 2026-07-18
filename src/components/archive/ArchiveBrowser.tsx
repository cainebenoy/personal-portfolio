"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ARCHIVE_ENTRIES,
  CATEGORIES,
  HIGHLIGHT_CREDENTIALS,
  type ArchiveCategory,
  type ArchiveCredential,
} from "@/content/archive";

type FilterId = "highlights" | ArchiveCategory | "all";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  { id: "all", label: "All" },
];

function entriesFor(id: FilterId): ArchiveCredential[] {
  if (id === "highlights") return HIGHLIGHT_CREDENTIALS;
  if (id === "all") return ARCHIVE_ENTRIES;
  return ARCHIVE_ENTRIES.filter((entry) => entry.category === id);
}

// The drawers, on Radix Tabs: arrow keys walk the filters, the active one
// gets the red underline, and each drawer re-deals its rows on open.
export default function ArchiveBrowser() {
  return (
    <div data-reveal className="mt-14">
      <Tabs defaultValue="highlights">
        <TabsList aria-label="Filter credentials">
          {FILTERS.map((filter) => (
            <TabsTrigger key={filter.id} value={filter.id}>
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {FILTERS.map((filter) => (
          <TabsContent key={filter.id} value={filter.id}>
            <ol className="flex flex-col">
              {entriesFor(filter.id).map((entry, i) => (
                <li
                  key={entry.name}
                  className="deal-in flex items-baseline justify-between gap-6 border-b border-line-faint py-3.5"
                  style={{ "--deal-i": Math.min(i, 14) } as React.CSSProperties}
                >
                  <span className="min-w-0 text-[0.95rem] leading-6 text-ink/85">
                    {entry.name}
                  </span>
                  <span className="mono-tag shrink-0 text-ink/55">
                    {entry.issuer}
                  </span>
                </li>
              ))}
            </ol>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
