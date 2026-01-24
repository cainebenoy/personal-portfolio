"use client";

import { useEffect } from "react";

export function useReveal(selector = ".reveal", options?: IntersectionObserverInit) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("in-view");
          } else {
            el.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );

    elements.forEach((el) => {
      el.classList.add("reveal");
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, [selector, options]);
}
