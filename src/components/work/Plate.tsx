import { GlyphShapes } from "@/components/Glyph";
import type { Project } from "@/content/projects";

// The project "plate" — an honest visual for builds that live in terminals,
// kiosks, and stage rigs rather than screenshots: a drafting-plate
// composition of the project's own trade glyphs over a registration grid.
// Every stroke carries pathLength/.draw, so the whole plate draws itself in
// when it scrolls into view (via data-draw on the wrapper).
export default function Plate({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  // Two glyphs per plate, offset like overlaid transparencies. A third
  // trade (none today) would simply be ignored — the plate stays a duet.
  const [a, b] = project.trades;

  return (
    <div
      data-draw
      className="border border-line-faint bg-raised"
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 300" className="block h-auto w-full">
        {/* Registration grid */}
        <g stroke="var(--color-line-faint)" strokeWidth="1">
          {[100, 200, 300].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" />
          ))}
          {[100, 200].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
          ))}
        </g>

        {/* Corner registration marks */}
        <g stroke="var(--color-brass)" strokeWidth="1" opacity="0.55">
          <path d="M16 10 V22 M10 16 H22" />
          <path d="M384 10 V22 M378 16 H390" />
          <path d="M16 278 V290 M10 284 H22" />
          <path d="M384 278 V290 M378 284 H390" />
        </g>

        {/* The two trades, overlaid. strokeWidth compensates the ×7.2 scale
            so the linework stays near-hairline. */}
        <g
          transform="translate(64, 52) scale(7.2)"
          style={{ color: "var(--color-ink)" }}
          opacity="0.4"
        >
          <GlyphShapes id={a} strokeWidth={0.28} />
        </g>
        <g
          transform="translate(172, 108) scale(7.2)"
          style={{ color: "var(--color-brass)" }}
          opacity="0.85"
        >
          <GlyphShapes id={b} strokeWidth={0.28} />
        </g>

        <text
          x="16"
          y="42"
          fill="var(--color-ink)"
          opacity="0.4"
          fontSize="10"
          letterSpacing="2.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          PLATE 04·{num}
        </text>
        <text
          x="384"
          y="266"
          textAnchor="end"
          fill="var(--color-ink)"
          opacity="0.3"
          fontSize="10"
          letterSpacing="2.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {project.slug.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
