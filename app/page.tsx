import SketchCanvas from "@/components/canvas/SketchCanvas";
import PhysicsCanvas from "@/components/canvas/PhysicsCanvas";
import InkCanvas from "@/components/canvas/InkCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";

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

      {/* Spacer for scrolling (temporary) */}
      <div className="h-screen"></div>
    </main>
  );
}