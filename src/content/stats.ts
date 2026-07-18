export interface Stat {
  value: string;
  label: string;
}

// The proof strip — running totals. Values stay parseable by the counter:
// leading digits (commas allowed) plus an optional suffix like "+" or "x".
export const STATS: Stat[] = [
  { value: "9x", label: "Fest & hackathon wins" },
  { value: "1,700+", label: "Users shipped to" },
  { value: "166", label: "Credentials on file" },
  { value: "6+", label: "Hackathons organized" },
  { value: "500+", label: "Network connections" },
  { value: "3", label: "Years building in public" },
];
