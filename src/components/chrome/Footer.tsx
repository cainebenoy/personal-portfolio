"use client";

import Link from "next/link";
import { SITE_COORDS } from "@/lib/site";
import { scrollToId } from "@/lib/motion";

const PAGES = [
  { href: "/colophon", label: "Colophon" },
  { href: "/now", label: "Now" },
  { href: "/resume", label: "Resume" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line-faint print:hidden">
      <div className="px-page mx-auto flex max-w-7xl flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="mono-tag text-ink/65">
          © 2026 Caine Benoy · jack of all trades
        </p>

        <nav aria-label="Pages" className="flex items-center gap-6">
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="mono-tag cursor-pointer text-ink/65 transition-colors duration-300 hover:text-accent"
            >
              {page.label}
            </Link>
          ))}
        </nav>

        <p className="mono-tag hidden text-ink/50 xl:block">
          Built by hand · Next.js / GSAP / Lenis · {SITE_COORDS}
        </p>

        <Link
          href="/#thesis"
          onClick={(e) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
              return;
            if (!document.getElementById("thesis")) return;
            e.preventDefault();
            scrollToId("thesis");
          }}
          className="mono-tag group cursor-pointer text-ink/60 transition-colors duration-300 hover:text-accent"
        >
          Back to the top{" "}
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
            ↑
          </span>
        </Link>
      </div>
    </footer>
  );
}
