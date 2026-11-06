"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

/** SHA-256 of the flag, so the answer never ships in plain text. */
const FLAG_DIGEST = "5dd42750ab5a1dad69cd76a964df82eaf7315ed6b7f8d9d7aaf3cb1f70fa6fe2";
/** The flag, base64-wrapped for the visitor to decode. */
const WRAPPED_FLAG = "RkxBR3tyb2JvdHNfdHh0X2lzX2FfbWFwX25vdF9hX2xvY2t9";

const STEPS = [
  { title: "Copy the blob", body: "The string in the terminal is your flag, wrapped once." },
  { title: "Unwrap it", body: "The terminal on the games page has a command for exactly this." },
  { title: "Submit the flag", body: "Paste the whole thing, braces included, and press enter." },
];

const STATUS = {
  idle: "waiting for input…",
  wrong: "✗ not it. check the casing and the braces, and decode the whole string.",
  found: "✓ flag accepted.",
};

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

async function sha256(text: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text.trim()));
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** The end of the robots.txt trail: decode the blob and submit the flag. */
export function FlagChallenge() {
  const [guess, setGuess] = useState("");
  const [state, setState] = useState<"idle" | "wrong" | "found">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;
    setState((await sha256(guess)) === FLAG_DIGEST ? "found" : "wrong");
  };

  return (
    <section aria-label="Flag challenge" className="b-grid">
      <div className="q-rise" style={rise(3)}>
        {state === "found" ? (
          <div className="b-found animate-fade-in-up">
            <h2 className="q-h3">
              Flag <em>captured</em>
            </h2>
            <p className="q-body">You looked where nobody tells you to look. That habit is most of the job.</p>
            <Link href="/games" className="q-btn" data-solid>
              More games
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <ol className="b-steps">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="b-step-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="b-step-title">{step.title}</p>
                  <p className="q-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="q-rise" style={rise(4)}>
        <TerminalWindow title="~/backstage/flag.b64">
          <p className="term-prompt" aria-hidden="true">
            <b>$</b> cat flag.b64
          </p>
          <pre className="b-blob">{WRAPPED_FLAG}</pre>
          {state !== "found" && (
            <form onSubmit={submit} className="b-form">
              <label htmlFor="flag" className="b-prompt">
                <b aria-hidden="true">$</b>
                <span className="sr-only">Flag</span>
              </label>
              <input
                id="flag"
                value={guess}
                onChange={(e) => {
                  setGuess(e.target.value);
                  if (state === "wrong") setState("idle");
                }}
                placeholder="FLAG{...}"
                autoComplete="off"
                spellCheck={false}
                className="b-input"
              />
              <button type="submit" className="b-submit">
                Submit ↵
              </button>
            </form>
          )}
          <p role="status" className="b-status" data-state={state}>
            {STATUS[state]}
          </p>
        </TerminalWindow>
      </div>
    </section>
  );
}
