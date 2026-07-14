import { SITE_QUOTE } from "@/lib/content";

// Sections ("acts") of the site live in src/components/sections and get
// composed here as they're built, one at a time.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="max-w-xl text-lg leading-8 text-ink">{SITE_QUOTE}</p>
      <p className="mt-4 font-handwritten text-accent">— skeleton ready —</p>
    </main>
  );
}
