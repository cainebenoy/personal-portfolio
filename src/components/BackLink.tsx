import Link from "next/link";

// Return path from a subpage to the index — plain navigation, no Lenis
// involvement needed across routes.
export default function BackLink() {
  return (
    <Link
      href="/"
      className="mono-tag group inline-flex cursor-pointer items-baseline gap-2 text-ink/70 transition-colors duration-300 hover:text-accent"
    >
      <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">
        ←
      </span>
      Back to the index
    </Link>
  );
}
