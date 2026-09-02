"use client";
import {
  Bug, SearchCheck, ScanLine, Brain,
  ListChecks, IterationCw, Flame, Cpu, MemoryStick, Network,
  Wrench, CircleAlert, CheckCircle,
} from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { StaggerReveal } from "@/app/components/ui/StaggerReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

const steps = [
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
    desc: "Root causes, not symptoms. I ask why until the answer can't be answered again, and frame each theory as a testable prediction.",
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

const cases = [
  {
    title: "Mystery Disk-Full Server",
    domain: "Linux / Storage",
    icon: <Cpu className="w-4 h-4" />,
    summary: "A server kept filling its disk overnight with no obvious culprit.",
    approach: "Checked df first, then traced the biggest offenders with du while the culprit rotated. Monitored inotify and cron to catch the writer red-handed.",
    rootCause: "A misconfigured log-rotation job was growing an unbounded log each night.",
    resolution: "Fixed rotation, added a disk-usage alert, and confirmed two weeks of stable capacity.",
  },
  {
    title: "Dropped Wi-Fi, Working Router",
    domain: "Networking",
    icon: <Network className="w-4 h-4" />,
    summary: "Intermittent drops on one device while everything else stayed connected.",
    approach: "Isolated the physical layer first, then checked channels, power output, and the specific adapter's driver and power management.",
    rootCause: "The laptop's Wi-Fi power-save mode was dropping the link during idle windows.",
    resolution: "Disabled power-saving on the adapter; connectivity stabilised permanently.",
  },
  {
    title: "Silent Reboot Loop",
    domain: "Hardware / Firmware",
    icon: <MemoryStick className="w-4 h-4" />,
    summary: "A PC rebooted moments after POST with no error on screen.",
    approach: "Isolated hardware component by component, tested RAM and PSU, then checked thermal behaviour under load.",
    rootCause: "A failing RAM stick with marginal errors that only surfaced after warm-up.",
    resolution: "Identified the faulty module, replaced it, and ran a full memory test to confirm.",
  },
  {
    title: "Thermal Throttle Slump",
    domain: "Hardware",
    icon: <Flame className="w-4 h-4" />,
    summary: "A build degraded to a crawl under load despite adequate specs.",
    approach: "Monitored core temps and clock speeds in real time, then inspected mounting and airflow.",
    rootCause: "Dried-out thermal paste and a clogged cooler causing aggressive throttling.",
    resolution: "Re-applied paste, cleaned the loop, and reclaimed full sustained performance.",
  },
  {
    title: "Application Crash, No Stack Trace",
    domain: "Software",
    icon: <Bug className="w-4 h-4" />,
    summary: "A release crashed intermittently in production with an empty-looking trace.",
    approach: "Reproduced locally with instrumented builds, enabled verbose logging, and reproduced on a staging copy with identical inputs.",
    rootCause: "A race condition between two async writes to shared state.",
    resolution: "Serialized the writes, added a regression test, and shipped a clean fix.",
  },
  {
    title: "Encrypted Traffic Riddle",
    domain: "Security / Network",
    icon: <CircleAlert className="w-4 h-4" />,
    summary: "A trusted app kept flagging data corruption across the wire.",
    approach: "Captured and decrypted the session, then compared every byte end-to-end across the full path.",
    rootCause: "A middlebox was transparently re-encrypting and corrupting handshakes.",
    resolution: "Bypassed the culprit, verified integrity end-to-end, and hardened the TLS config.",
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

export default function TroubleshootingClient() {
  return (
    <section id="troubleshooting" className="min-h-screen w-full py-20 xs:py-24 sm:py-28 md:py-36 px-3 xs:px-4 relative"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <ScrollReveal>
      <div className="max-w-7xl mx-auto w-full">
        <Breadcrumbs />
        <SectionHeader
          index="06"
          label="Diagnostics"
          title={<>Troubleshooting <em className="font-serif-accent">method</em></>}
          description="A repeatable, evidence-driven approach to finding root causes across software, hardware, and networks. No guesswork, no cargo-cult fixes, no restarting-and-hoping."
        />

        {/* Method banner */}
        <StaggerReveal staggerDelay={60}>
        <div className="border mb-12 xs:mb-16 sm:mb-20"
          style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{ borderColor: "var(--color-border)" }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
            <p className="font-mono text-[11px] ml-2 truncate" style={{ color: "var(--color-text-muted)" }}>
              brian@dev:~$ ./isolate.sh --logic
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {method.map((m) => (
              <div key={m.label} className="p-4">
                <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--color-accent)" }}>
                  {m.label}
                </p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        </StaggerReveal>

        {/* The diagnostic process */}
        <div className="mb-14 xs:mb-16 sm:mb-20">
          <StaggerReveal>
          <div className="mb-8 xs:mb-10">
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2"
              style={{ color: "var(--color-text-muted)" }}>
              <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              The Process
            </p>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Five steps to a root cause
            </h2>
          </div>
          </StaggerReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 xs:gap-4">
            {steps.map((s, i) => (
              <div key={s.title} className="flat-card p-5 flex flex-col relative">
                <span className="font-mono text-[10px] mb-3" style={{ color: "var(--color-accent)" }}>
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                  {s.icon}
                </span>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case studies */}
        <div className="mb-14 xs:mb-16 sm:mb-20">
          <StaggerReveal>
          <div className="mb-8 xs:mb-10">
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2"
              style={{ color: "var(--color-text-muted)" }}>
              <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              Field Notes
            </p>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Real problems, root causes
            </h2>
          </div>
          </StaggerReveal>

          <div className="grid md:grid-cols-2 gap-4">
            {cases.map((c) => (
              <div key={c.title} className="flat-card p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}>
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                      {c.domain}
                    </p>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {c.title}
                    </h3>
                  </div>
                </div>
                <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--color-accent)" }}>
                  The Problem
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
                  {c.summary}
                </p>
                <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>
                  Approach
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
                  {c.approach}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: "var(--color-border)" }}>
                  <div className="p-3" style={{ backgroundColor: "var(--color-surface)" }}>
                    <p className="text-[9px] tracking-wider uppercase mb-1 flex items-center gap-1.5"
                      style={{ color: "var(--color-accent)" }}>
                      <CircleAlert className="w-3 h-3" /> Root Cause
                    </p>
                    <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {c.rootCause}
                    </p>
                  </div>
                  <div className="p-3" style={{ backgroundColor: "var(--color-surface)" }}>
                    <p className="text-[9px] tracking-wider uppercase mb-1 flex items-center gap-1.5"
                      style={{ color: "var(--color-accent)" }}>
                      <CheckCircle className="w-3 h-3" /> Resolution
                    </p>
                    <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {c.resolution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools strip */}
        <StaggerReveal staggerDelay={60}>
        <div className="border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
          <p className="text-[9px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text-muted)" }}>
            <Wrench className="w-3.5 h-3.5 flex-shrink-0" />
            My Diagnostic Kit
          </p>
          <div className="flex flex-wrap gap-2">
            {["Wireshark", "gdb / LLDB", "Profilers", "Chrome DevTools", "systemd journal", "df / du / iostat", "tcpdump", "Memtest", "Hardware testers", "Multimeter", "Thermal monitoring", "Packet capture"].map((t) => (
              <span key={t} className="px-3 py-1.5 text-[11px] font-mono liquid-card"
                style={{ borderColor: "var(--color-glass-border)" }}>
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
            { href: "/engineering", label: "Engineering", description: "How I design, build and ship production software." },
            { href: "/expertise", label: "Expertise", description: "Programming, security, networking and cloud capabilities." },
            { href: "/hobbies", label: "Homelab", description: "A live lab where the method gets stress-tested for fun." },
          ]}
        />
      </div>
      </ScrollReveal>
    </section>
  );
}
