"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FLAG_DIGEST = "5dd42750ab5a1dad69cd76a964df82eaf7315ed6b7f8d9d7aaf3cb1f70fa6fe2";
const BLOB = "RkxBR3tyb2JvdHNfdHh0X2lzX2FfbWFwX25vdF9hX2xvY2t9";

async function digest(text: string) {
  const bytes = new TextEncoder().encode(text.trim());
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function BackstageClient() {
  const [guess, setGuess] = useState("");
  const [state, setState] = useState<"idle" | "wrong" | "found">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;
    setState((await digest(guess)) === FLAG_DIGEST ? "found" : "wrong");
  };

  return (
    <div className="q-page q-dark b-page" data-nav="dark">
      <div className="q-wrap b-wrap">
        <p className="q-eyebrow"><b>●</b> Backstage</p>
        <h1 data-split className="q-title">You read <em>robots.txt</em></h1>

        {state !== "found" ? (
          <div className="b-body">
            <p className="q-lede">
              Most people never open that file. Here is what I left for the ones who do. It is not encrypted, just wrapped:
            </p>
            <pre className="b-blob">{BLOB}</pre>
            <p className="q-body">
              Unwrap it, then paste the flag below. The terminal on the games page has a command for exactly this.
            </p>
            <form onSubmit={submit} className="b-form">
              <label htmlFor="flag" className="sr-only">Flag</label>
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
              <button type="submit" className="q-btn">Submit</button>
            </form>
            {state === "wrong" && (
              <p role="status" className="b-wrong">
                Not it. Check the casing and the braces, and decode the whole string.
              </p>
            )}
          </div>
        ) : (
          <div className="b-body animate-fade-in-up">
            <p className="q-lede">
              <strong style={{ color: "var(--palette-cream)" }}>Flag captured.</strong> You looked where nobody tells you to look.
              That habit is most of the job.
            </p>
            <Link href="/games" className="q-btn">
              More games
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
