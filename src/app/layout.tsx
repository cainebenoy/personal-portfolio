import type { Metadata } from "next";
import { Courier_Prime, Kalam } from "next/font/google";
import "./globals.css";

// Structural font: headings, body text, UI chrome — never Kalam here.
const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Handwritten font: annotations, signature, status tags only.
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Jack of All Trades",
  description:
    "A jack of all trades is a master of none, but oftentimes better than a master of one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${courierPrime.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-structural">
        {children}
      </body>
    </html>
  );
}
