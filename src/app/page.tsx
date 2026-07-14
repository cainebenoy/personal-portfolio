import About from "@/components/sections/about";
import Archive from "@/components/sections/archive";
import FieldNotes from "@/components/sections/field-notes";
import Hero from "@/components/sections/hero";
import Journey from "@/components/sections/journey";
import Stats from "@/components/sections/stats";
import TradesMap from "@/components/sections/trades-map";
import CaseFile from "@/components/work/CaseFile";
import { getCaseFile } from "@/content/case-files";
import { CASE_FILE_ORDER } from "@/lib/case-file-order";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Stats />
      <TradesMap />

      {CASE_FILE_ORDER.map((slug) => {
        const entry = getCaseFile(slug);
        if (!entry) return null;
        return <CaseFile key={slug} entry={entry} />;
      })}

      <Journey />
      <FieldNotes />
      <About />
      <Archive />
    </main>
  );
}
