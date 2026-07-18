import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn-style class combiner: conditional classes + Tailwind conflict
// resolution, so ui/ components can accept className overrides safely.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
