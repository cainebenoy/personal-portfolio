import type { Metadata } from "next";
import BackLink from "@/components/BackLink";

export const metadata: Metadata = {
  title: "Now — Caine Benoy",
  description:
    "What Caine is building, learning, and saying yes to right now.",
};

// Update the entries and the date whenever life moves — that's the whole
// point of a now page.
const UPDATED = "July 2026";

const NOW = [
  {
    label: "Working",
    text: "Junior Product Engineer at CRAV — product development and cross-functional engineering, fresh off the Super20 engagement in Kochi.",
  },
  {
    label: "Finishing",
    text: "Final year at Sahrdaya College of Advanced Studies — graduating with the Class of 2026.",
  },
  {
    label: "Running",
    text: "TinkerHub SCAS as Campus Lead: hackathons, workshops, and keeping the student dev culture loud.",
  },
  {
    label: "Building",
    text: "This working file, for one — and whatever the next problem turns out to need.",
  },
  {
    label: "Open to",
    text: "Product engineering roles, generalist problems, and anything that doesn't have a job title yet.",
  },
];

export default function Now() {
  return (
    <main className="px-page mx-auto w-full max-w-3xl pt-36 pb-28">
      <BackLink />

      <div className="mt-10 flex items-center gap-5">
        <span className="mono-tag text-red">App. B</span>
        <span aria-hidden="true" data-rule className="h-px min-w-0 flex-1 bg-line" />
        <span className="kicker text-ink/50">Now</span>
      </div>

      <h1
        data-mask
        className="mt-8 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] tracking-[-0.015em] text-ink"
      >
        <span className="mask-line">
          <span>What&apos;s on the desk.</span>
        </span>
      </h1>

      <p data-reveal className="mono-tag mt-6 text-ink/45">
        Last updated · {UPDATED}
      </p>

      <ol data-reveal-group className="mt-12 flex flex-col">
        {NOW.map((item) => (
          <li
            key={item.label}
            data-reveal-item
            className="grid gap-x-10 gap-y-1 border-t border-line-faint py-6 last:border-b sm:grid-cols-[11rem_1fr]"
          >
            <p className="mono-tag pt-1 text-red">{item.label}</p>
            <p className="text-[0.95rem] leading-7 text-ink/75">{item.text}</p>
          </li>
        ))}
      </ol>

      <p data-reveal className="mono-tag mt-16 text-ink/40">
        The idea comes from nownownow.com — a page for the present tense.
      </p>
    </main>
  );
}
