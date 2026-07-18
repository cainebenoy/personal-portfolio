"use client";

import { SITE_COORDS } from "@/lib/site";
import { scrollToId } from "@/lib/motion";

export default function Footer() {
  return (
    <footer className="border-t border-line-faint">
      <div className="px-page mx-auto flex max-w-7xl flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="mono-tag text-ink/50">
          © 2026 Caine Benoy · jack of all trades
        </p>
        <p className="mono-tag text-ink/35">
          Built by hand · Next.js / GSAP / Lenis · {SITE_COORDS}
        </p>
        <a
          href="#thesis"
          onClick={(e) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
              return;
            e.preventDefault();
            scrollToId("thesis");
          }}
          className="mono-tag group cursor-pointer text-ink/60 transition-colors duration-300 hover:text-brass"
        >
          Back to the top{" "}
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
