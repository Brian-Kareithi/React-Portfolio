"use client";

import { useMemo, useSyncExternalStore } from "react";
import { missions } from "@/lib/ctf";

const STORAGE_KEY = "ctf-solved";
const CHANGE_EVENT = "ctf-solved-change";

/** In-memory copy, so progress survives even when localStorage is blocked. */
let memory: string | null = null;

const read = () => {
  if (memory !== null) return memory;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
};

const subscribe = (notify: () => void) => {
  window.addEventListener(CHANGE_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(CHANGE_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
};

export function saveSolvedMissions(ids: string[]) {
  memory = JSON.stringify(ids);
  try {
    window.localStorage.setItem(STORAGE_KEY, memory);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** IDs of captured flags, persisted across visits and synced between tabs. Unknown IDs are ignored. */
export function useSolvedMissions(): string[] {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  return useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((id): id is string => missions.some((m) => m.id === id)) : [];
    } catch {
      return [];
    }
  }, [raw]);
}
