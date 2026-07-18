import { STATS } from "@/content/stats";

// Chapter 02 — the running totals. A tally band, not a full chapter scene:
// hairline-ruled, six counters that count themselves up on entry.
export default function Proof() {
  return (
    <section id="proof" aria-label="Proof — running totals" className="px-page py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-5">
          <span className="mono-tag text-brass">02</span>
          <span aria-hidden="true" data-rule className="h-px min-w-0 flex-1 bg-line" />
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
      </div>
    </section>
  );
}
