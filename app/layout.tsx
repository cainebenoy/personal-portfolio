import type { Metadata } from "next";
import { 
  Inter, 
  Abril_Fatface, 
  Caveat, 
  Fira_Code, 
  Permanent_Marker, 
  Reenie_Beanie 
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const abril = Abril_Fatface({ weight: "400", subsets: ["latin"], variable: "--font-abril" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const fira = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker" });
const reenie = Reenie_Beanie({ weight: "400", subsets: ["latin"], variable: "--font-reenie" });

export const metadata: Metadata = {
  title: "Caine Benoy | Generalist Portfolio",
  description: "A jack of all trades is a master of none, but oftentimes better than a master of one.",
  openGraph: {
    title: "Caine Benoy | Generalist Portfolio",
    description: "Full-stack developer, designer, and creative technologist. Building digital experiences with code, design, and a touch of physics.",
    url: "https://cainebenoy.com",
    siteName: "Caine Benoy Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caine Benoy | Generalist Portfolio",
    description: "Full-stack developer, designer, and creative technologist. Building digital experiences with code, design, and a touch of physics.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Easter egg console message for curious developers
  if (typeof window !== 'undefined') {
    console.log(
      '%c👋 Hey there, curious developer!',
      'font-size: 20px; font-weight: bold; color: #ff4757;'
    );
    console.log(
      '%c🎨 Like what you see? I built this with Next.js, GSAP, Three.js, and lots of coffee.',
      'font-size: 14px; color: #2b2b2b;'
    );
    console.log(
      '%c🐛 Found a bug? I probably left it there on purpose. (Just kidding... maybe.)',
      'font-size: 14px; color: #5a7cfa;'
    );
    console.log(
      '%c💌 Want to chat? Shoot me an email: hello@cainebenoy.com',
      'font-size: 14px; font-weight: bold; color: #2b2b2b;'
    );
    console.log(
      '%c⚡ Pro tip: Try the command palette (Cmd/Ctrl + K)',
      'font-size: 12px; font-style: italic; color: #666;'
    );
  }
  
  return (
    <html lang="en">
      <body className={`
        ${inter.variable} 
        ${abril.variable} 
        ${caveat.variable} 
        ${fira.variable} 
        ${marker.variable} 
        ${reenie.variable}
        font-sans
      `}>
        <div className="paper-texture" />
        {children}
      </body>
    </html>
  );
}