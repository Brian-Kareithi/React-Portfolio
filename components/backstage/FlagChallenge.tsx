"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** SHA-256 of the flag, so the answer never ships in plain text. */
const FLAG_DIGEST = "5dd42750ab5a1dad69cd76a964df82eaf7315ed6b7f8d9d7aaf3cb1f70fa6fe2";
/** The flag, base64-wrapped for the visitor to decode. */
const WRAPPED_FLAG = "RkxBR3tyb2JvdHNfdHh0X2lzX2FfbWFwX25vdF9hX2xvY2t9";

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

  if (state === "found") {
    return (
      <div className="b-body animate-fade-in-up">
        <p className="q-lede">
          <strong style={{ color: "var(--palette-cream)" }}>Flag captured.</strong> You looked where nobody tells you to look. That habit is most of the job.
        </p>
        <Link href="/games" className="q-btn">
          More games
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="b-body">
      <p className="q-lede">Most people never open that file. Here is what I left for the ones who do. It is not encrypted, just wrapped:</p>
      <pre className="b-blob">{WRAPPED_FLAG}</pre>
      <p className="q-body">Unwrap it, then paste the flag below. The terminal on the games page has a command for exactly this.</p>
      <form onSubmit={submit} className="b-form">
        <label htmlFor="flag" className="sr-only">
          Flag
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
        <button type="submit" className="q-btn">
          Submit
        </button>
      </form>
      {state === "wrong" && (
        <p role="status" className="b-wrong">
          Not it. Check the casing and the braces, and decode the whole string.
        </p>
      )}
    </div>
  );
}
