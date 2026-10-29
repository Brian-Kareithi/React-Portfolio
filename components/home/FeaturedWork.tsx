import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies, type CaseStudy } from "@/data/projects";

const FEATURED_IDS = ["pos-system"];

const featured = caseStudies.filter((c) => FEATURED_IDS.includes(c.id) && c.screenshot);

function FeaturedItem({ study, position }: { study: CaseStudy; position: number }) {
  const caseStudyHref = `/projects#${study.id}`;
  return (
    <article className="h-proof-item" data-flip={position % 2 === 1 || undefined}>
      <Link href={caseStudyHref} tabIndex={-1} aria-hidden="true" className="h-proof-shot">
        <div className="jv-window-bar">
          <i />
          <i />
          <i />
          <span className="jv-window-url">{study.title.toLowerCase().replace(/\s+/g, "-")}.app</span>
        </div>
        <Image
          src={study.screenshot!.src}
          alt=""
          width={1440}
          height={900}
          sizes="(max-width: 1024px) 100vw, 640px"
          className="h-proof-img"
        />
      </Link>
      <div className="h-proof-copy">
        <Eyebrow index={`0${position + 1}`}>{study.status}</Eyebrow>
        <h3 className="q-h2">{study.title}</h3>
        <p className="q-body">{study.tagline}</p>
        <p className="q-mono q-small">{study.stack.slice(0, 4).join(" · ")}</p>
        <div className="h-proof-links">
          <Link href={caseStudyHref} className="q-link">
            Case study<span className="sr-only">: {study.title}</span> <ArrowRight aria-hidden="true" />
          </Link>
          {study.access.demo && (
            <a href={study.access.demo} target="_blank" rel="noopener noreferrer" className="q-link">
              Live demo <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  if (featured.length === 0) return null;

  return (
    <section id="proof" aria-labelledby="proof-title" className="h-proof">
      <div className="q-wrap">
        <Reveal>
          <SectionHeading index="01" label="Featured" title={<>Built for <em>real shops</em></>} titleId="proof-title" bodyClassName="h-proof-head">
            <Link href="/projects" className="q-link">
              All projects <ArrowUpRight aria-hidden="true" />
            </Link>
          </SectionHeading>
        </Reveal>

        <ol className="h-proof-list">
          {featured.map((study, i) => (
            <li key={study.id}>
              <Reveal>
                <FeaturedItem study={study} position={i} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
