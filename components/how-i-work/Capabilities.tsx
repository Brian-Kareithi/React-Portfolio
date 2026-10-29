"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { domains, type SkillDomain } from "@/data/skills";

function DomainPanel({ domain }: { domain: SkillDomain }) {
  return (
    <div className="animate-fade-in-up">
      <h3 className="q-h2" style={{ fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.75rem)" }}>
        {domain.tagline}
      </h3>
      <p className="q-body" style={{ maxWidth: "38rem", marginTop: "1rem" }}>
        {domain.summary}
      </p>
      <div className="w-chips">
        {domain.tools.map((tool) => (
          <span key={tool} className="q-chip">
            {tool}
          </span>
        ))}
      </div>
      <div className="w-caplist">
        {domain.capabilities.map((capability) => (
          <div key={capability.title}>
            <h4 className="q-h3" style={{ fontSize: "1.35rem" }}>
              {capability.title}
            </h4>
            <p className="q-body" style={{ margin: "0.4rem 0 0.8rem" }}>
              {capability.description}
            </p>
            <ul>
              {capability.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Skill domains as tabs, each with its tools and three capabilities. */
export function Capabilities() {
  const [activeId, setActiveId] = useState(domains[0].id);
  const active = domains.find((d) => d.id === activeId) ?? domains[0];

  return (
    <Section id="capabilities" index="05" label="Capabilities" title={<>What I&apos;m <em>good at</em></>}>
      <div className="w-caps">
        <div className="w-caps-tabs" role="tablist" aria-label="Skill domains">
          {domains.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setActiveId(domain.id)}
              role="tab"
              aria-selected={domain.id === activeId}
              className="q-tab"
            >
              <span className="w-caps-index">{domain.index}</span>
              {domain.label}
            </button>
          ))}
        </div>
        <DomainPanel key={active.id} domain={active} />
      </div>
    </Section>
  );
}
