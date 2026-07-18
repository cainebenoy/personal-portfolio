import type { Metadata, Viewport } from "next";
import { Archivo, Fragment_Mono, Fraunces } from "next/font/google";
import Footer from "@/components/chrome/Footer";
import Header from "@/components/chrome/Header";
import Readout from "@/components/chrome/Readout";
import MotionProvider from "@/lib/motion";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Display voice — cinematic at headline sizes, warm at text sizes (optical
// sizing does the switching). SOFT/WONK stay available for italic moments.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

// Structural voice — body and UI. The width axis powers the expanded-caps
// kicker treatment (see the `kicker` utility in globals.css).
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

// Instrument voice — indices, coordinates, metadata. Single weight on
// purpose: hierarchy comes from size, case, and tracking.
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
  themeColor: "#0a0d0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${fragmentMono.variable} antialiased`}
    >
      <body className="min-h-svh">
        <a
          href="#main"
          className="mono-tag fixed top-3 left-3 z-[100] -translate-y-20 bg-brass px-4 py-3 text-night transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <Readout />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
