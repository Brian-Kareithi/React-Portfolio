import { Reveal } from "@/components/ui/Reveal";

const facts = [
  { value: "50+", label: "Client projects shipped", note: "Freelance, 2022 to 2024" },
  { value: "∞", label: "Certifications", note: "So many I can't count" },
  { value: "19", label: "Devices in my homelab", note: "Proxmox, RAID-1, always on" },
  { value: "5", label: "Systems live at a school", note: "Teacher, parent, library and HR portals, plus an admin app" },
];

export function AtAGlance() {
  return (
    <section aria-label="At a glance" className="h-glance">
      <div className="q-wrap">
        <div className="h-glance-grid">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} index={i}>
              <dl className="h-glance-cell">
                <dt className="q-eyebrow" style={{ marginBottom: "1.1rem" }}>
                  {fact.label}
                </dt>
                <dd>
                  <span className="h-glance-value">{fact.value}</span>
                  <span className="q-small" style={{ display: "block", marginTop: "0.5rem" }}>
                    {fact.note}
                  </span>
                </dd>
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
