"use client";

import { useMemo, useSyncExternalStore } from "react";
import { MAX_GUESSES, WORDS } from "@/lib/wordle";

/** The word being played (`i` indexes WORDS) and the guesses so far. Kept per tab in sessionStorage. */
export type WordleSession = { i: number; guesses: string[] };
/** Lifetime results, kept in localStorage. */
export type WordleTally = { played: number; won: number; streak: number; best: number };

const SESSION_KEY = "kb-wordle";
const TALLY_KEY = "kb-wordle-tally";
const EMPTY_TALLY: WordleTally = { played: 0, won: 0, streak: 0, best: 0 };
const EMPTY_TALLY_RAW = JSON.stringify(EMPTY_TALLY);

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((notify) => notify());
const subscribe = (notify: () => void) => {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
};

export function randomWordIndex(exclude?: number) {
  let i = Math.floor(Math.random() * WORDS.length);
  if (WORDS.length > 1 && i === exclude) i = (i + 1 + Math.floor(Math.random() * (WORDS.length - 1))) % WORDS.length;
  return i;
}

function isValidSession(value: unknown): value is WordleSession {
  if (!value || typeof value !== "object") return false;
  const s = value as WordleSession;
  const entry = WORDS[s.i];
  return (
    Number.isInteger(s.i) &&
    !!entry &&
    Array.isArray(s.guesses) &&
    s.guesses.length <= MAX_GUESSES &&
    s.guesses.every((g) => typeof g === "string" && g.length === entry.word.length && /^[A-Z]+$/.test(g))
  );
}

const parseSession = (raw: string | null): WordleSession | null => {
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isValidSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

let sessionRaw: string | null = null;

/** Restores the saved session, or starts a random word, on first read. */
function readSession(): string {
  if (sessionRaw !== null) return sessionRaw;
  let session: WordleSession | null = null;
  try {
    session = parseSession(window.sessionStorage.getItem(SESSION_KEY));
  } catch {}
  sessionRaw = JSON.stringify(session ?? { i: randomWordIndex(), guesses: [] });
  try {
    window.sessionStorage.setItem(SESSION_KEY, sessionRaw);
  } catch {}
  return sessionRaw;
}

export function saveSession(session: WordleSession) {
  sessionRaw = JSON.stringify(session);
  try {
    window.sessionStorage.setItem(SESSION_KEY, sessionRaw);
  } catch {}
  emit();
}

let tallyRaw: string | null = null;

const readTally = (): string => {
  if (tallyRaw !== null) return tallyRaw;
  try {
    tallyRaw = window.localStorage.getItem(TALLY_KEY) ?? EMPTY_TALLY_RAW;
  } catch {
    tallyRaw = EMPTY_TALLY_RAW;
  }
  return tallyRaw;
};

const parseTally = (raw: string): WordleTally => {
  try {
    const t = JSON.parse(raw) as Partial<WordleTally>;
    const count = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
    return { played: count(t.played), won: count(t.won), streak: count(t.streak), best: count(t.best) };
  } catch {
    return EMPTY_TALLY;
  }
};

export function recordResult(won: boolean) {
  const t = parseTally(readTally());
  const streak = won ? t.streak + 1 : 0;
  tallyRaw = JSON.stringify({ played: t.played + 1, won: t.won + (won ? 1 : 0), streak, best: Math.max(t.best, streak) });
  try {
    window.localStorage.setItem(TALLY_KEY, tallyRaw);
  } catch {}
  emit();
}

/** The current session, or null during server render and before storage is read. */
export function useWordleSession() {
  const raw = useSyncExternalStore(subscribe, readSession, () => null);
  return useMemo(() => parseSession(raw), [raw]);
}

export function useWordleTally() {
  const raw = useSyncExternalStore(subscribe, readTally, () => EMPTY_TALLY_RAW);
  return useMemo(() => parseTally(raw), [raw]);
}
