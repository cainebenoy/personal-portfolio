"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/chrome/ThemeToggle";
import { chapter, NAV_CHAPTER_IDS, navLabel } from "@/lib/chapters";
import { scrollToId } from "@/lib/motion";

// Fixed chrome: wordmark, four chapter links, contact CTA. Transparent over
// the hero, then picks up a hairline and a smoked backdrop once the page is
// moving. Mobile gets a full-screen overlay index instead of inline links.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Overlay housekeeping: lock page scroll, close on Escape, and hand focus
  // to the first link (returning it to the toggle on close).
  useEffect(() => {
    if (!open) return;
    const toggle = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // Chapter links carry real "/#id" hrefs so they navigate from subpages
  // (and without JS); the click is only intercepted for the eased scroll
  // when the target actually exists on the current page.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    if (!document.getElementById(id)) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 print:hidden ${
          scrolled && !open
            ? "border-b border-line-faint bg-ground/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="px-page flex h-16 items-center justify-between">
          {/* The wordmark is the signature, in the writing hand. */}
          <Link
            href="/#thesis"
            onClick={(e) => go(e, "thesis")}
            className="cursor-pointer font-display text-[1.55rem] font-semibold text-ink transition-colors duration-300 hover:text-accent"
          >
            Caine Benoy
          </Link>

          <nav aria-label="Chapters" className="hidden items-center gap-7 md:flex">
            {NAV_CHAPTER_IDS.map((id) => {
              const ch = chapter(id);
              return (
                <Link
                  key={id}
                  href={`/#${id}`}
                  onClick={(e) => go(e, id)}
                  className="group mono-tag cursor-pointer text-ink/60 transition-colors duration-300 hover:text-ink"
                >
                  <span className="mr-1.5 text-accent/70 transition-colors duration-300 group-hover:text-accent">
                    {ch.num}
                  </span>
                  {navLabel(id)}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={(e) => go(e, "contact")}
              className="mono-tag cursor-pointer border border-accent/50 px-4 py-2.5 text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ground"
            >
              Contact
            </Link>
            <button
              type="button"
              aria-label="Open command palette"
              onClick={() => window.dispatchEvent(new Event("open-palette"))}
              className="mono-tag hidden h-11 cursor-pointer items-center px-2 text-ink/40 transition-colors duration-300 hover:text-accent lg:flex"
            >
              ⌘K
            </button>
            <ThemeToggle className="-mr-2" />
          </nav>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="mono-tag -mr-2 flex h-11 cursor-pointer items-center px-2 text-ink"
            >
              {open ? "Close" : "Index"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile index overlay. Rendered under the header bar so the toggle
          stays put; links are the full chapter list at display scale. */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ground/95 backdrop-blur-lg transition-opacity duration-500 ease-out-expo md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Chapters" className="px-page flex flex-col gap-1">
          {[...NAV_CHAPTER_IDS, "contact"].map((id, i) => {
            const ch = chapter(id);
            return (
              <Link
                key={id}
                ref={i === 0 ? firstLinkRef : undefined}
                href={`/#${id}`}
                onClick={(e) => go(e, id)}
                tabIndex={open ? 0 : -1}
                className={`group flex cursor-pointer items-baseline gap-4 py-3 transition-[opacity,translate] duration-500 ease-out-expo ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <span className="mono-tag text-accent">{ch.num}</span>
                <span className="font-display text-4xl text-ink transition-colors group-hover:text-accent">
                  {navLabel(id)}
                </span>
              </Link>
            );
          })}
        </nav>
        <p
          className={`px-page mono-tag mt-12 text-ink/40 transition-opacity delay-500 duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          Jack of all trades — Kerala, IN
        </p>
      </div>
    </>
  );
}
