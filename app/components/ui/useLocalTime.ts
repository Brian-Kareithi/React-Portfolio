"use client";

import { useEffect, useState } from "react";

/**
 * Live wall-clock time in a given IANA timezone, formatted `HH:MM`.
 * Returns `null` until mounted so server and client markup agree.
 * Ticks once a minute — no per-second churn.
 */
export default function useLocalTime(timeZone = "Africa/Nairobi") {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();

    // Align the first update to the top of the next minute, then run every 60s.
    const now = Date.now();
    const toNextMinute = 60_000 - (now % 60_000);
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, toNextMinute);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timeZone]);

  return time;
}
