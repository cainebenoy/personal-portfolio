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
        <div className="flex items-baseline gap-5">
          <span className="mono-tag text-brass">{ch.num}</span>
          <h2
            data-reveal
            className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-none tracking-[-0.01em] text-ink"
          >
            {lines.join(" ")}
          </h2>
          <span
            aria-hidden="true"
            data-rule
            className="h-px min-w-0 flex-1 self-center bg-line"
          />
          <span className="kicker hidden text-ink/50 sm:block">{ch.label}</span>
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
      <div className="flex items-center gap-5">
        <span className="mono-tag text-brass">{ch.num}</span>
        <span
          aria-hidden="true"
          data-rule
          className="h-px min-w-0 flex-1 bg-line"
        />
        <span className="kicker text-ink/50">{ch.label}</span>
      </div>
      <h2
        data-mask
        className={`mt-8 font-display leading-[0.98] tracking-[-0.015em] text-ink ${titleClassName}`}
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
