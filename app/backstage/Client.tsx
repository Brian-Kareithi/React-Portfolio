"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Mascot, type MascotMood } from "@/app/components/Mascot";

// The flag is stored as a SHA-256 digest, so the page checks a guess without holding the answer
// in plain text. The base64 blob is the puzzle: decode it and you have the flag.
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

  const mood: MascotMood = state === "found" ? "happy" : state === "wrong" ? "lost" : "idle";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;
    setState((await digest(guess)) === FLAG_DIGEST ? "found" : "wrong");
  };

  return (
    <section className="flex min-h-[80vh] items-center px-4 py-24 sm:px-6" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="ink-slab mx-auto w-full max-w-xl space-y-5 px-6 py-8 sm:px-8">
        <div className="flex items-center gap-3">
          <Mascot mood={mood} size={48} />
          <div>
            <p className="field-label mb-1">Backstage</p>
            <h1 className="font-serif-accent text-3xl" style={{ color: "var(--color-text-primary)" }}>
              You read robots.txt
            </h1>
          </div>
        </div>

        {state !== "found" ? (
          <>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Most people never open that file. Here is what I left for the ones who do. It is not encrypted, just wrapped:
            </p>
            <pre
              className="overflow-x-auto rounded-lg border p-4 font-mono text-[12px]"
              style={{ borderColor: "var(--color-border)", backgroundColor: "rgba(0,0,0,0.25)", color: "var(--color-text-primary)" }}
            >
              {BLOB}
            </pre>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Unwrap it, then paste the flag below. The terminal on the games page has a command for exactly this.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
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
                className="min-h-[44px] flex-1 rounded-lg border bg-transparent px-3 font-mono text-sm outline-none focus:border-[var(--color-accent)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
              />
              <button type="submit" className="btn-neon btn-neon-primary justify-center">Submit</button>
            </form>
            {state === "wrong" && (
              <p role="status" className="text-sm" style={{ color: "#f0a0a0" }}>
                Not it. Check the casing and the braces, and decode the whole string.
              </p>
            )}
          </>
        ) : (
          <div className="animate-fade-in-up space-y-4">
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              <strong style={{ color: "var(--color-text-primary)" }}>Flag captured.</strong> You looked where nobody tells you to look.
              That habit is most of the job. If you are hiring, or just want to compare notes, say hello and mention the flag.
            </p>
            <Link href="/contact" className="btn-neon btn-neon-primary">
              Tell me you found it
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
