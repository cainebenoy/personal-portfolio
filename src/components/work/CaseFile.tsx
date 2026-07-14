import BackToMapLink from "@/components/BackToMapLink";
import TapedPhoto from "@/components/TapedPhoto";
import type { CaseFileEntry } from "@/content/case-files";

export default function CaseFile({ entry }: { entry: CaseFileEntry }) {
  return (
    <section
      id={entry.slug}
      className="mx-auto flex min-h-dvh max-w-4xl flex-col justify-center scroll-mt-6 px-6 py-16"
    >
      <header className="mt-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-structural text-3xl text-ink">{entry.title}</h2>
          <p className="mt-2 font-structural text-sm text-ink/60">
            {entry.subtitle}
          </p>
        </div>
        <span className="whitespace-nowrap rounded-sm border border-ink/20 bg-surface px-3 py-1.5 font-handwritten text-sm text-accent shadow-sm [transform:rotate(-3deg)]">
          {entry.status}
        </span>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-10">
          <Block label="Problem" text={entry.problem} />
          <Block label="Approach" text={entry.approach} />
          <Block label="Architecture" text={entry.architecture} />
        </div>

        <div className="pt-3">
          <TapedPhoto alt={entry.imageAlt} />
        </div>
      </div>

      {entry.outcome && <Outcome text={entry.outcome} />}

      <div className="mt-16">
        <BackToMapLink />
      </div>
    </section>
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
