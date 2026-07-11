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
  title: "Kiwi — A Safe Place for Your AI Coding Agents to Work",
  description: "Give your AI coding agents a safe place to work. Kiwi runs them in isolated sandboxes, keeps your secrets on your machine (never written to the sandbox), streams every move live, and never loses a run.",
  icons: {
    icon: "/kiwi.png",
  },
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
