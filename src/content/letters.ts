export interface Letter {
  quote: string;
  name: string;
  role: string;
}

// Letters of record — short quotes from people who've worked with Caine
// (a TinkerHub organizer, a teammate, an event lead). The section renders
// only when this list is non-empty, so it stays invisible until real
// quotes are collected. No invented testimonials, ever.
export const LETTERS: Letter[] = [];
