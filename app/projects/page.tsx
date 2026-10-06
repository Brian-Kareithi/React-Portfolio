import type { Metadata } from "next";
import ProjectsClient from "./Client";
import { pageMeta, siteConfig } from "@/app/lib/site";
import { JsonLd } from "@/app/components/JsonLd";
import { caseStudies } from "@/app/lib/projects-data";

const description =
  "Results Brian Kareithi has delivered: a road-safety platform, a client real-estate site, school portals and a mobile app used by real families, plus cybersecurity tooling. Each case study shows the problem, his contribution and a live demo.";

export const metadata: Metadata = pageMeta({
  title: "Selected Work",
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

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectsClient />
    </>
  );
}