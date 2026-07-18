"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CHAPTERS } from "@/lib/chapters";
import { scrollToId } from "@/lib/motion";
import { CONTACT_EMAIL } from "@/content/about";
import { toggleTheme } from "@/lib/theme";

// ⌘K / Ctrl+K — the site's index card. Chapters, pages, and a few actions,
// filterable, fully keyboard-driven. Opened by the shortcut or by the
// header hint button (which dispatches "open-palette").

interface Command {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void | boolean; // return true to keep the palette open
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => {
      if (document.getElementById(id)) {
        scrollToId(id);
      } else {
        router.push(`/#${id}`);
      }
    };
    return [
      ...CHAPTERS.map((ch) => ({
        id: `ch-${ch.id}`,
        label: ch.label,
        hint: ch.num,
        keywords: `chapter section ${ch.label}`,
        run: () => goTo(ch.id),
      })),
      {
        id: "page-resume",
        label: "Resume",
        hint: "Page",
        keywords: "resume cv pdf download hire",
        run: () => router.push("/resume"),
      },
      {
        id: "page-now",
        label: "Now",
        hint: "Page",
        keywords: "now current status today",
        run: () => router.push("/now"),
      },
      {
        id: "page-colophon",
        label: "Colophon",
        hint: "Page",
        keywords: "colophon about site how built fonts stack",
        run: () => router.push("/colophon"),
      },
      {
        id: "act-theme",
        label: "Toggle theme",
        hint: "Action",
        keywords: "theme dark light mode paper blueprint toggle",
        run: () => {
          toggleTheme();
          return true;
        },
      },
      {
        id: "act-copy",
        label: copied ? "Email copied" : "Copy email address",
        hint: "Action",
        keywords: "copy email address contact clipboard",
        run: () => {
          navigator.clipboard?.writeText(CONTACT_EMAIL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
          return true;
        },
      },
      {
        id: "act-email",
        label: "Write an email",
        hint: "Action",
        keywords: "email write contact mailto hire",
        run: () => {
          window.location.href = `mailto:${CONTACT_EMAIL}`;
        },
      },
    ];
  }, [router, copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Opening always starts from a clean slate; the reset happens at the
  // trigger, not inside an effect.
  const openPalette = () => {
    setQuery("");
    setActive(0);
    setOpen(true);
  };

  // Global shortcut + header hint event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          setOpen(false);
        } else {
          openPalette();
        }
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [open]);

  // Open/close housekeeping: move focus in, give it back on close.
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
        returnFocusRef.current?.focus();
      };
    }
  }, [open]);

  if (!open) return null;

  const run = (cmd: Command) => {
    const keep = cmd.run();
    if (!keep) setOpen(false);
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(
        (i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1),
      );
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[16vh] print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-ink/20 backdrop-blur-[2px] dark:bg-ground/60"
      />
      <div className="deal-in relative w-full max-w-lg border border-line bg-lifted shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3 border-b border-line-faint px-4">
          <span aria-hidden="true" className="mono-tag text-red">
            ⌘K
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Where to?"
            aria-label="Search commands"
            className="w-full bg-transparent py-3.5 text-[0.95rem] text-ink outline-none placeholder:text-ink/35"
          />
        </div>
        <ol role="listbox" aria-label="Commands" className="max-h-[46vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="mono-tag px-4 py-3 text-ink/40">
              Nothing filed under that.
            </li>
          )}
          {filtered.map((cmd, i) => (
            <li key={cmd.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                onClick={() => run(cmd)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full cursor-pointer items-baseline justify-between gap-6 px-4 py-2.5 text-left transition-colors duration-150 ${
                  i === active ? "bg-raised text-ink" : "text-ink/70"
                }`}
              >
                <span className="text-[0.95rem]">{cmd.label}</span>
                <span
                  className={`mono-tag ${i === active ? "text-red" : "text-ink/35"}`}
                >
                  {cmd.hint}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mono-tag border-t border-line-faint px-4 py-2.5 text-ink/35">
          ↑↓ navigate · Enter select · Esc close
        </p>
      </div>
    </div>
  );
}
