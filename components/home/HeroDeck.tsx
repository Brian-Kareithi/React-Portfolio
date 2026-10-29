"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHomelabSnapshot } from "@/hooks/useHomelabSnapshot";
import { formatUptime, type HomelabStats } from "@/lib/homelab";

const depth = (z: number) => ({ "--z": z }) as CSSProperties;

function LabCard({ lab }: { lab: HomelabStats | null }) {
  return (
    <Link href="/homelab" className="hh-layer hh-layer-lab" style={depth(0.5)} aria-label="Homelab status. Open the live homelab page">
      <p className="hh-layer-label">
        homelab
        {lab &&
          (lab.stale ? (
            <span className="hh-lab-live" data-stale="">last seen</span>
          ) : (
            <span className="hh-lab-live">
              <span className="live-dot" aria-hidden="true" /> live
            </span>
          ))}
      </p>
      <p className="hh-lab-status">
        {lab
          ? lab.stale
            ? `${lab.system.hostname} is offline right now`
            : `${lab.containers.running}/${lab.containers.total} services up on ${lab.system.hostname}`
          : "All systems normal"}
      </p>
      <dl className="hh-lab-list">
        {lab ? (
          <>
            <div><dt>Uptime</dt><dd>{formatUptime(lab.system.uptimeSeconds)}</dd></div>
            <div><dt>CPU</dt><dd>{Math.round(lab.system.cpu.percent)}%</dd></div>
            <div><dt>Memory</dt><dd>{Math.round(lab.system.memory.percent)}%</dd></div>
            {lab.system.disk && <div><dt>Storage used</dt><dd>{Math.round(lab.system.disk.percent)}%</dd></div>}
          </>
        ) : (
          <>
            <div><dt>Proxmox host</dt><dd>24/7</dd></div>
            <div><dt>RAID-1 storage</dt><dd>3 TB</dd></div>
            <div><dt>Devices managed</dt><dd>19</dd></div>
            <div><dt>Data lost</dt><dd>0 B</dd></div>
          </>
        )}
      </dl>
    </Link>
  );
}

/** Three stacked cards beside the hero copy that drift with the pointer at different depths. */
export function HeroDeck() {
  const lab = useHomelabSnapshot();

  return (
    <div className="hh-deck">
      <LabCard lab={lab} />

      <Link href="/projects#pos-system" className="hh-layer hh-layer-app" style={depth(1)} aria-label="Open the POS system case study">
        <p className="hh-layer-label">pos system</p>
        <Image src="/projects/pos/overview.png" alt="" width={720} height={450} sizes="320px" className="hh-shot" />
      </Link>

      <section className="hh-layer hh-layer-id" style={depth(1.7)} aria-label="Profile" tabIndex={0}>
        <p className="hh-layer-label">profile</p>
        <dl className="hh-id-rows">
          <div><dt>stack</dt><dd>Next.js, React Native, TypeScript</dd></div>
          <div><dt>exploring</dt><dd>AI, GIS, cloud, DevOps</dd></div>
          <div><dt>certified</dt><dd>Security+, CCNA, AWS, Azure, Google, IBM</dd></div>
        </dl>
      </section>
    </div>
  );
}
