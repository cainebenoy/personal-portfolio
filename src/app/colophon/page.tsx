import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import Glyph from "@/components/Glyph";
import RoughRule from "@/components/RoughRule";
import { TRADES } from "@/content/trades";

export const metadata: Metadata = {
  title: "Colophon — Caine Benoy",
  description:
    "How this working file is made: the typefaces, the two-pen palette, the glyph system, and the motion stack behind the portfolio.",
};

const TYPE = [
  {
    face: "Caveat",
    role: "The writing hand",
    note: "Quick pen cursive for headings, the name, numerals, and every raised voice. The heavier weight is the pen pressed harder.",
  },
  {
    face: "Architects Daughter",
    role: "The printing hand",
    note: "Schoolbook print for labels, captions, and margin notes. Short strings only — anything long enough to read gets set in type.",
  },
  {
    face: "Archivo + Fragment Mono",
    role: "The reading type",
    note: "Body paragraphs across the site, and the whole resume document. Handwriting is for skimming; type is for reading.",
  },
];

const STACK = [
  ["Framework", "Next.js 16 (App Router, static output)"],
  ["Styling", "Tailwind CSS v4 — tokens in @theme, two-theme via one class"],
  ["Motion", "GSAP ScrollTrigger + DrawSVG, Lenis for scroll physics"],
  ["Type delivery", "next/font, self-hosted variable fonts"],
  ["Social cards", "Generated at build from the same palette and faces"],
];

export default function Colophon() {
  return (
    <main className="px-page mx-auto w-full max-w-3xl pt-36 pb-28">
      <BackLink />

      <div data-draw className="mt-10 flex items-center gap-5">
        <span className="mono-tag text-red">App. A</span>
        <RoughRule />
        <span className="kicker text-ink/65">Colophon</span>
      </div>

      <h1
        data-mask
        className="mt-8 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.08] text-ink"
      >
        <span className="mask-line">
          <span>How this file is made.</span>
        </span>
      </h1>

      <p data-reveal className="mt-6 max-w-xl text-[0.95rem] leading-7 text-ink/60">
        The site is designed as an engineer&apos;s rough notebook: graph paper,
        two pens, two hands of writing, and things taped in where they belong.
        Everything on it is built by hand and shipped as a static page.
      </p>

      <section data-reveal className="mt-16">
        <p className="mono-tag text-red">Type</p>
        <ol className="mt-4 flex flex-col">
          {TYPE.map((entry) => (
            <li
              key={entry.face}
              className="grid gap-x-10 gap-y-1 border-t border-line-faint py-5 last:border-b sm:grid-cols-[11rem_1fr]"
            >
              <p className="font-display text-xl text-ink">{entry.face}</p>
              <div>
                <p className="mono-tag text-ink/60">{entry.role}</p>
                <p className="mt-2 text-[0.95rem] leading-6 text-ink/70">
                  {entry.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section data-reveal className="mt-14">
        <p className="mono-tag text-red">The two pens</p>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-ink/70">
          Color has grammar here. Drafting blue draws structure: links, rules,
          plates, the glyph linework, the progress line. The red pen only ever
          annotates: chapter numbers, status marks, the margin rule, and the
          strike through &ldquo;master of none.&rdquo; Ink does everything
          else, on paper by day and on a blueprint sheet by night.
        </p>
      </section>

      <section data-reveal className="mt-14">
        <p className="mono-tag text-red">The six glyphs</p>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-ink/70">
          The trades are drawn as stroke-only marks on a shared 24px grid —
          they assemble in the hero, get defined in the legend, tag every
          project, and reassemble at the end. Each one is a single SVG that
          draws itself in as it enters.
        </p>
        <div className="mt-6 flex items-center gap-6 text-accent">
          {TRADES.map((trade) => (
            <Glyph
              key={trade.id}
              id={trade.id}
              title={trade.name}
              className="h-7 w-7"
            />
          ))}
        </div>
      </section>

      <section data-reveal className="mt-14">
        <p className="mono-tag text-red">Stack</p>
        <dl className="mt-4 flex flex-col">
          {STACK.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-x-10 gap-y-1 border-t border-line-faint py-4 last:border-b sm:grid-cols-[11rem_1fr]"
            >
              <dt className="mono-tag pt-0.5 text-ink/60">{label}</dt>
              <dd className="text-[0.95rem] leading-6 text-ink/75">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p data-reveal className="mono-tag mt-16 text-ink/55">
        No template, no builder — every line of it is in the repository.
      </p>
    </main>
  );
}
