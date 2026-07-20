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
  title: "Kiwi — One issue in. One PR out.",
  description: "Kiwi is the planner and the swarm for shipping teams. Describe a task; Kiwi decomposes it into a worker DAG, runs a swarm of agents in parallel on one branch, and opens a single verified PR. Start on our managed cloud with zero setup, or bring your own.",
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
