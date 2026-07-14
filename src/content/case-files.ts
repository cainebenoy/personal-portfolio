export interface CaseFileEntry {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  problem: string;
  approach: string;
  architecture: string;
  outcome?: string;
  imageAlt?: string;
}

// Add a new case file by adding an entry here — the homepage picks it up
// automatically via CASE_FILE_ORDER in src/app/page.tsx.
export const CASE_FILES: Record<string, CaseFileEntry> = {
  truthchain: {
    slug: "truthchain",
    title: "TruthChain",
    subtitle: "[event / date]",
    status: "Shipped — MVP",
    problem:
      "Deepfakes and manipulated media had outpaced any reliable way to verify what's real. Detection alone isn't enough — a verdict needs to be provable and permanent, not just asserted.",
    approach:
      "A dual-user system: creators register authentic content, consumers verify it against tamper-proof records in real time.",
    architecture:
      "A Python/FastAPI backend using Hugging Face Transformers for deepfake detection, paired with Solidity smart contracts deployed on the Sepolia testnet to anchor content hashes as immutable proof-of-authenticity. React/TypeScript/Vite frontend, Ethers.js for chain interaction.",
  },
  votechain: {
    slug: "votechain",
    title: "VoteChain",
    subtitle: "Cyber-physical voting system",
    status: "Live — Prototype",
    problem:
      "Digital voting systems ask people to trust a black box — no physical proof, no way to verify a vote wasn't altered after the fact. Physical voting solves trust but doesn't scale or digitize records. Neither half works alone.",
    approach:
      "Pair a physical identity check with a permanent digital record. A voter authenticates in person via fingerprint, casts a vote through a physical kiosk, and that vote is anchored on-chain the moment it's cast — making the record both human-verified and tamper-proof.",
    architecture:
      "Raspberry Pi running the kiosk logic, a fingerprint scanner for biometric authentication, a blockchain layer recording each vote as an immutable transaction, and a Next.js dashboard for real-time result tracking and admin oversight.",
  },
  "veritas-vault": {
    slug: "veritas-vault",
    title: "Veritas Vault",
    subtitle: "Built for SFLC.in Nationwide Hackathon 2025",
    status: "Shipped — MVP",
    problem:
      "At-risk content on the open web disappears — pulled by takedown requests, censorship, or just link rot — with no easy way for ordinary users to preserve it before it's gone.",
    approach:
      "A one-click \"Save Page As\" for the modern web: paste a URL, and the tool scrapes, sanitizes, and stores a permanent copy, with a public gallery so archived content stays discoverable rather than sitting in a private backup no one can find.",
    architecture:
      "Next.js (App Router) with TypeScript frontend, Firebase (Auth, Firestore, App Hosting) for real-time data and a live-updating public gallery via Firestore listeners, simulated IPFS storage and Polygon proof-of-existence for decentralized immutability, debounced search and tagging for discovery.",
  },
  "ey-buzzer-system": {
    slug: "ey-buzzer-system",
    title: "EY Buzzer System",
    subtitle: "Built for LUFTETAR 2026, National Management Fest",
    status: "Shipped — One-off build",
    problem:
      "A live fest finale needed a buzzer round with real stakes — millisecond-precision timing, dramatic tension, and a stage-ready display — with four days' notice and no existing hardware to adapt.",
    approach:
      "Treat it like a live production problem, not a hobby circuit: build for reliability under pressure first, polish second. Go from breadboard concept to a working system fast enough to still have time to rehearse the actual event flow with it.",
    architecture:
      "Arduino Nano handling microsecond-level button latching across multiple stations, a custom Python dashboard projected live on the main stage to track winners and queue runners-up in real time.",
    outcome:
      "Ran the finale without a hitch — and impressed EY (the event's title sponsor) enough to earn EY-branded recognition for the build.",
  },
  "the-love-protocol": {
    slug: "the-love-protocol",
    title: "The Love Protocol",
    subtitle: "Shipped Valentine's Day 2026",
    status: "Live — 1,700+ users",
    problem:
      "Generic Valentine's gifts get thrown away. There's no equivalent of \"Spotify Wrapped\" for a relationship — no way to turn shared history into something someone would actually want to keep.",
    approach:
      "Build two paths in one app: couples get a 7-day unlockable story of their relationship, singles get a blind-matching protocol powered by a custom compatibility algorithm. Ship it fast enough to catch the actual holiday, not just the idea of it.",
    architecture:
      "Next.js 16, Turso for data storage, Tailwind v4 for the interactive timeline UI.",
    outcome:
      "6,013 page views, 1,758 visitors, and over 400 singles matched within the launch window — built and shipped in 48 hours.",
  },
  "yu-playbook": {
    slug: "yu-playbook",
    title: "YU Playbook",
    subtitle: "Built for Tech4Social Good Hackathon",
    status: "Shipped — MVP",
    problem:
      "Y-Ultimate, a sports league, was running entirely on disjointed spreadsheets — no shared view for admins, coaches, or players, and no way to track a player's history across both coaching and tournaments.",
    approach:
      "Replace the spreadsheets with one platform built around roles: admins manage tournaments and schedules, coaches log attendance and development, players get a unified profile linking both sides of their record.",
    architecture:
      "Next.js 15 (React Server Components), Firebase (Auth & Firestore) for the backend, ShadCN UI and Tailwind CSS for the interface. Built with real-time tournament scoring and automated standings.",
    outcome:
      "Shipped as a complete full-stack platform — built entirely during university semester exam week.",
  },
};

export function getCaseFile(slug: string): CaseFileEntry | undefined {
  return CASE_FILES[slug];
}
