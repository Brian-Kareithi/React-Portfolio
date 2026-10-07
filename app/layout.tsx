import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ClientLayout from "./ClientLayout";
import { JsonLd } from "@/app/components/JsonLd";
import { siteConfig, ogImageFor } from "@/app/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = siteConfig.url;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteConfig.name,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: siteConfig.ogImage,
  email: siteConfig.email,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: siteConfig.email,
    availableLanguage: ["English", "Swahili"],
  },
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

export const viewport: Viewport = {
  themeColor: "#ece7f6",
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
    <html lang="en" className={`scroll-smooth ${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="relative overflow-x-clip antialiased" suppressHydrationWarning>
        <noscript>
          <style>{".loading-screen{display:none!important}"}</style>
        </noscript>
        <JsonLd data={organizationJsonLd} />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
