"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LivingShape() {
  const mesh = useRef<THREE.Mesh>(null);
  
  // Create random geometry data once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Wobbly rotation
    mesh.current.rotation.x = Math.sin(t / 4);
    mesh.current.rotation.y = Math.sin(t / 2);

    // Breathing scale
    const s = 1.5 + Math.sin(t * 2) * 0.2;
    mesh.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={mesh}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshNormalMaterial wireframe />
    </mesh>
  );
}

export default function GenerativeArt() {
  return (
    <div className="w-full h-full bg-black">
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <LivingShape />
        </Canvas>
    </div>
  );
}