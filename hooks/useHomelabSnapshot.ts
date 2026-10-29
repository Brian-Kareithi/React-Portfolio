"use client";

import { useEffect, useState } from "react";
import { fetchHomelabStats, type HomelabStats } from "@/lib/homelab";

/** One-off read of the homelab stats on mount, for small status badges. Null while loading or unreachable. */
export function useHomelabSnapshot() {
  const [stats, setStats] = useState<HomelabStats | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchHomelabStats({ signal: ctrl.signal })
      .then((data) => data?.system && setStats(data))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  return stats;
}
