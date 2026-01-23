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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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