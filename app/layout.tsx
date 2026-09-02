import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ClientLayout from "./ClientLayout";
import { JsonLd } from "@/app/components/JsonLd";
import { siteConfig } from "@/app/lib/site";
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
    contactType: "customer support",
    email: siteConfig.email,
    availableLanguage: ["English", "Swahili"],
  },
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
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
    "Brian software developer",
    "Brian Kareithi portfolio",
    "developer portfolios Brian Kareithi",
    "good quality developer portfolios",
    "React Native developer",
    "fullstack developer",
    "software developer portfolio",
    "Nairobi developer",
    "Kenya software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "cybersecurity specialist",
    "React Native developer Kenya",
    "web developer portfolio",
    "full stack developer Kenya",
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
    title: "Brian Kareithi | Fullstack Developer, React Native & Cybersecurity Specialist",
    description:
      "Fullstack Developer & React Native Specialist from Nairobi, Kenya. 50+ projects delivered. Expert in Next.js, React, TypeScript, and secure cloud-native applications.",
    images: [
      {
        url: "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg",
        width: 800,
        height: 800,
        alt: "Brian Kareithi - Fullstack Developer & React Native Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Kareithi | Fullstack Developer, React Native & Cybersecurity Specialist",
    description:
      "Fullstack Developer & React Native Specialist from Nairobi, Kenya. 50+ projects delivered. Expert in Next.js, React, TypeScript.",
    images: ["https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"],
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
    <html lang="en" className={`dark scroll-smooth ${dmSans.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}else if(t==="dark"){document.documentElement.classList.add("dark")}else if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches){document.documentElement.classList.remove("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="relative overflow-x-clip antialiased" suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
