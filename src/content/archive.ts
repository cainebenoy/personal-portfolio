export type ArchiveCategory =
  | "ai-ml"
  | "cloud-devops"
  | "blockchain"
  | "cybersecurity"
  | "business"
  | "general";

export interface ArchiveCredential {
  name: string;
  issuer: string;
  category: ArchiveCategory | "highlight";
}

export const CATEGORIES: { id: ArchiveCategory; label: string }[] = [
  { id: "ai-ml", label: "AI / ML" },
  { id: "cloud-devops", label: "Cloud & DevOps" },
  { id: "blockchain", label: "Blockchain & Web3" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "business", label: "Business & Marketing" },
  { id: "general", label: "General" },
];

export const TOTAL_CREDENTIALS = 166;

export const ARCHIVE_ENTRIES: ArchiveCredential[] = [
  // Highlights
  {
    name: "Google Cybersecurity Certificate",
    issuer: "Coursera",
    category: "highlight",
  },
  {
    name: "AWS Foundations - Getting Started with Cloud Essentials",
    issuer: "Amazon AWS",
    category: "highlight",
  },
  {
    name: "McKinsey.org Forward Program",
    issuer: "McKinsey & Company",
    category: "highlight",
  },
  {
    name: "Certification: Blockchain Basics",
    issuer: "Cyfrin Updraft",
    category: "highlight",
  },
  {
    name: "Introduction to Software Engineering",
    issuer: "IBM / Coursera",
    category: "highlight",
  },
  {
    name: "Cambridge English Linguaskill (C1)",
    issuer: "University of Cambridge",
    category: "highlight",
  },

  // AI / ML
  {
    name: "GenAI Study Jams 2025 Certification",
    issuer: "GDG On Campus Sahrdaya",
    category: "ai-ml",
  },

  // Blockchain & Web3
  {
    name: "Introduction to Tokenized Real-World Assets",
    issuer: "ProoV by Projectstudy.in",
    category: "blockchain",
  },
  {
    name: "BlockHash LIVE 2025",
    issuer: "Kerala Blockchain Academy",
    category: "blockchain",
  },
  {
    name: "Certified Course in Blockchain & Cryptocurrency",
    issuer: "Sahrdaya College / IABAC",
    category: "blockchain",
  },

  // Cybersecurity
  {
    name: "Put It to Work: Prepare for Cybersecurity Jobs",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Automate Cybersecurity Tasks with Python",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Sound the Alarm: Detection and Response",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Assets, Threats, and Vulnerabilities",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Tools of the Trade: Linux and SQL",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Connect and Protect: Networks and Network Security",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Play It Safe: Manage Security Risks",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Foundations of Cybersecurity",
    issuer: "Google",
    category: "cybersecurity",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    category: "cybersecurity",
  },

  // Cloud & DevOps
  {
    name: "Lyft - Back-End Engineering Job Simulation",
    issuer: "Forage",
    category: "cloud-devops",
  },
  {
    name: "CodersCave Virtual Internship Program in Web Development",
    issuer: "CodersCave",
    category: "cloud-devops",
  },

  // Business & Marketing
  {
    name: "IEDC Summit 2025",
    issuer: "Kerala Startup Mission",
    category: "business",
  },
  { name: "XPM 4.0 Fundamentals", issuer: "NxtWave", category: "business" },
  {
    name: "Tata - Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Forage",
    category: "business",
  },
  {
    name: "TCS iON Career Edge - Young Professional",
    issuer: "Tata Consultancy Services",
    category: "business",
  },
  {
    name: "Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    category: "business",
  },

  // General
  {
    name: "2D Platformer Game Development using Unity",
    issuer: "Immersive Skills Academy",
    category: "general",
  },
  {
    name: "SOLID Principles Every Developer Must Know",
    issuer: "Scaler",
    category: "general",
  },
];

export const HIGHLIGHT_CREDENTIALS: ArchiveCredential[] = ARCHIVE_ENTRIES.filter(
  (entry) => entry.category === "highlight",
);

export const CATALOGUED_COUNT = ARCHIVE_ENTRIES.length;
