import type { Metadata } from "next";
import AboutClient from "./Client";
import { pageMeta, siteConfig } from "@/app/lib/site";
import { JsonLd } from "@/app/components/JsonLd";
import { resumeCertifications, resumeEducation } from "@/app/lib/resume-data";

export const metadata: Metadata = pageMeta({
  title: "About Brian: Full-Stack Developer in Kenya",
  heading: "About",
  description: "BSc in IT, six security and cloud certifications, public-sector security work, 50+ freelance projects and a startup co-founded in Nairobi.",
  path: "/about",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${siteConfig.url}/about`,
  name: "About Brian Kareithi",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    image: siteConfig.ogImage,
    worksFor: { "@type": "EducationalOrganization", name: "Steadfast Academy" },
    alumniOf: { "@type": "CollegeOrUniversity", name: resumeEducation.institution },
    hasCredential: resumeCertifications.map((name) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name,
    })),
    sameAs: [siteConfig.github, siteConfig.linkedin],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutClient />
    </>
  );
}