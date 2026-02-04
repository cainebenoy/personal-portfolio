"use client";

/* eslint-disable no-inline-styles, @next/next/no-css-in-js-in-document */
/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, FileText, Loader2 } from "lucide-react";

// --- DATA PREPARATION ---

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
  "_VOIS Machine Learning Basics Certificate.jpg"
];

// Helper to deduce issuer and description from filename
const deduceMetadata = (fileName: string) => {
  const lower = fileName.toLowerCase();
  
  // Issuer Detection
  let issuer = "Credential";
  if (lower.includes("google")) issuer = "Google";
  else if (lower.includes("aws")) issuer = "Amazon AWS";
  else if (lower.includes("ibm")) issuer = "IBM";
  else if (lower.includes("nxtwave")) issuer = "NxtWave";
  else if (lower.includes("coursera")) issuer = "Coursera";
  else if (lower.includes("udemy")) issuer = "Udemy";
  else if (lower.includes("tcs")) issuer = "TCS iON";
  else if (lower.includes("hack")) issuer = "Hackathon";
  else if (lower.includes("intern")) issuer = "Internship";
  else if (lower.includes("gdg")) issuer = "Google Dev Groups";
  else if (lower.includes("microsoft")) issuer = "Microsoft";
  else if (lower.includes("cisco")) issuer = "Cisco";
  else if (lower.includes("meta")) issuer = "Meta";
  else if (lower.includes("tinkerhub")) issuer = "TinkerHub";
  else if (lower.includes("kerala blockchain")) issuer = "KBA";
  
  // Description Detection
  let desc = "Professional certification.";
  if (lower.includes("participation")) desc = "Active participation in a technical event.";
  else if (lower.includes("completion")) desc = "Successful course completion and mastery.";
  else if (lower.includes("winner") || lower.includes("prize")) desc = "Award for excellence in competition.";
  else if (lower.includes("internship")) desc = "Professional work experience.";
  else if (lower.includes("workshop")) desc = "Hands-on technical workshop.";
  else if (lower.includes("cyber")) desc = "Cybersecurity proficiency and safety.";
  else if (lower.includes("ai") || lower.includes("ml") || lower.includes("intelligence")) desc = "Artificial Intelligence & ML skills.";
  else if (lower.includes("cloud")) desc = "Cloud computing architecture.";
  else if (lower.includes("blockchain")) desc = "Web3 and Blockchain technology.";
  else if (lower.includes("ambassador")) desc = "Community leadership and representation.";

  // Clean Name for display
  const cleanName = fileName
    .replace(/\.(jpg|jpeg|png|webp|svg|pdf)$/i, "") // Remove extension
    .replace(/[-_]/g, " ") // Replace separators with spaces
    .replace(/\d{4}/g, "") // Remove years roughly
    .trim();

  return { issuer, desc, cleanName };
};

const imageExts = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"];

