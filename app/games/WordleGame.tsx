"use client";
import { useCallback, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Grid3x3, RotateCcw } from "lucide-react";
import { evaluate, MAX_GUESSES, WORDS, type TileState } from "@/app/lib/wordle";


type Session = { i: number; guesses: string[] };
type Tally = { played: number; won: number; streak: number; best: number };

const SESSION_KEY = "kb-wordle";
const TALLY_KEY = "kb-wordle-tally";
const EMPTY_TALLY: Tally = { played: 0, won: 0, streak: 0, best: 0 };

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (notify: () => void) => {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
};

function randomIndex(exclude?: number) {
  let i = Math.floor(Math.random() * WORDS.length);
  if (WORDS.length > 1 && i === exclude) i = (i + 1 + Math.floor(Math.random() * (WORDS.length - 1))) % WORDS.length;
  return i;
}

function validSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") return false;
  const s = value as Session;
  const entry = WORDS[s.i];
  return (
    Number.isInteger(s.i) &&
    !!entry &&
    Array.isArray(s.guesses) &&
    s.guesses.length <= MAX_GUESSES &&
    s.guesses.every((g) => typeof g === "string" && g.length === entry.word.length && /^[A-Z]+$/.test(g))
  );
}

let sessionRaw: string | null = null;
function readSession(): string {
  if (sessionRaw !== null) return sessionRaw;
  let session: Session | null = null;
  try {
    const saved = window.sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (validSession(parsed)) session = parsed;
    }
  } catch {}
  sessionRaw = JSON.stringify(session ?? { i: randomIndex(), guesses: [] });
  try {
    window.sessionStorage.setItem(SESSION_KEY, sessionRaw);
  } catch {}
  return sessionRaw;
}
function writeSession(session: Session) {
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
    tallyRaw = window.localStorage.getItem(TALLY_KEY) ?? JSON.stringify(EMPTY_TALLY);
  } catch {
    tallyRaw = JSON.stringify(EMPTY_TALLY);
  }
  return tallyRaw;
};
const parseTally = (raw: string): Tally => {
  try {
    const t = JSON.parse(raw) as Partial<Tally>;
    const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
    return { played: n(t.played), won: n(t.won), streak: n(t.streak), best: n(t.best) };
  } catch {
    return EMPTY_TALLY;
  }
};
function recordResult(won: boolean) {
  const t = parseTally(readTally());
  const streak = won ? t.streak + 1 : 0;
  tallyRaw = JSON.stringify({ played: t.played + 1, won: t.won + (won ? 1 : 0), streak, best: Math.max(t.best, streak) });
  try {
    window.localStorage.setItem(TALLY_KEY, tallyRaw);
  } catch {}
  emit();
}


const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const rank: Record<TileState, number> = { absent: 1, present: 2, correct: 3 };
const stateWord: Record<TileState, string> = { correct: "correct", present: "in the word, wrong spot", absent: "not in the word" };


