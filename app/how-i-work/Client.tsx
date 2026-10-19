"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import BuiltToStandard from "@/app/components/BuiltToStandard";
import { Assemble } from "@/app/components/ui/Assemble";
import { principles, architecture, workflow, domains, techs } from "@/app/lib/skills-data";
import { valuePoints } from "@/app/lib/value";

export default function HowIWorkClient() {
  const [activeDomain, setActiveDomain] = useState(domains[0].id);
  const current = domains.find((d) => d.id === activeDomain)!;

  return (
    <div id="how-i-work">
      <div className="q-page">
        <div className="q-wrap">
          <Breadcrumbs />
          <SectionHeader
            index="02"
            label="How I work"
            title={<>How I <em>deliver</em></>}
            description="Why the work holds up, the principles behind it, my stack by layer, and the path from an idea to production."
          />

          <section aria-labelledby="reasons-title" className="q-section">
            <div className="q-section-head">
              <p className="q-eyebrow"><b>01</b> Why it holds up</p>
              <h2 id="reasons-title" data-split className="q-h2">Five reasons <em>it works</em></h2>
            </div>
            <ol className="w-reasons">
              {valuePoints.map((v, i) => (
                <li key={v.id}>
                  <Assemble index={i}>
                    <Link href={v.href} className="w-reason">
                      <span className="w-reason-num">0{i + 1}</span>
                      <h3 className="q-h3 w-reason-edge">{v.edge}</h3>
                      <div className="w-reason-copy">
                        <p className="q-body">{v.benefit}</p>
                        <p className="q-small">
                          <ArrowUpRight aria-hidden="true" />
                          {v.proof}
                        </p>
                      </div>
                    </Link>
                  </Assemble>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="principles-title" className="q-section">
            <div className="q-section-head">
              <p className="q-eyebrow"><b>02</b> Principles</p>
              <h2 id="principles-title" data-split className="q-h2">What I <em>optimise for</em></h2>
            </div>
            <ol className="w-principles">
              {principles.map((p, i) => (
                <li key={p.title}>
                  <span className="w-principle-num">{i + 1}</span>
                  <div>
                    <h3 className="q-h3">{p.title}</h3>
                    <p className="q-body" style={{ marginTop: "0.5rem" }}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="layers-title" className="q-section">
            <div className="q-section-head">
              <p className="q-eyebrow"><b>03</b> Stack by layer</p>
              <h2 id="layers-title" data-split className="q-h2">From the screen <em>to the server</em></h2>
            </div>
            <ol className="w-strata">
              {architecture.map((a, i) => (
                <li key={a.title} style={{ "--depth": i / (architecture.length - 1) } as React.CSSProperties}>
                  <span className="w-strata-icon" aria-hidden="true">{a.icon}</span>
                  <h3 className="q-h3">{a.title}</h3>
                  <p className="w-strata-stack">{a.stack}</p>
                  <p className="q-body">{a.desc}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section aria-labelledby="delivery-title" className="w-delivery q-dark">
          <div className="q-wrap">
            <div className="q-section-head" style={{ marginBottom: "3.5rem" }}>
              <p className="q-eyebrow"><b>●</b> Delivery</p>
              <h2 id="delivery-title" data-split className="q-h2">From idea <em>to production</em></h2>
            </div>
            <ol className="w-steps">
              {workflow.map((w) => (
                <li key={w.step}>
                  <span className="w-step-dot" aria-hidden="true" />
                  <span className="w-step-num">{w.step}</span>
                  <h3 className="q-h3">{w.title}</h3>
                  <p className="q-small">{w.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="q-wrap">
          <BuiltToStandard />

          <section aria-labelledby="capabilities-title" className="q-section">
            <div className="q-section-head">
              <p className="q-eyebrow"><b>05</b> Capabilities</p>
              <h2 id="capabilities-title" data-split className="q-h2">What I&apos;m <em>good at</em></h2>
            </div>
            <div className="w-caps">
              <div className="w-caps-tabs" role="tablist" aria-label="Skill domains">
                {domains.map((d) => {
                  const active = d.id === activeDomain;
                  return (
                    <button key={d.id} onClick={() => setActiveDomain(d.id)} role="tab" aria-selected={active} className="q-tab">
                      <span className="w-caps-index">{d.index}</span>
                      {d.label}
                    </button>
                  );
                })}
              </div>
              <div key={current.id} className="animate-fade-in-up">
                <h3 className="q-h2" style={{ fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.75rem)" }}>{current.tagline}</h3>
                <p className="q-body" style={{ maxWidth: "38rem", marginTop: "1rem" }}>{current.summary}</p>
                <div className="w-chips">
                  {current.tools.map((t) => (
                    <span key={t} className="q-chip">{t}</span>
                  ))}
                </div>
                <div className="w-caplist">
                  {current.capabilities.map((cap) => (
                    <div key={cap.title}>
                      <h4 className="q-h3" style={{ fontSize: "1.35rem" }}>{cap.title}</h4>
                      <p className="q-body" style={{ margin: "0.4rem 0 0.8rem" }}>{cap.description}</p>
                      <ul>
                        {cap.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="toolbox-title" className="q-section">
            <div className="q-section-head">
              <p className="q-eyebrow"><b>06</b> Toolbox</p>
              <h2 id="toolbox-title" data-split className="q-h2">Languages, platforms <em>and tools</em></h2>
            </div>
            <div className="w-tools">
              {techs.map((category) => (
                <div key={category.heading}>
                  <h3 className="q-eyebrow" style={{ marginBottom: "1rem" }}>{category.heading}</h3>
                  <ul>
                    {category.items.map((item) => (
                      <li key={item.title}>
                        <span aria-hidden="true">{item.icon}</span>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <NextSection
            title="See it in practice"
            links={[
              { href: "/projects", label: "Selected work", description: "Case studies and live demos." },
              { href: "/troubleshooting", label: "Diagnostics", description: "How I find root causes." },
              { href: "/homelab", label: "Homelab", description: "The infrastructure I run 24/7." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
