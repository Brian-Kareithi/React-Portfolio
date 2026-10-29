import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import type { WordleTally } from "@/components/games/wordle/wordle-store";
import { MAX_GUESSES, type WordEntry } from "@/lib/wordle";

const LEGEND = [
  ["correct", "B", "Right letter, right spot."],
  ["present", "U", "In the word, wrong spot. Marked with a dot."],
  ["absent", "G", "Not in the word. Dashed outline."],
] as const;

/** Guesses before the location clue appears, and before the first letter is given away. */
const WHERE_HINT_AFTER = 2;
const LETTER_HINT_AFTER = 4;

interface WordleGuideProps {
  entry: WordEntry;
  guessCount: number;
  playing: boolean;
  won: boolean;
  tally: WordleTally;
  onPlayAnother: () => void;
}

function FindItLink({ entry }: { entry: WordEntry }) {
  const content = (
    <>
      Go find it <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </>
  );
  return entry.external ? (
    <a href={entry.href} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-ghost">
      {content}
    </a>
  ) : (
    <Link href={entry.href} className="btn-neon btn-neon-ghost">
      {content}
    </Link>
  );
}

/** Rules, progressive clues, the reveal once a round ends, and lifetime stats. */
export function WordleGuide({ entry, guessCount, playing, won, tally, onPlayAnother }: WordleGuideProps) {
  const showWhere = playing && guessCount >= WHERE_HINT_AFTER;
  const showLetter = playing && guessCount >= LETTER_HINT_AFTER;

  return (
    <div className="flat-card p-4 sm:p-5">
      <p className="field-label mb-2">How to play</p>
      <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        One word is hiding in plain sight on this site: the label of a button or link. This visit it has{" "}
        <strong style={{ color: "var(--color-text-primary)" }}>{entry.word.length} letters</strong>. You get {MAX_GUESSES} guesses. Any combination of letters is
        allowed, there is no dictionary.
      </p>

      <ul className="mb-4 grid gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        {LEGEND.map(([state, letter, text]) => (
          <li key={state} className="flex items-center gap-3">
            <span className="wd-tile wd-tile-mini" data-state={state} aria-hidden="true">
              {letter}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul>

      {showWhere && (
        <div className="mb-4 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <p className="field-label mb-1.5">Clues</p>
          <p style={{ color: "var(--color-text-primary)" }}>Spotted in {entry.where}.</p>
          {showLetter && (
            <p className="mt-1" style={{ color: "var(--color-text-primary)" }}>
              It starts with {entry.word[0]}.
            </p>
          )}
        </div>
      )}

      {!playing && (
        <div className="mb-4 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--color-surface)" }}>
          <p className="field-label mb-1.5">{won ? "Solved" : "The answer"}</p>
          <p className="display-xl text-2xl" style={{ color: "var(--color-text-primary)" }}>
            {entry.label}
          </p>
          <p className="mt-1" style={{ color: "var(--color-text-secondary)" }}>
            Spotted in {entry.where}.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <FindItLink entry={entry} />
            <button type="button" onClick={onPlayAnother} className="btn-neon btn-neon-primary">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Play another word
            </button>
          </div>
        </div>
      )}

      <p className="font-mono text-xs tabular-nums" style={{ color: "var(--color-text-muted)" }}>
        Played {tally.played} · Won {tally.won} · Streak {tally.streak} · Best {tally.best}
      </p>
      {playing && (
        <button type="button" onClick={onPlayAnother} className="link-underline mt-1 inline-flex min-h-[44px] items-center text-xs" style={{ color: "var(--color-text-secondary)" }}>
          Skip this word
        </button>
      )}
    </div>
  );
}