export default function WordleGame() {
  const raw = useSyncExternalStore(subscribe, readSession, () => null);
  const session = useMemo<Session | null>(() => {
    if (raw === null) return null;
    try {
      const parsed: unknown = JSON.parse(raw);
      return validSession(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }, [raw]);

  if (!session) {
    return (
      <div className="mt-14 sm:mt-16" aria-busy="true" aria-label="Loading the word game">
        <div className="skeleton-pulse flat-card h-[34rem]" />
      </div>
    );
  }
  return <Board key={session.i} session={session} />;
}

function Board({ session }: { session: Session }) {
  const entry = WORDS[session.i];
  const answer = entry.word;
  const len = answer.length;
  const { guesses } = session;

  const won = guesses.includes(answer);
  const lost = !won && guesses.length >= MAX_GUESSES;
  const playing = !won && !lost;

  const [current, setCurrent] = useState("");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [fresh, setFresh] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const tallyRaw = useSyncExternalStore(subscribe, readTally, () => JSON.stringify(EMPTY_TALLY));
  const tally = useMemo(() => parseTally(tallyRaw), [tallyRaw]);

  const results = useMemo(() => guesses.map((g) => evaluate(g, answer)), [guesses, answer]);

  const keyStates = useMemo(() => {
    const map: Record<string, TileState> = {};
    guesses.forEach((g, gi) =>
      [...g].forEach((ch, i) => {
        const s = results[gi][i];
        if (!map[ch] || rank[s] > rank[map[ch]]) map[ch] = s;
      }),
    );
    return map;
  }, [guesses, results]);

  const submit = useCallback(() => {
    if (current.length < len) {
      setMessage("Not enough letters.");
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      return;
    }
    const next = [...guesses, current];
    const didWin = current === answer;
    const didLose = !didWin && next.length >= MAX_GUESSES;
    writeSession({ i: session.i, guesses: next });
    setFresh(next.length - 1);
    setCurrent("");
    if (didWin) {
      setMessage(`Got it in ${next.length}. The word was ${answer}, from the “${entry.label}” button.`);
      recordResult(true);
    } else if (didLose) {
      setMessage(`Out of guesses. The word was ${answer}, from the “${entry.label}” button.`);
      recordResult(false);
    } else {
      setMessage(`${next.length} of ${MAX_GUESSES} guesses used.`);
    }
  }, [answer, current, entry.label, guesses, len, session.i]);

  const press = useCallback(
    (key: string) => {
      if (!playing) return;
      if (key === "ENTER") return submit();
      if (key === "BACKSPACE") {
        setMessage("");
        return setCurrent((c) => c.slice(0, -1));
      }
      if (/^[A-Z]$/.test(key)) setCurrent((c) => (c.length < len ? c + key : c));
    },
    [len, playing, submit],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as HTMLElement;
    if (e.key === "Enter") {
      if (target.closest("button, a")) return;
      e.preventDefault();
      press("ENTER");
    } else if (e.key === "Backspace") {
      e.preventDefault();
      press("BACKSPACE");
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      press(e.key.toUpperCase());
    }
  };

  const playAnother = () => {
    setMessage("");
    writeSession({ i: randomIndex(session.i), guesses: [] });
  };

  const hintWhere = guesses.length >= 2 && playing;
  const hintLetter = guesses.length >= 4 && playing;
  const cols = { "--n": len } as CSSProperties;

  return (
    <section aria-labelledby="wordle-title" className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-7">
        <div
          ref={frameRef}
          tabIndex={0}
          role="group"
          aria-label="Word game board. Click here, then type your guess and press Enter."
          onKeyDown={onKeyDown}
          onClick={() => frameRef.current?.focus()}
          className="wd-frame flat-card p-4 sm:p-6"
        >
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="field-label mb-1.5 flex items-center gap-2">
                <Grid3x3 className="h-3.5 w-3.5" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                Game 02
              </p>
              <h2 id="wordle-title" className="display-xl text-2xl sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>
                Guess the <span className="font-serif-accent">button</span>
              </h2>
            </div>
            <p className="rounded-md px-2 py-1 font-mono text-xs tabular-nums" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}>
              {Math.min(guesses.length, MAX_GUESSES)}/{MAX_GUESSES}
            </p>
          </div>

          <div className="wd-board" style={cols} role="group" aria-label={`${len}-letter word, ${MAX_GUESSES} guesses`}>
            {Array.from({ length: MAX_GUESSES }, (_, r) => {
              const submitted = r < guesses.length;
              const typing = r === guesses.length && playing;
              const letters = submitted ? guesses[r] : typing ? current : "";
              return (
                <div
                  key={r}
                  className="wd-row"
                  data-fresh={fresh === r ? "true" : undefined}
                  data-shake={typing && shake ? "true" : undefined}
                >
                  {Array.from({ length: len }, (_, c) => {
                    const ch = letters[c] ?? "";
                    const state = submitted ? results[r][c] : undefined;
                    return (
                      <span
                        key={c}
                        className="wd-tile"
                        data-state={state}
                        data-filled={ch ? "true" : undefined}
                        style={{ "--i": c } as CSSProperties}
                        role="img"
                        aria-label={`Row ${r + 1}, letter ${c + 1}: ${ch ? `${ch}, ${state ? stateWord[state] : "typed"}` : "empty"}`}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <p role="status" aria-live="polite" className="mt-4 min-h-[1.5rem] text-center text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
            {message || (playing ? "Click here, then type. Enter to guess." : "")}
          </p>

          <div className="mx-auto mt-2 grid max-w-[34rem] gap-1.5" aria-label="On-screen keyboard">
            {ROWS.map((row, ri) => (
              <div key={row} className="flex justify-center gap-1.5">
                {ri === 2 && (
                  <button type="button" className="wd-key wd-key-wide" onClick={() => press("ENTER")} disabled={!playing}>
                    Enter
                  </button>
                )}
                {[...row].map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    className="wd-key"
                    data-state={keyStates[ch]}
                    onClick={() => press(ch)}
                    disabled={!playing}
                    aria-label={keyStates[ch] ? `${ch}, ${stateWord[keyStates[ch]]}` : ch}
                  >
                    {ch}
                  </button>
                ))}
                {ri === 2 && (
                  <button type="button" className="wd-key wd-key-wide" onClick={() => press("BACKSPACE")} disabled={!playing} aria-label="Backspace">
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="lg:col-span-5 lg:sticky lg:top-24" aria-label="How to play">
        <div className="flat-card p-4 sm:p-5">
          <p className="field-label mb-2">How to play</p>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            One word is hiding in plain sight on this site: the label of a button or link. This visit it has{" "}
            <strong style={{ color: "var(--color-text-primary)" }}>{len} letters</strong>. You get {MAX_GUESSES} guesses. Any combination of letters is allowed, there is no dictionary.
          </p>

          <ul className="mb-4 grid gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {([
              ["correct", "B", "Right letter, right spot."],
              ["present", "U", "In the word, wrong spot. Marked with a dot."],
              ["absent", "G", "Not in the word. Dashed outline."],
            ] as const).map(([state, ch, text]) => (
              <li key={state} className="flex items-center gap-3">
                <span className="wd-tile wd-tile-mini" data-state={state} aria-hidden="true">{ch}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {(hintWhere || hintLetter) && (
            <div className="mb-4 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <p className="field-label mb-1.5">Clues</p>
              <p style={{ color: "var(--color-text-primary)" }}>Spotted in {entry.where}.</p>
              {hintLetter && <p className="mt-1" style={{ color: "var(--color-text-primary)" }}>It starts with {answer[0]}.</p>}
            </div>
          )}

          {!playing && (
            <div className="mb-4 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--color-surface)" }}>
              <p className="field-label mb-1.5">{won ? "Solved" : "The answer"}</p>
              <p className="display-xl text-2xl" style={{ color: "var(--color-text-primary)" }}>
                {entry.label}
              </p>
              <p className="mt-1" style={{ color: "var(--color-text-secondary)" }}>Spotted in {entry.where}.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.external ? (
                  <a href={entry.href} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-ghost">
                    Go find it <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={entry.href} className="btn-neon btn-neon-ghost">
                    Go find it <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
                <button type="button" onClick={playAnother} className="btn-neon btn-neon-primary">
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Play another word
                </button>
              </div>
            </div>
          )}

          <p className="font-mono text-xs tabular-nums" style={{ color: "var(--color-text-muted)" }}>
            Played {tally.played} · Won {tally.won} · Streak {tally.streak} · Best {tally.best}
          </p>
          {playing && (
            <button type="button" onClick={playAnother} className="link-underline mt-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>
              Skip this word
            </button>
          )}
        </div>
      </aside>
    </section>
  );
}
