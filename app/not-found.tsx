"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] relative overflow-hidden">
      {/* Dark desk background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* The Torn Page */}
      <div className="relative bg-paper p-12 max-w-lg w-full shadow-2xl rotate-1 animate-in zoom-in duration-500">
        
        {/* Torn Top Edge */}
        <div 
            className="absolute top-[-20px] left-0 w-full h-[20px] bg-paper"
            style={{ 
                clipPath: "polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)" 
            }} 
        />

        <div className="text-center space-y-6 relative z-10">
          <div className="font-marker text-6xl text-highlight rotate-[-5deg]">
            404 ERROR
          </div>
          
          <h1 className="font-display text-4xl text-ink">
            Page Scrapped.
          </h1>
          
          <p className="font-hand text-2xl text-gray-600">
            &ldquo;I must have torn this one out... or maybe the dog ate it.&rdquo;
          </p>

          <div className="pt-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 font-code text-sm hover:bg-highlight transition-colors shadow-paper -rotate-1 hover:rotate-0"
            >
              <MoveLeft size={16} />
              TAPE IT BACK (HOME)
            </Link>
          </div>
        </div>

        {/* Tape Strips */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/30 backdrop-blur-sm -rotate-2 shadow-sm border-l border-r border-white/40" />
        <div className="absolute bottom-4 right-4 font-code text-[10px] text-gray-400 rotate-90 origin-right">
            MISSING_ASSET_ID: unknown
        </div>
      </div>
    </div>
  );
}