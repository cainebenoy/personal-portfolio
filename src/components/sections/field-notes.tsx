import CornerTabs from "@/components/CornerTabs";
import RevealOnScroll from "@/components/RevealOnScroll";
import { FIELD_NOTES } from "@/content/field-notes";

export default function FieldNotes() {
  return (
    <section
      id="field-notes"
      className="mx-auto max-w-5xl scroll-mt-6 px-6 py-24"
    >
      <RevealOnScroll>
        <h2 className="text-center font-structural text-2xl text-ink sm:text-3xl">
          Field Notes
        </h2>
      </RevealOnScroll>

      <RevealOnScroll className="mt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {FIELD_NOTES.map((note, i) => {
            // Consistent, controlled alternation — not a random scatter.
            const rotate =
              i % 2 === 0
                ? "[transform:rotate(-1.5deg)]"
                : "[transform:rotate(1.5deg)]";

            return (
              <figure key={note.caption} className={`flex flex-col items-center ${rotate}`}>
                <div className="relative w-full border border-ink/15 bg-surface p-2 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                  <CornerTabs />
                  <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-ink/25">
                    <p className="max-w-[80%] text-center font-structural text-xs text-ink/40">
                      photo — swap in later
                    </p>
                  </div>
                </div>
                <figcaption className="mt-3 text-center font-handwritten text-sm text-accent">
                  {note.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </RevealOnScroll>
    </section>
  );
}
