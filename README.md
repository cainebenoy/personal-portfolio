# Caine Benoy | Generalist Portfolio

A modern, interactive portfolio website showcasing creative work with 3D animations and interactive canvas elements. Built with Next.js, React Three Fiber, and Matter.js physics engine.

> "A jack of all trades is a master of none, but oftentimes better than a master of one."

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with PostCSS
- **3D Graphics**: [Three.js](https://threejs.org) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Physics**: [Matter.js](https://brainjs.github.io/matter-js/) physics engine
- **Animation**: [GSAP](https://greensock.com/gsap/) and [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Lucide React](https://lucide.dev) icons
- **Fonts**: Custom Google Fonts (Inter, Abril Fatface, Caveat, Fira Code, Permanent Marker, Reenie Beanie)
- **Linting**: ESLint with Next.js best practices

## Features

### Interactive Canvas Layers
- **SketchCanvas**: Three.js-based animated 3D scene with scroll-linked rotation
- **PhysicsCanvas**: Matter.js physics simulation with falling/bouncing elements
- **InkCanvas**: Interactive HTML5 canvas with mouse trail drawing effect

### UI Components
- Custom animated cursor that responds to interactive elements
- Navigation bar with smooth interactions
- Project card components
- Hero section with GSAP text reveal animations
- Work/portfolio section

## Getting Started

### Installation

\\\ash
npm install
\\\

### Development Server

\\\ash
npm run dev
\\\

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio.

The page auto-updates as you edit files. Components are organized by type:
- \pp/\ - Root layout and pages
- \components/canvas/\ - Three.js and canvas-based animations
- \components/sections/\ - Page sections (Hero, Work)
- \components/ui/\ - Reusable UI components
- \lib/\ - Utility functions
- \public/\ - Static assets

### Build & Deployment

\\\ash
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
\\\

## Project Structure

\\\
app/
  ├── layout.tsx          # Root layout with fonts and metadata
  ├── page.tsx            # Home page with canvas layers
  └── globals.css         # Global styles
components/
  ├── canvas/             # Three.js and canvas components
  │   ├── InkCanvas.tsx   # Interactive mouse trail effect
  │   ├── PhysicsCanvas.tsx # Matter.js physics simulation
  │   └── SketchCanvas.tsx # Three.js 3D scene
  ├── sections/           # Page sections
  │   ├── Hero.tsx        # Hero section with animations
  │   └── Work.tsx        # Portfolio/work section
  └── ui/                 # UI components
      ├── CustomCursor.tsx # Animated custom cursor
      ├── Navigation.tsx   # Navigation bar
      └── ProjectCard.tsx  # Project card component
lib/
  └── utils.ts            # Utility functions
\\\

## Browser Compatibility

Requires a modern browser with support for:
- WebGL (for Three.js)
- ES6+ JavaScript
- Canvas API

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Matter.js Documentation](https://brainjs.github.io/matter-js/)
- [GSAP Documentation](https://greensock.com/docs/)
