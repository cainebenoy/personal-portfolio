import type { TradeId } from "./trades";

export interface Project {
  slug: string;
  title: string;
  // One-line editorial descriptor set under the title — what it is, sharply.
  tagline: string;
  // Mono status chip, uppercase-set in the UI.
  status: string;
  // Event / date context line. Omitted where the record doesn't have one —
  // never invented.
  context?: string;
  // Which of the six trades this build drew on — the glyphs shown on the
  // spread. Derived from the original trades-map edge data.
  trades: TradeId[];
  problem: string;
  approach: string;
  build: string;
  outcome?: string;
  stack: string[];
}

// Reading order of the case index — the sequence the page tells them in.
export const PROJECTS: Project[] = [
  {
    slug: "the-love-protocol",
    title: "The Love Protocol",
    tagline: "Spotify Wrapped, for a relationship — shipped in 48 hours.",
    status: "Live — 1,700+ users",
    context: "Shipped Valentine's Day 2026",
    trades: ["builder", "strategist"],
    problem:
      "Generic Valentine's gifts get thrown away. There's no equivalent of \"Wrapped\" for a relationship — no way to turn shared history into something someone would actually want to keep.",
    approach:
      "Two paths in one app: couples get a 7-day unlockable story of their relationship, singles get blind matching on a custom compatibility algorithm. Shipped fast enough to catch the actual holiday, not just the idea of it.",
    build:
      "Next.js 16 with Turso for storage and Tailwind v4 driving the interactive timeline UI — built and deployed inside the 48-hour window before February 14.",
    outcome:
      "6,013 page views, 1,758 visitors, and over 400 singles matched inside the launch window.",
    stack: ["Next.js 16", "Turso", "Tailwind v4"],
  },
  {
    slug: "votechain",
    title: "VoteChain",
    tagline: "A voting machine you can audit — fingerprint in, chain out.",
    status: "Live — prototype",
    trades: ["machinist", "chainsmith"],
    problem:
      "Digital voting asks people to trust a black box — no physical proof, no way to verify a vote wasn't altered after the fact. Physical voting solves trust but doesn't scale or digitize. Neither half works alone.",
    approach:
      "Pair a physical identity check with a permanent digital record: a voter authenticates in person by fingerprint, casts at a physical kiosk, and the vote is anchored on-chain the moment it's cast — human-verified and tamper-proof at once.",
    build:
      "Raspberry Pi running the kiosk logic, a fingerprint scanner for biometric authentication, a blockchain layer recording each vote as an immutable transaction, and a Next.js dashboard for live results and admin oversight.",
    stack: ["Raspberry Pi", "Biometrics", "Blockchain", "Next.js"],
  },
  {
    slug: "truthchain",
    title: "TruthChain",
    tagline: "Deepfake detection with a verdict you can prove.",
    status: "Shipped — MVP",
    trades: ["intelligence", "chainsmith"],
    problem:
      "Deepfakes outpaced every reliable way to verify what's real. Detection alone isn't enough — a verdict needs to be provable and permanent, not just asserted.",
    approach:
      "A dual-user system: creators register authentic content, consumers verify media against tamper-proof records in real time.",
    build:
      "Python/FastAPI backend running Hugging Face Transformers for detection, Solidity contracts on Sepolia anchoring content hashes as immutable proof-of-authenticity, and a React/TypeScript frontend talking to the chain through Ethers.js.",
    stack: ["FastAPI", "Transformers", "Solidity", "React", "Ethers.js"],
  },
  {
    slug: "ey-buzzer-system",
    title: "EY Buzzer System",
    tagline: "Stage hardware with millisecond stakes, built in four days.",
    status: "Shipped — one-off build",
    context: "LUFTETAR 2026, national management fest",
    trades: ["builder", "machinist"],
    problem:
      "A live fest finale needed a buzzer round with real stakes — millisecond-precision timing, dramatic tension, a stage-ready display — with four days' notice and no existing hardware to adapt.",
    approach:
      "Treat it as a live production problem, not a hobby circuit: reliability under pressure first, polish second. Breadboard to working system fast enough to rehearse the actual event flow with it.",
    build:
      "Arduino Nano latching buttons at microsecond precision across multiple stations, with a custom Python dashboard projected on the main stage to call winners and queue runners-up in real time.",
    outcome:
      "Ran the finale without a hitch — and earned EY-branded recognition from the event's title sponsor for the build.",
    stack: ["Arduino Nano", "Python", "Custom hardware"],
  },
  {
    slug: "veritas-vault",
    title: "Veritas Vault",
    tagline: "A save button for the parts of the web that disappear.",
    status: "Shipped — MVP",
    context: "SFLC.in Nationwide Hackathon 2025",
    trades: ["builder", "chainsmith"],
    problem:
      "At-risk content on the open web vanishes — takedowns, censorship, link rot — with no easy way for ordinary users to preserve it before it's gone.",
    approach:
      "One-click archiving for the modern web: paste a URL and the tool scrapes, sanitizes, and stores a permanent copy — with a public gallery so archived content stays discoverable instead of dying in a private backup.",
    build:
      "Next.js App Router with TypeScript, Firebase Auth/Firestore/App Hosting with live-updating gallery via Firestore listeners, simulated IPFS storage with Polygon proof-of-existence, and debounced search and tagging for discovery.",
    stack: ["Next.js", "TypeScript", "Firebase", "IPFS", "Polygon"],
  },
  {
    slug: "yu-playbook",
    title: "YU Playbook",
    tagline: "One platform to retire a sports league's spreadsheets.",
    status: "Shipped — MVP",
    context: "Tech4Social Good Hackathon",
    trades: ["operator", "builder"],
    problem:
      "Y-Ultimate ran an entire league on disjointed spreadsheets — no shared view for admins, coaches, or players, and no way to track a player's history across coaching and tournaments.",
    approach:
      "Replace the spreadsheets with one platform built around roles: admins run tournaments and schedules, coaches log attendance and development, players get a unified profile linking both sides of their record.",
    build:
      "Next.js 15 with React Server Components, Firebase Auth and Firestore behind it, shadcn/ui and Tailwind for the interface — with real-time tournament scoring and automated standings.",
    outcome:
      "Shipped as a complete full-stack platform — built entirely during university semester exam week.",
    stack: ["Next.js 15", "Firebase", "shadcn/ui", "Tailwind"],
  },
];

export function projectIndex(slug: string): string {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return String(i + 1).padStart(2, "0");
}
