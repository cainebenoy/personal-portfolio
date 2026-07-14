export type ArchiveCategory =
  | "ai-ml"
  | "cloud-devops"
  | "blockchain-web3"
  | "cybersecurity"
  | "business-marketing";

export interface ArchiveCredential {
  name: string;
  issuer: string;
  categories: ArchiveCategory[];
}

export const CATEGORIES: { id: ArchiveCategory; label: string }[] = [
  { id: "ai-ml", label: "AI / ML" },
  { id: "cloud-devops", label: "Cloud & DevOps" },
  { id: "blockchain-web3", label: "Blockchain & Web3" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "business-marketing", label: "Business & Marketing" },
];

export const TOTAL_CREDENTIALS = 166;
export const REMAINING_COUNT = 158;

export const HIGHLIGHT_CREDENTIALS: ArchiveCredential[] = [
  {
    name: "Google Cybersecurity Certificate",
    issuer: "Google",
    categories: ["cybersecurity"],
  },
  {
    name: "AWS Foundations - Getting Started with Cloud Essentials",
    issuer: "AWS",
    categories: ["cloud-devops"],
  },
  {
    name: "McKinsey.org Forward Program",
    issuer: "McKinsey.org",
    categories: ["business-marketing"],
  },
  {
    name: "Certification: Blockchain Basics (Cyfrin Updraft)",
    issuer: "Cyfrin Updraft",
    categories: ["blockchain-web3"],
  },
  {
    name: "Introduction to Software Engineering (IBM/Coursera)",
    issuer: "IBM / Coursera",
    categories: ["cloud-devops"],
  },
  {
    name: "Cambridge English Linguaskill (C1)",
    issuer: "Cambridge",
    categories: ["business-marketing"],
  },
];

// Placeholder sample entries so every filter chip has something to show —
// real category assignments and the full catalog come later.
export const SAMPLE_CREDENTIALS: ArchiveCredential[] = [
  {
    name: "Placeholder: Deep Learning Specialization",
    issuer: "Issuer TBD",
    categories: ["ai-ml"],
  },
  {
    name: "Placeholder: Prompt Engineering for Developers",
    issuer: "Issuer TBD",
    categories: ["ai-ml"],
  },
  {
    name: "Placeholder: Kubernetes Fundamentals",
    issuer: "Issuer TBD",
    categories: ["cloud-devops"],
  },
  {
    name: "Placeholder: Solidity Smart Contract Security",
    issuer: "Issuer TBD",
    categories: ["blockchain-web3"],
  },
  {
    name: "Placeholder: Network Security Essentials",
    issuer: "Issuer TBD",
    categories: ["cybersecurity"],
  },
  {
    name: "Placeholder: Digital Marketing Fundamentals",
    issuer: "Issuer TBD",
    categories: ["business-marketing"],
  },
];

export const ARCHIVE_ENTRIES: ArchiveCredential[] = [
  ...HIGHLIGHT_CREDENTIALS,
  ...SAMPLE_CREDENTIALS,
];

// Stand-ins for the un-catalogued rest of the archive, revealed behind the
// "declassify" toggle. Replace with real entries as they're added — no
// category tagging needed here since this grid isn't filterable.
export const REMAINING_PLACEHOLDER_CREDENTIALS: ArchiveCredential[] =
  Array.from({ length: 24 }, () => ({
    name: "Credential pending catalog",
    issuer: "—",
    categories: [],
  }));
