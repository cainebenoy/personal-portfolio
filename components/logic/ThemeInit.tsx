"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/useAppStore";

export default function ThemeInit() {
  const { toggleTheme, theme } = useAppStore();

  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6; // 7 PM to 6 AM

    // Only switch if it's night and we are currently in sketch mode (default)
    // This allows the user to override it later if they want
    if (isNight && theme === "sketch") {
      toggleTheme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return null;
}