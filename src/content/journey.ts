export interface JourneyEntry {
  range: string;
  title: string;
  org: string;
  description: string;
}

// Most recent first — rendered top to bottom in this order.
export const JOURNEY: JourneyEntry[] = [
  {
    range: "Jan 2026 – Present",
    title: "SOF Insider",
    org: "The School of Future",
    description:
      "Networking & community development, building the future of ed-tech.",
  },
  {
    range: "Jul 2025 – Present",
    title: "Campus Lead",
    org: "TinkerHub SCAS",
    description:
      "Organizing hackathons, workshops, and student dev culture across a full academic year.",
  },
  {
    range: "Jun 2024 – Jun 2025",
    title: "Quiz Club Coordinator",
    org: "Sahrdaya College of Advanced Studies",
    description:
      "Event planning, event management, and crowd control across a full year of competitions.",
  },
  {
    range: "Jan – Feb 2025",
    title: "Game Development Intern",
    org: "Immersive Skills Academy",
    description:
      "Built 2D platformer mechanics in Unity: player movement, enemy AI, checkpoints, and WebGL publishing.",
  },
  {
    range: "Jan – Feb 2025",
    title: "Web Development Intern",
    org: "Varlyq Technologies",
    description:
      "Built responsive web apps with Django and Bootstrap, integrated PostgreSQL and authentication.",
  },
  {
    range: "Apr – May 2024",
    title: "AI/ML Intern",
    org: "St. Thomas' College (Autonomous)",
    description:
      "Trained ML models with scikit-learn, built basic NLP pipelines for sentiment analysis.",
  },
  {
    range: "Oct – Nov 2023",
    title: "Student Intern",
    org: "Mindler",
    description: "Structured career assessment and personal development program.",
  },
  {
    range: "Oct – Nov 2023",
    title: "Web Development Intern",
    org: "CodersCave",
    description:
      "Built static/dynamic sites with HTML, CSS, JavaScript, and Flask, with authentication and form validation.",
  },
];
