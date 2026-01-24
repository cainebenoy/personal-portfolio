"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LivingShape() {
  const mesh = useRef<THREE.Mesh>(null);

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