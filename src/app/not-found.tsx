import type { Metadata } from "next";
import BackToMapLink from "@/components/BackToMapLink";

export const metadata: Metadata = {
  title: "Page Not Found — Caine Benoy",
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-structural text-xl text-ink sm:text-2xl">
        This page isn&apos;t in the archive.
      </p>
      <p className="font-handwritten text-base text-accent">
        ...maybe it&apos;s still being written.
      </p>
      <div className="mt-4">
        <BackToMapLink />
      </div>
    </main>
  );
}
