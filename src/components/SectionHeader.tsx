import { chapter } from "@/lib/chapters";

// Every chapter opens the same way: its number and label set on a drawn
// rule, then the display title rising out of a mask. The numbering is the
// site's real reading order — see src/lib/chapters.ts.
export default function SectionHeader({
  id,
  lines,
  note,
  className = "",
  titleClassName = "text-[clamp(2.6rem,6vw,4.9rem)]",
}: {
  /** Chapter id — supplies the number and kicker label. */
  id: string;
  /** Title, one string per display line (each line gets its own mask). */
  lines: string[];
  note?: string;
  className?: string;
  /** Override for the title's size classes (e.g. inside pinned scenes). */
  titleClassName?: string;
}) {
  const ch = chapter(id);
  return (
    <header className={className}>
      <div className="flex items-center gap-5">
        <span className="mono-tag text-brass">{ch.num}</span>
        <span
          aria-hidden="true"
          data-rule
          className="h-px min-w-0 flex-1 bg-line"
        />
        <span className="kicker text-ivory/50">{ch.label}</span>
      </div>
      <h2
        data-mask
        className={`mt-8 font-display leading-[0.98] tracking-[-0.015em] text-ivory ${titleClassName}`}
      >
        {lines.map((line) => (
          <span key={line} className="mask-line">
            <span>{line}</span>
          </span>
        ))}
      </h2>
      {note && (
        <p data-reveal className="mt-6 max-w-xl text-[0.95rem] leading-7 text-ivory/60">
          {note}
        </p>
      )}
    </header>
  );
}
