"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { curveMidpoint, curvePath, type Point } from "@/lib/curve-path";
import { nodeById, TRADE_EDGES, TRADE_NODES, type TradeId } from "./data";

type Hovered =
  | { type: "node"; id: TradeId }
  | { type: "edge"; index: number }
  | null;

// "The Builder" -> "Builder", for natural mid-sentence phrasing in labels.
function shortLabel(label: string) {
  return label.replace(/^The\s+/, "");
}

export default function Diagram() {
  const [hovered, setHovered] = useState<Hovered>(null);
  const router = useRouter();

  const goToProject = (slug: string) => router.push(`/work/${slug}`);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-xl"
      role="group"
      aria-label="Trades map: six trades connected by six projects"
    >
      <p className="sr-only">
        Interactive diagram. Tab through the six trades, then the six
        connecting projects. Press Enter or Space on a project to open its
        case study.
      </p>

      {/* Nodes render first so they're first in both DOM/tab order and
          screen-reader order; z-10 keeps them visually above the edges
          regardless of source order. */}
      {TRADE_NODES.map((node) => {
        const isHovered = hovered?.type === "node" && hovered.id === node.id;
        return (
          <button
            key={node.id}
            type="button"
            aria-label={`${node.label} — ${node.description}`}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHovered({ type: "node", id: node.id })}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered({ type: "node", id: node.id })}
            onBlur={() => setHovered(null)}
          >
            <span
              aria-hidden="true"
              className="block rounded-full border-2 border-ink bg-surface"
              style={{
                width: 14,
                height: 14,
                transform: isHovered ? "scale(1.25)" : "scale(1)",
                transition: "transform 300ms ease",
              }}
            />
            <span
              aria-hidden="true"
              className="whitespace-nowrap font-structural text-xs text-ink"
            >
              {node.label}
            </span>
          </button>
        );
      })}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
      >
        {TRADE_EDGES.map((edge, i) => {
          const a = nodeById(edge.from);
          const b = nodeById(edge.to);
          const d = curvePath(a, b, edge.bend);
          const isHovered = hovered?.type === "edge" && hovered.index === i;
          const label = `${edge.project} — connects ${shortLabel(a.label)} and ${shortLabel(b.label)}, click to view case study`;

          return (
            <g key={edge.slug}>
              {/* Invisible fat hit-area — makes the thin line easy to hover/click/focus. */}
              <path
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth={4}
                className="outline-none"
                style={{ pointerEvents: "stroke", cursor: "pointer" }}
                role="link"
                tabIndex={0}
                aria-label={label}
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
                aria-hidden="true"
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
      aria-hidden="true"
      className="pointer-events-none absolute z-20 whitespace-nowrap rounded-sm border border-ink/15 bg-surface px-3 py-1.5 font-handwritten text-sm text-ink shadow-sm"
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
