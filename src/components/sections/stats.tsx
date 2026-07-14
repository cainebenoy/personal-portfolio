import RevealOnScroll from "@/components/RevealOnScroll";
import { STATS } from "@/content/stats";

export default function Stats() {
  return (
    <section id="stats" className="border-t border-ink/10 px-6 py-16">
      <RevealOnScroll>
        {/* flex-wrap only below lg — forced into one row at lg+ so the
            per-item divider (also lg-only) never has to reckon with where
            a wrapped row starts. */}
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-10 lg:flex-nowrap lg:justify-between">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 lg:border-l lg:border-dashed lg:border-ink/15 lg:pl-10 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="whitespace-nowrap font-structural text-3xl font-bold text-ink sm:text-4xl">
                {stat.value}
              </span>
              <span className="whitespace-nowrap font-handwritten text-sm text-accent [transform:rotate(-1deg)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
