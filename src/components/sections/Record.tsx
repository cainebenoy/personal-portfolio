import SectionHeader from "@/components/SectionHeader";
import { JOURNEY } from "@/content/journey";

// Chapter 05 — the record. Roles and receipts as a ruled ledger: a brass
// spine draws down the margin while each entry files itself in.
export default function Record() {
  return (
    <section id="record" aria-label="Record — roles and receipts" className="px-page py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="record"
          lines={["Every yes,", "in order."]}
          note="Roles and receipts, 2023 → present — most recent first."
        />

        <div className="relative mt-16 lg:mt-20">
          <span
            aria-hidden="true"
            data-rule
            data-axis="y"
            className="absolute top-0 bottom-0 left-0 hidden w-px bg-brass/40 md:block"
          />

          <ol data-reveal-group className="flex flex-col md:pl-12">
            {JOURNEY.map((entry) => {
              const key =
                entry.type === "group"
                  ? entry.org
                  : `${entry.range}-${entry.title}`;
              return (
                <li
                  key={key}
                  data-reveal-item
                  className="grid gap-x-10 gap-y-1.5 border-t border-line-faint py-7 last:border-b md:grid-cols-[11rem_1fr]"
                >
                  <p className="mono-tag pt-1 text-ivory/45">{entry.range}</p>

                  {entry.type === "single" ? (
                    <div>
                      <h3 className="font-display text-xl leading-snug text-ivory sm:text-2xl">
                        {entry.title}
                        <span className="text-brass"> · {entry.org}</span>
                      </h3>
                      <p className="mt-2 max-w-2xl text-[0.925rem] leading-6 text-ivory/60">
                        {entry.description}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-display text-xl leading-snug text-ivory sm:text-2xl">
                        {entry.org}
                      </h3>
                      <ul className="mt-4 flex flex-col gap-5 border-l border-line pl-5">
                        {entry.roles.map((role) => (
                          <li key={role.title}>
                            <p className="mono-tag text-ivory/45">{role.range}</p>
                            <p className="mt-1 font-medium text-ivory">
                              {role.title}
                            </p>
                            <p className="mt-1 max-w-2xl text-[0.925rem] leading-6 text-ivory/60">
                              {role.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
