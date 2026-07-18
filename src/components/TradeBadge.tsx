"use client";

import Glyph from "@/components/Glyph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tradeById, type TradeId } from "@/content/trades";

// A trade glyph with its margin note: hover (or focus) any glyph and the
// trade explains itself. Used on project spreads and the contact row.
export default function TradeBadge({
  id,
  showLabel = true,
  glyphClassName = "h-5 w-5",
}: {
  id: TradeId;
  showLabel?: boolean;
  glyphClassName?: string;
}) {
  const trade = tradeById(id);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className="inline-flex cursor-help items-center gap-3 text-accent"
        >
          <Glyph id={id} className={glyphClassName} />
          {showLabel && (
            <span className="mono-tag text-ink/70">
              {trade.numeral} — {trade.name}
            </span>
          )}
          <span className="sr-only">{trade.line}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent>{trade.line}</TooltipContent>
    </Tooltip>
  );
}
