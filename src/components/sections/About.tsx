import SectionHeader from "@/components/SectionHeader";
import {
  ABOUT_BLOCK_1,
  ABOUT_BLOCK_2,
  ABOUT_PULL_QUOTE,
} from "@/content/about";

// Chapter 08 — off the record. The memoir runs in the serif at reading
// size, deliberately quiet: one pull quote is the only raised voice, and
// the facts rail carries the practical summary for skimmers.
export default function About() {
  return (
    <section id="about" aria-label="Off the record" className="px-page py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader id="about" lines={["Off the record."]} />

        <div className="mt-16 grid gap-x-20 gap-y-14 lg:mt-20 lg:grid-cols-12">
          <div className="flex max-w-[62ch] flex-col gap-7 lg:col-span-7">
            {ABOUT_BLOCK_1.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                className="font-display text-[1.125rem] leading-[1.85] font-light text-ivory/85"
              >
                {paragraph}
              </p>
            ))}

            <blockquote
              data-mask
              className="my-6 border-l-2 border-brass pl-7 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.2] text-brass-bright italic"
              style={{ fontVariationSettings: '"SOFT" 55, "WONK" 1' }}
            >
              <span className="mask-line">
                <span>{ABOUT_PULL_QUOTE}</span>
              </span>
            </blockquote>

            {ABOUT_BLOCK_2.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                className="font-display text-[1.125rem] leading-[1.85] font-light text-ivory/85"
              >
                {paragraph}
              </p>
            ))}

            <p
              data-reveal
              className="mt-2 font-display text-2xl text-brass italic"
              style={{ fontVariationSettings: '"SOFT" 60, "WONK" 1' }}
            >
              — C.B.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <dl data-reveal-group className="flex flex-col">
              {[
                ["Based", "Kerala, India"],
                ["Status", "Graduating 2026 — open to work"],
                ["Current", "Junior Product Engineer, CRAV"],
                ["Community", "Campus Lead, TinkerHub SCAS"],
                ["Range", "AI · chain · hardware · web · ops"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  data-reveal-item
                  className="border-t border-line-faint py-4 last:border-b"
                >
                  <dt className="mono-tag text-ivory/40">{label}</dt>
                  <dd className="mt-1.5 text-[0.95rem] text-ivory/80">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
