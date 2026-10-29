"use client";

import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Grid3x3 } from "lucide-react";
import { WordleGrid } from "@/components/games/wordle/WordleGrid";
import { WordleGuide } from "@/components/games/wordle/WordleGuide";
import { WordleKeyboard } from "@/components/games/wordle/WordleKeyboard";
import {
  randomWordIndex,
  recordResult,
  saveSession,
  useWordleSession,
  useWordleTally,
  type WordleSession,
} from "@/components/games/wordle/wordle-store";
import { evaluate, MAX_GUESSES, WORDS, type TileState } from "@/lib/wordle";

const STATE_RANK: Record<TileState, number> = { absent: 1, present: 2, correct: 3 };
const SHAKE_MS = 420;

function WordleBoard({ session }: { session: WordleSession }) {
  const entry = WORDS[session.i];
  const answer = entry.word;
  const { guesses } = session;

  const won = guesses.includes(answer);
  const lost = !won && guesses.length >= MAX_GUESSES;
  const playing = !won && !lost;

  const [current, setCurrent] = useState("");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [freshRow, setFreshRow] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tally = useWordleTally();

  const results = useMemo(() => guesses.map((g) => evaluate(g, answer)), [guesses, answer]);

  const keyStates = useMemo(() => {
    const best: Record<string, TileState> = {};
    guesses.forEach((guess, gi) =>
      [...guess].forEach((letter, i) => {
        const state = results[gi][i];
        if (!best[letter] || STATE_RANK[state] > STATE_RANK[best[letter]]) best[letter] = state;
      }),
    );
    return best;
  }, [guesses, results]);

  const submit = useCallback(() => {
    if (current.length < answer.length) {
      setMessage("Not enough letters.");
      setShake(true);
      window.setTimeout(() => setShake(false), SHAKE_MS);
      return;
    }
    const next = [...guesses, current];
    const didWin = current === answer;
    const didLose = !didWin && next.length >= MAX_GUESSES;
    saveSession({ i: session.i, guesses: next });
    setFreshRow(next.length - 1);
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
  }, [answer, current, entry.label, guesses, session.i]);

  const press = useCallback(
    (key: string) => {
      if (!playing) return;
      if (key === "ENTER") return submit();
      if (key === "BACKSPACE") {
        setMessage("");
        return setCurrent((c) => c.slice(0, -1));
      }
      if (/^[A-Z]$/.test(key)) setCurrent((c) => (c.length < answer.length ? c + key : c));
    },
    [answer.length, playing, submit],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Enter") {
      if ((e.target as HTMLElement).closest("button, a")) return;
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
    saveSession({ i: randomWordIndex(session.i), guesses: [] });
  };

  return (
    <section aria-labelledby="wordle-title" className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-12 lg:items-start">
      <div className="min-w-0 lg:col-span-7">
        <div
          ref={frameRef}
          tabIndex={0}
          role="group"
          aria-label="Word game board. Click here, then type your guess and press Enter."
          onKeyDown={handleKeyDown}
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

          <WordleGrid length={answer.length} guesses={guesses} results={results} current={current} playing={playing} freshRow={freshRow} shake={shake} />

          <p role="status" aria-live="polite" className="mt-4 min-h-[1.5rem] text-center text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
            {message || (playing ? "Click here, then type. Enter to guess." : "")}
          </p>

          <WordleKeyboard keyStates={keyStates} disabled={!playing} onPress={press} />
        </div>
      </div>

      <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24" aria-label="How to play">
        <WordleGuide entry={entry} guessCount={guesses.length} playing={playing} won={won} tally={tally} onPlayAnother={playAnother} />
      </aside>
    </section>
  );
}

/** "Guess the button": a Wordle variant where the answer is a label somewhere on this site. */
export function WordleGame() {
  const session = useWordleSession();

  if (!session) {
    return (
      <div className="mt-14 sm:mt-16" aria-busy="true" aria-label="Loading the word game">
        <div className="skeleton-pulse flat-card h-[34rem]" />
      </div>
    );
  }
  return <WordleBoard key={session.i} session={session} />;
}
