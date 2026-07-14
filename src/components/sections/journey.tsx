import RevealOnScroll from "@/components/RevealOnScroll";
import { JOURNEY } from "@/content/journey";

// A gentle hand-ruled wobble rather than a rigid straight line — same
// "sketchy" convention as the hero/trades-map SVG curves, stretched to the
// entry list's actual height via preserveAspectRatio="none".
const SPINE_PATH =
  "M 8 0 Q 12 8 8 16 Q 4 24 9 32 Q 13 40 8 48 Q 4 56 9 64 Q 13 72 8 80 Q 5 88 8 100";

export default function Journey() {
  return (
    <section
      id="journey"
      className="mx-auto max-w-3xl scroll-mt-6 px-6 py-24"
    >
      <RevealOnScroll>
        <h2 className="text-center font-structural text-2xl text-ink sm:text-3xl">
          The Journey
        </h2>
      </RevealOnScroll>

      <div className="relative mt-16">
        <svg
          className="pointer-events-none absolute top-0 left-0 hidden h-full w-4 md:block"
          viewBox="0 0 16 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={SPINE_PATH}
            fill="none"
            stroke="var(--color-ink)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="flex flex-col gap-14">
          {JOURNEY.map((entry, i) => (
            <li
              key={`${entry.range}-${entry.title}`}
              className="relative border-l-2 border-ink/15 pl-5 md:border-l-0 md:pl-14"
            >
              {/* Branch tick connecting the spine to this entry — desktop only. */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-4 hidden h-px w-10 bg-ink/25 md:block [transform:rotate(-2deg)]"
              />
              <RevealOnScroll>
                <div
                  className={
                    i % 2 === 0
                      ? "[transform:rotate(-0.4deg)]"
                      : "[transform:rotate(0.4deg)]"
                  }
                >
                  <p className="font-structural text-xs tracking-wide text-ink/50 sm:text-sm">
                    {entry.range}
                  </p>
                  <h3 className="mt-1 font-structural text-lg font-bold text-ink">
                    {entry.title}
                  </h3>
                  <p className="font-structural text-sm text-ink/70">
                    {entry.org}
                  </p>
                  <p className="mt-2 font-structural text-sm leading-6 text-ink/80">
                    {entry.description}
                  </p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
