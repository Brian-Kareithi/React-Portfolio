import type { Metadata } from "next";
import { FridaySurprise } from "@/components/homelab/FridaySurprise";
import { GearInventory } from "@/components/homelab/GearInventory";
import { LabBuilds } from "@/components/homelab/LabBuilds";
import { LabStatus } from "@/components/homelab/LabStatus";
import { LiveStats } from "@/components/homelab/LiveStats";
import { NetworkMap } from "@/components/homelab/NetworkMap";
import { Topology } from "@/components/homelab/Topology";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { devicesFromStats } from "@/lib/homelab";
import { getHomelabStats } from "@/lib/homelab-server";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Homelab: 24/7 Proxmox and Network Lab",
  heading: "Homelab",
  description: "A homelab that runs 24/7: Proxmox, RAID-1 storage, a managed network and ESP32 automation, with no data lost so far.",
  path: "/homelab",
});

export const revalidate = 30;

export default async function HomelabPage() {
  const initialStats = await getHomelabStats().catch(() => null);

  return (
    <div id="homelab" className="q-page">
      <div className="q-wrap">
        <PageHeader
          index="05"
          label="Homelab"
          title={<>The lab that <em>never sleeps</em></>}
          description="Where I started and where I still learn. I broke plenty before it stayed up, and that is how I learned to keep services running."
        />

        <TerminalWindow title="homelab.map" className="l-map">
          <div className="l-map-body">
            <NetworkMap devices={devicesFromStats(initialStats)} />
          </div>
        </TerminalWindow>

        <LabStatus />

        <Section id="live" index="01" label="Live" title={<>What&apos;s running <em>right now</em></>}>
          <LiveStats initial={initialStats} />
        </Section>

        <Topology />
        <GearInventory />
        <LabBuilds />

        <blockquote className="l-quote">
          <p data-split>
            Every device here serves real life: monitored, backed up and refined until it is <em>reliable.</em>
          </p>
        </blockquote>

        <Section id="friday" index="05" label="Off the clock" title={<>Is it <em>Friday</em> yet?</>}>
          <FridaySurprise />
        </Section>

        <NextSection
          title="From the lab to the work"
          links={[
            { href: "/troubleshooting", label: "Diagnostics", description: "Root-cause work from real failures." },
            { href: "/how-i-work", label: "How I work", description: "The principles behind the lab and the products." },
            { href: "/projects", label: "Selected work", description: "Where the habits ship." },
          ]}
        />
      </div>
    </div>
  );
}
