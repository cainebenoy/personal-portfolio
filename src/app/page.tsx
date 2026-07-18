import { existsSync } from "node:fs";
import { join } from "node:path";
import About from "@/components/sections/About";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Notes from "@/components/sections/Notes";
import Proof from "@/components/sections/Proof";
import Range from "@/components/sections/Range";
import Record from "@/components/sections/Record";
import Work from "@/components/sections/Work";

// One continuous scroll, nine chapters: the thesis, the totals that back it,
// the six trades as a legend, the work, the record, the photographs, the
// archive, the person — and the invitation.
export default function Home() {
  // The hero portrait lights up when the print exists — swap the file to
  // change it, delete it to fall back to the type-only composition.
  const portraitSrc = existsSync(
    join(process.cwd(), "public/images/portrait.jpg"),
  )
    ? "/images/portrait.jpg"
    : undefined;

  return (
    <main id="main">
      <Hero portraitSrc={portraitSrc} />
      <Proof />
      <Range />
      <Work />
      <Record />
      <Notes />
      <Archive />
      <About />
      <Contact />
    </main>
  );
}
