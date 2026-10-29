import type { CSSProperties } from "react";
import { MAX_GUESSES, tileStateLabel, type TileState } from "@/lib/wordle";

interface WordleGridProps {
  length: number;
  guesses: string[];
  results: TileState[][];
  /** Letters typed into the active row. */
  current: string;
  playing: boolean;
  /** Row that was just submitted, so it flips in. */
  freshRow: number | null;
  shake: boolean;
}

export function WordleGrid({ length, guesses, results, current, playing, freshRow, shake }: WordleGridProps) {
  return (
    <div className="wd-board" style={{ "--n": length } as CSSProperties} role="group" aria-label={`${length}-letter word, ${MAX_GUESSES} guesses`}>
      {Array.from({ length: MAX_GUESSES }, (_, row) => {
        const isSubmitted = row < guesses.length;
        const isTyping = row === guesses.length && playing;
        const letters = isSubmitted ? guesses[row] : isTyping ? current : "";
        return (
          <div key={row} className="wd-row" data-fresh={freshRow === row ? "true" : undefined} data-shake={isTyping && shake ? "true" : undefined}>
            {Array.from({ length }, (_, col) => {
              const letter = letters[col] ?? "";
              const state = isSubmitted ? results[row][col] : undefined;
              return (
                <span
                  key={col}
                  className="wd-tile"
                  data-state={state}
                  data-filled={letter ? "true" : undefined}
                  style={{ "--i": col } as CSSProperties}
                  role="img"
                  aria-label={`Row ${row + 1}, letter ${col + 1}: ${letter ? `${letter}, ${state ? tileStateLabel[state] : "typed"}` : "empty"}`}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
