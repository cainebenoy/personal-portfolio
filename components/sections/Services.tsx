"use client";

const services = [
  {
    title: "Rapid Prototyping",
    desc: "Give me a weekend, I'll give you an MVP. I specialize in 0 to 1 builds.",
    price: "FAST",
  },
  {
    title: "Community Arch.",
    desc: "Building tribes, not just userbases. Experience with TinkerHub & SOF.",
    price: "LOUD",
  },
  {
    title: "Creative Tech",
    desc: "Unity, WebGL, and the weird stuff. If it's interactive, I build it.",
    price: "FUN",
  },
  {
    title: "Systems Thinking",
    desc: "Connecting the frontend glitter to the backend grit.",
    price: "SOLID",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 py-12 md:py-16 animate-fade-in">
      <div className="mx-auto max-w-5xl px-2 sm:px-4">
        <div className="rotate-1 border-2 border-ink theme-surface p-4 sm:p-8 md:p-12 shadow-paper">
          {/* Header */}
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b-2 border-dashed border-ink pb-3 md:pb-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink">SPEC SHEET</h2>
              <p className="font-code text-[9px] sm:text-xs theme-muted">ORDER NO. 2026-CB</p>
            </div>
            <div className="font-marker text-lg sm:text-xl text-highlight whitespace-nowrap">Valid Until: Forever</div>
          </div>

          {/* List */}
          <div className="space-y-4 md:space-y-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-start justify-between gap-2 border-b theme-border pb-3 md:pb-4 md:flex-row md:items-end"
              >
                <div className="flex-1">
                  <h3 className="font-marker text-lg sm:text-xl md:text-2xl text-ink transition-colors group-hover:text-highlight">
                    {s.title}
                  </h3>
                  <p className="max-w-md font-hand text-base sm:text-lg md:text-xl text-ink">
                    {s.desc}
                  </p>
                </div>
                <div className="font-code text-xs sm:text-sm font-bold text-ink">
                  [{s.price}]
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 md:mt-8 text-center font-messy text-lg sm:text-xl md:text-2xl theme-muted">
            * Satisfaction guaranteed or I&apos;ll fix the bug for free.
          </div>
        </div>
      </div>
    </section>
  );
}