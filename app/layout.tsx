import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BootScreen } from "@/components/layout/BootScreen";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { bootScript } from "@/lib/boot";
import { ogImageFor, siteConfig } from "@/lib/site";
import "@/styles/globals.css";
import "@/styles/sections.css";
import "@/styles/liquid.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

/* Display face for the name and headings: a soft, optically sized serif whose rounded
   terminals ("SOFT" axis) echo the liquid glass. */
const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  // Small labels only, never the main content: leave the bandwidth to the fonts the first paint needs.
  preload: false,
});

const siteUrl = siteConfig.url;

/* Site-wide identity: every page points at the same Person and WebSite nodes by @id. */
const identityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteUrl,
      image: siteConfig.ogImage,
      email: siteConfig.email,
      address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
      knowsLanguage: ["English", "Swahili"],
      sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f2f4f3",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | Brian Kareithi",
  },
  description: siteConfig.description,
  keywords: [
    "Brian Kareithi",
    "React Native developer Kenya",
    "Kotlin Android developer Kenya",
    "school management system developer",
    "Nairobi software engineer",
    "Next.js developer",
    "TypeScript developer",
    "full-stack developer Kenya",
    "mobile app developer Nairobi",
    "IT support specialist Kenya",
  ],
  authors: [{ name: "Brian Kareithi", url: siteUrl }],
  creator: "Brian Kareithi",
  publisher: "Brian Kareithi",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Brian Kareithi Portfolio",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImageFor(siteConfig.name, siteConfig.tagline)],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImageFor(siteConfig.name, siteConfig.tagline).url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  verification: {
    google: "3j2d8gY3u4vFntbsWOENsTCePOa6RcxKp_eouUKcgEo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${dmSans.variable} ${display.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="relative overflow-x-clip antialiased" suppressHydrationWarning>
        <BootScreen />
        <JsonLd data={identityJsonLd} />
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
