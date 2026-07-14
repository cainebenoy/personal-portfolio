import Link from "next/link";

export default function SiteBackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="font-structural text-sm text-ink/60 underline underline-offset-4 hover:text-accent"
    >
      ← {label}
    </Link>
  );
}
