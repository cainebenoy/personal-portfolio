export type TradeId =
  | "builder"
  | "machinist"
  | "chainsmith"
  | "intelligence"
  | "operator"
  | "strategist";

export interface TradeNode {
  id: TradeId;
  label: string;
  description: string;
  x: number;
  y: number;
}

export interface TradeEdge {
  from: TradeId;
  to: TradeId;
  bend: number;
  project: string;
  slug: string;
}

// Loose hexagonal/orbital layout, hand-jittered off the perfect hex points.
export const TRADE_NODES: TradeNode[] = [
  {
    id: "builder",
    label: "The Builder",
    description: "Ships full products, end to end.",
    x: 49,
    y: 19,
  },
  {
    id: "machinist",
    label: "The Machinist",
    description: "Builds the hardware and systems underneath.",
    x: 80,
    y: 33,
  },
  {
    id: "chainsmith",
    label: "The Chainsmith",
    description: "Forges smart contracts and on-chain infrastructure.",
    x: 75,
    y: 69,
  },
  {
    id: "intelligence",
    label: "The Intelligence",
    description: "Applies AI where it actually earns its keep.",
    x: 45,
    y: 85,
  },
  {
    id: "operator",
    label: "The Operator",
    description: "Runs the playbook that keeps things moving.",
    x: 15,
    y: 67,
  },
  {
    id: "strategist",
    label: "The Strategist",
    description: "Plans the moves before anyone else sees them.",
    x: 18,
    y: 29,
  },
];

export const TRADE_EDGES: TradeEdge[] = [
  {
    from: "builder",
    to: "machinist",
    bend: 4,
    project: "EY Buzzer System",
    slug: "ey-buzzer-system",
  },
  {
    from: "machinist",
    to: "chainsmith",
    bend: -3,
    project: "VoteChain",
    slug: "votechain",
  },
  {
    from: "intelligence",
    to: "chainsmith",
    bend: 3,
    project: "TruthChain",
    slug: "truthchain",
  },
  {
    from: "builder",
    to: "chainsmith",
    bend: -6,
    project: "Veritas Vault",
    slug: "veritas-vault",
  },
  {
    from: "builder",
    to: "strategist",
    bend: -4,
    project: "The Love Protocol",
    slug: "love-protocol",
  },
  {
    from: "operator",
    to: "builder",
    bend: 5,
    project: "YU Playbook",
    slug: "yu-playbook",
  },
];

export function nodeById(id: TradeId): TradeNode {
  const node = TRADE_NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown trade id: ${id}`);
  return node;
}

export function edgesForNode(id: TradeId): TradeEdge[] {
  return TRADE_EDGES.filter((e) => e.from === id || e.to === id);
}
