"use client";

import Plate from "@/components/work/Plate";
import { PROJECTS, projectIndex } from "@/content/projects";
import { tradeById } from "@/content/trades";
import { scrollToId } from "@/lib/motion";

// Featured builds bento — adapted from 21st.dev's
// @shadcnblockscom/casestudy-5 (feature card + two supporting cards inside
// one ruled frame, dotted side rails), rebuilt on the notebook system:
// hairline borders, drafting plates instead of stock imagery, trade names
// as the tag line, red-pen indices. Links jump to the full spreads below.

const FEATURED_SLUG = "the-love-protocol";
const SUPPORTING_SLUGS = ["ey-buzzer-system", "votechain"];

const DOTS =
  "bg-[radial-gradient(color-mix(in_oklab,var(--color-ink)_50%,transparent)_1px,transparent_1px)] [background-size:10px_10px] opacity-15";

function CardLink({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#p-${slug}`}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          return;
        e.preventDefault();
        scrollToId(`#p-${slug}`.slice(1));
      }}
      className={`group cursor-pointer transition-colors duration-500 ease-out hover:bg-raised/70 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function Meta({ slug }: { slug: string }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;
  return (
    <>
      <p className="mono-tag text-ink/55">
        {project.trades.map((t) => tradeById(t).name.replace("The ", "")).join(" / ")}
        {" · "}
        {project.status}
      </p>
      <h3 className="mt-3 mb-4 font-display text-[1.7rem] leading-tight font-semibold text-ink sm:text-[2rem]">
        {project.title}
        <span className="font-normal text-ink/55 transition-colors duration-500 group-hover:text-ink/75">
          {" "}
          {project.tagline}
        </span>
      </h3>
      <p className="mono-tag flex items-center gap-2 text-accent">
        Open the file
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500 ease-out group-hover:translate-y-0.5"
        >
          ↓
        </span>
      </p>
    </>
  );
}

export default function FeaturedBuilds() {
  const featured = PROJECTS.find((p) => p.slug === FEATURED_SLUG);
  if (!featured) return null;

  return (
    <div data-reveal className="mt-16 border border-line">
      {/* Feature card: story left, plate right. */}
      <CardLink slug={FEATURED_SLUG} className="grid gap-4 overflow-hidden px-6 lg:grid-cols-2 xl:px-16">
        <div className="flex flex-col justify-between gap-6 pt-8 md:pt-12 lg:pb-12">
          <p className="mono-tag text-red">
            Fig. {projectIndex(FEATURED_SLUG)} · Featured build
          </p>
          <div>
            <Meta slug={FEATURED_SLUG} />
          </div>
        </div>
        <div className="relative py-8 lg:py-12">
          <div className="border border-line-faint bg-raised p-2 transition-transform duration-500 ease-out group-hover:-rotate-[0.5deg]">
            <Plate
              project={featured}
              index={PROJECTS.findIndex((p) => p.slug === FEATURED_SLUG)}
            />
          </div>
        </div>
      </CardLink>

      {/* Supporting cards between dotted rails. */}
      <div className="flex border-t border-line">
        <div aria-hidden="true" className={`hidden w-20 shrink-0 xl:block ${DOTS}`} />
        <div className="grid flex-1 lg:grid-cols-2">
          {SUPPORTING_SLUGS.map((slug, idx) => (
            <CardLink
              key={slug}
              slug={slug}
              className={`flex flex-col justify-between gap-8 px-6 py-8 md:py-10 ${
                idx === 0
                  ? "xl:border-l xl:border-line"
                  : "border-t border-line lg:border-t-0 lg:border-l xl:border-r"
              }`}
            >
              <p className="mono-tag text-red">Fig. {projectIndex(slug)}</p>
              <div>
                <Meta slug={slug} />
              </div>
            </CardLink>
          ))}
        </div>
        <div aria-hidden="true" className={`hidden w-20 shrink-0 xl:block ${DOTS}`} />
      </div>
    </div>
  );
}
