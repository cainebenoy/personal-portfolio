"use client";

import GenerativeArt from "@/components/canvas/GenerativeArt";

export default function ArtGallery() {
  return (
    <section id="gallery" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        
        <div className="mb-16 text-center">
            <h2 className="font-display text-5xl md:text-7xl">Art Gallery</h2>
            <p className="mt-4 font-hand text-2xl text-gray-500">"I also do the weird visual stuff."</p>
        </div>

        <div className="flex justify-center">
            {/* The Frame */}
            <div className="relative p-4 bg-white shadow-2xl rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                {/* Tape */}
                <div className="absolute -top-4 left-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm -translate-x-1/2 -rotate-2 border border-white/50 shadow-sm z-20"></div>

                <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-black relative overflow-hidden border-4 border-gray-900">
                    <GenerativeArt />
                </div>
                
                <div className="mt-4 flex justify-between items-end">
                    <div>
                        <h3 className="font-code text-sm font-bold">FIG 1.0 // BREATHE</h3>
                        <p className="font-sans text-xs text-gray-400">WebGL / Three.js</p>
                    </div>
                    <div className="font-hand text-xl text-ink">#001</div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}