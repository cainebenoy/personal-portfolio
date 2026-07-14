"use client";

import { useEffect, useRef } from "react";

// Writes the given element's scroll progress (0 at the top of its own
// scroll track, 1 once it's scrolled fully past) to a `--p` CSS custom
// property on that element, on every scroll/resize — never a one-shot
// trigger, so descendants reading var(--p) scrub forward AND backward
// exactly with scroll position.
export function useScrollProgress<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 1;
      const p = Math.min(1, Math.max(0, raw));
      el.style.setProperty("--p", String(p));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active]);

  return ref;
}
