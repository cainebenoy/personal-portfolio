import RoughRule from "@/components/RoughRule";
import { chapter } from "@/lib/chapters";

// Chapter openers in two weights, so the page doesn't repeat one skeleton
// nine times:
//   grand — number and label on a drawn rule, display title out of a mask.
//           For the chapters that carry the story (work, range, record…).
//   side  — number, a modest title, and the rule sharing one line. For the
//           supporting chapters (notes, archive).
// The numbering is the site's real reading order — see src/lib/chapters.ts.
export default function SectionHeader({
  id,
  lines,
  note,
  className = "",
  variant = "grand",
  titleClassName = "text-[clamp(2.6rem,6vw,4.9rem)]",
}: {
  /** Chapter id — supplies the number and kicker label. */
  id: string;
  /** Title, one string per display line (each line gets its own mask). */
  lines: string[];
  note?: string;
  className?: string;
  variant?: "grand" | "side";
  /** Override for the title's size classes (e.g. inside pinned scenes). */
  titleClassName?: string;
}) {
  const ch = chapter(id);

  if (variant === "side") {
    return (
      <header className={className}>
        <div data-draw className="flex items-baseline gap-5">
          <span className="mono-tag text-red">{ch.num}</span>
          <h2
            data-reveal
            className="font-display text-[clamp(2.1rem,3.8vw,3rem)] leading-[1.06] text-ink"
          >
            {lines.join(" ")}
          </h2>
          <RoughRule className="self-center" />
          <span className="kicker hidden text-ink/65 sm:block">{ch.label}</span>
        </div>
        {note && (
          <p data-reveal className="mt-5 max-w-xl text-[0.95rem] leading-7 text-ink/60">
            {note}
          </p>
        )}
      </header>
    );
  }

  return (
    <header className={className}>
      <div data-draw className="flex items-center gap-5">
        <span className="mono-tag text-red">{ch.num}</span>
        <RoughRule />
        <span className="kicker text-ink/65">{ch.label}</span>
      </div>
      <h2
        data-mask
        className={`mt-8 font-display leading-[1.04] text-ink ${titleClassName}`}
      >
        {lines.map((line) => (
          <span key={line} className="mask-line">
            <span>{line}</span>
          </span>
        ))}
      </h2>
      {note && (
        <p data-reveal className="mt-6 max-w-xl text-[0.95rem] leading-7 text-ink/60">
          {note}
        </p>
      )}
    </header>
  );
}
