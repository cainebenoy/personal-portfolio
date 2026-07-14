"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { curveMidpoint, curvePath, type Point } from "@/lib/curve-path";
import { nodeById, TRADE_EDGES, TRADE_NODES, type TradeId } from "./data";

type Hovered =
  | { type: "node"; id: TradeId }
  | { type: "edge"; index: number }
  | null;

export default function Diagram() {
  const [hovered, setHovered] = useState<Hovered>(null);
  const router = useRouter();

  const goToProject = (slug: string) => router.push(`/work/${slug}`);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {TRADE_EDGES.map((edge, i) => {
          const a = nodeById(edge.from);
          const b = nodeById(edge.to);
          const d = curvePath(a, b, edge.bend);
          const isHovered = hovered?.type === "edge" && hovered.index === i;

          return (
            <g key={edge.slug}>
              {/* Invisible fat hit-area — makes the thin line easy to hover/click. */}
              <path
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth={4}
                style={{ pointerEvents: "stroke", cursor: "pointer" }}
                role="link"
                tabIndex={0}
                aria-label={`View ${edge.project}`}
                onMouseEnter={() => setHovered({ type: "edge", index: i })}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered({ type: "edge", index: i })}
                onBlur={() => setHovered(null)}
                onClick={() => goToProject(edge.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToProject(edge.slug);
                  }
                }}
              />
              <path
                d={d}
                fill="none"
                stroke={isHovered ? "var(--color-accent)" : "var(--color-ink)"}
                strokeOpacity={isHovered ? 0.8 : 0.35}
                strokeWidth={isHovered ? 0.6 : 0.4}
                strokeLinecap="round"
                style={{
                  pointerEvents: "none",
                  transition:
                    "stroke 300ms ease, stroke-opacity 300ms ease, stroke-width 300ms ease",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes are HTML, not SVG, so they stay perfectly round and are
          natively focusable/clickable. */}
      {TRADE_NODES.map((node) => {
        const isHovered = hovered?.type === "node" && hovered.id === node.id;
        return (
          <button
            key={node.id}
            type="button"
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 focus:outline-none"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHovered({ type: "node", id: node.id })}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered({ type: "node", id: node.id })}
            onBlur={() => setHovered(null)}
          >
            <span
              aria-hidden="true"
              className="block rounded-full border-2 border-ink bg-cream"
              style={{
                width: 14,
                height: 14,
                transform: isHovered ? "scale(1.25)" : "scale(1)",
                transition: "transform 300ms ease",
              }}
            />
            <span className="whitespace-nowrap font-structural text-xs text-ink">
              {node.label}
            </span>
          </button>
        );
      })}

      {hovered?.type === "node" && (
        <Callout
          point={nodeById(hovered.id)}
          text={nodeById(hovered.id).description}
        />
      )}
      {hovered?.type === "edge" && (
        <Callout
          point={curveMidpoint(
            nodeById(TRADE_EDGES[hovered.index].from),
            nodeById(TRADE_EDGES[hovered.index].to),
            TRADE_EDGES[hovered.index].bend,
          )}
          text={TRADE_EDGES[hovered.index].project}
        />
      )}
    </div>
  );
}

function Callout({ point, text }: { point: Point; text: string }) {
  return (
    <div
      className="pointer-events-none absolute z-10 whitespace-nowrap rounded-sm border border-ink/15 bg-cream px-3 py-1.5 font-handwritten text-sm text-ink shadow-sm"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        transform: "translate(-50%, calc(-100% - 14px)) rotate(-1.5deg)",
      }}
    >
      {text}
    </div>
  );
}
