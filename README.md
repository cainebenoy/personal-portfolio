# Caine Benoy | Generalist Portfolio

A modern, interactive portfolio website showcasing creative work with immersive 3D animations, interactive canvas elements, and playful paper-inspired interactions. Built with Next.js 16, React Three Fiber, GSAP, and TypeScript.

> "A jack of all trades is a master of none, but oftentimes better than a master of one."

## 🚀 Live Demo

Visit the portfolio at [http://localhost:3000](http://localhost:3000) when running locally.

## ✨ Key Features

### 🎨 Interactive Canvas Layers

- **SketchCanvas**: Three.js-based animated 3D wireframe scene with scroll-linked rotation
- **InkCanvas**: Interactive HTML5 canvas with velocity-based mouse trail drawing effect
- **Custom Cursor**: Animated cursor that responds to interactive elements and hover states

### 📄 Paper-Inspired Design

- Tear-off contact strips with realistic tearing animation
- Paper texture with subtle shadows and ink-style typography
- Hand-drawn aesthetic with custom Google Fonts (Caveat, Reenie Beanie, Permanent Marker)

### 🎉 Interactive Contact Footer

- **Email**: Click to copy <cainebenoy@gmail.com> to clipboard with toast feedback
- **LinkedIn**: Opens [LinkedIn profile](https://www.linkedin.com/in/caine-benoy-8061a9288/) in new tab
- **GitHub**: Opens [GitHub profile](https://github.com/cainebenoy) in new tab
- **Location**: Copy "Thrissur, Kerala" to clipboard
- **TinkerHub**: Opens [TinkerHub profile](https://tinkerhub.org/@caine_benoy) in new tab
- **Hire Me**: Triggers celebration with 1000 confetti particles
- Full keyboard accessibility (Enter/Space activation, ARIA labels, focus styling)

### 📱 Portfolio Sections

- **Hero**: Landing section with GSAP-powered text reveal animations
- **Work**: Project showcase with interactive project cards
- **Experience**: Professional journey and work history
- **Skills**: Toolbox and technical skills
- **Navigation**: Fixed navigation bar with smooth scroll anchors

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.4](https://nextjs.org) with App Router and Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org) with strict mode
- **Runtime**: [React 19.2.3](https://react.dev)
- **Styling**: [Tailwind CSS 3.4.19](https://tailwindcss.com) with custom theme and animations
- **3D Graphics**: [Three.js 0.182.0](https://threejs.org) + [React Three Fiber 9.5.0](https://docs.pmnd.rs/react-three-fiber/)
- **Animation**: [GSAP 3.14.2](https://greensock.com/gsap/) and [Framer Motion 12.29.0](https://www.framer.com/motion/)
- **UI Icons**: [Lucide React 0.469.0](https://lucide.dev)
- **Fonts**: Custom Google Fonts (Inter, Abril Fatface, Caveat, Fira Code, Permanent Marker, Reenie Beanie)
- **Linting**: ESLint 9 with Next.js configuration

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/cainebenoy/personal-portfolio.git
cd personal-portfolio

# Install dependencies
npm install
```

## 🔧 Development

```bash
# Start development server with Turbopack
npm run dev

# The portfolio will be available at http://localhost:3000
```

The development server supports:

- Hot Module Replacement (HMR) for instant updates
- Fast Refresh for component state preservation
- TypeScript type checking
- ESLint code quality checks

## 🏗️ Build & Deployment

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📁 Project Structure

```text
personal-portfolio/
├── app/
│   ├── layout.tsx           # Root layout with fonts, metadata, and global providers
│   ├── page.tsx             # Main page orchestrating sections and canvas layers
│   └── globals.css          # Global styles, animations (tear, confetti), utilities
├── components/
│   ├── canvas/
│   │   ├── InkCanvas.tsx    # Interactive mouse trail with velocity-based thickness
│   │   └── SketchCanvas.tsx # Three.js 3D wireframe with scroll animation
│   ├── sections/
│   │   ├── ContactFooter.tsx # Tear-off strips with copy, links, confetti celebration
│   │   ├── Experience.tsx    # Professional journey section
│   │   ├── Hero.tsx          # Landing section with GSAP text reveals
│   │   ├── Skills.tsx        # Technical skills and toolbox
│   │   └── Work.tsx          # Project portfolio section
│   └── ui/
│       ├── CustomCursor.tsx  # Animated cursor with hover states
│       ├── Navigation.tsx    # Fixed nav with smooth scroll anchors
│       └── ProjectCard.tsx   # Project showcase card component
├── lib/
│   └── utils.ts             # Utility functions (cn for class merging)
├── public/                  # Static assets
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind theme with custom colors and animations
└── tsconfig.json            # TypeScript compiler options
```

## 🎨 Custom Animations

### Tear Animation

- **Duration**: 0.7s
- **Effect**: Drop, rotate, scale, and fade-out for paper tearing effect
- **Trigger**: Click or keyboard interaction on contact strips

### Confetti Celebration

- **Particles**: 1000 randomized confetti pieces
- **Duration**: 3s
- **Colors**: Yellow (#fffd75), Red (#ff4757), Cyan (#7afcff), Orange (#ffa502), Green (#2ed573)
- **Shapes**: Mix of circles and squares with random rotation
- **Trigger**: "Hire Me" strip interaction

### Text Reveals

- **Engine**: GSAP with fromTo animations
- **Effect**: Fade-in and slide-up on page load
- **Fallback**: Ensures visibility even if JavaScript is delayed

## 🎯 Browser Compatibility

Requires a modern browser with support for:

- **WebGL**: For Three.js 3D rendering
- **ES2015+**: Modern JavaScript features
- **Canvas API**: For interactive drawing
- **Clipboard API**: For copy-to-clipboard functionality (with fallback)
- **CSS Animations**: For tear and confetti effects

Tested on:

- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

## ⌨️ Accessibility Features

- **Keyboard Navigation**: Full keyboard support with Enter/Space activation
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Focus Indicators**: Clear focus rings for keyboard users
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Screen Reader Support**: Meaningful content structure and labels

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs) - App Router and React Server Components
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript fundamentals
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Three.js Documentation](https://threejs.org/docs) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js
- [GSAP Documentation](https://greensock.com/docs/) - Professional-grade animation
- [Framer Motion Docs](https://www.framer.com/motion/) - React animation library

## 📧 Contact

- **Email**: <cainebenoy@gmail.com>
- **LinkedIn**: [Caine Benoy](https://www.linkedin.com/in/caine-benoy-8061a9288/)
- **GitHub**: [@cainebenoy](https://github.com/cainebenoy)
- **TinkerHub**: [@caine_benoy](https://tinkerhub.org/@caine_benoy)
- **Location**: Thrissur, Kerala, India

## 📄 License

This project is open source and available for educational purposes.

---

### Built with ❤️ by Caine Benoy | Generalist Portfolio 2026
