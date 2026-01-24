"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

declare global {
  interface Window {
    spawnFallingStrip?: (rect: DOMRect) => void;
  }
}

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
    // FIX: Matter adds wheel listeners that call preventDefault; remove all variants
    const wheelHandler = (mouse as unknown as { mousewheel: EventListener }).mousewheel;
    mouse.element.removeEventListener("mousewheel", wheelHandler);
    mouse.element.removeEventListener("DOMMouseScroll", wheelHandler);
    mouse.element.removeEventListener("wheel", wheelHandler);

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

    // Expose a simple API for tear-off strips to spawn a falling body
    window.spawnFallingStrip = (rect: DOMRect) => {
      try {
        const eng = engineRef.current;
        if (!eng) return;

        // Clamp spawn to viewport (canvas covers only the visible window)
        const cx = Math.min(Math.max(rect.left + rect.width / 2, 20), width - 20);
        const cy = Math.min(Math.max(rect.top + rect.height / 2, 20), height - 20);

        // Size approximates a vertical strip
        const w = Math.max(14, Math.min(36, rect.width));
        const h = Math.max(80, Math.min(180, rect.height));

        const body = Matter.Bodies.rectangle(cx, cy, w, h, {
          angle: (Math.random() - 0.5) * 0.6,
          restitution: 0.2,
          friction: 0.8,
          render: {
            fillStyle: "#f9fafb",
            strokeStyle: "#111827",
            lineWidth: 2,
          },
        });

        Matter.World.add(eng.world, body);

        // Give it a little spin and downward nudge
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 3 + Math.random() * 2 });

        // Remove after ~12s to avoid buildup
        setTimeout(() => {
          try { Matter.World.remove(eng.world, body); } catch {}
        }, 12000);
      } catch {}
    };

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      try { delete window.spawnFallingStrip; } catch {}
    };
  }, []);

  return <div ref={sceneRef} className="fixed inset-0 z-20 pointer-events-none [&>canvas]:pointer-events-auto" />;
}