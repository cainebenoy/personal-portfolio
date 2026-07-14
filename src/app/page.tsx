import Link from "next/link";
import Hero from "@/components/sections/hero";
import TradesMap from "@/components/sections/trades-map";

// Sections ("acts") of the site live in src/components/sections and get
// composed here as they're built, one at a time.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TradesMap />

      <section className="flex min-h-dvh items-center justify-center px-6 text-center">
        <Link
          href="/about"
          className="font-structural text-sm text-ink/60 underline underline-offset-4 hover:text-accent"
        >
          continue to the epilogue →
        </Link>
      </section>
    </main>
  );
}
