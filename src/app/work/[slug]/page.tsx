import Link from "next/link";
import type { Metadata } from "next";
import CaseFile from "@/components/work/CaseFile";
import { getCaseFile } from "@/content/case-files";
import { truncate } from "@/lib/text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseFile(slug);
  if (!entry) return { title: slug };

  return {
    title: `${entry.title} — Caine Benoy`,
    description: truncate(entry.problem, 155),
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getCaseFile(slug);

  if (!entry) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-handwritten text-accent">case study coming soon</p>
        <h1 className="mt-3 font-structural text-2xl text-ink">{slug}</h1>
        <Link
          href="/#trades"
          className="mt-8 font-structural text-sm text-ink/60 underline underline-offset-4 hover:text-accent"
        >
          back to the trades map
        </Link>
      </main>
    );
  }

  return <CaseFile entry={entry} />;
}
