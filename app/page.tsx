import SketchCanvas from "@/components/canvas/SketchCanvas";
import InkCanvas from "@/components/canvas/InkCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";
import ContactFooter from "@/components/sections/ContactFooter";
import ScratchManifesto from "@/components/sections/ScratchManifesto";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Layers */}
      <SketchCanvas />
      <InkCanvas />

      {/* UI Elements */}
      <CustomCursor />
      <Navigation />
      
      {/* Content Flow */}
      <Hero />
      <Marquee />
      <Services />
      <Work />
      
      <Certificates />
      
      {/* Scratch Hint */}
      <div className="flex justify-center py-8 font-hand text-gray-400 animate-bounce">
        Scratch the paper to verify reality &darr;
      </div>
      
      <ScratchManifesto />
      
      <Experience />
      <Skills />
      <ContactFooter />
    </main>
  );
}