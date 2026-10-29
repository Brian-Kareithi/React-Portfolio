import { Server, Wifi } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { topologyServices } from "@/data/homelab";

/** Internet to router to server to services, as a vertical chain. */
export function Topology() {
  return (
    <Section id="topology" index="02" label="Topology" title={<>How it&apos;s <em>wired together</em></>}>
      <ol className="l-chain">
        <li>
          <span className="l-node">
            <Wifi aria-hidden="true" /> Internet
          </span>
        </li>
        <li>
          <span className="l-node">
            <Wifi aria-hidden="true" /> Router <small>Safaricom 4G LTE</small>
          </span>
        </li>
        <li>
          <span className="l-node" data-strong>
            <Server aria-hidden="true" /> Dreezy0 <small>HP Tower Server · Proxmox VE · Docker · RAID-1 · 3TB</small>
          </span>
        </li>
        <li>
          <ul className="l-leaves">
            {topologyServices.map((service) => (
              <li key={service.label}>
                <span className="l-node">
                  {service.label} <small>{service.note}</small>
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ol>
    </Section>
  );
}
