import type { Metadata } from "next";
import { CaseStudySelectionProvider } from "@/components/projects/CaseStudySelection";
import { FilmStrip } from "@/components/projects/FilmStrip";
import { GithubStats } from "@/components/projects/GithubStats";
import { NowBuilding } from "@/components/projects/NowBuilding";
import { ProjectArchive } from "@/components/projects/ProjectArchive";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { SelectedCaseStudy } from "@/components/projects/SelectedCaseStudy";
import { ThisPortfolio } from "@/components/projects/ThisPortfolio";
import { JsonLd } from "@/components/seo/JsonLd";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { currentProject } from "@/data/current-project";
import { caseStudies } from "@/data/projects";
import { pageMeta, siteConfig } from "@/lib/site";

const description =
  "Seven shipped projects, from road-safety and real-estate platforms to a school portal, with the problem, architecture and live demos.";

export const metadata: Metadata = pageMeta({
  title: "Selected Work: Web and Mobile Projects",
  heading: "Selected Work",
  description,
  path: "/projects",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteConfig.url}/projects#page`,
  url: `${siteConfig.url}/projects`,
  name: "Selected Work | Brian Kareithi",
  description,
  author: { "@id": `${siteConfig.url}/#person` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: caseStudies.map((study, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: study.title,
        description: study.tagline,
        creator: { "@id": `${siteConfig.url}/#person` },
        keywords: study.stack.join(", "),
        ...(study.access.demo ? { url: study.access.demo } : {}),
        ...(study.access.repo ? { codeRepository: study.access.repo } : {}),
      },
    })),
  },
};

/** Case studies with a live demo, plus this site. */
const liveCount = caseStudies.filter((c) => c.access.demo).length + 1;

export default function ProjectsPage() {
  return (
    <div id="projects" className="q-page">
      <JsonLd data={jsonLd} />
      <CaseStudySelectionProvider>
        <div className="q-wrap">
          <PageHeader
            index="03"
            label="Selected work"
            title={<>Built to be <em>used</em></>}
            description="Seven projects, each told as the problem, what I built, my part in it, and the design behind it. Smaller builds sit in the archive."
            aside={
              <dl className="p-stats">
                <div>
                  <dt>Case studies</dt>
                  <dd>{caseStudies.length}</dd>
                </div>
                <div>
                  <dt>Live right now</dt>
                  <dd>{liveCount}</dd>
                </div>
              </dl>
            }
          />
          <ProjectCarousel />
          <NowBuilding />
        </div>

        <div className="p-strip">
          <FilmStrip frames={currentProject.screens} label="Point of sale screens" />
        </div>

        <div className="q-wrap">
          <SelectedCaseStudy />
          <ThisPortfolio />
          <ProjectArchive />
          <GithubStats />

          <NextSection
            title="Next"
            links={[
              { href: "/how-i-work", label: "How I work", description: "The process behind these builds." },
              { href: "/homelab", label: "Homelab", description: "The infrastructure under them." },
              { href: "/about", label: "About", description: "The path that led here." },
            ]}
          />
        </div>
      </CaseStudySelectionProvider>
    </div>
  );
}
