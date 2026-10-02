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
    desc: "Never fix what you can't reproduce. Capture the exact failure state, logs, and conditions so every hypothesis has a baseline to test against.",
  },
  {
    title: "Isolate Variables",
    icon: <ScanLine className="w-4 h-4" />,
    desc: "Change one thing at a time. Binary-search the problem space to shrink it from 'the whole system is broken' to 'this exact component is at fault'.",
  },
  {
    title: "Form a Hypothesis",
    icon: <Brain className="w-4 h-4" />,
    desc: "Root causes, not symptoms. I keep asking why until there is no deeper answer, and frame each theory as a testable prediction.",
  },
  {
    title: "Test & Validate",
    icon: <IterationCw className="w-4 h-4" />,
    desc: "Prove the theory with evidence, not assumption, then confirm the fix holds under the original failing conditions and beyond.",
  },
  {
    title: "Verify & Harden",
    icon: <ListChecks className="w-4 h-4" />,
    desc: "The fix is only done when it survives. I verify under load, document what happened, and harden the system so it doesn't recur.",
  },
];

export const cases = [
  {
    title: "Mystery Disk-Full Server",
    domain: "Linux / Storage",
    icon: <Database className="w-4 h-4" />,
    summary: "A server kept filling its disk overnight with no obvious culprit.",
    approach: "Checked df first, then traced the largest directories with du. Because the growth only happened overnight, I watched writes with inotify and reviewed the cron schedule to catch the writer.",
    rootCause: "A misconfigured log-rotation job never rotated one log, so it grew without limit each night.",
    resolution: "Fixed the rotation config, added a disk-usage alert, and confirmed two weeks of stable capacity.",
  },
  {
    title: "Dropped Wi-Fi, Working Router",
    domain: "Networking",
    icon: <Network className="w-4 h-4" />,
    summary: "Intermittent drops on one device while everything else stayed connected.",
    approach: "Isolated the physical layer first, then checked channels, power output, and the specific adapter's driver and power management.",
    rootCause: "The laptop's Wi-Fi power-save mode was dropping the link during idle windows.",
    resolution: "Disabled power-saving on the adapter, and the connection has stayed stable since.",
  },
  {
    title: "Silent Reboot Loop",
    domain: "Hardware",
    icon: <MemoryStick className="w-4 h-4" />,
    summary: "A PC rebooted itself a few minutes after starting, with no error on screen.",
    approach: "Swapped components one at a time, tested the PSU, then ran a memory test once the machine had warmed up.",
    rootCause: "A failing RAM stick with marginal errors that only surfaced after warm-up.",
    resolution: "Identified the faulty module, replaced it, and re-ran the full memory test to confirm.",
  },
  {
    title: "Blue Screens on a Failing SSD",
    domain: "Hardware / Storage",
    icon: <HardDrive className="w-4 h-4" />,
    summary: "A PC kept crashing with blue screens at random, with nothing in the software changing between crashes.",
    approach: "Read the stop codes and crash dumps first, then ruled out RAM and drivers. The evidence kept pointing at storage, so I checked the drive's SMART health data and error logs.",
    rootCause: "The SSD was failing and returning read errors, which the operating system surfaced as blue screens.",
    resolution: "Secured the data, replaced the SSD, restored the system, and confirmed stability under sustained load.",
  },
  {
    title: "Thermal Throttle Slump",
    domain: "Hardware",
    icon: <Flame className="w-4 h-4" />,
    summary: "A build degraded to a crawl under load despite adequate specs.",
    approach: "Monitored core temps and clock speeds in real time, then inspected mounting and airflow.",
    rootCause: "Dried-out thermal paste and a clogged cooler causing aggressive throttling.",
    resolution: "Re-applied paste, cleaned the cooler, and restored full sustained performance.",
  },
  {
    title: "Application Crash, No Stack Trace",
    domain: "Software",
    icon: <Bug className="w-4 h-4" />,
    summary: "A release crashed intermittently in production with an empty-looking trace.",
    approach: "Added instrumented builds and verbose logging, then reproduced the crash on a staging copy with identical inputs.",
    rootCause: "A race condition between two async writes to shared state.",
    resolution: "Serialized the writes, added a regression test, and shipped a clean fix.",
  },
  {
    title: "Encrypted Traffic Riddle",
    domain: "Security / Network",
    icon: <CircleAlert className="w-4 h-4" />,
    summary: "A trusted app kept flagging data corruption across the wire.",
    approach: "Captured the session, decrypted it with the endpoint's session keys, and compared the payload at both ends of the path.",
    rootCause: "A middlebox performing transparent TLS inspection was altering payloads in transit.",
    resolution: "Routed traffic around the middlebox, verified integrity end-to-end, and tightened the TLS config.",
  },
];

const method = [
  { label: "Evidence-first", value: "no guesswork, only data" },
  { label: "One variable at a time", value: "clean, testable changes" },
  { label: "Break it down", value: "binary search the stack" },
  { label: "Verify the fix", value: "survive the original failure" },
  { label: "Document & harden", value: "never let it recur" },
  { label: "Across the stack", value: "from silicon to SQL" },
];

const kit = ["Wireshark", "gdb / LLDB", "Profilers", "Chrome DevTools", "systemd journal", "df / du / iostat", "tcpdump", "Memtest", "Hardware testers", "Multimeter", "Thermal monitoring", "Packet capture"];

export default function TroubleshootingClient() {
  const [openCase, setOpenCase] = useState(0);

  return (
    <section id="troubleshooting" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-2.5 sm:px-5 lg:px-8.5 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-5xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="06"
          label="Diagnostics"
          variant="split"
          title={<>Troubleshooting <em className="font-serif-accent">method</em></>}
          description="A repeatable, evidence-driven approach to finding root causes across software, hardware, and networks. Data first, verified fixes, documented outcomes."
        />

        {/* Method: rules of thumb as pills */}
        <StaggerReveal staggerDelay={60}>
        <div className="mb-20 flex flex-wrap gap-2.5">
          {method.map((m) => (
            <span key={m.label} className="pill !px-4 !py-2 !text-sm">
              <span className="font-semibold" style={{ color: "var(--color-accent)" }}>{m.label}</span>
              <span style={{ color: "var(--color-text-muted)" }}>· {m.value}</span>
            </span>
          ))}
        </div>
        </StaggerReveal>

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
          <SubTitle kicker="Field notes" title="Real problems, root causes" />
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
                        <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--color-highlight)" }}>
                          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--color-accent)" }}>
                            <CircleAlert className="w-3.5 h-3.5" /> Root cause
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>{c.rootCause}</p>
                        </div>
                        <div className="rounded-2xl border p-4" style={{ borderColor: "var(--color-border)" }}>
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
              <span key={t} className="rounded-full border px-3.5 py-1.5 font-mono text-xs" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        </StaggerReveal>
      <NextSection
          title="Put the method to work"
          description="The same discipline shows up across engineering and the homelab."
          links={[
            { href: "/how-i-work", label: "How I Work", description: "How I design, build and ship production software." },
            { href: "/homelab", label: "Homelab", description: "A live lab where the method is validated under real-world conditions." },
            { href: "/projects", label: "Selected Work", description: "Shipped systems where the method was put to work." },
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
