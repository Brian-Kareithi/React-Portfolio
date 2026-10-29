"use client";

import { useEffect, useRef, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { prompt, startDir } from "@/lib/ctf";

export type TerminalLine = { kind: "cmd" | "out" | "ok" | "err"; text: string; prompt?: string };

const DIM = "rgb(242 238 242 / 0.7)";

const lineStyle = (kind: TerminalLine["kind"]): CSSProperties =>
  kind === "ok"
    ? { color: "var(--palette-white)", fontWeight: 600 }
    : kind === "err"
      ? { color: "var(--palette-cream)", textDecoration: "underline wavy var(--palette-berry)", textUnderlineOffset: "4px" }
      : { color: "rgb(242 238 242 / 0.84)" };

interface CtfTerminalProps {
  lines: TerminalLine[];
  cwd: string;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

/** The sandbox shell: scrollback, prompt and input. Clicking anywhere on it focuses the input. */
export function CtfTerminal({ lines, cwd, input, onInputChange, onSubmit, onKeyDown }: CtfTerminalProps) {
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div
      className="ctf-term overflow-hidden rounded-xl border"
      style={{ backgroundColor: "var(--palette-black)", borderColor: "rgb(242 238 242 / 0.14)", boxShadow: "var(--shadow-xl)" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "rgb(242 238 242 / 0.1)", backgroundColor: "var(--palette-violet)" }}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--palette-berry)" }} />
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--palette-berry)" }} />
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--palette-cream)" }} />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px]" style={{ color: DIM }}>
          guest@lab: {cwd === startDir ? "~" : cwd} · sandbox
        </span>
        <span className="w-12" aria-hidden="true" />
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        className="h-[26rem] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed sm:text-sm lg:h-[min(36rem,calc(100vh-13rem))]"
        style={{ color: "var(--palette-cream)" }}
      >
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <p key={i} className="whitespace-pre-wrap break-words">
              <span style={{ color: DIM }}>{line.prompt}</span> <span>{line.text}</span>
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap break-words" style={lineStyle(line.kind)}>
              {line.text}
            </p>
          ),
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label htmlFor="ctf-input" className="flex-shrink-0" style={{ color: DIM }}>
            {prompt(cwd)}
          </label>
          <input
            id="ctf-input"
            ref={inputRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="ctf-input min-w-0 flex-1 bg-transparent py-0.5 outline-none"
            style={{ color: "var(--palette-cream)", caretColor: "var(--palette-white)" }}
          />
        </form>
      </div>
    </div>
  );
}
