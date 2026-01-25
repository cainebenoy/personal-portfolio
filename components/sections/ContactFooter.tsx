"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

type StripType = "link" | "copy" | "action" | "download";

interface StripItem {
  id: string;
  label: string;
  value: string;
  type: StripType;
  color?: string;
  isCelebration?: boolean;
}

const strips: StripItem[] = [
  { id: "1", label: "Email Me", value: "cainebenoy@gmail.com", type: "copy" },
  { id: "2", label: "LinkedIn", value: "https://www.linkedin.com/in/caine-benoy-8061a9288/", type: "link" },
  { id: "3", label: "RESUME PDF", value: "/resume.pdf", type: "download", color: "text-blue-600 font-bold" },
  { id: "4", label: "Location", value: "Thrissur, Kerala", type: "copy" },
  { id: "5", label: "GitHub", value: "https://github.com/cainebenoy", type: "link" },
  { id: "6", label: "HIRE ME", value: "Available Now", type: "action", color: "text-red-500 font-bold", isCelebration: true },
];

export default function ContactFooter() {
  const [tornIds, setTornIds] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);



  const handleInteraction = async (strip: StripItem, rect: DOMRect) => {
    setTornIds((prev) => [...prev, strip.id]);
    
    track("interaction", { type: strip.type, label: strip.label });

    // Show celebration message for HIRE ME
    if (strip.isCelebration) {
      setToast("LET'S BUILD SOMETHING AMAZING.");
      setTimeout(() => setToast(null), 2000);
    }

    // Action Logic
    if (strip.type === "download") {
        const link = document.createElement("a");
        link.href = strip.value;
        link.download = "Caine_Benoy_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setToast("Downloading Resume...");
        setTimeout(() => setToast(null), 2000);
    } 
    else if (strip.type === "copy") {
      try {
        await navigator.clipboard.writeText(strip.value);
        setToast(`Copied: ${strip.value}`);
      } catch (err) {
        const textarea = document.createElement("textarea");
        textarea.value = strip.value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setToast(`Copied: ${strip.value}`);
      }
      setTimeout(() => setToast(null), 1500);
    } 
    else if (strip.type === "link") {
      window.open(strip.value, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="contact" className="relative z-10 min-h-[60vh] flex flex-col justify-end pb-0">
      
      {/* Toast */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-ink text-paper px-6 py-3 rounded-full shadow-xl z-50 font-code text-sm copy-toast">
          {toast}
        </div>
      )}

      <div className="text-center mb-16 pointer-events-auto px-4">
        <h2 className="font-display text-6xl md:text-9xl leading-none text-ink hover:text-highlight transition-colors duration-300">
          Let's Build.
        </h2>
        <p className="font-hand text-2xl mt-4 text-gray-600">
          Grab a strip. Let's make something weird.
        </p>
      </div>

      {/* Tear-off Container */}
      <div className="w-full max-w-5xl mx-auto flex justify-center items-end border-t-4 border-dashed border-gray-300 pt-0 relative bg-white/50 shadow-sm overflow-x-auto pb-4 gap-1 md:gap-2 pointer-events-auto">
        
        {strips.map((strip, i) => (
          <div
            key={strip.id}
            className={cn(
              "tear-strip bg-white border-l-2 border-r-2 border-gray-100 writing-vertical-rl p-3 md:p-5 cursor-pointer transition-all duration-300 font-code text-[10px] md:text-xs shadow-paper",
              "hover:translate-y-4 hover:text-highlight hover:z-20",
              tornIds.includes(strip.id) ? "animate-tear opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto",
              i % 2 === 0 ? "translate-y-1" : "-translate-y-1",
              strip.color
            )}
            onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                handleInteraction(strip, rect);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                handleInteraction(strip, rect);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {strip.label}
          </div>
        ))}
      </div>

      <footer className="w-full text-center font-hand text-gray-400 text-lg py-8 bg-[#f0eee0] pointer-events-auto">
        © 2026 Caine Benoy. Built with chaos & code.
      </footer>
    </section>
  );
}
