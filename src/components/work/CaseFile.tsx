import Link from "next/link";
import type { CaseFileEntry } from "@/content/case-files";

export default function CaseFile({ entry }: { entry: CaseFileEntry }) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <BackLink />

      <header className="mt-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-structural text-3xl text-ink">{entry.title}</h1>
          <p className="mt-2 font-structural text-sm text-ink/60">
            {entry.subtitle}
          </p>
        </div>
        <span className="whitespace-nowrap rounded-sm border border-ink/20 bg-cream px-3 py-1.5 font-handwritten text-sm text-accent shadow-sm [transform:rotate(-3deg)]">
          {entry.status}
        </span>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-10">
          <Block label="Problem" text={entry.problem} />
          <Block label="Approach" text={entry.approach} />
          <Block label="Architecture" text={entry.architecture} />
        </div>

        <div className="relative pt-3">
          <div className="relative border border-ink/15 bg-cream p-2 shadow-sm [transform:rotate(2deg)]">
            <span
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-6 w-12 bg-accent/15 [transform:rotate(-12deg)]"
            />
            <span
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-6 w-12 bg-accent/15 [transform:rotate(12deg)]"
            />
            <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-ink/25">
              <p className="max-w-[80%] text-center font-structural text-xs text-ink/40">
                {entry.imageAlt ?? "diagram / screenshot placeholder"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {entry.outcome && <Outcome text={entry.outcome} />}

      <div className="mt-16">
        <BackLink />
      </div>
    </main>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-handwritten text-lg text-accent [transform:rotate(-1deg)]">
        {label}
      </p>
      <p className="mt-2 font-structural leading-7 text-ink">{text}</p>
    </div>
  );
}

function Outcome({ text }: { text: string }) {
  return (
    <div className="mt-14 max-w-2xl border-l-2 border-accent/40 pl-5 [transform:rotate(-0.5deg)]">
      <p className="font-handwritten text-sm text-ink/50">Outcome</p>
      <p className="mt-1 font-handwritten text-lg text-accent">{text}</p>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/#trades"
      className="font-structural text-sm text-ink/60 underline underline-offset-4 hover:text-accent"
    >
      ← back to the map
    </Link>
  );
}
