import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import { CONTACT_EMAIL } from "@/content/about";
import { EDUCATION } from "@/content/education";
import { JOURNEY, type JourneyEntry } from "@/content/journey";
import { PROJECTS } from "@/content/projects";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume — Caine Benoy",
  description:
    "One-page resume: product engineer and generalist, Kerala, India — graduating 2026.",
};

// Deliberately static markup — no reveal attributes — so the page prints
// (and renders to PDF via scripts/make-resume.mjs) identically regardless
// of scroll position or motion preferences.

// The one-page cut of the record: which journey entries make the resume.
const RESUME_ORGS = [
  "CRAV",
  "Outlier",
  "TinkerHub SCAS",
  "Immersive Skills Academy",
  "Varlyq Technologies",
  "St. Thomas' College (Autonomous)",
];

const RESUME_PROJECT_SLUGS = ["the-love-protocol", "ey-buzzer-system", "veritas-vault"];

const SKILLS: [string, string][] = [
  ["Product & web", "Next.js · React · TypeScript · Tailwind · Firebase · Turso · Django"],
  ["Blockchain", "Solidity · Ethers.js · Sepolia / Polygon"],
  ["Hardware", "Arduino · Raspberry Pi · biometric & stage systems"],
  ["AI / ML", "Hugging Face Transformers · scikit-learn · FastAPI"],
  ["Operations", "Hackathon organizing · community leadership · live event production"],
];

function entryOrg(entry: JourneyEntry) {
  return entry.org;
}

export default function Resume() {
  const experience = RESUME_ORGS.map((org) =>
    JOURNEY.find((entry) => entryOrg(entry) === org),
  ).filter((entry): entry is JourneyEntry => Boolean(entry));

  const projects = RESUME_PROJECT_SLUGS.map((slug) =>
    PROJECTS.find((p) => p.slug === slug),
  ).filter((p): p is (typeof PROJECTS)[number] => Boolean(p));

  return (
    <main className="px-page mx-auto w-full max-w-3xl pt-36 pb-28 print:max-w-none print:p-0 print:pt-2">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <BackLink />
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="mono-tag cursor-pointer border border-accent/60 px-4 py-2.5 text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ground"
          >
            Download PDF ↓
          </a>
          <PrintButton />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}

      <header className="mt-10 border-b border-line pb-6 print:mt-0">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.2rem)] leading-none tracking-[-0.015em] text-ink">
          Caine Benoy
        </h1>
        <p className="mt-3 text-[0.95rem] leading-6 text-ink/75">
          Product engineer &amp; generalist — AI, blockchain, hardware, web,
          and community operations.
        </p>
        <p className="mono-tag mt-3 text-ink/55">
          {CONTACT_EMAIL} · Kerala, India · Open to work, graduating 2026
        </p>
      </header>

      <section className="mt-8">
        <p className="mono-tag text-red">Experience</p>
        <ol className="mt-3 flex flex-col">
          {experience.map((entry) => (
            <li
              key={entry.org}
              className="grid gap-x-8 border-t border-line-faint py-4 first:border-t-0 sm:grid-cols-[10rem_1fr] print:py-3"
            >
              <p className="mono-tag pt-0.5 text-ink/45">{entry.range}</p>
              {entry.type === "single" ? (
                <div>
                  <h3 className="text-[1.02rem] font-medium text-ink">
                    {entry.title}
                    <span className="text-accent"> · {entry.org}</span>
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-6 text-ink/65">
                    {entry.description}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-[1.02rem] font-medium text-ink">
                    {entry.org}
                  </h3>
                  {entry.roles.map((role) => (
                    <p
                      key={role.title}
                      className="mt-1 text-[0.875rem] leading-6 text-ink/65"
                    >
                      <span className="text-ink/90">{role.title}</span>{" "}
                      <span className="mono-tag text-ink/40">{role.range}</span>{" "}
                      — {role.description}
                    </p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <p className="mono-tag text-red">Selected builds</p>
        <ol className="mt-3 flex flex-col">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="border-t border-line-faint py-4 first:border-t-0 print:py-3"
            >
              <h3 className="text-[1.02rem] font-medium text-ink">
                {project.title}
                <span className="mono-tag ml-3 text-ink/40">
                  {project.status}
                </span>
              </h3>
              <p className="mt-1 text-[0.875rem] leading-6 text-ink/65">
                {project.tagline} {project.outcome ?? ""}
              </p>
              <p className="mono-tag mt-1.5 text-accent/90">
                {project.stack.join(" · ")}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <p className="mono-tag text-red">Education</p>
        {EDUCATION.map((entry) => (
          <div
            key={entry.institution}
            className="mt-3 grid gap-x-8 sm:grid-cols-[10rem_1fr]"
          >
            <p className="mono-tag pt-0.5 text-ink/45">{entry.range}</p>
            <div>
              <h3 className="text-[1.02rem] font-medium text-ink">
                {entry.institution}
              </h3>
              <p className="mt-1 text-[0.875rem] leading-6 text-ink/65">
                {entry.degree}
                {entry.note ? ` · ${entry.note}` : ""}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <p className="mono-tag text-red">Skills</p>
        <dl className="mt-3 flex flex-col gap-2">
          {SKILLS.map(([label, value]) => (
            <div key={label} className="grid gap-x-8 sm:grid-cols-[10rem_1fr]">
              <dt className="mono-tag pt-0.5 text-ink/45">{label}</dt>
              <dd className="text-[0.875rem] leading-6 text-ink/70">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8">
        <p className="mono-tag text-red">Credentials</p>
        <p className="mt-3 text-[0.875rem] leading-6 text-ink/65">
          166 on file, including the Google Cybersecurity Certificate, AWS
          Cloud Essentials, the McKinsey.org Forward Program, and Cambridge
          Linguaskill (C1). Nine fest and hackathon wins.
        </p>
      </section>

      <p className="mono-tag mt-10 border-t border-line-faint pt-4 text-ink/35">
        Full record at the index · cainebenoy.dev
      </p>
    </main>
  );
}
