import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Outfit, Fraunces, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Kept for UI chrome / eyebrows that want a geometric sans.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// Expressive variable display serif for the hero + section titles.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kiwi — Coding agents that run where you say.",
  description: "Kiwi runs coding agents inside infrastructure you control. Model-generated code executes in a sandbox with default-deny networking and never holds an API key, every edit and review verdict is recorded step by step, and the work lands as one PR verified against your own test command. Run it on our managed cloud, or entirely inside your own VPC.",
  // Favicon is served by the app/icon.svg file convention (kiwi-bird mark).
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${fraunces.variable} ${firaCode.variable} antialiased`}>
        <div className="film-grain" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
