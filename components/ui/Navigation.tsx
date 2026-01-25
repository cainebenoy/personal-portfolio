"use client";

import { Moon, Sun } from "lucide-react";
import { useAppStore } from "@/lib/useAppStore";

export default function Navigation() {
  const { theme, toggleTheme } = useAppStore();

  const handleThemeToggle = () => {
    toggleTheme();
    const newTheme = useAppStore.getState().theme;
    localStorage.setItem('theme-preference', newTheme);
  };

  return (
    <nav className="fixed top-0 w-full p-8 flex justify-between items-start z-40 pointer-events-none">
      {/* Logo */}
      <div className="pointer-events-auto cursor-none">
        <span className="font-marker text-2xl rotate-[-2deg] block hover:scale-110 transition-all duration-500">
          Caine.
        </span>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={handleThemeToggle}
        className="pointer-events-auto cursor-none group relative p-2 rounded-full transition-all duration-700 hover:scale-110"
        title={theme === "sketch" ? "Switch to Blueprint" : "Switch to Sketch"}
      >
        {/* Background glow */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 bg-highlight/10" />
        
        {/* Icon wrapper with smooth transition */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          {theme === "sketch" ? (
            <Moon 
              size={24} 
              className="text-ink transition-all duration-700 absolute rotate-0 opacity-100 group-hover:scale-110"
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              size={24} 
              className="text-ink transition-all duration-700 absolute rotate-0 opacity-100 group-hover:scale-110"
              strokeWidth={1.5}
            />
          )}
        </div>

        {/* Animated border on hover */}
        <div className="absolute inset-0 rounded-full border border-ink opacity-0 group-hover:opacity-50 group-hover:scale-125 transition-all duration-700" />
      </button>
    </nav>
  );
}