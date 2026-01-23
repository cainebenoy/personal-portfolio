import SketchCanvas from "@/components/canvas/SketchCanvas";
import InkCanvas from "@/components/canvas/InkCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import ResumeClip from "@/components/ui/ResumeClip";
import Marquee from "@/components/ui/Marquee";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services"; // Added
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import ContactFooter from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Layers */}
      <SketchCanvas />
      <InkCanvas />

      {/* UI Elements */}
      <CustomCursor />
      <Navigation />
      <ResumeClip />
      
      {/* Content Flow */}
      <Hero />
      <Marquee /> {/* Visual Break */}
      <Services /> {/* The Spec Sheet */}
      <Work />
      <Experience />
      <Skills />
      <ContactFooter />
    </main>
  );
}