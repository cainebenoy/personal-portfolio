import { CITATIONS, WINS_TOTAL } from "@/content/citations";
import RoughRule from "@/components/RoughRule";
import { STATS } from "@/content/stats";

// Chapter 02 — the running totals. A tally band, not a full chapter scene:
// hairline-ruled, six counters that count themselves up on entry.
export default function Proof() {
  return (
    <section id="proof" aria-label="Proof — running totals" className="px-page py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div data-draw className="flex items-center gap-5">
          <span className="mono-tag text-red">02</span>
          <RoughRule />
          <span className="kicker text-ink/50">Proof</span>
        </div>

        <dl
          data-reveal-group
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              data-reveal-item
              className="flex flex-col gap-3 border-t border-line pt-5"
            >
              <dd
                data-counter
                className="order-1 font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-ink"
              >
                {stat.value}
              </dd>
              <dt className="order-2 text-[0.8rem] tracking-wide text-ink/55">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* The wins, named — a count is a claim, a list is a record. */}
        <div data-reveal className="mt-16">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="mono-tag text-red">Citations</p>
            <p className="mono-tag text-ink/40">
              {CITATIONS.length} of {WINS_TOTAL} on file
            </p>
          </div>
          <ol className="mt-5 max-w-3xl">
            {CITATIONS.map((citation) => (
              <li
                key={citation.title}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line-faint py-3.5 last:border-b"
              >
                <span className="text-[0.95rem] text-ink/85">
                  {citation.title}
                </span>
                <span className="mono-tag text-ink/45">
                  {citation.context}
                  {citation.year ? ` · ${citation.year}` : ""}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
