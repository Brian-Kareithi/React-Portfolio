import type { Metadata } from "next";
import { AtAGlance } from "@/components/home/AtAGlance";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { SiteIndex } from "@/components/home/SiteIndex";
import { WorkQuote } from "@/components/home/WorkQuote";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, ogImageFor } from "@/lib/site";

const description = siteConfig.description;

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
    images: [ogImageFor(siteConfig.name, siteConfig.tagline)],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description,
    images: [ogImageFor(siteConfig.name, siteConfig.tagline).url],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#service`,
      url: siteConfig.url,
      name: `${siteConfig.name}, Software Engineering & Mobile Development`,
      description: "Web and mobile software engineering, React Native apps, and IT infrastructure support based in Nairobi, Kenya.",
      slogan: siteConfig.role,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      image: siteConfig.ogImage,
      founder: { "@id": `${siteConfig.url}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: { "@type": "Place", name: "Global (Remote)" },
      sameAs: [siteConfig.github, siteConfig.linkedin],
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      description,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
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
      <Hero />
      <AtAGlance />
      <FeaturedWork />
      <WorkQuote />
      <SiteIndex />
    </>
  );
}
