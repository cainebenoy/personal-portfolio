# Caine Benoy | Generalist Portfolio

A modern, interactive portfolio website showcasing creative work with smooth theme transitions, interactive animations, project modals with live links, and professional design. Built with Next.js 16, React, GSAP, Three.js, and TypeScript.

> "A jack of all trades is a master of none, but oftentimes better than a master of one."

## 🚀 Live Demo

**Deployed**: [personal-portfolio-amber-eta.vercel.app](https://personal-portfolio-amber-eta.vercel.app/)  
**Local Dev**: `pnpm run dev` → [http://localhost:3000](http://localhost:3000)

---

## ✨ Key Features

### 🎨 Theme System

- **Light Mode (Sketch)** & **Dark Mode (Blueprint)** with instant smooth toggle
- Smooth 300ms transitions across all elements
- Auto-switches to dark mode 7 PM–6 AM (respects user preference)
- Fully accessible with proper color contrast in both modes
- Theme-aware components using CSS variables

### 📧 Hire Form with Email Integration

- **Form Modal**: Captures name, email, phone with comprehensive validation
- **Progress Bar**: Smooth animation showing submission progress
- **Email Notifications**:
  - Sends applicant details to portfolio owner
  - Sends confirmation email to applicant with bio, photo, and social links
  - Uses Gmail SMTP (port 587, TLS) with App Password authentication
- **UX**: Success state shows for 1 second before modal closes

### 📄 Contact Strips

Interactive tear-off strips at footer:

- **Email**: Copy to clipboard with toast feedback
- **LinkedIn**: Opens profile in new tab
- **Resume**: Downloads PDF
- **Location**: Copy to clipboard
- **GitHub**: Opens profile in new tab
- **HIRE ME**: Opens form modal with celebration flow

### 🎭 Responsive Design

- Mobile-first approach with Tailwind CSS
- Fully functional on phones, tablets, desktops
- Touch-friendly interactive elements
- Accessible navigation and forms
- Adaptive layouts for Gallery (desktop 3x10, mobile 6x5)

### 🎬 Smooth Animations & Effects

- **Fade-in animations** on all major sections (0.8s ease-out)
- **Scroll-crumple avatar** with 82-frame sequence and lerp smoothing
- **Canvas animations**: Ink canvas, physics-based particles, generative art
- **Project card hover effects** with scale, rotation, and shadow transitions
- **GSAP-powered text reveals** and magnetic elements
- **Smooth page transitions** with optimized performance

### 📸 Interactive Gallery

- **30+ photos** in postcard-style layout with subtle rotations
- **Responsive layout**:
  - Desktop: 3 rows × 10 columns with wide horizontal spread
  - Mobile: 6 rows × 5 columns with vertical stacking
- **Shuffle feature**: Client-side random ordering post-hydration
- **Hover effects**: Grayscale removal, glossy overlay, label reveal
- **Dynamic container height** to prevent clipping

### 🗂️ Project Portfolio with Modals

- **6 featured projects** with detailed case file presentation
- **Project modals** displaying:
  - Long-form description & challenge context
  - Full tech stack breakdown
  - Code snippet visualization
  - Live demo links (clickable buttons)
  - GitHub source code links
  - Direct URLs for reference
- **Click-to-open**: Tap any project card to view full details
- **Smooth animations**: Modal zoom-in-fade entrance

### 📊 Skills & Tech Radar

- **23+ skills** displayed with hover highlighting
- **Interactive tech radar** showing adoption, trial, and assess rings
- **Project-to-skills sync**: Hover projects to highlight matching skills
- **Dimension controls**: Desktop proximity-based, mobile tap-based
- **Messy aesthetic**: Randomly rotated skill words for visual interest

### 🎓 Experience & Education Timeline

- **Timeline layout** with visual dots and dashed connector lines
- **8+ experience entries** covering internships, leadership roles, and community work
- **2 education programs** with detailed descriptions
- **Hover effects**: Dots change color on hover for visual feedback

### 🏆 Honors & Awards

- **3+ awards** presented in card grid with icons
- **Theme-aware styling** for dark mode compatibility
- **Hover animations**: Icon badges and decorative elements

### 📡 Social Signals

- **LinkedIn posts** displayed in newspaper-style cards with images
- **GitHub repos** fetched live from GitHub API showing latest pushes
- **Time-ago formatting** for engagement metrics
- **External links** with proper security attributes

### 🔐 Security & Analytics

- **Vercel Analytics**: Track visitor interactions
- **Vercel Speed Insights**: Monitor page performance
- **Static generation**: Pre-rendered pages for fast loads
- **Console Easter Egg**: Open DevTools to see custom messages

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16.1.4 (Turbopack, App Router) |
| **Language** | TypeScript 5 (strict mode) |
| **Runtime** | React 19.2.3 |
| **Styling** | Tailwind CSS 3.4.19 + custom theme variables |
| **Animation** | GSAP 3.14.2 + CSS keyframe animations |
| **3D Graphics** | Three.js 0.182.0 + React Three Fiber 9.5.0 |
| **Physics** | Matter.js 0.20.0 |
| **Email** | Nodemailer 7.0.12 + Gmail SMTP |
| **State Management** | Zustand 5.0.10 |
| **Icons** | Lucide React 0.562.0 |
| **Analytics** | Vercel Analytics & Speed Insights |
| **Canvas** | HTML5 Canvas with custom drawing utilities |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Gmail account with App Password enabled
- Git for version control

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/cainebenoy/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create `.env.local`:

   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

4. **Run development server**

   ```bash
   pnpm run dev
   ```

   Visit `http://localhost:3000`

5. **Build for production**

   ```bash
   pnpm run build
   pnpm run start
   ```

---

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard

1. Push to GitHub
2. Link repository in Vercel dashboard
3. Add environment variables in Vercel settings
4. Deploy automatically on push

### Environment Variables (Vercel)

In Vercel project settings, add:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
NEXT_PUBLIC_ANALYTICS_ID=your-vercel-analytics-id
```

---

## 📂 Project Structure

```
personal-portfolio/
│
├── app/                             # Next.js app router
│   ├── layout.tsx                  # Root layout with ThemeInit
│   ├── page.tsx                    # Home page with all sections
│   ├── not-found.tsx               # 404 page
│   ├── globals.css                 # Global styles & theme variables
│   ├── opengraph-image.*           # OG tags for social sharing
│   │
│   └── api/                        # API routes
│       ├── analytics/              # Analytics endpoint
│       └── hire/
│           └── route.ts            # Email submission handler
│
├── components/                      # React components
│
│   ├── ui/                         # Reusable UI components
│   │   ├── Avatar.tsx              # Circular avatar with image
│   │   ├── CommandPalette.tsx      # Command/search overlay
│   │   ├── CustomCursor.tsx        # Custom cursor tracking
│   │   ├── HireModal.tsx           # Form modal for hiring
│   │   ├── Marquee.tsx             # Scrolling text effect
│   │   ├── Navigation.tsx          # Top navigation bar
│   │   ├── Preloader.tsx           # Initial loading screen
│   │   ├── ProjectCard.tsx         # Individual project card
│   │   ├── ProjectModal.tsx        # Project details modal
│   │   ├── ResumeClip.tsx          # Resume preview
│   │   ├── ScrollCrumpleAvatar.tsx # 82-frame scroll animation
│   │   ├── ScrollPencil.tsx        # Pencil drawing effect
│   │   ├── SoundToggle.tsx         # Audio control button
│   │   └── CustomCursor.tsx        # Custom pointer tracking
│   │
│   ├── sections/                   # Page sections
│   │   ├── Certificates.tsx        # Certifications showcase
│   │   ├── ContactFooter.tsx       # Tear-off contact strips
│   │   ├── Education.tsx           # Education timeline
│   │   ├── Experience.tsx          # Work experience timeline
│   │   ├── Gallery.tsx             # Photo gallery with shuffle
│   │   ├── GithubGraph.tsx         # GitHub activity heatmap
│   │   ├── Hero.tsx                # Hero section intro
│   │   ├── Honors.tsx              # Awards & honors
│   │   ├── ScratchManifesto.tsx    # Personal manifesto
│   │   ├── Services.tsx            # Services offered
│   │   ├── Skills.tsx              # Skills showcase
│   │   ├── Socials.tsx             # Social media integrations
│   │   ├── TechRadar.tsx           # Technology assessment
│   │   ├── Work.tsx                # Project portfolio
│   │   ├── WorkAndSkills.tsx       # Combined section
│   │   └── GenerativeArt.tsx       # Procedural art generation
│   │
│   └── logic/                      # Business logic & utilities
│       ├── ThemeInit.tsx           # Theme initialization & auto-switch
│       └── SimpleAnalytics.tsx     # Analytics setup
│
├── lib/
│   ├── useAppStore.ts              # Zustand state management
│   ├── useReveal.ts                # Reveal animation hook
│   └── utils.ts                    # Helper utilities (cn, etc.)
│
├── public/                         # Static assets
│   ├── avatar-sequence/            # 82-frame scroll animation
│   ├── gallery/                    # Photo gallery images
│   ├── Certificates/               # Certificate images
│   ├── resume.pdf                  # Resume file
│   └── icons/                      # SVG icons
│
├── .env.local                      # Environment variables (git ignored)
├── .gitignore                      # Git ignore rules
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind theme & extensions
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.mjs               # ESLint rules
├── postcss.config.js               # PostCSS plugins
└── package.json                    # Dependencies & scripts
```

---

## 🎯 Key Implementation Details

### Theme System

- **CSS Variables**: Defined in `:root` and `html[data-theme="blueprint"]`
- **Smooth Transitions**: 300ms cubic-bezier on all color/background changes
- **Auto-Switch**: 7 PM–6 AM with localStorage preference persistence
- **Utilities**: `.theme-surface`, `.theme-muted`, `.theme-border`, etc.
- **Dark Mode Support**: Applied across 50+ components

### Smooth Animations

- **Section Entrance**: `animate-fade-in` (0.8s, translateY + opacity)
- **Element Reveals**: GSAP stagger with easing functions
- **Canvas Animations**: RequestAnimationFrame for smooth 60fps
- **Scroll Tracking**: Lerp-based smooth follow on avatar
- **Hover Effects**: Transforms and shadows on project cards

### Form Validation

- **Real-time validation** on name, email, phone fields
- **Regex patterns** for email and phone number
- **Success state** with celebration animation
- **Error messages** displayed inline
- **Toast notifications** on copy/submission

### Email Integration

- **Nodemailer setup** with Gmail SMTP (port 587, TLS)
- **Two emails sent**:
  1. To admin with applicant data
  2. To applicant with confirmation
- **Styled HTML templates** for professional appearance
- **Environment variables** for security

### Static Generation

- **Pre-rendered pages** at build time for faster loads
- **Revalidation** on-demand for dynamic content
- **Edge caching** through Vercel CDN
- **Automatic deployment** previews on pull requests

---

## 🧪 Testing Checklist

- [x] Dark/light mode toggle works and persists
- [x] All animations play smoothly on entry
- [x] Mobile layout responsive on all breakpoints
- [x] Contact strips copy to clipboard correctly
- [x] Hire form validates and sends emails
- [x] Project modals open and display correctly
- [x] GitHub/LinkedIn integrations load data
- [x] Gallery images load and shuffle properly
- [x] No TypeScript errors on build
- [x] ESLint passes (warnings acceptable for dynamic styles)
- [x] Page loads in < 3 seconds
- [x] Lighthouse score > 90

---

## 🐛 Troubleshooting

| Issue | Solution |
| --- | --- |
| Emails not sending | Check `.env.local`, verify Gmail App Password, check spam folder |
| Theme not persisting | Clear localStorage, check ThemeInit.tsx runs on mount |
| Form validation failing | Check email regex in HireModal.tsx, verify field names |
| Styles not applying | Rebuild with `pnpm run build`, clear Next.js cache |
| Images not loading | Verify files exist in `/public` folder, check file paths |
| Gallery not shuffling | Check hydration with `useEffect`, verify images load first |
| Animations stuttering | Reduce animations during slow network, check GPU acceleration |
| Build fails | Delete `node_modules`, run `pnpm install`, verify Node.js 18+ |

---

## 📄 License

This project is open source and available under the MIT License. Feel free to use as inspiration for your own portfolio!

---

## 🤝 Contact

- **Email**: [cainebenoy@gmail.com](mailto:cainebenoy@gmail.com)
- **LinkedIn**: [linkedin.com/in/caine-benoy-8061a9288/](https://www.linkedin.com/in/caine-benoy-8061a9288/)
- **GitHub**: [github.com/cainebenoy](https://github.com/cainebenoy)
- **Portfolio**: [personal-portfolio-amber-eta.vercel.app](https://personal-portfolio-amber-eta.vercel.app/)

---

**Built with ❤️ using Next.js, React, and lots of coffee** ☕
