"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function PhysicsSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const parent = containerRef.current;
    const width = parent.clientWidth;
    const height = 400; // Fixed height for the sandbox

    // Setup
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Boundaries
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
    ];

    // Objects
    const shapes = [];
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * -500;
      
      let body;
      const common = { restitution: 0.8, render: { strokeStyle: "#222", lineWidth: 2 } };
      
      if (Math.random() > 0.5) {
        body = Matter.Bodies.circle(x, y, 20 + Math.random() * 20, {
            ...common,
            render: { ...common.render, fillStyle: "#ff4757" }
        });
      } else {
        body = Matter.Bodies.polygon(x, y, Math.floor(Math.random() * 3) + 3, 25 + Math.random() * 20, {
            ...common,
            render: { ...common.render, fillStyle: "#ffffff" }
        });
      }
      shapes.push(body);
    }

    Matter.World.add(engine.world, [...walls, ...shapes]);

    // Interaction
    const mouse = Matter.Mouse.create(render.canvas);
    // Disable scroll capture
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.World.add(engine.world, mouseConstraint);

    // Run
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 shadow-inner">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 right-4 font-mono text-xs text-gray-400 pointer-events-none select-none">
        PHYSICS_SANDBOX_V1
      </div>
    </div>
  );
}