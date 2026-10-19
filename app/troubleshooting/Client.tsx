"use client";
import { useState } from "react";
import {
  Bug, SearchCheck, ScanLine, Brain,
  ListChecks, IterationCw, Flame, Database, HardDrive, MemoryStick, Network,
  CircleAlert, Plus,
} from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import DebugIt from "@/app/components/DebugIt";

export const steps = [
  {
    title: "Reproduce & Observe",
    icon: <SearchCheck className="w-4 h-4" />,
    desc: "Never fix what you can't reproduce. Capture the failure state, logs and conditions as a baseline.",
  },
  {
    title: "Isolate Variables",
    icon: <ScanLine className="w-4 h-4" />,
    desc: "Change one thing at a time. Narrow a broken system down to one component.",
  },
  {
    title: "Form a Hypothesis",
    icon: <Brain className="w-4 h-4" />,
    desc: "Keep asking why until there is no deeper answer. Frame each theory as a testable prediction.",
  },
  {
    title: "Test & Validate",
    icon: <IterationCw className="w-4 h-4" />,
    desc: "Prove the theory with evidence, then confirm the fix holds under the original failing conditions.",
  },
  {
    title: "Verify & Harden",
    icon: <ListChecks className="w-4 h-4" />,
    desc: "A fix is done when it survives. Verify under load, document it, and harden so it doesn't recur.",
  },
];

export const cases = [
  {
    title: "Mystery Disk-Full Server",
    domain: "Linux / Storage",
    icon: <Database className="w-4 h-4" />,
    summary: "A server filled its disk overnight with no obvious cause.",
    approach: "Traced the largest directories with du, then watched writes with inotify and reviewed the cron schedule.",
    rootCause: "One log was never rotated and grew without limit.",
    resolution: "Fixed the rotation, added a disk alert, confirmed two stable weeks.",
  },
  {
    title: "Dropped Wi-Fi, Working Router",
    domain: "Networking",
    icon: <Network className="w-4 h-4" />,
    summary: "One device kept dropping while everything else stayed connected.",
    approach: "Ruled out the physical layer, then checked channels, power and the adapter's driver settings.",
    rootCause: "Wi-Fi power-save was dropping the link when idle.",
    resolution: "Disabled power-save. Stable since.",
  },
  {
    title: "Silent Reboot Loop",
    domain: "Hardware",
    icon: <MemoryStick className="w-4 h-4" />,
    summary: "A PC rebooted minutes after starting, with no error.",
    approach: "Swapped parts one at a time, tested the PSU, then ran a memory test once warm.",
    rootCause: "A failing RAM stick that only erred once warm.",
    resolution: "Replaced the module and re-ran the full memory test.",
  },
  {
    title: "Blue Screens on a Failing SSD",
    domain: "Hardware / Storage",
    icon: <HardDrive className="w-4 h-4" />,
    summary: "Random blue screens, with no software changes between crashes.",
    approach: "Read the stop codes and dumps, ruled out RAM and drivers, then checked the drive's SMART data.",
    rootCause: "The SSD was failing and returning read errors.",
    resolution: "Saved the data, replaced the SSD and confirmed stability under load.",
  },
  {
    title: "Thermal Throttle Slump",
    domain: "Hardware",
    icon: <Flame className="w-4 h-4" />,
    summary: "A build crawled under load despite good specs.",
    approach: "Watched temps and clock speeds live, then inspected mounting and airflow.",
    rootCause: "Dried thermal paste and a clogged cooler.",
    resolution: "New paste and a clean cooler restored full performance.",
  },
  {
    title: "Application Crash, No Stack Trace",
    domain: "Software",
    icon: <Bug className="w-4 h-4" />,
    summary: "A release crashed intermittently with an empty trace.",
    approach: "Added instrumented builds and logging, then reproduced it on staging.",
    rootCause: "A race between two async writes to shared state.",
    resolution: "Serialized the writes and added a regression test.",
  },
  {
    title: "Encrypted Traffic Riddle",
    domain: "Security / Network",
    icon: <CircleAlert className="w-4 h-4" />,
    summary: "A trusted app kept flagging corrupted data.",
    approach: "Captured the session, decrypted it and compared the payload at both ends.",
    rootCause: "A middlebox doing TLS inspection was altering payloads.",
    resolution: "Routed around it, verified integrity and tightened TLS.",
  },
];

