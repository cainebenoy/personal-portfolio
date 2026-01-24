"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, FileText, Maximize2, Download } from "lucide-react";

// --- DATA STRUCTURE ---
// All certificates from public/Certificates folder as images
const certificateFiles: string[] = [
  "Aloki '25 Certificate of Achievement.jpg",
  "Aloki '25.jpg",
  "Amartya '25.jpg",
  "Android with Compose.jpg",
  "Aroha '25.jpg",
  "Aspera '25 Kerala Varma College Participation Certificate.jpg",
  "AWS Foundations - Getting Started with Cloud Essentials.jpg",
  "Blood Donation Certificate.jpg",
  "Cambridge LinguaSkill Page 1.jpg",
  "Cambridge LinguaSkill Page 2.jpg",
  "challenge-event-poster.jpg",
  "Code To Win Consistency Badge.jpg",
  "CodersCave Internship Certificate of Completion.jpg",
  "CodersCave Internship Letter of Recommendation.jpg",
  "CodersCave Intership Offer Letter.jpg",
  "Coursera x Google Automate Cybersecurity Tasks with Python.jpg",
  "Coursera x Google Put It to Work.jpg",
  "Coursera x Grow With Google Assets, Threats and Vulnerabilities.jpg",
  "Coursera x Grow With Google Connect and Protect.jpg",
  "Coursera x Grow With Google Foundations of Cybersecurity Certificate.jpg",
  "Coursera x Grow With Google Play It Safe Manage Security Risks Certificate.jpg",
  "Coursera x Grow With Google Tools of the Trade.jpg",
  "Coursera x IBM Introduction to Software Engineering Course Certificate.jpg",
  "Cyber Pass.jpg",
  "Cyfrin Updraft Blockchain Basics Course Certificate.jpg",
  "Devfest 2K24 Participation Certificate.jpg",
  "Devfest 2K24 Workshop Participation Certificate.jpg",
  "Devtown AWS Python and Artificial Intelligence Bootcamp Certificate.jpg",
  "DevTown Certificate of Appreciation.jpg",
  "Devtown Python and Artificial Intelligence Bootcamp Certificate.jpg",
  "Ethical Hacking Megamind Workshop Certificate of Participation.jpg",
  "Forage lyft Job Simulation Certificate of Completion.jpg",
  "Forage Tata Job Simulation Certificate of Completion.jpg",
  "GDG Cloud Kochi Code Vipassana Season 5 Certificate.jpg",
  "GDG Cloud Kochi Code Vipassana Season 6 Certificate.jpg",
  "GDGC SCET GenAI Study Jams Certificate.jpg",
  "GDGC SCET GenAI Study Jams.jpg",
  "Gen AI with Google Cloud.jpg",
  "German Webinar 2K23 SCAS.jpg",
  "GET IT - 2023 Participation Certificate.jpg",
  "GitHub 2K24 Wrapped.jpg",
  "Google for Developers Card.jpg",
  "Google Fundamentals of Digital Marketing Certificate.jpg",
  "Google Gemini Write-off Unstop Certificate of Participation.jpg",
  "google-cybersecurity-certificate.jpg",
  "GoogleCybersecurityCertificate_Badge20240429-8-l9582a.jpg",
  "Great Learning C for Beginners Certificate.jpg",
  "Hack2skill Tech Camp GenAI Christmas Edition 2K24 Certificate.jpg",
  "Hack2skill-Certificate.jpg",
  "HackVerse-certificate.jpg",
  "ICSET 24.jpg",
  "ICT Academy of Kerala ICSET 2K24 Certificate.jpg",
  "ICT Academy of Kerala ICSET 2K24 Participation Certificate.jpg",
  "ICT Academy of Kerala ICSET 2K24 Workshop Certificate.jpg",
  "IEDC Summit 2K25 Certificate of Participation.jpg",
  "IIC Ideathon Certificate.jpg",
  "IIC Ideathon Competition 2nd Prize Certificate.jpg",
  "IIC Regional Meet 2023 Certificate of Participation.jpg",
  "IMA Blood Donation Certificate.jpg",
  "Immersive Skills Academy 2D Platform Game Development Course Certificate.jpg",
  "Immersive Skills Academy Game Development Capstone Project Certificate.jpg",
  "Infosys Young Industry Enthusiast - Banking.jpg",
  "Inker Robotics IV Certificate.jpg",
  "Inker Robotics IV.jpg",
  "Innovator Badge - H2S Tech Camp_ GenAI Christmas Edition.jpg",
  "Introduction to Cybersecurity Cisco.1.jpg",
  "Introduction to Cybersecurity Cisco.jpg",
  "Kerala Blockchain Academy BlockHash LIVE 2K25 Certificate of Participation.jpg",
  "Laqshya '25 Participation Certificate.jpg",
  "Laqshya 25.jpg",
  "LetsUpgrade Postman API Fundamentals Student Expert Certification.jpg",
  "LetsUpgrade Student Ambassador Appointment Letter April.jpg",
  "LetsUpgrade Student Ambassador Appointment Letter August.jpg",
  "LetsUpgrade Student Ambassador Appointment Letter December.jpg",
  "LetsUpgrade Student Ambassador Appointment Letter January.jpg",
  "LetsUpgrade Student Ambassador Appointment Letter July.jpg",
  "LetsUpgrade Student Ambassador Appointment Letter May.jpg",
  "Make-a-Ton 7.0 I'm Participating Poster.jpg",
  "Make-a-Ton 7.0 Participation Certificate.jpg",
  "Manorama Horizon Robotics Workshop.jpg",
  "MaveliBot Onam Camp Workshop Manorama Horizon Certificate.jpg",
  "McKinsey.org Forward Certificate.jpg",
  "Mindler Internship Certificate.jpg",
  "Mindler Navigate Offer Letter.jpg",
  "ML wih Tensor Flow.jpg",
  "Nirvana 2K24 St Joseph, Devagiri Treasure Hunt Participation Certificate.jpg",
  "Novathon - St Thomas College Thrissur International Level Hackathon Participation Certificate.jpg",
  "Novathon Hackathon Certificate.jpg",
  "NSCETIT 2.0 Certificate.jpg",
  "NxtWave 100 Days Streak Milestone.jpg",
  "NxtWave 2 Week Consistency Certificate.jpg",
  "NxtWave 2023 Wrap.jpg",
  "Nxtwave 250 Days Streak Milestone.jpg",
  "Nxtwave 300 Days Streak Milestone.jpg",
  "Nxtwave 365 Days Streak Milestone.jpg",
  "NxtWave AWS Mega Workshop Access Pass.jpg",
  "NxtWave AWS Podcast Certificate of Participation.jpg",
  "NxtWave CEO Appreciation Letter.jpg",
  "NxtWave COP Pursuing Masters Abroad.jpg",
  "NxtWave Data Analytics Mega Workshop Access Pass.jpg",
  "NxtWave Data Analytics Mega Workshop Completion Certificate.jpg",
  "NxtWave Data Analytics Mega Workshop Participation Certificate.jpg",
  "NxtWave Ethical Hacking Mega Workshop Completion Certificate.jpg",
  "NxtWave Ethical Hacking Mega Workshop Participation Certificate.jpg",
  "NxtWave Gen AI Mega Workshop Completion Certificate.jpg",
  "NxtWave Gen AI Mega Workshop Participation Certificate.jpg",
  "NxtWave Generative AI Mastery Workshop Completion Certificate.jpg",
  "NxtWave Generative AI Mastery Workshop Participation Certificate.jpg",
  "NxtWave Internet of Things Podcast Certificate of Participation.jpg",
  "NxtWave MCP Mega Workshop Participation Certificate.jpg",
  "NxtWave MCP Mega Workshop Project Completion Certificate.jpg",
  "NxtWave NxtCode Challenge Certificate.jpg",
  "NxtWave Nxtcode Challenge Pass.jpg",
  "NxtWave NxtCode Challenge.jpg",
  "NxtWave Official Member Hall of Fame.jpg",
  "NxtWave Podcast Building a Career in AI Certificate of Participation.jpg",
  "NxtWave Project Managements 101 Podcast Certificate of Participation.jpg",
  "NxtWave Security Engineer Poscast Certificate of Participation.jpg",
  "NxtWave Software Engineering Podcast Certificate of Participation.jpg",
  "NxtWave Successful Habits Podcast Certificate of Participation.jpg",
  "NxtWave UI UX Mega Workshop Completion Certificate.jpg",
  "NxtWave UI UX Mega Workshop Participation Certificate.jpg",
  "NxtWave Understanding ML Podcast Certificate of Participation.jpg",
  "NxtWave XPM 4.0 Fundamentals Certificate.jpg",
  "Prompt Engineering Zero to Hero LetsUpgrade.jpg",
  "Ranabheri 25.jpg",
  "Sahrdaya Blockchain Add-On Certificate.jpg",
  "Sahrdaya Blockchain Certificate.jpg",
  "Sahrdaya WELD E-Quiz Certificate.jpg",
  "Scaler Master Backtracking Masterclass.jpg",
  "Scaler SOLID Principles Masterclass Certificate.jpg",
  "SCAS 2K23 Colloquium.jpg",
  "ServiceNow Virtual Internship Program Certificate.jpg",
  "Shikhar 24.jpg",
  "Shikhar 2K24 SCMS Marketing Game 2nd Prize Certificate.jpg",
  "St Mary's College B Quiz Participation Certificate.jpg",
  "St Thomas College Summer Internship Certificate.jpg",
  "St Thomas Summer Internship Certificate.jpg",
  "Talentime '39 Participation Certificate.jpg",
  "Talentime 39.jpg",
  "TCS iON Business Etiquette Certificate.jpg",
  "TCS iON Career Edge - Young Professional Certificate.jpg",
  "TCS iON Communication Skills Certificate.jpg",
  "TCS iON Email Etiquette Certificate.jpg",
  "TCS iON Group Discussion Certificate.jpg",
  "TCS iON Interview Skills Certificate.jpg",
  "TCS iON Introduction to Soft Skills Certificate.jpg",
  "TCS iON Presentation Skills Certificate.jpg",
  "TCS iON Report.jpg",
  "TCS iON Telephone Etiquette Certificate.jpg",
  "TCS iON Write Effective Resume and Cover letter Certificate.jpg",
  "Tech 4 Social Good Hackathon Certificate of Participation.jpg",
  "Tharang 25.jpg",
  "The Big Hack Tech Hubba '25.jpg",
  "TinkerHub - Build Your Cringe Project Certificate of Achievement.jpg",
  "Understanding the DevOps Lifecycle webinar Certificate of Participation.jpg",
  "WOW Summit 2K25 GDG Certificate.jpg",
  "Xlencia 25.jpg",
  "Youvah Internship Certificate.jpg",
  "Youvah Internship Offer Letter.jpg",
  "Youvah Internship Training Certificate.jpg",
  "Youvah Training Certificate.jpg",
  "Yukthi 1.0 Participation Certificate.jpg",
  "Yukthi 25.jpg",
  "Zephyrus 5.0 Participation Certificate.jpg",
  "_VOIS Machine Learning Basics Certificate.jpg",
];

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
          
          {/* Wall Texture - Gradient only (no external CORS-blocked resources) */}
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