export const methodSteps = [
  { title: "Reproduce & Observe", desc: "Reproduce it before you fix it. Capture the failure state, logs and conditions as a baseline." },
  { title: "Isolate Variables", desc: "Change one thing at a time. Narrow a broken system down to one component." },
  { title: "Form a Hypothesis", desc: "Keep asking why until there is no deeper answer. Frame each theory as a testable prediction." },
  { title: "Test & Validate", desc: "Prove the theory with evidence, then confirm the fix holds under the original failing conditions." },
  { title: "Verify & Harden", desc: "A fix is done when it survives. Verify under load, document it, and harden so it doesn't recur." },
];

export interface FieldNote {
  title: string;
  domain: string;
  summary: string;
  approach: string;
  rootCause: string;
  resolution: string;
}

export const fieldNotes: FieldNote[] = [
  {
    title: "Mystery Disk-Full Server",
    domain: "Linux / Storage",
    summary: "A server filled its disk overnight with no obvious cause.",
    approach: "Traced the largest directories with du, then watched writes with inotify and reviewed the cron schedule.",
    rootCause: "One log was never rotated and grew without limit.",
    resolution: "Fixed the rotation, added a disk alert, confirmed two stable weeks.",
  },
  {
    title: "Dropped Wi-Fi, Working Router",
    domain: "Networking",
    summary: "One device kept dropping while everything else stayed connected.",
    approach: "Ruled out the physical layer, then checked channels, power and the adapter's driver settings.",
    rootCause: "Wi-Fi power-save was dropping the link when idle.",
    resolution: "Disabled power-save. Stable since.",
  },
  {
    title: "Silent Reboot Loop",
    domain: "Hardware",
    summary: "A PC rebooted minutes after starting, with no error.",
    approach: "Swapped parts one at a time, tested the PSU, then ran a memory test once warm.",
    rootCause: "A failing RAM stick that only erred once warm.",
    resolution: "Replaced the module and re-ran the full memory test.",
  },
  {
    title: "Blue Screens on a Failing SSD",
    domain: "Hardware / Storage",
    summary: "Random blue screens, with no software changes between crashes.",
    approach: "Read the stop codes and dumps, ruled out RAM and drivers, then checked the drive's SMART data.",
    rootCause: "The SSD was failing and returning read errors.",
    resolution: "Saved the data, replaced the SSD and confirmed stability under load.",
  },
  {
    title: "Thermal Throttle Slump",
    domain: "Hardware",
    summary: "A build crawled under load despite good specs.",
    approach: "Watched temps and clock speeds live, then inspected mounting and airflow.",
    rootCause: "Dried thermal paste and a clogged cooler.",
    resolution: "New paste and a clean cooler restored full performance.",
  },
  {
    title: "Application Crash, No Stack Trace",
    domain: "Software",
    summary: "A release crashed intermittently with an empty trace.",
    approach: "Added instrumented builds and logging, then reproduced it on staging.",
    rootCause: "A race between two async writes to shared state.",
    resolution: "Serialized the writes and added a regression test.",
  },
  {
    title: "Encrypted Traffic Riddle",
    domain: "Security / Network",
    summary: "A trusted app kept flagging corrupted data.",
    approach: "Captured the session, decrypted it and compared the payload at both ends.",
    rootCause: "A middlebox doing TLS inspection was altering payloads.",
    resolution: "Routed around it, verified integrity and tightened TLS.",
  },
];

export const diagnosticKit = ["Wireshark", "gdb / LLDB", "Profilers", "Chrome DevTools", "systemd journal", "df / du / iostat", "tcpdump", "Memtest", "Hardware testers", "Multimeter", "Thermal monitoring", "Packet capture"];
