"use client";

import { useRef, useState } from "react";
import { ServiceDetail, ServiceIcon, StatusDot, statusOf } from "@/components/homelab/ServiceCard";
import type { HomelabStats } from "@/lib/homelab";
import { revealDetail } from "@/lib/reveal-detail";

/**
 * Every self-hosted service on one glass board: a compact list grouped as on the Homepage
 * dashboard, and a detail pane for whichever service is selected. Replaces a long grid of
 * cards, so fourteen services fit in roughly one screen.
 */
export function ServiceBoard({ groups }: { groups: HomelabStats["groups"] }) {
  const all = groups.flatMap((g) => g.services);
  const firstWithStats = all.find((s) => s.stats) ?? all[0];
  const [selectedName, setSelectedName] = useState(firstWithStats?.name);
  const detailRef = useRef<HTMLElement>(null);
  const selected = all.find((s) => s.name === selectedName) ?? firstWithStats;

  if (!selected) return <p className="hs-empty">No services reported.</p>;

  const healthy = all.filter((s) => ["healthy", "running"].includes(statusOf(s)[0])).length;

  return (
    <div className="sb">
      <div className="sb-list">
        <p className="sb-summary">
          <strong>{healthy}</strong> of {all.length} services up
        </p>
        {groups.map((group) => (
          <div key={group.name} className="sb-group">
            <h3 className="hs-group-title">{group.name}</h3>
            <ul>
              {group.services.map((service) => (
                <li key={service.name}>
                  <button
                    type="button"
                    className="sb-row"
                    aria-pressed={service.name === selected.name}
                    aria-controls="service-detail"
                    onClick={() => {
                      setSelectedName(service.name);
                      requestAnimationFrame(() => revealDetail(detailRef.current));
                    }}
                  >
                    <ServiceIcon service={service} />
                    <span className="sb-row-name">{service.name}</span>
                    <StatusDot service={service} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section ref={detailRef} id="service-detail" className="sb-detail" aria-live="polite" aria-label="Selected service">
        <div key={selected.name} className="sb-detail-anim">
          <ServiceDetail service={selected} />
        </div>
      </section>
    </div>
  );
}
