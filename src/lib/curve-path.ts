export interface Point {
  x: number;
  y: number;
}

// Quadratic bezier with a perpendicular-ish bend, for a hand-drawn feel.
export function curvePath(a: Point, b: Point, bend: number): string {
  const midX = (a.x + b.x) / 2 + bend;
  const midY = (a.y + b.y) / 2 - bend;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
}

export function curveMidpoint(a: Point, b: Point, bend: number): Point {
  const cx = (a.x + b.x) / 2 + bend;
  const cy = (a.y + b.y) / 2 - bend;
  return {
    x: 0.25 * a.x + 0.5 * cx + 0.25 * b.x,
    y: 0.25 * a.y + 0.5 * cy + 0.25 * b.y,
  };
}
