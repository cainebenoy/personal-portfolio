"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
  const [muted, setMuted] = useState(false);

  // Sync with any existing global toggle so multiple components stay in agreement
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = (window as any).isMuted;
    if (typeof existing === "boolean") {
      setMuted(existing);
    } else {
      (window as any).isMuted = false;
    }
  }, []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    // Advertise mute state globally for any audio engine to respect
    (window as any).isMuted = next;
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