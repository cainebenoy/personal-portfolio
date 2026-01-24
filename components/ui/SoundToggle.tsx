"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    isMuted?: boolean;
  }
}

export default function SoundToggle() {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.isMuted ?? false;
  });

  // Keep global flag in sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.isMuted = muted;
    }
  }, [muted]);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    // Advertise mute state globally for any audio engine to respect
    if (typeof window !== "undefined") {
      window.isMuted = next;
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper shadow-paper transition-transform hover:scale-110 active:scale-95 magnetic"
    >
      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
}