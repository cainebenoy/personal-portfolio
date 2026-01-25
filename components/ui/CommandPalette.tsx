"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Command, Hash, ExternalLink, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/useAppStore";
import type { LucideIcon } from "lucide-react";

type Action = {
  id: string;
  label: string;
  icon: LucideIcon;
  shortcut?: string;
  action: () => void;
  group: "Navigation" | "Actions" | "Socials";
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { toggleTheme } = useAppStore();

  const handleThemeToggle = () => {
    toggleTheme();
    const newTheme = useAppStore.getState().theme;
    localStorage.setItem('theme-preference', newTheme);
  };

  const actions: Action[] = [
    // Navigation
    { id: "nav-work", label: "Go to Projects", icon: Hash, group: "Navigation", action: () => router.push("#work") },
    { id: "nav-journey", label: "Go to Journey", icon: Hash, group: "Navigation", action: () => router.push("#experience") },
    { id: "nav-skills", label: "Go to Toolbox", icon: Hash, group: "Navigation", action: () => router.push("#skills") },
    
    // Actions
    { 
        id: "act-theme", 
        label: "Toggle Blueprint Mode", 
        icon: Moon, 
        group: "Actions", 
        shortcut: "T",
        action: () => handleThemeToggle() 
    },
    { 
        id: "act-copy", 
        label: "Copy Email", 
        icon: Command, 
        group: "Actions", 
        shortcut: "C",
        action: () => {
            navigator.clipboard.writeText("cainebenoy@gmail.com");
            setIsOpen(false);
        } 
    },

    // Socials
    { id: "soc-gh", label: "Open GitHub", icon: ExternalLink, group: "Socials", action: () => window.open("https://github.com/cainebenoy", "_blank") },
    { id: "soc-li", label: "Open LinkedIn", icon: ExternalLink, group: "Socials", action: () => window.open("https://linkedin.com/in/cainebenoy", "_blank") },
  ];

  // Filter actions
  const filteredActions = actions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  // Key Listeners
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  // Navigation Keys inside Modal
  useEffect(() => {
    if (!isOpen) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filteredActions.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filteredActions.length) % filteredActions.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filteredActions[selectedIndex]?.action();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [isOpen, selectedIndex, filteredActions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#fdfbf7] shadow-2xl rounded-lg overflow-hidden border-2 border-ink animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header (Search) */}
        <div className="flex items-center gap-3 px-4 py-4 border-b-2 border-dashed border-gray-300">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
                autoFocus
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none font-hand text-xl text-ink placeholder:text-gray-400"
            />
            <div className="font-code text-xs text-gray-400 border border-gray-300 px-2 py-1 rounded">ESC</div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
            {filteredActions.length === 0 ? (
                <div className="p-8 text-center font-hand text-gray-400 text-xl">
                    No results found in the index...
                </div>
            ) : (
                <div className="space-y-1">
                    {filteredActions.map((action, i) => (
                        <button
                            key={action.id}
                            onClick={() => {
                                action.action();
                                setIsOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(i)}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 group text-left",
                                i === selectedIndex ? "bg-ink text-white shadow-md -rotate-1 scale-[1.02]" : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <action.icon className={cn("w-4 h-4", i === selectedIndex ? "text-highlight" : "text-gray-400")} />
                                <span className={cn("font-code text-sm", i === selectedIndex ? "font-bold" : "")}>
                                    {action.label}
                                </span>
                            </div>
                            {action.shortcut && (
                                <span className="font-code text-xs opacity-50 border px-1 rounded border-current">
                                    {action.shortcut}
                                </span>
                            )}
                            {i === selectedIndex && <ArrowRight className="w-4 h-4 animate-pulse text-highlight" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex justify-between items-center text-[10px] font-code text-gray-400">
            <span>INDEX_V1.0</span>
            <span>{filteredActions.length} RECORDS FOUND</span>
        </div>
      </div>
    </div>
  );
}