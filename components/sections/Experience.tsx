"use client";

const experiences = [
  {
    role: "SOF Insider",
    company: "The School of Future",
    period: "Jan 2026 - Present",
    desc: "Networking & Community Development. Building the future of ed-tech.",
  },
  {
    role: "Campus Lead",
    company: "TinkerHub SCAS",
    period: "Jul 2025 - Present",
    desc: "Orchestrating hackathons, workshops, and student dev culture. TinkerHub Campus Lead for SCAS.",
  },
  {
    role: "Quiz Club Coordinator",
    company: "Sahrdaya College of Advanced Studies",
    period: "Jun 2024 - Jun 2025",
    desc: "Event Planning, Event Management, People Management, Crowd Control & Problem Solving.",
  },
  {
    role: "Game Development Intern",
    company: "Immersive Skills Academy",
    period: "Jan - Feb 2025",
    desc: "Developed 2D and interactive games using Unity. Designed game mechanics, implemented physics-based behaviors, created UI elements, and optimized performance.",
  },
  {
    role: "Web Development Intern",
    company: "Varlyq Technologies",
    period: "Jan - Feb 2025",
    desc: "Built responsive web applications using Django and Bootstrap. Designed UX interfaces, integrated APIs, worked with authentication, CRUD operations, and PostgreSQL databases.",
  },
  {
    role: "AI/ML Intern",
    company: "St. Thomas' College (Autonomous), Thrissur",
    period: "Apr - May 2024",
    desc: "Trained machine learning models using scikit-learn. Implemented NLP pipelines for data preprocessing and sentiment analysis. Presented findings showcasing AI's role in social solutions.",
  },
  {
    role: "Student Intern",
    company: "Mindler",
    period: "Oct - Nov 2023",
    desc: "Participated in structured career assessment and personal development program. Explored career paths through psychometric evaluations and attended webinars on communication and leadership.",
  },
  {
    role: "Web Development Intern",
    company: "CodersCave",
    period: "Oct - Nov 2023",
    desc: "Developed static and dynamic websites using HTML, CSS, JavaScript, and Flask. Implemented user authentication, form validation, and collaborated through GitHub for version control.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-4">
        
        <h2 className="mb-16 font-display text-5xl text-ink md:text-7xl reveal">
          The Journey
          {/* Doodle Line */}
          <svg className="absolute -bottom-4 left-0 h-4 w-48 overflow-visible opacity-80" viewBox="0 0 200 10">
            <path
              d="M0,5 Q100,15 200,5"
              fill="none"
              stroke="var(--highlight)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </h2>

        <div className="ml-4 space-y-0 border-l-4 border-ink pl-8 md:ml-12">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pb-16 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[44px] top-0 h-5 w-5 rounded-full border-4 border-ink bg-paper transition-colors duration-300 group-hover:bg-highlight" />
              
              {/* Content */}
              <span className="inline-block rounded border border-ink theme-surface px-2 py-1 font-code text-xs text-ink shadow-sm">
                {exp.period}
              </span>
              <h3 className="mt-2 font-marker text-3xl text-ink">{exp.role}</h3>
              <p className="font-hand text-xl text-gray-600">{exp.company}</p>
              <p className="mt-2 max-w-md font-sans text-sm text-gray-500">
                {exp.desc}
              </p>
            </div>
          ))}
          
          {/* Fade out line at end */}
          <div className="relative border-l-4 border-dashed border-gray-300 pl-8 h-12 -left-[4px]" />
        </div>

      </div>
    </section>
  );
}