export interface JourneyRole {
  range: string;
  title: string;
  description: string;
}

export type JourneyEntry =
  | {
      type: "single";
      range: string;
      title: string;
      org: string;
      description: string;
    }
  | {
      type: "group";
      range: string;
      org: string;
      roles: JourneyRole[];
    };

// Most recent first — rendered top to bottom in this order. Multiple roles
// at the same company (e.g. a promotion) are grouped under one "group"
// entry instead of listed as separate entries — same idea as LinkedIn's
// stacked-roles-under-one-company treatment.
export const JOURNEY: JourneyEntry[] = [
  {
    type: "group",
    range: "Feb 2026 – Present",
    org: "CRAV",
    roles: [
      {
        range: "Jul 2026 – Present",
        title: "Junior Product Engineer",
        description:
          "Product development, product management, and cross-functional engineering work.",
      },
      {
        range: "Feb 2026 – Jul 2026",
        title: "Super20",
        description: "6-month engagement (Kochi, hybrid).",
      },
    ],
  },
  {
    type: "single",
    range: "Mar 2026 – Apr 2026",
    title: "AI Training Specialist (Generalist & Software Development)",
    org: "Outlier",
    description:
      "Dual-track work in generalist AI evaluation and software development assessment: crafting challenging prompts, ranking AI-generated code, fact-checking outputs, and applying full-stack knowledge to improve model coding performance.",
  },
  {
    type: "single",
    range: "Feb 2026 – Apr 2026",
    title: "Aspire Leaders Program Fellow",
    org: "Aspire Institute",
    description: "Remote fellowship program.",
  },
  {
    type: "single",
    range: "Jan 2026 – Present",
    title: "SOF Insider",
    org: "The School of Future",
    description:
      "Networking & community development, building the future of ed-tech.",
  },
  {
    type: "single",
    range: "Jul 2025 – Present",
    title: "Campus Lead",
    org: "TinkerHub SCAS",
    description:
      "Organizing hackathons, workshops, and student dev culture across a full academic year.",
  },
  {
    type: "single",
    range: "Jun 2024 – Jun 2025",
    title: "Quiz Club Coordinator",
    org: "Sahrdaya College of Advanced Studies",
    description:
      "Event planning, event management, and crowd control across a full year of competitions.",
  },
  {
    type: "single",
    range: "Jan – Feb 2025",
    title: "Game Development Intern",
    org: "Immersive Skills Academy",
    description:
      "Built 2D platformer mechanics in Unity: player movement, enemy AI, checkpoints, and WebGL publishing.",
  },
  {
    type: "single",
    range: "Jan – Feb 2025",
    title: "Web Development Intern",
    org: "Varlyq Technologies",
    description:
      "Built responsive web apps with Django and Bootstrap, integrated PostgreSQL and authentication.",
  },
  {
    type: "single",
    range: "Apr – May 2024",
    title: "AI/ML Intern",
    org: "St. Thomas' College (Autonomous)",
    description:
      "Trained ML models with scikit-learn, built basic NLP pipelines for sentiment analysis.",
  },
  {
    type: "single",
    range: "Oct – Nov 2023",
    title: "Student Intern",
    org: "Mindler",
    description: "Structured career assessment and personal development program.",
  },
  {
    type: "single",
    range: "Oct – Nov 2023",
    title: "Web Development Intern",
    org: "CodersCave",
    description:
      "Built static/dynamic sites with HTML, CSS, JavaScript, and Flask, with authentication and form validation.",
  },
];
