import type { Metadata } from "next";
import { ClosingNotes } from "@/components/about/ClosingNotes";
import { CurrentRole } from "@/components/about/CurrentRole";
import { Testimonials } from "@/components/about/Testimonials";
import { Timeline } from "@/components/about/Timeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { resumeCertifications, resumeEducation } from "@/data/resume";
import { pageMeta, siteConfig } from "@/lib/site";

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
    <div id="about" className="q-page">
      <JsonLd data={jsonLd} />
      <div className="q-wrap">
        <PageHeader
          index="01"
          label="Journey"
          title={<>How I <em>got here</em></>}
          description="From a science classroom to government security, fifty-plus client projects, a startup and live systems at a school."
        />

        <p className="a-intro">
          I started with networks, servers and the people who needed them to work. Security work at the ICT Authority of Kenya taught me
          to think about what could go wrong, freelance projects taught me to listen before I build, and the systems I look after at
          Steadfast Academy keep me learning every day.
        </p>

        <CurrentRole />
        <Timeline />
        <ClosingNotes />

        <Testimonials />

        <NextSection
          title="Next"
          links={[
            { href: "/how-i-work", label: "How I work", description: "How I take an idea to production." },
            { href: "/projects", label: "Selected work", description: "What I shipped and who uses it." },
            { href: "/resume", label: "Resume", description: "This path, as a PDF." },
          ]}
        />
      </div>
    </div>
  );
}
