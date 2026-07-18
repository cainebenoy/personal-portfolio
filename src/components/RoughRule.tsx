// A hand-ruled line — the notebook's answer to the 1px hairline. Gentle
// quiver, drawn in by the motion layer via data-draw on a parent (the
// stroke carries the `draw` class), static and complete without JS.
export default function RoughRule({
  className = "",
  stroke = "color-mix(in oklab, var(--color-ink) 30%, transparent)",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 6"
      preserveAspectRatio="none"
      className={`h-[5px] min-w-0 flex-1 ${className}`}
    >
      <path
        d="M1 3.5 Q 30 1.5 60 3 T 120 3 T 199 2.5"
        fill="none"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
        className="draw"
      />
    </svg>
  );
}
