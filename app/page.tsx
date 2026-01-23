import SketchCanvas from "@/components/canvas/SketchCanvas";
import PhysicsCanvas from "@/components/canvas/PhysicsCanvas";
import InkCanvas from "@/components/canvas/InkCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience"; // Added
import Skills from "@/components/sections/Skills";         // Added

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
      <Experience /> {/* Added */}
      <Skills />     {/* Added */}

      {/* Spacer for scrolling (temporary) */}
      <div className="h-40"></div>
    </main>
  );
}