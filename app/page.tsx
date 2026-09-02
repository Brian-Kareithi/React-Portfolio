import type { Metadata } from "next";
import HomeContent from "./HomeContent";
import { JsonLd } from "@/app/components/JsonLd";
import { siteConfig } from "@/app/lib/site";

const description =
  "Brian Kareithi is a Fullstack Developer, React Native Developer, and Cybersecurity Specialist from Nairobi, Kenya. Specializing in Next.js, React, TypeScript, and secure cloud-native applications. 50+ projects delivered, 5+ years in tech.";

export const metadata: Metadata = {
  title: siteConfig.title,
  description,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description,
    images: [{ url: siteConfig.ogImage, width: 800, height: 800, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description,
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#service`,
      url: siteConfig.url,
      name: `${siteConfig.name} — Full-Stack Development & Cybersecurity`,
      description: "Full-stack web and mobile development, React Native apps, and cybersecurity services based in Nairobi, Kenya.",
      slogan: siteConfig.role,
      email: siteConfig.email,
      telephone: siteConfig.phoneDisplay,
      priceRange: "$$",
      image: siteConfig.ogImage,
      founder: { "@id": `${siteConfig.url}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -1.2921,
        longitude: 36.8219,
      },
      areaServed: { "@type": "Place", name: "Global (Remote)" },
      sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      description,
      url: siteConfig.url,
      email: `mailto:${siteConfig.email}`,
      telephone: siteConfig.phoneDisplay,
      image: siteConfig.ogImage,
      address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Umma University" },
        { "@type": "EducationalOrganization", name: "Thika High School" },
      ],
      sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
      knowsAbout: [
        "Next.js",
        "React",
        "React Native",
        "TypeScript",
        "Node.js",
        "Cybersecurity",
        "Cloud Architecture",
        "Docker",
        "Kotlin",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeContent />
    </>
  );
}