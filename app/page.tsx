import SketchCanvas from "@/components/canvas/SketchCanvas";
import InkCanvas from "@/components/canvas/InkCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import ResumeClip from "@/components/ui/ResumeClip";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import ContactFooter from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Layers (Z-Index 0-30) */}
      <SketchCanvas />
      <InkCanvas />

      {/* UI Elements (Z-Index 40+) */}
      <CustomCursor />
      <Navigation />
      <ResumeClip />
      
      {/* Content Sections */}
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <ContactFooter />
    </main>
  );
}