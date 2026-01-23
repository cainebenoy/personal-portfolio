"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function PhysicsCanvas() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Setup Matter.js
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    engineRef.current = engine;

    // 2. Create Boundaries (Walls)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), // Floor
      Matter.Bodies.rectangle(-50, height / 2, 100, height, wallOptions), // Left
      Matter.Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions), // Right
    ];

    // 3. Create Falling Objects (Sticky Notes)
    const notes = [];
    const colors = ["#fffd75", "#ff7eb9", "#7afcff"]; // Yellow, Pink, Blue

    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * -500; // Start above screen
      const angle = Math.random() * Math.PI;
      
      const note = Matter.Bodies.rectangle(x, y, 80, 80, {
        angle: angle,
        render: {
          fillStyle: colors[i % colors.length],
          strokeStyle: "#333",
          lineWidth: 2,
        },
      });
      notes.push(note);
    }

    Matter.World.add(engine.world, [...walls, ...notes]);

    // 4. Mouse Interaction
    const mouse = Matter.Mouse.create(render.canvas);
    // Disable capturing scroll events so user can scroll page
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false },
      },
    });

    Matter.World.add(engine.world, mouseConstraint);

    // 5. Run
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  return <div ref={sceneRef} className="fixed inset-0 z-20 pointer-events-none [&>canvas]:pointer-events-auto" />;
}