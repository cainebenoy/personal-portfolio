"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, FileText, Maximize2, Download } from "lucide-react";

// --- DATA STRUCTURE ---
// Empty list while assets are removed; drop in resized files later.
const certificateFiles: string[] = [];

type CertType = "image" | "pdf" | "file";

const imageExts = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"];

const certData = certificateFiles.map((fileName, idx) => {
  const ext = fileName.toLowerCase().split(".").pop() ?? "";
  const type: CertType = ext === "pdf" ? "pdf" : imageExts.includes(ext) ? "image" : "file";
  return {
    id: `cert-${idx}`,
    name: fileName,
    issuer: "",
    date: "",
    type,
    src: `/Certificates/${encodeURIComponent(fileName)}`,
  };
});

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<(typeof certData)[number] | null>(null);

  // Generate stable random styles for the stamps to avoid hydration mismatch
  const stampStyles = useMemo(() => {
    return certData.map((_, i) => ({
      rotation: (i * 37 % 10) - 5, // -5 to 5 degrees
      marginTop: (i * 13 % 20), // 0 to 20px offset
      tape: i % 4 === 0, // 25% have tape
      color: i % 6 === 0 ? "bg-[#fefce8] border-[#fef08a]" : // Yellow tint
             i % 9 === 0 ? "bg-[#f0f9ff] border-[#bce0fd]" : // Blue tint
             "bg-white border-gray-200" // Standard
    }));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setSelectedCert(null);
  };

  return (
    <section 
      id="certificates" 
      className="relative z-10 py-32"
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-20 text-center relative">
          <h2 className="font-display text-6xl md:text-8xl text-ink relative inline-block">
            The Archive
            <div className="absolute -top-6 -right-12 font-marker text-sm text-red-500 rotate-12 border-2 border-red-500 px-2 py-1 rounded opacity-80">
              CLASSIFIED
            </div>
          </h2>
          <p className="mt-6 font-hand text-2xl md:text-3xl text-gray-500 max-w-2xl mx-auto">
            A messy, growing collection of every lesson learned. 
            <span className="block text-sm font-code mt-2 text-gray-400">TOTAL_COUNT: {certData.length} • STATUS: VERIFIED</span>
          </p>
        </div>

        {/* The Wall Container */}
        <div className="relative bg-[#fdfbf7] p-6 md:p-12 shadow-[inset_0_0_60px_rgba(0,0,0,0.05)] border-4 border-double border-ink/10 rounded-xl overflow-hidden min-h-[800px]">
          
          {/* Wall Texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard.png")' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/5 pointer-events-none"></div>
          
          <div className="flex flex-wrap justify-center content-start gap-3 md:gap-4 relative z-10">
            {certData.map((cert, i) => {
              const style = stampStyles[i];
              return (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  style={{ 
                    marginTop: `${style.marginTop}px`,
                    transform: `rotate(${style.rotation}deg)` 
                  }}
                  className={cn(
                    "group relative w-20 h-16 md:w-28 md:h-20 shadow-sm transition-all duration-300 ease-out cursor-none",
                    "hover:z-50 hover:scale-[2.5] hover:shadow-2xl hover:rotate-0",
                    style.color,
                    "border-2"
                  )}
                  title={cert.name}
                >
                  {/* Decorative Tape */}
                  {style.tape && (
                    <div className="absolute -top-2 left-1/2 w-8 h-3 bg-white/40 backdrop-blur-[1px] -translate-x-1/2 -rotate-2 shadow-sm border-l border-r border-white/60 z-20"></div>
                  )}

                  {/* Content Container */}
                  <div className="w-full h-full p-1 flex flex-col items-center justify-between overflow-hidden relative">
                    
                    {/* Image Area */}
                    <div className="relative flex-1 w-full overflow-hidden rounded-[1px] border border-black/5">
                      {cert.type === 'image' ? (
                        <Image 
                          src={cert.src}
                          alt={cert.name}
                          fill
                          className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                          sizes="(max-width: 768px) 112px, 160px"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-300 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                          <FileText size={16} strokeWidth={2.5} />
                        </div>
                      )}
                      
                      {/* Gloss Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
                    </div>

                    {/* Tiny Footer Text */}
                    <div className="w-full text-center mt-[2px]">
                       <div className="font-code text-[6px] md:text-[8px] uppercase tracking-tighter text-gray-500 truncate leading-none">
                         {cert.issuer}
                       </div>
                    </div>
                  </div>

                  {/* Hover "Zoom" Hint overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none">
                    <div className="bg-ink/80 text-white rounded-full p-1 shadow-lg transform scale-50">
                      <Maximize2 size={12} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Background Stamps/Decorations */}
          <div className="absolute top-10 left-10 pointer-events-none opacity-[0.03] -rotate-12">
            <span className="font-display text-9xl uppercase text-ink">VALID</span>
          </div>
          <div className="absolute bottom-20 right-10 pointer-events-none opacity-[0.03] rotate-6">
            <div className="border-4 border-ink rounded-full w-64 h-64 flex items-center justify-center border-double p-4">
               <span className="font-marker text-4xl text-ink text-center transform -rotate-12">SEAL OF<br/>APPROVAL</span>
            </div>
          </div>

        </div>
      </div>

      {/* Empty State */}
      {certData.length === 0 && (
        <div className="mt-10 text-center">
          <p className="font-hand text-xl text-gray-500">Archive awaiting uploads…</p>
          <p className="font-code text-xs text-gray-400 mt-2">Drop resized certificate images into /public/Certificates</p>
        </div>
      )}

      {/* --- LIGHTBOX MODAL --- */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="font-bold font-display text-xl md:text-2xl text-ink truncate max-w-[200px] md:max-w-md">
                  {selectedCert.name}
                </h3>
                <p className="font-code text-xs text-gray-500 uppercase tracking-wider">
                  ISSUED BY {selectedCert.issuer} • {selectedCert.date}
                </p>
              </div>
              
              <div className="flex gap-2">
                <a 
                  href={selectedCert.src} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
                  title="Open/Download"
                >
                  <Download size={20} />
                </a>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 hover:bg-red-100 hover:text-red-500 rounded-full transition-colors text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#222] overflow-auto flex items-center justify-center p-4 min-h-[400px] relative">
              {/* Background pattern for modal */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {selectedCert.type === 'image' ? (
                <div className="relative w-full h-full min-h-[60vh]">
                  <Image 
                    src={selectedCert.src} 
                    alt={selectedCert.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              ) : (
                <iframe 
                  src={selectedCert.src} 
                  className="w-full h-full min-h-[60vh] bg-white border shadow-sm relative z-10"
                  title={selectedCert.name}
                />
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}