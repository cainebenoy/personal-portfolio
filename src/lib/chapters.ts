// The nine chapters of the scroll, in reading order. The readout, header
// nav, and section headers all reference this one sequence — the numbering
// is real structure, not decoration.
export interface Chapter {
  id: string;
  num: string;
  label: string;
}

export const CHAPTERS: Chapter[] = [
  { id: "thesis", num: "01", label: "Thesis" },
  { id: "proof", num: "02", label: "Proof" },
  { id: "range", num: "03", label: "Range" },
  { id: "work", num: "04", label: "Work" },
  { id: "record", num: "05", label: "Record" },
  { id: "notes", num: "06", label: "Notes" },
  { id: "archive", num: "07", label: "Archive" },
  { id: "about", num: "08", label: "Off the Record" },
  { id: "contact", num: "09", label: "Contact" },
];

export function chapter(id: string): Chapter {
  const c = CHAPTERS.find((ch) => ch.id === id);
  if (!c) throw new Error(`Unknown chapter id: ${id}`);
  return c;
}

// The subset that appears in the header nav — enough to move around, not a
// table of contents. "Off the Record" is too long for a nav link, so the
// nav gets a short label override.
export const NAV_CHAPTER_IDS = ["work", "range", "record", "about"] as const;

export const NAV_LABELS: Record<string, string> = {
  about: "About",
};

export function navLabel(id: string): string {
  return NAV_LABELS[id] ?? chapter(id).label;
}
