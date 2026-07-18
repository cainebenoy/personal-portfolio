"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONTACT_EMAIL } from "@/content/about";
import { CHAPTERS } from "@/lib/chapters";
import { scrollToId } from "@/lib/motion";
import { toggleTheme } from "@/lib/theme";

// ⌘K / Ctrl+K — the site's index card, on the shadcn stack: Radix Dialog
// for the surface (focus trap, escape, scroll lock) and cmdk for
// filtering and keyboard roving. Opened by the shortcut or the header
// hint button (which dispatches "open-palette").
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    if (document.getElementById(id)) {
      scrollToId(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  const goPage = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="print:hidden">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Jump to a chapter or page, or run an action.
        </DialogDescription>
        <Command loop>
          <CommandInput placeholder="Where to?" />
          <CommandList>
            <CommandEmpty>Nothing filed under that.</CommandEmpty>
            <CommandGroup heading="Chapters">
              {CHAPTERS.map((ch) => (
                <CommandItem
                  key={ch.id}
                  value={`${ch.num} ${ch.label} chapter`}
                  onSelect={() => goTo(ch.id)}
                >
                  <span>{ch.label}</span>
                  <CommandShortcut>{ch.num}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Pages">
              {[
                ["Resume", "/resume", "resume cv pdf download hire"],
                ["Now", "/now", "now current status"],
                ["Colophon", "/colophon", "colophon how built fonts stack"],
              ].map(([label, path, keywords]) => (
                <CommandItem
                  key={path}
                  value={`${label} ${keywords}`}
                  onSelect={() => goPage(path)}
                >
                  <span>{label}</span>
                  <CommandShortcut>Page</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem
                value="toggle theme dark light paper blueprint"
                onSelect={() => toggleTheme()}
              >
                <span>Toggle theme</span>
                <CommandShortcut>Action</CommandShortcut>
              </CommandItem>
              <CommandItem
                value="copy email address contact clipboard"
                onSelect={() => {
                  navigator.clipboard?.writeText(CONTACT_EMAIL).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1600);
                  });
                }}
              >
                <span>{copied ? "Email copied" : "Copy email address"}</span>
                <CommandShortcut>Action</CommandShortcut>
              </CommandItem>
              <CommandItem
                value="write an email mailto contact hire"
                onSelect={() => {
                  setOpen(false);
                  window.location.href = `mailto:${CONTACT_EMAIL}`;
                }}
              >
                <span>Write an email</span>
                <CommandShortcut>Action</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <p className="mono-tag border-t border-line-faint px-4 py-2.5 text-ink/50">
            ↑↓ navigate · Enter select · Esc close
          </p>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
