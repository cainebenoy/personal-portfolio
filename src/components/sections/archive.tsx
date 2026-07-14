import ArchiveBrowser from "@/components/archive/ArchiveBrowser";
import IndexCard from "@/components/archive/IndexCard";
import SiteBackLink from "@/components/SiteBackLink";
import {
  CATALOGUED_COUNT,
  HIGHLIGHT_CREDENTIALS,
  TOTAL_CREDENTIALS,
} from "@/content/archive";

export default function Archive() {
  return (
    <section
      id="archive"
      className="mx-auto min-h-dvh max-w-5xl scroll-mt-6 px-6 py-16"
    >
      <header className="flex flex-wrap items-center justify-center gap-4">
        <h2 className="font-structural text-3xl text-ink">The Archive</h2>
        <span className="whitespace-nowrap rounded-sm border border-ink/20 bg-surface px-3 py-1.5 font-handwritten text-sm text-accent shadow-sm [transform:rotate(-3deg)]">
          {CATALOGUED_COUNT} credentials catalogued — {TOTAL_CREDENTIALS} on
          file
        </span>
      </header>

      <div className="mt-14 flex flex-wrap justify-center gap-6">
        {HIGHLIGHT_CREDENTIALS.map((credential, i) => (
          <IndexCard
            key={credential.name}
            name={credential.name}
            issuer={credential.issuer}
            index={i}
          />
        ))}
      </div>

      <ArchiveBrowser />

      <div className="mt-20 flex justify-center">
        <SiteBackLink href="/#about" label="back to about" />
      </div>
    </section>
  );
}
