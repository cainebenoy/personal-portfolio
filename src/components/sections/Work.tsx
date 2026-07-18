import SectionHeader from "@/components/SectionHeader";
import TradeBadge from "@/components/TradeBadge";
import FeaturedBuilds from "@/components/work/FeaturedBuilds";
import Plate from "@/components/work/Plate";
import WorkIndex from "@/components/work/WorkIndex";
import { PROJECTS, type Project } from "@/content/projects";

// Chapter 04 — the work. A case index up top, then one editorial spread per
// build. Spreads alternate their axis (meta left / meta right), each anchored
// by a parallax ghost numeral and the project's drafting plate.
export default function Work() {
  return (
    <section id="work" aria-label="Selected work">
      <div className="px-page mx-auto max-w-7xl pt-28 pb-10 sm:pt-36">
        <SectionHeader
          id="work"
          lines={["The work,", "filed as built."]}
          note="Six shipped builds, written up the way they actually ran: the problem, the approach, what they're made of, and what happened."
        />
        <FeaturedBuilds />
        <WorkIndex />
      </div>

      {PROJECTS.map((project, i) => (
        <Spread key={project.slug} project={project} index={i} />
      ))}
    </section>
  );
}

function Spread({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const flipped = index % 2 === 1;
  const live = project.status.startsWith("Live");

  return (
    <article
      id={`p-${project.slug}`}
      aria-label={`${project.title} — case ${num}`}
      className="relative overflow-x-clip border-t border-line-faint"
    >
      <div className="px-page relative mx-auto max-w-7xl py-24 sm:py-32">
        {/* Ghost numeral — drifts slower than the page, printing the index
            behind the spread. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 select-none ${
            flipped ? "left-0 -translate-x-[8%]" : "right-0 translate-x-[8%]"
          }`}
        >
          <span
            data-parallax="-14"
            className="numeral-ghost block text-[clamp(10rem,24vw,21rem)] leading-[0.8]"
          >
            {num}
          </span>
        </div>

        <div className="relative grid gap-x-14 gap-y-14 lg:grid-cols-12">
          {/* Meta rail */}
          <div
            className={`flex flex-col gap-8 lg:col-span-4 ${
              flipped ? "lg:order-2" : ""
            }`}
          >
            <div data-reveal className="flex flex-wrap items-center gap-3">
              <span
                className={`mono-tag border px-3 py-1.5 ${
                  live
                    ? "border-red/60 text-red"
                    : "border-line text-ink/60"
                }`}
              >
                {project.status}
              </span>
              {project.context && (
                <span className="mono-tag text-ink/55">{project.context}</span>
              )}
            </div>

            <ul data-reveal className="flex flex-col gap-2.5">
              {project.trades.map((id) => (
                <li key={id}>
                  <TradeBadge id={id} />
                </li>
              ))}
            </ul>

            <Plate project={project} index={index} />

            <ul data-reveal className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="mono-tag border border-line-faint px-2.5 py-1.5 text-ink/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Body */}
          <div
            className={`lg:col-span-7 ${
              flipped ? "lg:order-1" : "lg:col-start-6"
            }`}
          >
            <h3
              data-mask
              className="font-display text-[clamp(2.5rem,5vw,4.3rem)] leading-[1.08] text-ink"
            >
              <span className="mask-line">
                <span>{project.title}</span>
              </span>
            </h3>
            <p data-reveal className="mt-4 max-w-xl text-lg leading-7 text-ink/65">
              {project.tagline}
            </p>

            <div data-reveal-group className="mt-12 flex max-w-xl flex-col gap-9">
              <Block label="Problem" text={project.problem} />
              <Block label="Approach" text={project.approach} />
              <Block label="Build" text={project.build} />
            </div>

            {project.outcome && (
              <div
                data-reveal
                className="mt-12 max-w-xl border-l-2 border-accent py-1 pl-6"
              >
                <p className="mono-tag text-ink/65">Outcome</p>
                <p
                  className="mt-3 font-display text-[1.35rem] leading-[1.45] text-accent-bright italic"
                >
                  {project.outcome}
                </p>
              </div>
            )}

            {(project.links?.live || project.links?.repo) && (
              <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-tag cursor-pointer border border-accent/60 px-4 py-2.5 text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ground"
                  >
                    Visit live ↗
                  </a>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-tag cursor-pointer border border-line px-4 py-2.5 text-ink/70 transition-colors duration-300 hover:border-ink/40 hover:text-ink"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div data-reveal-item>
      <p className="mono-tag text-accent">{label}</p>
      <p className="mt-2.5 text-[0.95rem] leading-7 text-ink/75">{text}</p>
    </div>
  );
}
