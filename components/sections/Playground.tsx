"use client";

import PhysicsSandbox from "@/components/canvas/PhysicsSandbox";

export default function Playground() {
  return (
    <section id="playground" className="relative z-10 py-24">
      <div className="mx-auto max-w-5xl px-4">
        
        <div className="mb-12 flex items-center gap-4">
            <h2 className="font-display text-4xl text-ink md:text-5xl">The Playground</h2>
            <div className="h-[2px] flex-1 bg-ink opacity-20"></div>
            <span className="font-hand text-xl text-gray-500">Chaos Drawer</span>
        </div>

        <div className="rotate-1 transition-transform hover:rotate-0">
             <PhysicsSandbox />
        </div>

        <div className="mt-4 text-center font-code text-xs text-gray-400">
            * Warning: Items may shift during flight.
        </div>

      </div>
    </section>
  );
}