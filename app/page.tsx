import SketchCanvas from "@/components/canvas/SketchCanvas";
import InkCanvas from "@/components/canvas/InkCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import CommandPalette from "@/components/ui/CommandPalette";
import Preloader from "@/components/ui/Preloader";
import ThemeInit from "@/components/logic/ThemeInit";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WorkAndSkills from "@/components/sections/WorkAndSkills";
import TechRadar from "@/components/sections/TechRadar";
import GithubGraph from "@/components/sections/GithubGraph";
import Socials from "@/components/sections/Socials";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certificates from "@/components/sections/Certificates";
import Honors from "@/components/sections/Honors";
import Gallery from "@/components/sections/Gallery";
import ContactFooter from "@/components/sections/ContactFooter";
import ScratchManifesto from "@/components/sections/ScratchManifesto";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Preloader & Theme Init */}
      <Preloader />
      <ThemeInit />
      
      {/* Background Layers */}
      <SketchCanvas />
      <InkCanvas />

      {/* UI Elements */}
      <CustomCursor />
      <Navigation />
      <CommandPalette />
      
      {/* Content Flow */}
      <Hero />
      <Marquee />
      <Services />
      
      {/* Unified Skills + Work (Side-by-Side on Desktop) */}
      <WorkAndSkills />
      
      <TechRadar />
      
      <GithubGraph />
      
      <Socials />
      
      <Certificates />
      
      {/* Scratch Hint */}
      <div className="flex justify-center py-8 font-hand text-gray-400 animate-bounce">
        Scratch the paper to verify reality &darr;
      </div>
      
      <ScratchManifesto />
      
      <Experience />
      
      <Education />
      
      <Honors />
      
      <Gallery />
      
      <ContactFooter />
    </main>
  );
}