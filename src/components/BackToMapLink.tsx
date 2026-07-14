import Link from "next/link";

export default function BackToMapLink() {
  return (
    <Link
      href="/#trades"
      className="font-structural text-sm text-ink/60 underline underline-offset-4 hover:text-accent"
    >
      ← back to the map
    </Link>
  );
}
