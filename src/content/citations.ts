export interface Citation {
  title: string;
  context: string;
  year?: string;
}

// The stats strip claims 9 wins; this ledger names them. Two are on the
// record elsewhere on the site — add the remaining citations (title +
// event) as they're confirmed, and the "n of 9 on file" line updates
// itself.
export const WINS_TOTAL = 9;

export const CITATIONS: Citation[] = [
  {
    title: "EY-branded recognition",
    context: "EY Buzzer System · LUFTETAR, national management fest",
    year: "2026",
  },
  {
    title: "Best Useless Project",
    context: "Vibe Coding Hackathon",
  },
];
