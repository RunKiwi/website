import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Outfit, Fraunces, Fira_Code } from "next/font/google";
import { REPO_URL, SITE_URL } from "@/lib/site";
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

const TITLE = "Kiwi: coding agents that run where you say.";
const DESCRIPTION =
  "Kiwi runs coding agents inside infrastructure you control, on your own Anthropic, OpenAI or Gemini key. You describe the task and it does that, with your own test command as the guard proving the change broke nothing. Model-generated code runs with no network access at all, every edit and review verdict is recorded step by step, and the work lands as one reviewable PR. Run it on our managed cloud, or entirely inside your own VPC.";

export const metadata: Metadata = {
  // metadataBase is what makes every relative URL below resolve to an absolute
  // one. Without it the generated og:image is a relative path, which most
  // unfurlers drop — so shares render as a bare link.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Kiwi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kiwi",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    // og:image comes from app/opengraph-image.tsx automatically.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Favicon is served by the app/icon.svg file convention (kiwi-bird mark).
};

// Structured data. Deliberately limited to facts that are true today: what the
// product is, who publishes it, and that a free tier exists. No aggregateRating
// or review markup — inventing those is both a fabrication and a manual-action
// risk, and we have no real ratings to cite.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Kiwi",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      sameAs: [REPO_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Kiwi",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Kiwi",
      url: SITE_URL,
      description: DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS",
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free tier on the Kiwi-operated shared fleet.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${fraunces.variable} ${firaCode.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="film-grain" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
