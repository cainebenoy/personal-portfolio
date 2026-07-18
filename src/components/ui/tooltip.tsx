"use client";

// shadcn-pattern Tooltip on Radix — a little margin note that appears
// beside whatever it annotates.
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "mono-tag z-[80] max-w-56 border border-line bg-lifted px-3 py-1.5 text-ink shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)]",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}
