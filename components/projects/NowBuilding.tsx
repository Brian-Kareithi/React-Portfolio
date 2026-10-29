import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { currentProject } from "@/data/current-project";

/** The client project in progress: a short summary and its key facts. */
export function NowBuilding() {
  return (
    <section id="now-building" aria-labelledby="now-title" className="q-section">
      <SectionHeading index="●" label="Inside the POS system" title={<>{currentProject.title} <em>{currentProject.titleAccent}</em></>} titleId="now-title">
        <p className="q-body" style={{ maxWidth: "40rem", marginTop: "1.25rem" }}>
          {currentProject.summary}
        </p>
      </SectionHeading>
      <dl className="p-facts">
        <div>
          <dt>Status</dt>
          <dd>{currentProject.status}</dd>
        </div>
        {currentProject.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
        <div>
          <dt>Demo</dt>
          <dd>
            <a href={currentProject.demo} target="_blank" rel="noopener noreferrer" className="q-link">
              Open the live demo <ArrowUpRight aria-hidden="true" />
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
