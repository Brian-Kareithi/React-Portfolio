"use client";
import { useState } from "react";
import {
  Bug, SearchCheck, ScanLine, Brain,
  ListChecks, IterationCw, Flame, Database, HardDrive, MemoryStick, Network,
  Wrench, CircleAlert, CheckCircle,
} from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

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
    <section id="troubleshooting" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="06"
          label="Diagnostics"
          variant="split"
          title={<>Finding the <em className="font-serif-accent">real fault</em></>}
          description="I follow the evidence to the root cause across software, hardware and networks, then write it down so it stays fixed."
        />

        {/* Process: a connected ladder */}
        <div className="mb-20">
          <SubTitle kicker="The process" title="Five steps to a root cause" />
          <ol className="relative ml-5 border-l-2 pl-8 sm:ml-6 sm:pl-10" style={{ borderColor: "var(--color-accent-secondary)" }}>
            {steps.map((s, i) => (
              <li key={s.title} className="relative pb-9 last:pb-0">
                <span
                  className="absolute -left-[3.05rem] flex h-10 w-10 items-center justify-center rounded-full sm:-left-[3.55rem]"
                  style={{ backgroundColor: "var(--palette-true-cobalt)", color: "var(--palette-lavender-mist)" }}
                >
                  {s.icon}
                </span>
                <p className="font-mono text-xs mb-1" style={{ color: "var(--color-accent)" }}>Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-serif-accent mb-1.5 text-3xl" style={{ color: "var(--color-text-primary)" }}>
                  {s.title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Case files */}
        <div className="mb-20">
          <SubTitle kicker="Field notes" title="Real problems, real causes" />
          <div className="space-y-3">
            {cases.map((c, i) => {
              const open = openCase === i;
              return (
                <div key={c.title} className={open ? "plate overflow-hidden" : "flat-card overflow-hidden"}>
                  <button
                    onClick={() => setOpenCase(open ? -1 : i)}
                    aria-expanded={open}
                    aria-controls={`case-${i}`}
                    className="flex min-h-[44px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}>
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-medium" style={{ color: "var(--color-text-muted)" }}>
                        Case {String(i + 1).padStart(2, "0")} · {c.domain}
                      </span>
                      <span className="block font-serif-accent text-xl sm:text-2xl" style={{ color: "var(--color-text-primary)" }}>
                        {c.title}
                      </span>
                    </span>
                    <span className="font-mono text-lg" style={{ color: "var(--color-accent)" }} aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  {open && (
                    <div id={`case-${i}`} className="animate-fade-in-up grid gap-5 border-t px-5 pb-6 pt-5 sm:px-6 md:grid-cols-2" style={{ borderColor: "var(--color-border)" }}>
                      <div className="space-y-4">
                        <div>
                          <p className="field-label mb-1.5">The problem</p>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>{c.summary}</p>
                        </div>
                        <div>
                          <p className="field-label mb-1.5">Approach</p>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{c.approach}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-xl p-4" style={{ backgroundColor: "var(--color-highlight)" }}>
                          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--color-accent)" }}>
                            <CircleAlert className="w-3.5 h-3.5" /> Root cause
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>{c.rootCause}</p>
                        </div>
                        <div className="rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
                          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--color-success)" }}>
                            <CheckCircle className="w-3.5 h-3.5" /> Resolution
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{c.resolution}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Diagnostic kit */}
        <StaggerReveal staggerDelay={60}>
        <div className="ink-slab px-6 py-8 sm:px-10">
          <p className="field-label mb-4 flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
            My diagnostic kit
          </p>
          <div className="flex flex-wrap gap-2">
            {kit.map((t) => (
              <span key={t} className="rounded-md border px-3.5 py-1.5 font-mono text-xs" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        </StaggerReveal>
      <NextSection
          title="The method in use"
          description="The same discipline, applied to what I build and run."
          links={[
            { href: "/how-i-work", label: "How I Work", description: "How I build and ship." },
            { href: "/homelab", label: "Homelab", description: "A live lab where the method is tested." },
            { href: "/projects", label: "Selected Work", description: "Shipped systems, method applied." },
          ]}
        />
      </div>
      </ScrollReveal>
    </section>
  );
}

function SubTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="field-label mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
        {kicker}
      </p>
      <h2 className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h2>
    </div>
  );
}
