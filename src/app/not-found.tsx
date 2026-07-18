import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Caine Benoy",
};

export default function NotFound() {
  return (
    <main className="px-page flex min-h-svh flex-col items-center justify-center gap-8 text-center">
      <p className="mono-tag text-brass">404 — Not in the index</p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none text-ink">
        This page isn&apos;t on file.
      </h1>
      <Link
        href="/"
        className="mono-tag cursor-pointer border border-brass/50 px-5 py-3 text-brass transition-colors duration-300 hover:bg-brass hover:text-ground"
      >
        Back to the index
      </Link>
    </main>
  );
}
