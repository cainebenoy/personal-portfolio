import SketchCanvas from "@/components/canvas/SketchCanvas";
import PhysicsCanvas from "@/components/canvas/PhysicsCanvas";
import InkCanvas from "@/components/canvas/InkCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import ContactFooter from "@/components/sections/ContactFooter"; // Added

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Layers */}
      <SketchCanvas />
      <PhysicsCanvas />
      <InkCanvas />

      {/* UI & Content */}
      <CustomCursor />
      <Navigation />
      
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <ContactFooter /> {/* Added */}

      {/* Spacer removed as Footer handles the bottom */}
    </main>
  );
}