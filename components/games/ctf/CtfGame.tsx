"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { CtfMissionList } from "@/components/games/ctf/CtfMissionList";
import { CtfTerminal, type TerminalLine } from "@/components/games/ctf/CtfTerminal";
import { saveSolvedMissions, useSolvedMissions } from "@/components/games/ctf/useSolvedMissions";
import { complete, isDecoy, missions, prompt, runCommand, startDir } from "@/lib/ctf";

const QUICK_COMMANDS = ["help", "ls", "hint"];

const INTRO: TerminalLine[] = [
  { kind: "out", text: "Mini CTF. Six flags are hidden on this machine. Some are decoys." },
  { kind: "out", text: "Type help for commands. Tab completes. Start with cat README.txt." },
];

function CtfVictory({ hintsUsed }: { hintsUsed: number }) {
  return (
    <div className="mt-4 rounded-xl p-5" style={{ backgroundColor: "var(--palette-ink)", color: "var(--palette-cream)" }}>
      <p className="display-xl text-2xl sm:text-3xl">
        All flags <span className="font-serif-accent">captured</span>.
      </p>
      <p className="mt-2 text-sm opacity-80">
        {hintsUsed === 0 ? "No hints used. Clean run." : `${hintsUsed} hint${hintsUsed === 1 ? "" : "s"} used.`} I like building things that hold up too.
      </p>
      <Link href="/contact" className="btn-neon mt-4 inline-flex" style={{ backgroundColor: "var(--palette-cream)", color: "var(--palette-ink)" }}>
        Let&apos;s talk
      </Link>
    </div>
  );
}

/** Capture the flag in a fake Linux shell: find six real flags among decoys, with hints on demand. */
export function CtfGame() {
  const [lines, setLines] = useState<TerminalLine[]>(INTRO);
  const [cwd, setCwd] = useState(startDir);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const solved = useSolvedMissions();

  const current = missions.find((m) => !solved.includes(m.id));
  const hintsUsed = Object.values(hintLevel).reduce((sum, n) => sum + n, 0);

  const exec = (raw: string) => {
    const command = raw.trim();
    if (!command) return;
    setHistory((h) => [...h, command]);
    setCursor(-1);

    const result = runCommand(command, cwd, unlocked);
    if (result.clear) {
      setLines([]);
      return;
    }
    const added: TerminalLine[] = [{ kind: "cmd", prompt: prompt(cwd), text: command }, ...result.lines];

    if (result.cwd) setCwd(result.cwd);
    const unlockedPath = result.unlocked;
    if (unlockedPath) setUnlocked((u) => [...u, unlockedPath]);

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
        saveSolvedMissions([...solved, match.id]);
        added.push({ kind: "ok", text: `Flag accepted: ${match.title}.` }, { kind: "out", text: match.lesson });
      }
    }

    setLines((l) => [...l, ...added]);
  };

  const handleSubmit = () => {
    exec(input);
    setInput("");
  };

  /** Tab completes, Up and Down walk the command history. */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const completed = complete(input, cwd);
      if (completed !== null) setInput(completed);
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const next = cursor + 1;
      setCursor(next >= history.length ? -1 : next);
      setInput(next >= history.length ? "" : history[next]);
    }
  };

  const reset = () => {
    saveSolvedMissions([]);
    setHintLevel({});
    setLines(INTRO);
    setCwd(startDir);
    setUnlocked([]);
    setHistory([]);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
      <div className="min-w-0 lg:col-span-8">
        <CtfTerminal lines={lines} cwd={cwd} input={input} onInputChange={setInput} onSubmit={handleSubmit} onKeyDown={handleKeyDown} />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="field-label mr-1">Quick</span>
          {QUICK_COMMANDS.map((command) => (
            <button
              key={command}
              onClick={() => exec(command)}
              className="min-h-[44px] min-w-[44px] rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              style={{ borderColor: "var(--color-border-hover)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)" }}
            >
              {command}
            </button>
          ))}
          <span className="hidden font-mono text-[11px] sm:inline" style={{ color: "var(--color-text-muted)" }}>
            Tab completes · ↑ history
          </span>
        </div>
      </div>

      <aside className="min-w-0 lg:col-span-4 lg:sticky lg:top-24" aria-label="Flags">
        <CtfMissionList solved={solved} current={current} onReset={reset} />
        {solved.length === missions.length && <CtfVictory hintsUsed={hintsUsed} />}
      </aside>
    </div>
  );
}
