import ArchiveBrowser from "@/components/archive/ArchiveBrowser";
import SectionHeader from "@/components/SectionHeader";
import { CATALOGUED_COUNT, TOTAL_CREDENTIALS } from "@/content/archive";

// Chapter 07 — the archive. The long tail of the generalist claim: 166
// credentials on file, the catalogued slice browsable by drawer.
export default function Archive() {
  return (
    <section id="archive" aria-label="Archive — credentials" className="px-page py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          id="archive"
          lines={["The archive."]}
          note={`${CATALOGUED_COUNT} catalogued here of ${TOTAL_CREDENTIALS} on file — certifications, programs, and completions across six drawers.`}
        />
        <ArchiveBrowser />
      </div>
    </section>
  );
}