// Process data once
const certData = certificateFiles.map((fileName, idx) => {
  const ext = fileName.toLowerCase().split(".").pop() ?? "";
  const type = ext === "pdf" ? "pdf" : imageExts.includes(ext) ? "image" : "file";
  const { issuer, desc, cleanName } = deduceMetadata(fileName);
  
  return {
    id: `cert-${idx}`,
    name: cleanName,
    fileName,
    issuer,
    description: desc,
    type,
    src: `/Certificates/${fileName}`,
  };
});

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<(typeof certData)[number] | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Generate stable random styles
  const stampStyles = useMemo(() => {
    return certData.map((_, i) => ({
      rotation: (i * 37 % 12) - 6, // -6 to 6 degrees
      marginTop: (i * 17 % 24),    // Organic vertical offset
      // Tape variations for all certificates
      tapeRotation: (i * 13 % 10) - 5, // -5 to 5 degrees rotation
      tapeOffset: (i * 7 % 30) - 15,   // -15 to 15px horizontal offset
      // Paper-like colors
      color: i % 4 === 0 ? "bg-[#fffdf5] border-[#e8e6dc]" :
             i % 7 === 0 ? "bg-[#f8fcff] border-[#dae9f5]" :
             "bg-white border-gray-200"
    }));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setSelectedCert(null);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 20, certData.length));
  };

  const visibleCerts = certData.slice(0, visibleCount);
  const remainingCount = certData.length - visibleCount;

  return (
    <section 
      id="certificates" 
      className="relative z-10 py-12 md:py-16 animate-fade-in"
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-[1400px] px-2 sm:px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-8 md:mb-20 text-center relative">
          <h2 className="font-display text-2xl sm:text-4xl md:text-8xl text-ink relative inline-block">
            The Archive
            <div className="absolute -top-2 -right-8 sm:-right-12 font-marker text-xs sm:text-sm text-red-500 rotate-12 border-2 border-red-500 px-2 sm:px-3 py-1 rounded opacity-80 shadow-sm bg-white/50 backdrop-blur-sm whitespace-nowrap">
              DECLASSIFIED
            </div>
          </h2>
          <p className="mt-3 md:mt-6 font-hand text-base sm:text-xl md:text-2xl lg:text-3xl theme-muted max-w-2xl mx-auto px-2">
            A messy, growing collection of every lesson learned. 
            <span className="block text-xs sm:text-sm font-code mt-2 md:mt-3 text-gray-400">
              TOTAL_COUNT: {certData.length} • STATUS: VERIFIED
            </span>
          </p>
        </div>

        {/* The Wall Container */}
        <div className="relative theme-surface-alt p-3 sm:p-6 md:p-12 shadow-[inset_0_0_80px_rgba(0,0,0,0.06)] border-2 md:border-4 border-double theme-border rounded-xl overflow-hidden min-h-[600px] sm:min-h-[700px] md:min-h-[800px]">
          
          {/* Wall Texture (local CSS pattern to avoid CORS) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply cert-wall-texture" />
          
          <div className="flex flex-wrap justify-center content-start gap-4 md:gap-5 relative z-10">
            {visibleCerts.map((cert, i) => {
              const style = stampStyles[i];
              return (
                <button
                  key={cert.id}
                  onClick={() => {
                    setSelectedCert(cert);
                    setIsModalLoading(true);
                  }}
                  style={{ 
                    marginTop: `${style.marginTop}px`,
                    transform: `rotate(${style.rotation}deg)` 
                  }}
                  className={cn(
                    "group relative w-24 h-20 md:w-32 md:h-24 shadow-sm transition-all duration-300 ease-out cursor-pointer outline-none",
                    "hover:z-50 hover:scale-[1.3] hover:shadow-xl hover:rotate-0",
                    style.color,
                    "border-[1px] p-2 flex flex-col items-center justify-between theme-border"
                  )}
                  title={cert.name}
                >
                  {/* Decorative Tape - now on all certificates with random variation */}
                  <div 
                    className="cert-tape"
                    style={{
                      transform: `translateX(calc(-50% + ${style.tapeOffset}px)) rotate(${style.tapeRotation}deg)`
                    }}
                  ></div>

                  {/* Thumbnail */}
                  <div className="relative w-full h-full overflow-hidden border border-black/5 theme-surface skeleton">
                    {cert.type === 'image' ? (
                      <Image
                        src={cert.src}
                        alt={cert.name}
                        fill
                        className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        sizes="(max-width: 768px) 128px, 160px"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center theme-surface-alt text-gray-400 group-hover:text-red-500 transition-colors">
                        <FileText size={20} strokeWidth={1.5} />
                        <span className="text-[6px] font-code mt-1">PDF</span>
                      </div>
                    )}
                  </div>

                  {/* Tiny Label */}
                  <div className="w-full text-center mt-1 overflow-hidden">
                     <div className="font-code text-[6px] uppercase tracking-wider text-gray-400 truncate w-full">
                       {cert.issuer}
                     </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Load More Button */}
          {remainingCount > 0 && (
            <div className="mt-12 text-center relative z-10">
              <button
                onClick={loadMore}
                className="group relative bg-ink text-paper px-8 py-4 font-display text-xl border-4 border-ink hover:bg-paper hover:text-ink transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="relative z-10">Load More</span>
                <span className="block font-code text-xs mt-1 opacity-80">
                  {remainingCount} more certificate{remainingCount !== 1 ? 's' : ''} remaining
                </span>
                
                {/* Decorative corner accent */}
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedCert && (
        <>
          <div 
            className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedCert(null)}
          />
          
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="relative w-full max-w-5xl theme-surface shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[95vh] pointer-events-auto animate-slide-in-card border-8 border-white/40 ring-1 theme-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b theme-border theme-surface-alt relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply cert-modal-texture" />

                <div className="relative z-10 flex-1 min-w-0 pr-4">
                  <h3 className="font-display text-2xl md:text-3xl text-ink truncate">
                    {selectedCert.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 theme-muted font-hand text-lg">
                    <span className="theme-surface px-2 py-0.5 rounded text-sm font-sans border theme-border">{selectedCert.issuer}</span>
                    <span className="truncate">{selectedCert.description}</span>
                  </div>
                </div>
                
                <div className="relative z-10 flex gap-2">
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-500"
                    title="Close"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
                <div className="flex-1 theme-surface-alt overflow-auto p-4 relative min-h-[60vh] max-h-[95vh]">
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none cert-modal-texture" />

                 <div 
                   className="relative w-full shadow-lg theme-surface p-2 flex items-center justify-center min-h-[400px]"
                   style={{ maxHeight: "calc(95vh - 160px)" }}
                 >
                    {isModalLoading && selectedCert.type === 'image' && (
                      <div className="absolute inset-0 flex items-center justify-center theme-surface z-10">
                        <Loader2 className="animate-spin text-ink opacity-20" size={48} />
                      </div>
                    )}

                    {selectedCert.type === 'image' ? (
                      <img
                        src={selectedCert.src}
                        alt={selectedCert.name}
                        className={cn(
                          "object-contain max-w-full transition-opacity duration-300",
                          isModalLoading ? "opacity-0" : "opacity-100"
                        )}
                        style={{ maxHeight: "calc(95vh - 200px)" }}
                        onLoad={() => setIsModalLoading(false)}
                        onError={() => setIsModalLoading(false)}
                      />
                    ) : (
                      <iframe 
                        src={selectedCert.src} 
                        className="w-full h-full bg-white"
                        title={selectedCert.name}
                        onLoad={() => setIsModalLoading(false)}
                      />
                    )}
                 </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}