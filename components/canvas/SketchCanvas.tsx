"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  
  // Hook into page scroll
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      // Rotate based on scroll position (using raw value for performance)
      const scroll = scrollYProgress.get(); 
      groupRef.current.rotation.y = scroll * Math.PI;
    }

    if (icoRef.current) {
      icoRef.current.rotation.x += 0.002;
      icoRef.current.rotation.y += 0.002;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x -= 0.002;
      torusRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Generalist Shape (Icosahedron) */}
      <mesh ref={icoRef} position={[3, 1, 0]} scale={[1.8, 1.8, 1.8]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#2b2b2b" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* The Detail Shape (Torus Knot) */}
      <mesh ref={torusRef} position={[-3, -1, -2]} rotation={[1.5, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 100]} />
        <meshBasicMaterial 
          color="#ff4757" 
          wireframe 
          transparent 
          opacity={0.2} 
        />
      </mesh>
    </group>
  );
}

export default function SketchCanvas() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}