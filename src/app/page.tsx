import Hero from "@/components/sections/hero";
import TradesMap from "@/components/sections/trades-map";

// Sections ("acts") of the site live in src/components/sections and get
// composed here as they're built, one at a time.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TradesMap />

      {/* Placeholder for the next act — keeps scroll behavior real until built. */}
      <section
        id="next"
        className="flex min-h-dvh items-center justify-center px-6 text-center"
      >
        <p className="font-structural text-ink/40">More to come.</p>
      </section>
    </main>
  );
}
