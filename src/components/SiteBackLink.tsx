"use client";

import Link from "next/link";

export default function SiteBackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    // Only intercept if the target is already on this page — otherwise
    // (e.g. from the 404 page) let Link do a real cross-page navigation.
    const target = document.getElementById(href.slice(hashIndex + 1));
    if (!target) return;
    e.preventDefault();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="font-structural text-sm text-ink/60 underline underline-offset-4 hover:text-accent"
    >
      ← {label}
    </Link>
  );
}
