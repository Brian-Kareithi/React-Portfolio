import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export function ThisPortfolio() {
  return (
    <section className="q-section p-self">
      <SectionHeading index="★" label="This portfolio" title={<>You&apos;re <em>looking at it</em></>} />
      <div className="p-self-grid">
        <p className="q-body" style={{ maxWidth: "34rem" }}>
          Next.js 16, TypeScript and Tailwind CSS v4, with per-route metadata and structured data. Scroll physics from Lenis and GSAP, a 3D homelab in
          Three.js, and no cookies.
        </p>
        <div className="p-self-links">
          <a href={`${siteConfig.url}/`} target="_blank" rel="noopener noreferrer" className="q-btn">
            <ExternalLink aria-hidden="true" /> Live site
          </a>
          <a href={siteConfig.repo} target="_blank" rel="noopener noreferrer" className="q-link" data-lead>
            <Github aria-hidden="true" /> Source
          </a>
        </div>
      </div>
    </section>
  );
}
