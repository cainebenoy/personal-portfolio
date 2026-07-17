"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { FIELD_NOTES, type FieldNote } from "@/content/field-notes";

// Fixed frame width shared by the photo row and the sprocket row above/below
// it — using the same constant for both is what keeps the two rows the same
// total length without measuring anything at runtime.
const FRAME_WIDTH = "w-56";
const SPROCKET_HOLES_PER_FRAME = 3;

// Deliberately hard-coded near-black/near-white rather than the theme's
// --color-ink/--color-cream tokens, which invert in dark mode. A contact
// sheet reel is dark regardless of what theme the page around it is in.
const STRIP_BG = "bg-neutral-900";
const STRIP_BORDER = "border-neutral-700";
const HOLE_COLOR = "bg-neutral-100";
const STAMP_COLOR = "text-neutral-100/60";

function SprocketRow() {
  return (
    <div className="flex" aria-hidden="true">
      {FIELD_NOTES.map((_, i) => (
        <div key={i} className={`flex ${FRAME_WIDTH} shrink-0 items-center justify-between px-3 py-1.5`}>
          {Array.from({ length: SPROCKET_HOLES_PER_FRAME }).map((_, j) => (
            <span key={j} className={`h-1.5 w-2.5 rounded-[1px] ${HOLE_COLOR}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

function SprocketCol() {
  return (
    <div className="flex w-4 flex-col items-center justify-evenly py-2" aria-hidden="true">
      {Array.from({ length: SPROCKET_HOLES_PER_FRAME }).map((_, j) => (
        <span key={j} className={`h-2.5 w-1.5 rounded-[1px] ${HOLE_COLOR}`} />
      ))}
    </div>
  );
}

function Frame({
  note,
  index,
  active,
  reducedMotion,
  widthClass,
  onEnter,
  onLeave,
  onTap,
}: {
  note: FieldNote;
  index: number;
  active: boolean;
  reducedMotion: boolean;
  widthClass: string;
  onEnter: () => void;
  onLeave: () => void;
  onTap: () => void;
}) {
  const stamp = String(index + 1).padStart(2, "0");
  return (
    <button
      type="button"
      className={`group relative ${widthClass} shrink-0 border-r ${STRIP_BORDER} text-left last:border-r-0 focus:outline-none`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onTap}
      aria-label={note.caption}
    >
      <span
        className={`absolute left-2 top-2 z-10 font-structural text-[10px] tracking-widest ${STAMP_COLOR}`}
      >
        {stamp}
      </span>
      <div
        className="flex aspect-[4/3] w-full items-center justify-center bg-accent/25 transition-[filter] duration-500 ease-out group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-inset"
        style={
          reducedMotion
            ? undefined
            : {
                filter: active
                  ? "grayscale(0) saturate(1) brightness(1)"
                  : "grayscale(1) saturate(0.2) brightness(0.7)",
              }
        }
      >
        <p className="max-w-[70%] text-center font-structural text-[10px] text-neutral-100/40">
          photo — swap in later
        </p>
      </div>
    </button>
  );
}

export default function FieldNotes() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const caption =
    activeIndex !== null ? FIELD_NOTES[activeIndex].caption : "Hover a frame to develop it.";

  return (
    <section id="field-notes" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-24">
      <RevealOnScroll>
        <h2 className="text-center font-structural text-2xl tracking-wide text-ink uppercase sm:text-3xl">
          Field Notes
        </h2>
        <p className="mt-2 text-center text-sm text-ink/50">
          Selected frames from the archive
        </p>
      </RevealOnScroll>

      {/* Desktop: a horizontally scrollable contact-sheet strip — one
          continuous reel, edge-to-edge frames, longer than the viewport. */}
      <div className="hidden md:block">
        <RevealOnScroll className="mt-14">
          <p className="mb-3 pl-1 font-handwritten text-sm text-ink/50 [transform:rotate(-1deg)]">
            → drag to review the reel
          </p>
          <div className="overflow-x-auto pb-2">
            <div className={`w-max ${STRIP_BG} py-1`}>
              <SprocketRow />
              <div className="flex">
                {FIELD_NOTES.map((note, i) => (
                  <Frame
                    key={note.caption}
                    note={note}
                    index={i}
                    active={activeIndex === i}
                    reducedMotion={reducedMotion}
                    widthClass={FRAME_WIDTH}
                    onEnter={() => setActiveIndex(i)}
                    onLeave={() => setActiveIndex(null)}
                    onTap={() => setActiveIndex(activeIndex === i ? null : i)}
                  />
                ))}
              </div>
              <SprocketRow />
            </div>
          </div>
          <p className="mt-3 min-h-[1.75rem] pl-1 font-handwritten text-base text-accent">
            {caption}
          </p>
        </RevealOnScroll>
      </div>

      {/* Mobile: the same reel, stacked vertically — sprockets move to the
          left/right edges of each frame instead of top/bottom, and tap
          replaces hover for the develop/caption reveal. */}
      <div className="md:hidden">
        <RevealOnScroll className="mt-14">
          <p className="mb-3 pl-1 font-handwritten text-sm text-ink/50 [transform:rotate(-1deg)]">
            → tap a frame to develop it
          </p>
          <div className={`mx-auto flex max-w-xs flex-col ${STRIP_BG} px-1`}>
            {FIELD_NOTES.map((note, i) => (
              <div key={note.caption} className={`flex items-stretch border-b ${STRIP_BORDER} last:border-b-0`}>
                <SprocketCol />
                <Frame
                  note={note}
                  index={i}
                  active={activeIndex === i}
                  reducedMotion={reducedMotion}
                  widthClass="flex-1"
                  onEnter={() => {}}
                  onLeave={() => {}}
                  onTap={() => setActiveIndex(activeIndex === i ? null : i)}
                />
                <SprocketCol />
              </div>
            ))}
          </div>
          <p className="mt-3 min-h-[1.75rem] text-center font-handwritten text-base text-accent">
            {caption}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
