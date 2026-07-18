import type { Metadata, Viewport } from "next";
import {
  Architects_Daughter,
  Archivo,
  Caveat,
  Fragment_Mono,
} from "next/font/google";
import Script from "next/script";
import CommandPalette from "@/components/chrome/CommandPalette";
import Footer from "@/components/chrome/Footer";
import Header from "@/components/chrome/Header";
import Readout from "@/components/chrome/Readout";
import MotionProvider from "@/lib/motion";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

// The writing hand — quick pen cursive for headings, names, and numerals.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

// The printing hand — schoolbook print for body text and every label. One
// weight; hierarchy comes from size, case, and ink.
const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architects",
});

// Kept for the resume document, which deliberately stays typeset — a
// handwritten CV reads as a prop, not a credential.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1e8",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${architectsDaughter.variable} ${archivo.variable} ${fragmentMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-svh">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <a
          href="#main"
          className="mono-tag fixed top-3 left-3 z-[100] -translate-y-20 bg-accent px-4 py-3 text-ground transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <Readout />
          <CommandPalette />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
