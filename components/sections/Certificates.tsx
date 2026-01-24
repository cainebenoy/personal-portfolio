"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { X, FileText, Maximize2, Download } from "lucide-react";

// --- DATA STRUCTURE ---
const certificateFiles = [
  "Aloki '25 Certificate of Achievement.jpg",
  "Aloki '25.jpg",
  "Amartya '25.jpg",
  "Android with Compose.pdf",
  "Aroha '25.jpg",
  "Aspera '25 Kerala Varma College Participation Certificate.pdf",
  "AWS Foundations - Getting Started with Cloud Essentials.pdf",
  "Blood Donation Certificate (13).jpg",
  "Brochures.jpg",
  "Cambridge LinguaSkill Page 1.png",
  "Cambridge LinguaSkill Page 2.png",
  "challenge-event-poster.png",
  "CleveAI Linkedin Unwrapped 2K24.pdf",
  "Code To Win Consistency Badge.png",
  "CodersCave Internship Certificate of Completion.pdf",
  "CodersCave Internship Letter of Recommendation.pdf",
  "CodersCave Internship Web Development Project List.pdf",
  "CodersCave Intership Offer Letter.pdf",
  "Coursera x Google Automate Cybersecurity Tasks with Python.pdf",
  "Coursera x Google Put It to Work.pdf",
  "Coursera x Grow With Google Assets, Threats and Vulnerabilities.pdf",
  "Coursera x Grow With Google Connect and Protect.pdf",
  "Coursera x Grow With Google Foundations of Cybersecurity Certificate.pdf",
  "Coursera x Grow With Google Play It Safe Manage Security Risks Certificate.pdf",
  "Coursera x Grow With Google Tools of the Trade.pdf",
  "Coursera x IBM Introduction to Software Engineering Course Certificate.pdf",
  "Cyber Pass.png",
  "Cyfrin Updraft Blockchain Basics Course Certificate.pdf",
  "Devfest 2K24 Participation Certificate.pdf",
  "Devfest 2K24 Workshop Participation Certificate.pdf",
  "DevOpsDays Kerala 2K24 Swags.jpg",
  "Devtown AWS Python and Artificial Intelligence Bootcamp Certificate.pdf",
  "DevTown Certificate of Appreciation.pdf",
  "Devtown Python and Artificial Intelligence Bootcamp Certificate.pdf",
  "Ethical Hacking Megamind Workshop Certificate of Participation.pdf",
  "Forage lyft Job Simulation Certificate of Completion.pdf",
  "Forage Tata Job Simulation Certificate of Completion.pdf",
  "Fundamentals of digital marketing _ Google.pdf",
  "GDG Cloud Kochi Cloud Community Days Certificate.jpeg",
  "GDG Cloud Kochi Code Vipassana Season 5 Certificate.jpeg",
  "GDG Cloud Kochi Code Vipassana Season 6 Certificate.jpeg",
  "GDGC SCET GenAI Study Jams Certificate.png",
  "GDGC SCET GenAI Study Jams.png",
  "Gen AI with Google Cloud.pdf",
  "German Webinar 2K23 SCAS.pdf",
  "GET IT - 2023 Participation Certificate.pdf",
  "GitHub 2K24 Wrapped.png",
  "Google for Developers Card.jpg",
  "Google for Developers Goodies.jpg",
  "Google Gemini Write-off Unstop Certificate of Participation.pdf",
  "google-cybersecurity-certificate (1).png",
  "google-cybersecurity-certificate.png",
  "GoogleCybersecurityCertificate_Badge20240429-8-l9582a.pdf",
  "Great Learning C for Beginners Certificate.pdf",
  "Hack2skill Tech Camp GenAI Christmas Edition 2K24 Certificate.png",
  "Hack2skill-Certificate.png",
  "HackVerse-certificate.pdf",
  "ICSET 24.jpg",
  "ICT Academy of Kerala ICSET 2K24 Certificate.jpg",
  "ICT Academy of Kerala ICSET 2K24 Participation Certificate.pdf",
  "ICT Academy of Kerala ICSET 2K24 Workshop Certificate.pdf",
  "ID Cards.jpg",
  "IEDC Summit 2K25 Certificate of Participation.pdf",
  "IIC Ideathon Certificate (12).jpg",
  "IIC Ideathon Competition 2nd Prize Certificate.jpg",
  "IIC Regional Meet 2023 Certificate of Participation.png",
  "IMA Blood Donation Certificate.pdf",
  "Immersive Skills Academy 2D Platform Game Development Course Certificate.png",
  "Immersive Skills Academy Game Development Capstone Project Certificate.pdf",
  "Infosys Young Industry Enthusiast - Banking.pdf",
  "Inker Robotics IV Certificate.jpg",
  "Inker Robotics IV.jpg",
  "Innovator Badge - H2S Tech Camp_ GenAI Christmas Edition.png",
  "Introduction to Cybersecurity Cisco.pdf",
  "Introduction to Cybersecurity Cisco.png",
  "Kerala Blockchain Academy BlockHash LIVE 2K25 Certificate of Participation.pdf",
  "Laqshya '25 Participation Certificate.jpg",
  "Laqshya 25 (5).jpg",
  "Lernvern Resume.pdf",
  "LetsUpgrade Postman API Fundamentals Student Expert Certification.pdf",
  "LetsUpgrade Student Ambassador Appointment Letter April.pdf",
  "LetsUpgrade Student Ambassador Appointment Letter August.pdf",
  "LetsUpgrade Student Ambassador Appointment Letter December.pdf",
  "LetsUpgrade Student Ambassador Appointment Letter January.pdf",
  "LetsUpgrade Student Ambassador Appointment Letter July.pdf",
  "LetsUpgrade Student Ambassador Appointment Letter May.pdf",
  "LinkedIn 2K24 Rewind.png",
  "Make-a-Ton 7.0 I'm Participating Poster.jpg",
  "Make-a-Ton 7.0 Participation Certificate.pdf",
  "Manorama Horizon Robotics Workshop.jpg",
  "MaveliBot Onam Camp Workshop Manorama Horizon Certificate.jpg",
  "McKinsey.org Forward Certificate.pdf",
  "Mindler Internship Certificate.pdf",
  "Mindler Navigate Offer Letter.pdf",
  "Mindler Resume.pdf",
  "ML wih Tensor Flow.pdf",
  "Nirvana 2K24 St Joseph, Devagiri Treasure Hunt Participation Certificate.pdf",
  "Notebooks.jpg",
  "Novathon - St Thomas College Thrissur International Level Hackathon Participation Certificate.jpg",
  "Novathon - St Thomas College Thrissur International Level Hackathon Participation Certificate.pdf",
  "Novathon Hackathon Certificate (11).jpg",
  "NPTEL Exam 2024 Hall Ticket.pdf",
  "NSCETIT 2.0 Certificate.pdf",
  "NxtWave 100 Days Streak Milestone.png",
  "NxtWave 2 Week Consistency Certificate.png",
  "NxtWave 2023 Wrap.png",
  "Nxtwave 250 Days Streak Milestone.png",
  "NxtWave 2K24 Wrapped.mp4",
  "Nxtwave 300 Days Streak Milestone.png",
  "Nxtwave 365 Days Streak Milestone.png",
  "NxtWave AWS Mega Workshop Access Pass.png",
  "NxtWave AWS Podcast Certificate of Participation.png",
  "NxtWave CEO Appreciation Letter.png",
  "NxtWave COP Pursuing Masters Abroad.png",
  "NxtWave DA Dashboard.png",
  "NxtWave Data Analytics Mega Workshop Access Pass.png",
  "NxtWave Data Analytics Mega Workshop Completion Certificate.png",
  "NxtWave Data Analytics Mega Workshop Participation Certificate.png",
  "NxtWave Ethical Hacking Mega Workshop Completion Certificate.png",
  "NxtWave Ethical Hacking Mega Workshop Participation Certificate.png",
  "NxtWave Gen AI Mega Workshop Completion Certificate.png",
  "NxtWave Gen AI Mega Workshop Participation Certificate.png",
  "NxtWave Generative AI Mastery Workshop Completion Certificate.pdf",
  "NxtWave Generative AI Mastery Workshop Participation Certificate.png",
  "NxtWave Internet of Things Podcast Certificate of Participation.png",
  "NxtWave MCP Mega Workshop Participation Certificate.png",
  "NxtWave MCP Mega Workshop Project Completion Certificate.png",
  "NxtWave NxtCode Challenge Certificate.png",
  "NxtWave Nxtcode Challenge Pass.png",
  "NxtWave NxtCode Challenge.png",
  "NxtWave Official Member Hall of Fame.png",
  "NxtWave Podcast Building a Career in AI Certificate of Participation.png",
  "NxtWave Project Managements 101 Podcast Certificate of Participation.png",
  "NxtWave Security Engineer Poscast Certificate of Participation.png",
  "NxtWave Software Engineering Podcast Certificate of Participation.png",
  "NxtWave Successful Habits Podcast Certificate of Participation.png",
  "NxtWave UI UX Mega Workshop Completion Certificate.png",
  "NxtWave UI UX Mega Workshop Participation Certificate.png",
  "NxtWave Understanding ML Podcast Certificate of Participation.png",
  "NxtWave XPM 4.0 Fundamentals Certificate.pdf",
  "Pens.jpg",
  "Prompt Engineering Zero to Hero LetsUpgrade.pdf",
  "Ranabheri 25 (6).jpg",
  "Sahrdaya Blockchain Add-On Certificate.jpg",
  "Sahrdaya Blockchain Add-On Certificate.pdf",
  "Sahrdaya Blockchain Certificate (10).jpg",
  "Sahrdaya WELD E-Quiz Certificate.pdf",
  "Scaler Master Backtracking Masterclass.png",
  "Scaler SOLID Principles Masterclass Certificate.png",
  "SCAS 2K23 Colloquium.pdf",
  "ServiceNow Virtual Internship Program Certificate.pdf",
  "Shikhar 24 (2).jpg",
  "Shikhar 2K24 SCMS Marketing Game 2nd Prize Certificate.jpg",
  "Shikhar 2K24 SCMS Marketing Game 2nd Prize Certificate.pdf",
  "St Mary's College B Quiz Participation Certificate.pdf",
  "St Thomas College Summer Internship Certificate (9).jpg",
  "St Thomas Summer Internship Certificate.jpg",
  "St Thomas Summer Internship Certificate.pdf",
  "Stickers.jpg",
  "Student Achievements Caine.pdf",
  "Talentime '39 Participation Certificate.png",
  "Talentime 39.jpg",
  "TCS iON Business Etiquette Certificate.pdf",
  "TCS iON Career Edge - Young Professional Certificate.pdf",
  "TCS iON Communication Skills Certificate.pdf",
  "TCS iON Email Etiquette Certificate.pdf",
  "TCS iON Group Discussion Certificate.pdf",
  "TCS iON Interview Skills Certificate.pdf",
  "TCS iON Introduction to Soft Skills Certificate.pdf",
  "TCS iON Presentation Skills Certificate.pdf",
  "TCS iON Report.pdf",
  "TCS iON Telephone Etiquette Certificate.pdf",
  "TCS iON Write Effective Resume and Cover letter Certificate.pdf",
  "Tech 4 Social Good Hackathon Certificate of Participation.jpg",
  "Tharang 25.jpg",
  "The Big Hack Tech Hubba '25.pdf",
  "TinkerHub - Build Your Cringe Project Certificate of Achievement.png",
  "Understanding the DevOps Lifecycle webinar Certificate of Participation.pdf",
  "WOW Summit 2K25 GDG Certificate.pdf",
  "Xlencia 25 (8).jpg",
  "Youvah Internship Certificate.pdf",
  "Youvah Internship Offer Letter.pdf",
  "Youvah Internship Training Certificate.pdf",
  "Youvah Training Certificate.pdf",
  "Yukthi 1.0 Participation Certificate.pdf",
  "Yukthi 25.jpg",
  "Zephyrus 5.0 Participation Certificate.pdf",
  "_VOIS Machine Learning Basics Certificate.pdf",
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
            <span className="block text-sm font-code mt-2 text-gray-400">TOTAL_COUNT: {certData.length} // STATUS: VERIFIED</span>
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
                  onClick={() => setSelectedCert(cert as any)}
                  style={{ 
                    marginTop: `${style.marginTop}px`,
                    transform: `rotate(${style.rotation}deg)` 
                  }}
                  className={cn(
                    "group relative w-20 h-16 md:w-28 md:h-20 shadow-sm transition-all duration-300 ease-out cursor-none",
                    "hover:z-50 hover:scale-[2.5] hover:shadow-2xl hover:rotate-0", // Pop-out effect
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
                        <img 
                          src={cert.src} 
                          alt={cert.name}
                          className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                          loading="lazy"
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
                  ISSUED BY {selectedCert.issuer} // {selectedCert.date}
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
                  <img 
                    src={selectedCert.src} 
                    alt={selectedCert.name}
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
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