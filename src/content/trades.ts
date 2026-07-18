export type TradeId =
  | "builder"
  | "machinist"
  | "chainsmith"
  | "intelligence"
  | "operator"
  | "strategist";

export interface Trade {
  id: TradeId;
  // Roman numeral coordinate — the trades are a legend, not a ranking, but
  // the numerals give every glyph a stable address across the site.
  numeral: string;
  name: string;
  line: string;
}

// The six trades — the organizing system of the whole site. Each one has a
// matching stroke-drawn glyph in src/components/Glyph.tsx, and every project
// in src/content/projects.ts declares which trades it drew on.
export const TRADES: Trade[] = [
  {
    id: "builder",
    numeral: "I",
    name: "The Builder",
    line: "Ships full products, end to end.",
  },
  {
    id: "machinist",
    numeral: "II",
    name: "The Machinist",
    line: "Builds the hardware and systems underneath.",
  },
  {
    id: "chainsmith",
    numeral: "III",
    name: "The Chainsmith",
    line: "Forges smart contracts and on-chain infrastructure.",
  },
  {
    id: "intelligence",
    numeral: "IV",
    name: "The Intelligence",
    line: "Applies AI where it actually earns its keep.",
  },
  {
    id: "operator",
    numeral: "V",
    name: "The Operator",
    line: "Runs the playbook that keeps things moving.",
  },
  {
    id: "strategist",
    numeral: "VI",
    name: "The Strategist",
    line: "Plans the moves before anyone else sees them.",
  },
];

export function tradeById(id: TradeId): Trade {
  const trade = TRADES.find((t) => t.id === id);
  if (!trade) throw new Error(`Unknown trade id: ${id}`);
  return trade;
}
