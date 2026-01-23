"use client";

import React, { useRef, useState } from "react";

type StripType = "email" | "link" | "text";

type StripItem = {
  label: string;
  copy: string;
  type: StripType;
  url?: string;
  offset?: string;
};

type CelebrationStrip = StripItem & { celebration?: boolean };

const STRIPS: CelebrationStrip[] = [
  { label: "Email Me", copy: "cainebenoy@gmail.com", type: "email", offset: "translate-y-1" },
  { label: "LinkedIn", copy: "linkedin.com/in/caine-benoy", type: "link", url: "https://www.linkedin.com/in/caine-benoy-8061a9288/", offset: "-translate-y-1" },
  { label: "GitHub", copy: "github.com/cainebenoy", type: "link", url: "https://github.com/cainebenoy" },
  { label: "Location", copy: "Thrissur, Kerala", type: "text", offset: "translate-y-1" },
  { label: "TinkerHub", copy: "tinkerhub.org", type: "link", url: "https://tinkerhub.org/@caine_benoy", offset: "-translate-y-1" },
  { label: "Hire Me", copy: "Let's Build!", type: "text", celebration: true },
];

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export default function ContactFooter() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 1500);
  };

  const triggerCelebration = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const handleAction = async (item: CelebrationStrip) => {
    if (item.celebration) {
      triggerCelebration();
      return;
    }

    if (item.type === "email") {
      await copyText(item.copy);
      showToast("Email copied to clipboard");
      return;
    }

    if (item.type === "link" && item.url) {
      openInNewTab(item.url);
      return;
    }

    await copyText(item.copy);
    showToast("Copied to clipboard");
  };

  const triggerTear = (target: HTMLDivElement, item: CelebrationStrip) => {
    if (target.classList.contains("tearing")) return;

    target.classList.add("tearing");

    setTimeout(() => {
      target.classList.add("opacity-0", "pointer-events-none");
    }, 700);

    void handleAction(item);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, item: CelebrationStrip) => {
    triggerTear(e.currentTarget, item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, item: CelebrationStrip) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerTear(e.currentTarget, item);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 min-h-[80vh] flex flex-col justify-end pb-0 pointer-events-none bg-[#f0eee0]"
    >
      <div className="text-center mb-12 pointer-events-auto px-4">
        <h2 className="font-display text-5xl md:text-8xl leading-none text-ink hover:text-highlight transition-colors duration-300">
          Let&apos;s Build.
        </h2>
        <p className="font-hand text-xl md:text-2xl mt-4 text-gray-600">
          Grab a strip. Let&apos;s make something weird.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Click a strip to copy or open the corresponding link.
        </p>

        <div className="mt-10 flex justify-center">
          <div className="relative inline-flex items-end rounded-t-xl bg-[#f5f2e6] px-3 py-6 shadow-lg">
            <div className="pointer-events-none absolute inset-x-2 bottom-0 h-6 bg-gradient-to-b from-transparent to-black/10 blur-md" />

            <div className="relative flex gap-3 md:gap-4">
              {STRIPS.map((item, i) => {
                const offsetClass = item.offset ?? "";
                const isLink = item.type === "link";
                const isEmail = item.type === "email";
                const isCelebration = item.celebration;

                const ariaLabel = isCelebration
                  ? "Celebrate and trigger confetti"
                  : isEmail
                  ? "Copy email to clipboard"
                  : isLink
                  ? `Open ${item.label} in a new tab`
                  : `Copy ${item.label} to clipboard`;

                return (
                  <div
                    key={item.label + i}
                    role="button"
                    tabIndex={0}
                    aria-label={ariaLabel}
                    className={[
                      "tear-strip writing-vertical-rl font-code text-[10px] md:text-xs",
                      "bg-white border-l border-r border-dashed border-gray-300",
                      "px-3 py-4 md:px-4 md:py-5",
                      "cursor-pointer select-none",
                      "hover:-translate-y-1 hover:scale-105 hover:text-highlight",
                      "transition-transform duration-200 ease-out",
                      "shadow-paper",
                      "focus:outline-none focus:ring-2 focus:ring-highlight/60 focus:ring-offset-2 focus:ring-offset-[#f5f2e6]",
                      "origin-bottom",
                      offsetClass,
                    ].join(" ")}
                    onClick={(e) => handleClick(e, item)}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="copy-toast pointer-events-none fixed inset-x-0 bottom-16 flex justify-center">
          <div className="rounded-full bg-black text-white text-xs md:text-sm px-4 py-2 shadow-lg">
            {toast}
          </div>
        </div>
      )}

      {confetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                backgroundColor: ["#fffd75", "#ff4757", "#7afcff", "#ffa502", "#2ed573"][
                  Math.floor(Math.random() * 5)
                ],
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                animation: `confetti-fall ${2 + Math.random() * 1}s linear forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      <footer className="w-full text-center font-hand text-gray-400 text-base md:text-lg py-6 bg-[#f0eee0] pointer-events-auto">
        © 2026 Caine Benoy. Built with chaos &amp; code.
      </footer>
    </section>
  );
}
