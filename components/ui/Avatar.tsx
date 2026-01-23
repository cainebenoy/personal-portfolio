"use client";

import Image from "next/image";

export default function Avatar() {
  return (
    <div className="relative h-48 w-48 rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105 md:h-64 md:w-64">
      {/* Tape */}
      <div className="absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 -rotate-2 bg-white/40 backdrop-blur-sm shadow-sm z-20" />
      
      {/* Photo Frame */}
      <div className="h-full w-full overflow-hidden border-[6px] border-white bg-white shadow-paper">
        {/* Placeholder - Replace '/me.jpg' with your actual photo in public folder */}
        <div className="relative h-full w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
           {/* Fallback standard div if image fails/is missing */}
           <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl">
             👨‍💻
           </div>
           
           {/* Uncomment this when you add your photo */}
           { <Image src="/me.jpg" alt="Caine Benoy" fill className="object-cover" />}
        </div>
      </div>
      
      {/* Hand-drawn scribble */}
      <svg className="absolute -bottom-8 -right-8 w-24 h-24 text-highlight opacity-80 z-10 animate-spin-slow" viewBox="0 0 100 100">
        <path d="M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
      </svg>
    </div>
  );
}