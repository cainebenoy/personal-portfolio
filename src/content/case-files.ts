export interface CaseFileEntry {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  problem: string;
  approach: string;
  architecture: string;
  imageAlt?: string;
}

// Add a new case file by adding an entry here — the /work/[slug] route
// and template pick it up automatically, no other changes needed.
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
};

export function getCaseFile(slug: string): CaseFileEntry | undefined {
  return CASE_FILES[slug];
}
