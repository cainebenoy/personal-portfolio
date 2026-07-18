import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import {
  FIELD_NOTES_PENDING,
  FIELD_NOTES_WITH_IMAGES,
} from "@/content/field-notes";

// Chapter 06 — field notes. The photographs that exist run large, offset
// against each other, with a slow drift inside their masks; the frames still
// waiting on scans are listed as an index instead of faked as placeholders.
export default function Notes() {
  return (
    <section id="notes" aria-label="Field notes" className="px-page py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="notes"
          lines={["Field notes."]}
          note="Real rooms, named and dated — hackathon floors, lead camps, stage nights. No stock photography."
        />

        <div className="mt-16 grid gap-x-14 gap-y-16 lg:mt-20 lg:grid-cols-12">
          {FIELD_NOTES_WITH_IMAGES.map((note, i) => {
            const wide = i % 2 === 0;
            return (
              <figure
                key={note.caption}
                data-reveal
                className={
                  wide
                    ? "lg:col-span-7"
                    : "lg:col-span-5 lg:mt-[14vh] lg:self-start"
                }
              >
                <div
                  className={`relative overflow-hidden border border-line-faint bg-raised ${
                    wide ? "aspect-[4/3]" : "aspect-[4/5]"
                  }`}
                >
                  {/* Oversized + drifted inside the mask for depth on scroll. */}
                  <div data-parallax="-8" className="absolute -inset-y-[8%] inset-x-0">
                    <Image
                      src={note.image}
                      alt={note.caption}
                      fill
                      sizes="(max-width: 1024px) 92vw, 56vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className="mt-4 flex items-baseline gap-4">
                  <span className="mono-tag text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono-tag text-ivory/55">{note.caption}</span>
                </figcaption>
              </figure>
            );
          })}

          <div className="lg:col-span-7 lg:col-start-6">
            <p data-reveal className="mono-tag text-ivory/45">
              Also on the roll — scans pending
            </p>
            <ol data-reveal-group className="mt-5 flex flex-col">
              {FIELD_NOTES_PENDING.map((note, i) => (
                <li
                  key={note.caption}
                  data-reveal-item
                  className="flex items-baseline gap-4 border-t border-line-faint py-3 last:border-b"
                >
                  <span className="mono-tag text-ivory/35">
                    {String(FIELD_NOTES_WITH_IMAGES.length + i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.925rem] text-ivory/60">
                    {note.caption}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
