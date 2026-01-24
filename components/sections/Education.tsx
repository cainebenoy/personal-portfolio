"use client";

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Sahrdaya College of Advanced Studies, Kodakara",
    period: "August 2023 - August 2026",
    desc: "Pursuing a comprehensive degree in Computer Applications with focus on full-stack development and emerging technologies.",
  },
  {
    degree: "CCBP 4.0 Academy - Genius",
    institution: "NxtWave",
    period: "September 2023 - September 2026",
    desc: "Fellowship program focused on intense hands-on learning in modern web technologies, competitive programming, and industry-ready projects.",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative z-10 min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-4">
        
        <h2 className="mb-16 font-display text-5xl text-ink md:text-7xl reveal">
          The Learning
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
          {education.map((edu, i) => (
            <div key={i} className="relative pb-16 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[44px] top-0 h-5 w-5 rounded-full border-4 border-ink bg-paper transition-colors duration-300 group-hover:bg-highlight" />
              
              {/* Content */}
              <span className="inline-block rounded bg-gray-200 px-2 py-1 font-code text-xs text-gray-700">
                {edu.period}
              </span>
              <h3 className="mt-2 font-marker text-3xl text-ink">{edu.degree}</h3>
              <p className="font-hand text-xl text-gray-600">{edu.institution}</p>
              <p className="mt-2 max-w-md font-sans text-sm text-gray-500">
                {edu.desc}
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
