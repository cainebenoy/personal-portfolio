"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";
import { useAppStore } from "@/lib/useAppStore";

function Scene() {
  const theme = useAppStore((state) => state.theme);
  
  const colors = useMemo(() => {
    return theme === "blueprint"
      ? {
          wireframe: "#5a7cfa",
          torus: "#ff6b35",
          cyan: "#00d9ff",
          orange: "#ffa500",
        }
      : {
          wireframe: "#000000",
          torus: "#ff4757",
          cyan: "#00d9ff",
          orange: "#ffa500",
        };
  }, [theme]);
  const groupRef = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octRef = useRef<THREE.Mesh>(null);
  const tetraRef = useRef<THREE.Mesh>(null);
  
  // Hook into page scroll
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      // Rotate based on scroll position (using raw value for performance)
      const scroll = scrollYProgress.get(); 
      groupRef.current.rotation.y = scroll * Math.PI * 2; // Full rotation
    }

    if (icoRef.current) {
      icoRef.current.rotation.x += 0.002;
      icoRef.current.rotation.y += 0.002;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x -= 0.002;
      torusRef.current.rotation.z += 0.002;
    }

    if (octRef.current) {
      octRef.current.rotation.x += 0.001;
      octRef.current.rotation.z -= 0.0015;
    }

    if (tetraRef.current) {
      tetraRef.current.rotation.y -= 0.0025;
      tetraRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Generalist Shape (Icosahedron) */}
      <mesh ref={icoRef} position={[4, 2, 0]} scale={[2.2, 2.2, 2.2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color={colors.wireframe} 
          wireframe 
          transparent 
          opacity={0.25} 
        />
      </mesh>

      {/* The Detail Shape (Torus) */}
      <mesh ref={torusRef} position={[-4, -2, -2]} rotation={[1.5, 0, 0]}>
        <torusGeometry args={[1.6, 0.08, 16, 100]} />
        <meshBasicMaterial 
          color={colors.torus} 
          wireframe 
          transparent 
          opacity={0.35} 
        />
      </mesh>

      {/* Octahedron - Cyan */}
      <mesh ref={octRef} position={[0, -3, -1]} scale={[2, 2, 2]}>
        <octahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color={colors.cyan} 
          wireframe 
          transparent 
          opacity={0.28} 
        />
      </mesh>

      {/* Tetrahedron - Orange */}
      <mesh ref={tetraRef} position={[-2.5, 2, -1.5]} scale={[2, 2, 2]}>
        <tetrahedronGeometry args={[1, 2]} />
        <meshBasicMaterial 
          color={colors.orange} 
          wireframe 
          transparent 
          opacity={0.3} 
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