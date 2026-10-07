"use client";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { Flag, RotateCcw } from "lucide-react";
import { complete, isDecoy, missions, prompt, runCommand, startDir, type CommandResult } from "@/app/lib/ctf";

type Line = { kind: "cmd" | "out" | "ok" | "err"; text: string; prompt?: string };

const STORAGE_KEY = "ctf-solved";
// Saved progress lives in localStorage; useSyncExternalStore keeps SSR and hydration consistent.
let memory: string | null = null;
const readSaved = () => {
  if (memory !== null) return memory;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
};
const subscribeSaved = (notify: () => void) => {
  window.addEventListener("ctf-solved-change", notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener("ctf-solved-change", notify);
    window.removeEventListener("storage", notify);
  };
};
const writeSaved = (ids: string[]) => {
  memory = JSON.stringify(ids);
  try {
    window.localStorage.setItem(STORAGE_KEY, memory);
  } catch {}
  window.dispatchEvent(new Event("ctf-solved-change"));
};

const quick = ["help", "ls", "hint"];

const intro: Line[] = [
  { kind: "out", text: "Mini CTF. Six flags are hidden on this machine. Some are decoys." },
  { kind: "out", text: "Type help for commands. Tab completes. Start with cat README.txt." },
];

export default function CtfGame() {
  const [lines, setLines] = useState<Line[]>(intro);
  const [cwd, setCwd] = useState(startDir);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const savedRaw = useSyncExternalStore(subscribeSaved, readSaved, () => "[]");
  const solved = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(savedRaw);
      return Array.isArray(parsed) ? parsed.filter((id): id is string => missions.some((m) => m.id === id)) : [];
    } catch {
      return [];
    }
  }, [savedRaw]);
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const current = missions.find((m) => !solved.includes(m.id));
  const allDone = solved.length === missions.length;

  const exec = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;
      setHistory((h) => [...h, command]);
      setCursor(-1);

      const result: CommandResult = runCommand(command, cwd, unlocked);
      if (result.clear) {
        setLines([]);
        return;
      }
      const added: Line[] = [{ kind: "cmd", prompt: prompt(cwd), text: command }, ...result.lines];

      if (result.cwd) setCwd(result.cwd);
      if (result.unlocked) setUnlocked((u) => [...u, result.unlocked as string]);

      if (result.wantsHint) {
        if (!current) {
          added.push({ kind: "ok", text: "Nothing left to hint at. All flags captured." });
        } else {
          const level = Math.min((hintLevel[current.id] ?? 0) + 1, current.hints.length);
          setHintLevel((h) => ({ ...h, [current.id]: level }));
          added.push({ kind: "out", text: `Hint ${level}/${current.hints.length} (${current.title}): ${current.hints[level - 1]}` });
        }
      }

      if (result.submitted !== undefined) {
        const match = missions.find((m) => m.flag === result.submitted);
        if (isDecoy(result.submitted)) {
          added.push({ kind: "err", text: "That one is a decoy. Look more carefully." });
        } else if (!match) {
          added.push({ kind: "err", text: "Not a valid flag. Keep looking." });
        } else if (solved.includes(match.id)) {
          added.push({ kind: "out", text: "You already captured that one." });
        } else {
          writeSaved([...solved, match.id]);
          added.push({ kind: "ok", text: `Flag accepted: ${match.title}.` }, { kind: "out", text: match.lesson });
        }
      }

      setLines((l) => [...l, ...added]);
    },
    [cwd, current, hintLevel, solved, unlocked],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    exec(input);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const next = complete(input, cwd);
      if (next !== null) setInput(next);
      return;
    }
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    }
  };

  const reset = () => {
    writeSaved([]);
    setHintLevel({});
    setLines(intro);
    setCwd(startDir);
    setUnlocked([]);
    setHistory([]);
  };

  const hintsUsed = Object.values(hintLevel).reduce((x, y) => x + y, 0);

  const lineColor = (kind: Line["kind"]) =>
    kind === "ok" ? "#7ee0b0" : kind === "err" ? "#f2a0b0" : "var(--palette-lavender-mist)";

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
      {/* Terminal */}
      <div className="lg:col-span-8">
        <div
          className="ctf-term overflow-hidden rounded-xl border"
          style={{ backgroundColor: "#1d1b21", borderColor: "rgb(249 245 255 / 0.14)", boxShadow: "var(--shadow-xl)" }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "rgb(249 245 255 / 0.1)", backgroundColor: "#26232b" }}>
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#f2a0b0" }} />
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--palette-periwinkle)" }} />
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#7ee0b0" }} />
            </span>
            <span className="flex-1 text-center font-mono text-[11px]" style={{ color: "var(--palette-soft-periwinkle)" }}>
              guest@lab: {cwd === startDir ? "~" : cwd} · sandbox
            </span>
            <span className="w-12" aria-hidden="true" />
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="h-[26rem] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed sm:text-sm lg:h-[min(36rem,calc(100vh-13rem))]"
            style={{ color: "var(--palette-lavender-mist)" }}
          >
            {lines.map((l, i) =>
              l.kind === "cmd" ? (
                <p key={i} className="whitespace-pre-wrap break-words">
                  <span style={{ color: "var(--palette-soft-periwinkle)" }}>{l.prompt}</span> <span>{l.text}</span>
                </p>
              ) : (
                <p key={i} className="whitespace-pre-wrap break-words" style={{ color: lineColor(l.kind) }}>
                  {l.text}
                </p>
              ),
            )}

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <label htmlFor="ctf-input" className="flex-shrink-0" style={{ color: "var(--palette-soft-periwinkle)" }}>
                {prompt(cwd)}
              </label>
              <input
                id="ctf-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="ctf-input min-w-0 flex-1 bg-transparent py-0.5 outline-none"
                style={{ color: "var(--palette-lavender-mist)", caretColor: "var(--palette-periwinkle)" }}
              />
            </form>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="field-label mr-1">Quick</span>
          {quick.map((q) => (
            <button
              key={q}
              onClick={() => exec(q)}
              className="rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              style={{ borderColor: "var(--color-border-hover)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)" }}
            >
              {q}
            </button>
          ))}
          <span className="hidden font-mono text-[11px] sm:inline" style={{ color: "var(--color-text-muted)" }}>
            Tab completes · ↑ history
          </span>
        </div>
      </div>

      {/* Flags */}
      <aside className="lg:col-span-4 lg:sticky lg:top-24" aria-label="Flags">
        <div className="flat-card p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="field-label mb-1.5 flex items-center gap-2">
                <Flag className="h-3.5 w-3.5" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                Game 01
              </p>
              <h2 className="display-xl text-2xl sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>
                Capture the <span className="font-serif-accent">flag</span>
              </h2>
            </div>
            <p className="rounded-md px-2 py-1 font-mono text-xs tabular-nums" style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}>
              {solved.length}/{missions.length}
            </p>
          </div>

          <ol className="space-y-1">
            {missions.map((m, i) => {
              const done = solved.includes(m.id);
              const active = current?.id === m.id;
              return (
                <li
                  key={m.id}
                  className="flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
                  style={{ borderColor: active ? "var(--color-accent)" : "transparent", backgroundColor: active ? "var(--color-surface)" : "transparent" }}
                  aria-current={active ? "step" : undefined}
                >
                  <span className="mt-0.5 flex-shrink-0 font-mono text-xs" style={{ color: done ? "var(--color-accent)" : "var(--color-text-muted)" }} aria-label={done ? "Captured" : "Not captured"}>
                    {done ? "[x]" : "[ ]"}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-2 text-sm font-semibold" style={{ color: done ? "var(--color-text-muted)" : "var(--color-text-primary)", textDecoration: done ? "line-through" : "none" }}>
                      <span className="font-mono text-[11px] font-normal" style={{ color: "var(--color-text-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
                      {m.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                      <span className="font-mono uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>{m.level}</span> · {m.brief}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <button
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md py-1.5 text-xs transition-colors duration-200 hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset game
          </button>
        </div>

        {allDone && (
          <div className="mt-4 rounded-xl p-5" style={{ backgroundColor: "var(--palette-true-cobalt)", color: "var(--palette-lavender-mist)" }}>
            <p className="display-xl text-2xl sm:text-3xl">
              All flags <span className="font-serif-accent">captured</span>.
            </p>
            <p className="mt-2 text-sm opacity-80">
              {hintsUsed === 0 ? "No hints used. Clean run." : `${hintsUsed} hint${hintsUsed === 1 ? "" : "s"} used.`} I like building things that hold up too.
            </p>
            <Link href="/contact" className="btn-neon mt-4 inline-flex" style={{ backgroundColor: "var(--palette-lavender-mist)", color: "var(--palette-true-cobalt)" }}>
              Let&apos;s talk
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
