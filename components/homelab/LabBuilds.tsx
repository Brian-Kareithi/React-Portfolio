import { Section } from "@/components/ui/Section";
import { labBuilds } from "@/data/homelab";

export function LabBuilds() {
  return (
    <Section id="builds" title={<>What I build <em>here</em></>}>
      <div className="l-builds">
        {labBuilds.map((build) => (
          <article key={build.title}>
            <h3 className="q-h3" style={{ fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.6rem)" }}>
              {build.title}
            </h3>
            <p className="q-body">{build.outcome}</p>
            <p className="q-mono q-small">{build.stack}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