const kit = ["Wireshark", "gdb / LLDB", "Profilers", "Chrome DevTools", "systemd journal", "df / du / iostat", "tcpdump", "Memtest", "Hardware testers", "Multimeter", "Thermal monitoring", "Packet capture"];

export default function TroubleshootingClient() {
  const [openCase, setOpenCase] = useState(0);

  return (
    <div id="troubleshooting" className="q-page">
      <div className="q-wrap">
        <Breadcrumbs />
        <SectionHeader
          index="06"
          label="Diagnostics"
          title={<>Finding the <em>real fault</em></>}
          description="I follow the evidence to the root cause across software, hardware and networks, then write it down so it stays fixed."
        />

        <section aria-labelledby="process-title" className="d-process">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>01</b> The process</p>
            <h2 id="process-title" data-split className="q-h2">Five steps to <em>a root cause</em></h2>
          </div>
          <ol className="d-steps">
            {steps.map((st, i) => (
              <li key={st.title}>
                <span className="d-step-dot" aria-hidden="true" />
                <span className="d-step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="q-h3">{st.title}</h3>
                <p className="q-small">{st.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="cases-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>02</b> Field notes</p>
            <h2 id="cases-title" data-split className="q-h2">Real problems, <em>real causes</em></h2>
          </div>
          <ul className="d-log">
            {cases.map((c, i) => {
              const open = openCase === i;
              return (
                <li key={c.title}>
                  <button
                    onClick={() => setOpenCase(open ? -1 : i)}
                    aria-expanded={open}
                    aria-controls={`case-${i}`}
                    className="d-row"
                  >
                    <span className="d-row-id">INC-{String(i + 1).padStart(3, "0")}</span>
                    <span className="d-row-title">{c.title}</span>
                    <span className="d-row-domain">{c.domain}</span>
                    <Plus className="d-row-plus" data-open={open || undefined} aria-hidden="true" />
                  </button>
                  {open && (
                    <dl id={`case-${i}`} className="d-detail animate-fade-in-up">
                      <div><dt>Problem</dt><dd>{c.summary}</dd></div>
                      <div><dt>Approach</dt><dd>{c.approach}</dd></div>
                      <div data-key><dt><CircleAlert aria-hidden="true" /> Root cause</dt><dd>{c.rootCause}</dd></div>
                      <div><dt>Resolution</dt><dd>{c.resolution}</dd></div>
                    </dl>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="debug-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>03</b> Your turn</p>
            <h2 id="debug-title" data-split className="q-h2">Debug it <em>yourself</em></h2>
          </div>
          <div className="d-frame">
            <DebugIt />
          </div>
        </section>

        <section aria-labelledby="kit-title" className="q-section">
          <div className="q-section-head">
            <p className="q-eyebrow"><b>04</b> Kit</p>
            <h2 id="kit-title" data-split className="q-h2">What&apos;s in <em>the bag</em></h2>
          </div>
          <ul className="d-kit">
            {kit.map((t) => (
              <li key={t} className="q-chip">{t}</li>
            ))}
          </ul>
        </section>

        <NextSection
          title="The method in use"
          links={[
            { href: "/homelab", label: "Homelab", description: "A live lab where the method is tested." },
            { href: "/how-i-work", label: "How I work", description: "How I build and ship." },
            { href: "/projects", label: "Selected work", description: "Shipped systems, method applied." },
          ]}
        />
      </div>
    </div>
  );
}
