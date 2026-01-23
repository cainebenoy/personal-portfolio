"use client";

import { useRef } from "react";

export default function ContactFooter() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const handleTear = (e: React.MouseEvent<HTMLDivElement>) => {
    const strip = e.currentTarget;
    const rect = strip.getBoundingClientRect();
    const text = strip.getAttribute("data-copy") || "";

    // 1. Visual: Hide the original strip
    strip.classList.add("opacity-0", "pointer-events-none");

    // 2. Physics: Spawn a falling clone (calls the function we exposed in PhysicsCanvas)
    if ((window as any).spawnFallingStrip) {
      (window as any).spawnFallingStrip(rect);
    }

    // 3. Action: Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }

    // 4. Feedback (Flash the cursor green if possible, or just alert)
    // We rely on the user noticing the strip falling!
  };

  return (
    <section id="contact" className="relative z-10 min-h-[80vh] flex flex-col justify-end pb-0 pointer-events-none">
      <div className="text-center mb-12 pointer-events-auto">
        <h2 className="font-display text-6xl md:text-9xl leading-none text-ink hover:text-highlight transition-colors duration-300">
          Let's Build.
        </h2>
        <p className="font-hand text-2xl mt-4 text-gray-600">
          Grab a strip. Let's make something weird.
        </p>
      </div>

      {/* Tear-off Container */}
      <div className="w-full max-w-4xl mx-auto flex justify-center border-t-4 border-dashed border-gray-300 pt-0 relative bg-white shadow-sm overflow-x-auto pointer-events-auto">
        {[
          { label: "Email Me", copy: "hello@cainebenoy.com" },
          { label: "LinkedIn", copy: "linkedin.com/in/cainebenoy" },
          { label: "GitHub", copy: "github.com/cainebenoy" },
          { label: "Location", copy: "Thrissur, Kerala" },
          { label: "Community", copy: "TinkerHub Lead" },
          { label: "Hire Me", copy: "Available for Hire" },
        ].map((item, i) => (
          <div
            key={i}
            className="tear-strip bg-white border-l border-r border-dashed border-gray-300 writing-vertical-rl p-4 cursor-none hover:translate-y-4 hover:text-highlight transition-transform duration-200 font-code text-xs md:text-sm"
            data-copy={item.copy}
            onClick={handleTear}
            style={{ writingMode: "vertical-rl" }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <footer className="w-full text-center font-hand text-gray-400 text-lg py-8 bg-[#f0eee0] pointer-events-auto">
        © 2026 Caine Benoy. Built with chaos & code.
      </footer>
    </section>
  );
}