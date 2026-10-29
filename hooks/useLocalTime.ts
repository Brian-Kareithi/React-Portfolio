"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

/** Current HH:mm in `timeZone`, ticking on the minute. Null until mounted, so server and client markup match. */
export function useLocalTime(timeZone: string = siteConfig.timeZone) {
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
