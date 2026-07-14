import RevealOnScroll from "@/components/RevealOnScroll";
import { FIELD_NOTES, type FieldNote } from "@/content/field-notes";

// Controlled, not random — but varied enough that the row doesn't read as a
// rigid grid. Cycled by index, same convention as IndexCard's ROTATIONS.
const ROTATE_CLASSES = [
  "rotate-[-2deg]",
  "rotate-[3deg]",
  "rotate-[-1deg]",
  "rotate-[2deg]",
  "rotate-[-3deg]",
  "rotate-[1.5deg]",
  "rotate-[-2.5deg]",
  "rotate-[2deg]",
];

type Size = "sm" | "md" | "lg";
const SIZES: Size[] = ["md", "md", "lg", "sm", "md", "lg", "sm", "md"];
const SIZE_WIDTH: Record<Size, string> = {
  sm: "w-36",
  md: "w-44",
  lg: "w-52",
};

// A gentle hand-drawn wobble, not a ruled line — same convention as the
// Journey timeline's spine. vectorEffect keeps the stroke a consistent
// visible width regardless of how much the viewBox gets stretched.
const STRING_PATH_HORIZONTAL =
  "M 0 5 Q 6 1 12 5 Q 18 9 24 5 Q 30 1 36 5 Q 42 9 48 5 Q 54 1 60 5 Q 66 9 72 5 Q 78 1 84 5 Q 90 9 96 5 Q 99 3 100 5";
const STRING_PATH_VERTICAL =
  "M 8 0 Q 12 8 8 16 Q 4 24 9 32 Q 13 40 8 48 Q 4 56 9 64 Q 13 72 8 80 Q 5 88 8 100";

function Pin({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="6"
        r="4"
        fill="var(--color-accent)"
        fillOpacity="0.15"
        stroke="var(--color-ink)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="8" cy="6" r="1.3" fill="var(--color-ink)" />
      <line
        x1="8"
        y1="10"
        x2="8"
        y2="14"
        stroke="var(--color-ink)"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function PhotoSlot({ size }: { size: Size }) {
  return (
    <div
      className={`flex aspect-[4/3] items-center justify-center border border-ink/15 bg-surface p-2 shadow-sm ${SIZE_WIDTH[size]}`}
    >
      <div className="flex h-full w-full items-center justify-center border border-dashed border-ink/25">
        <p className="max-w-[80%] text-center font-structural text-xs text-ink/40">
          photo — swap in later
        </p>
      </div>
    </div>
  );
}

function Card({
  note,
  size,
  rotateClass,
}: {
  note: FieldNote;
  size: Size;
  rotateClass: string;
}) {
  return (
    <div
      className={`flex flex-col items-center ${rotateClass} transition-transform duration-200 hover:-translate-y-1 hover:rotate-0`}
    >
      <PhotoSlot size={size} />
      <p className="mt-2 max-w-[10rem] text-center font-handwritten text-sm text-accent">
        {note.caption}
      </p>
    </div>
  );
}

export default function FieldNotes() {
  return (
    <section
      id="field-notes"
      className="mx-auto max-w-6xl scroll-mt-6 px-6 py-24"
    >
      <RevealOnScroll>
        <h2 className="text-center font-structural text-2xl text-ink sm:text-3xl">
          Field Notes
        </h2>
      </RevealOnScroll>

      {/* Desktop: a horizontally scrollable evidence-board strip — the
          string runs further than the viewport, reinforcing "there's more
          here" the same way the archive's declassify toggle does. */}
      <div className="hidden md:block">
        <RevealOnScroll className="mt-14">
          <p className="mb-4 pl-10 font-handwritten text-sm text-ink/50 [transform:rotate(-1deg)]">
            → scroll for more
          </p>
          <div className="overflow-x-auto pb-6">
            <div className="relative h-[380px] w-max">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d={STRING_PATH_HORIZONTAL}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="flex h-full items-stretch gap-12 px-12">
                {FIELD_NOTES.map((note, i) => {
                  const above = i % 2 === 0;
                  const size = SIZES[i % SIZES.length];
                  const rotateClass = ROTATE_CLASSES[i % ROTATE_CLASSES.length];

                  return (
                    <div
                      key={note.caption}
                      className="flex h-full w-48 shrink-0 flex-col"
                    >
                      <div className="flex h-1/2 items-end justify-center">
                        {above && (
                          <div className="flex flex-col items-center">
                            <Card note={note} size={size} rotateClass={rotateClass} />
                            <Pin className="mt-1" />
                          </div>
                        )}
                      </div>
                      <div className="flex h-1/2 items-start justify-center">
                        {!above && (
                          <div className="flex flex-col items-center">
                            <Pin className="mb-1" />
                            <Card note={note} size={size} rotateClass={rotateClass} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Mobile: same pinned-to-a-line character, just vertical instead of
          collapsing to a plain stacked grid. */}
      <div className="md:hidden">
        <RevealOnScroll className="mt-14">
          <div className="relative mx-auto max-w-xs">
            <svg
              className="pointer-events-none absolute top-0 left-8 h-full w-4"
              viewBox="0 0 16 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d={STRING_PATH_VERTICAL}
                fill="none"
                stroke="var(--color-ink)"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="flex flex-col gap-12 pl-20">
              {FIELD_NOTES.map((note, i) => {
                const size = SIZES[i % SIZES.length];
                const rotateClass = ROTATE_CLASSES[i % ROTATE_CLASSES.length];
                return (
                  <li key={note.caption} className="relative flex items-center">
                    <Pin className="absolute -left-9" />
                    <Card note={note} size={size} rotateClass={rotateClass} />
                  </li>
                );
              })}
            </ol>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
