"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/useAppStore";

export default function ThemeInit() {
  const { toggleTheme, theme } = useAppStore();

  // Sync theme to DOM element
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Auto-enable Blueprint mode for night visitors (7 PM - 6 AM)
  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6;

    // Check if user has already toggled theme manually by checking localStorage
    const hasUserPreference = localStorage.getItem('theme-preference');
    
    if (isNight && theme === "sketch" && !hasUserPreference) {
      toggleTheme();
      localStorage.setItem('theme-preference', 'blueprint');
    } else if (!isNight && theme === "blueprint" && !hasUserPreference) {
      // Auto-switch back to sketch mode during day if no user preference
      toggleTheme();
      localStorage.setItem('theme-preference', 'sketch');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return null;
}