"use client";

import { Download } from "lucide-react";

export default function ResumeClip() {
  const handleDownload = () => {
    // Assuming you put 'resume.pdf' in the public/ folder later
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Caine_Benoy_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed top-8 right-8 z-50 hidden md:block">
      {/* Paperclip Graphic (CSS/SVG) */}
      <div className="relative group cursor-none">
        <div className="absolute -top-4 -right-2 h-12 w-4 rounded-full border-4 border-gray-400 border-b-0" />
        <div className="absolute -top-2 -right-4 h-12 w-4 rounded-full border-4 border-gray-400 border-t-0" />
        
        <button
          onClick={handleDownload}
          className="relative bg-white p-4 shadow-paper transition-transform duration-300 hover:rotate-3 hover:scale-105 magnetic"
          aria-label="Download Resume"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-ink">
            <Download size={14} />
            <span>RESUME_V2.PDF</span>
          </div>
          {/* Corner Fold */}
          <div className="absolute -bottom-[1px] -right-[1px] h-4 w-4 bg-gray-200" 
               style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} />
        </button>
      </div>
    </div>
  );
}