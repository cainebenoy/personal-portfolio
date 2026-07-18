export interface EducationEntry {
  range: string;
  institution: string;
  // Swap in the exact programme name (e.g. "BSc Computer Science") — kept
  // generic until confirmed rather than guessing at the degree title.
  degree: string;
  note?: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    range: "2023 – 2026",
    institution: "Sahrdaya College of Advanced Studies, Kodakara",
    degree: "Undergraduate — Class of 2026",
    note: "Campus Lead, TinkerHub SCAS · Quiz Club Coordinator",
  },
];
