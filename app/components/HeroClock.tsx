"use client";
import useLocalTime from "@/app/components/ui/useLocalTime";

/** Live Nairobi time. Server and first client render both show --:--, and the fixed 5ch box means no shift when it fills in. */
export default function HeroClock() {
  const time = useLocalTime("Africa/Nairobi");
  return (
    <p className="font-mono text-sm">
      <time className="inline-block w-[5ch] tabular-nums">{time ?? "--:--"}</time> EAT
    </p>
  );
}
