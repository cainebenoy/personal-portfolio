"use client";

import { useReveal } from "@/lib/useReveal";

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
  useReveal("#services .reveal");
  return (
    <section id="services" className="relative z-10 py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rotate-1 border-2 border-ink bg-white p-8 shadow-paper md:p-12 reveal">
          {/* Header */}
          <div className="mb-8 flex items-end justify-between border-b-2 border-dashed border-ink pb-4">
            <div>
              <h2 className="font-display text-4xl text-ink">SPEC SHEET</h2>
              <p className="font-code text-xs text-gray-500">ORDER NO. 2026-CB</p>
            </div>
            <div className="font-marker text-xl text-highlight">Valid Until: Forever</div>
          </div>

          {/* List */}
          <div className="space-y-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-start justify-between gap-2 border-b border-gray-100 pb-4 md:flex-row md:items-end reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex-1">
                  <h3 className="font-marker text-2xl text-ink transition-colors group-hover:text-highlight">
                    {s.title}
                  </h3>
                  <p className="max-w-md font-hand text-xl text-gray-600">
                    {s.desc}
                  </p>
                </div>
                <div className="font-code text-sm font-bold text-ink">
                  [{s.price}]
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center font-messy text-2xl text-gray-400">
            * Satisfaction guaranteed or I&apos;ll fix the bug for free.
          </div>
        </div>
      </div>
    </section>
  );
}