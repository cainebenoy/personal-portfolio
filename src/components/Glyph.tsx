import type { TradeId } from "@/content/trades";

// The six trade glyphs — the site's signature system. Stroke-only marks on
// a shared 24×24 grid. Strokes scale with the glyph (standard icon
// behavior); contexts that render at large scale (plates, the hero field)
// pass a thinner strokeWidth to keep the hairline character.
//
// Every shape carries the `draw` class so the motion layer (data-draw /
// DrawSVGPlugin) can stroke them in. No pathLength and no non-scaling-stroke
// here on purpose: both change how dash offsets are measured and break
// draw-in animation math.
//
//   builder      two offset modules mid-assembly
//   machinist    a bolt head — hex with a center pin
//   chainsmith   two interlocked links
//   intelligence a signal rising from a point
//   operator     a crosshair, on target
//   strategist   a plotted route between two positions

export function GlyphShapes({
  id,
  strokeWidth = 1.5,
}: {
  id: TradeId;
  strokeWidth?: number;
}) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "draw",
  };

  switch (id) {
    case "builder":
      return (
        <>
          <path d="M4.5 8.5 H15.5 V19.5 H4.5 Z" {...stroke} />
          <path d="M8.5 4.5 H19.5 V15.5 H8.5 Z" {...stroke} />
        </>
      );
    case "machinist":
      return (
        <>
          <path d="M12 3.5 L19.4 7.75 V16.25 L12 20.5 L4.6 16.25 V7.75 Z" {...stroke} />
          <circle cx="12" cy="12" r="2.4" {...stroke} />
        </>
      );
    case "chainsmith":
      return (
        <>
          <circle cx="8.75" cy="12" r="5.25" {...stroke} />
          <circle cx="15.25" cy="12" r="5.25" {...stroke} />
        </>
      );
    case "intelligence":
      return (
        <>
          <circle cx="12" cy="16.5" r="1.9" {...stroke} />
          <path d="M6.5 11.5 a7 7 0 0 1 11 0" {...stroke} />
          <path d="M3.5 8 a10.75 10.75 0 0 1 17 0" {...stroke} />
        </>
      );
    case "operator":
      return (
        <>
          <circle cx="12" cy="12" r="6" {...stroke} />
          <path d="M12 2.5 V6" {...stroke} />
          <path d="M12 18 V21.5" {...stroke} />
          <path d="M2.5 12 H6" {...stroke} />
          <path d="M18 12 H21.5" {...stroke} />
        </>
      );
    case "strategist":
      return (
        <>
          <circle cx="6" cy="18.25" r="1.9" {...stroke} />
          <path d="M6 15.25 V9 A3 3 0 0 1 9 6 H15" {...stroke} />
          <circle cx="18" cy="6" r="1.9" {...stroke} />
        </>
      );
  }
}

export default function Glyph({
  id,
  className = "",
  strokeWidth,
  title,
}: {
  id: TradeId;
  className?: string;
  strokeWidth?: number;
  /** Accessible name; omitted = decorative (aria-hidden). */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      <GlyphShapes id={id} strokeWidth={strokeWidth} />
    </svg>
  );
}
