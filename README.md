# Caine Benoy | Generalist Portfolio

A modern, interactive portfolio website showcasing creative work with smooth theme transitions, interactive contact forms, and professional design. Built with Next.js 16, React, GSAP, and TypeScript.

> "A jack of all trades is a master of none, but oftentimes better than a master of one."

## 🚀 Live Demo

**Deployed**: [cainebenoy.com](https://cainebenoy.com)  
**Local Dev**: `npm run dev` → [http://localhost:3000](http://localhost:3000)

---

## ✨ Key Features

### 🎨 Theme System

- **Light Mode (Sketch)** & **Dark Mode (Blueprint)** with instant toggle
- Smooth 300ms transitions across all elements
- Auto-switches to dark mode 7 PM–6 AM (respects user preference)
- Fully accessible with proper color contrast in both modes

### 📧 Hire Form with Email Integration

- **Form Modal**: Captures name, email, phone with validation
- **Progress Bar**: Smooth 300ms animation showing submission progress
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
- **HIRE ME**: Opens form modal

### 🎭 Responsive Design

- Mobile-first approach with Tailwind CSS
- Fully functional on phones, tablets, desktops
- Touch-friendly interactive elements
- Accessible navigation and forms

### 📊 Analytics & Performance

- **Vercel Analytics**: Track visitor interactions
- **Vercel Speed Insights**: Monitor page performance
- **Static Generation**: Pre-rendered pages for fast loads
- **Console Easter Egg**: Open DevTools console to see custom messages

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16.1.4 (Turbopack, App Router) |
| **Language** | TypeScript 5 (strict mode) |
| **Runtime** | React 19.2.3 |
| **Styling** | Tailwind CSS 3.4.19 + custom theme |
| **Animation** | GSAP 3.14.2 + CSS transitions |
| **Email** | Nodemailer 7.0.12 + Gmail SMTP |
| **State Management** | Zustand |
| **Icons** | Lucide React 0.562.0 |
| **Analytics** | Vercel Analytics & Speed Insights |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/pnpm
- Gmail account with App Password enabled

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/cainebenoy/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
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
   npm run dev
   ```

   Visit `http://localhost:3000`

5. **Build for production**

   ```bash
   npm run build
   npm run start
   ```

---

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in **Settings → Environment Variables**:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `RECIPIENT_EMAIL`
4. Deploy automatically on every push

### Post-Deployment

- Update email template in `/app/api/hire/route.ts` if domain changes
- Test hire form to verify emails work
- Monitor analytics in Vercel dashboard

---

## 📋 Project Structure

```text
personal-portfolio/
├── app/                          # Next.js App Router
│   ├── api/hire/route.ts        # Email API endpoint
│   ├── globals.css              # Global styles & theme
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── not-found.tsx            # 404 page
│
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── HireModal.tsx        # Form modal with progress bar
│   │   ├── Avatar.tsx           # Profile photo
│   │   ├── Navigation.tsx       # Header with theme toggle
│   │   └── ...other components
│   │
│   ├── sections/                 # Page sections
│   │   ├── ContactFooter.tsx    # Contact strips & footer
│   │   ├── Hero.tsx             # Landing section
│   │   ├── Certificates.tsx     # Archive wall
│   │   └── ...other sections
│   │
│   └── logic/
│       ├── ThemeInit.tsx        # Theme initialization & auto-switch
│       └── SimpleAnalytics.tsx  # Analytics setup
│
├── lib/
│   ├── useAppStore.ts           # Zustand state management
│   ├── useReveal.ts             # Reveal animation hook
│   └── utils.ts                 # Helper utilities
│
├── public/                       # Static assets
│   ├── me.jpg                   # Profile photo
│   ├── resume.pdf               # Resume file
│   └── ...icons and images
│
├── .env.local                    # Environment variables (git ignored)
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind theme
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

---

## 🎯 Key Implementation Details

### Theme System

- CSS variables in `:root` and `html[data-theme="blueprint"]`
- 300ms smooth transitions on all color/background changes
- Auto-switches at 7 PM, respects user toggle in localStorage
- Theme utilities: `.theme-muted`, `.theme-surface`, `.theme-border`

### Email Integration

- **Runtime**: Node.js (required for nodemailer)
- **Port**: 587 (TLS) instead of 465 (SSL) for better firewall compatibility
- **Authentication**: Gmail App Password (not account password)
- **Rate Limiting**: Consider adding for production
- **Error Handling**: Comprehensive try-catch with logging

### Form Validation

- Client-side: Name, email (regex), phone required
- Server-side: All fields validated before sending
- Visual feedback: Error messages and success toasts
- Progress bar: Creeps to 85% during submission, jumps to 100% on success

---

## 🔒 Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `EMAIL_USER` | Gmail address to send from | `caine@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password (16 chars) | `xxxx xxxx xxxx xxxx` |
| `RECIPIENT_EMAIL` | Where hire inquiries go | `caine@gmail.com` |

**⚠️ Never commit `.env.local` to Git. Add to `.gitignore`.**

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly  
- [ ] Theme toggle is smooth (300ms)
- [ ] Auto theme switch at 7 PM (check in DevTools)
- [ ] Contact strips tear off and animate
- [ ] Email copy works with toast
- [ ] Links open in new tab
- [ ] Resume PDF downloads
- [ ] Hire form validates (try empty fields)
- [ ] Hire form submits successfully
- [ ] Progress bar animates smoothly
- [ ] Confirmation emails arrive
- [ ] Mobile responsive (test on device)
- [ ] Accessibility: Keyboard navigation works

### Build & Deployment

```bash
# Test production build locally
npm run build
npm run start

# Deploy to Vercel
vercel --prod
```

---

## 🐛 Troubleshooting

| Issue | Solution |
| --- | --- |
| Emails not sending | Check `.env.local`, verify Gmail App Password, check spam folder |
| Theme not persisting | Clear localStorage, check ThemeInit.tsx runs |
| Form validation failing | Check email regex in HireModal.tsx |
| Styles not applying | Rebuild with `npm run build` |
| Images not loading | Verify files exist in `/public` folder |

---

## 📄 License

This project is open source. Feel free to use as inspiration for your own portfolio!

---

## 🤝 Contact

- **Email**: [cainebenoy@gmail.com](mailto:cainebenoy@gmail.com)
- **LinkedIn**: [linkedin.com/in/caine-benoy-8061a9288/](https://www.linkedin.com/in/caine-benoy-8061a9288/)
- **GitHub**: [github.com/cainebenoy](https://github.com/cainebenoy)

---

**Built with ❤️ using Next.js, React, and lots of coffee** ☕

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
