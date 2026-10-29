import { CornerDownLeft, Delete } from "lucide-react";
import { tileStateLabel, type TileState } from "@/lib/wordle";

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

interface WordleKeyboardProps {
  /** Best known state per letter, to colour the keys. */
  keyStates: Record<string, TileState>;
  disabled: boolean;
  onPress: (key: string) => void;
}

export function WordleKeyboard({ keyStates, disabled, onPress }: WordleKeyboardProps) {
  return (
    <div className="mx-auto mt-2 grid max-w-[34rem] gap-1 xs:gap-1.5" aria-label="On-screen keyboard">
      {ROWS.map((row, rowIndex) => {
        const isLastRow = rowIndex === ROWS.length - 1;
        return (
          <div key={row} className="flex justify-center gap-1 xs:gap-1.5">
            {isLastRow && (
              <button type="button" className="wd-key wd-key-wide" onClick={() => onPress("ENTER")} disabled={disabled} aria-label="Enter">
                <span className="wd-key-label">Enter</span>
                <CornerDownLeft className="wd-key-icon" aria-hidden="true" />
              </button>
            )}
            {[...row].map((letter) => (
              <button
                key={letter}
                type="button"
                className="wd-key"
                data-state={keyStates[letter]}
                onClick={() => onPress(letter)}
                disabled={disabled}
                aria-label={keyStates[letter] ? `${letter}, ${tileStateLabel[keyStates[letter]]}` : letter}
              >
                {letter}
              </button>
            ))}
            {isLastRow && (
              <button type="button" className="wd-key wd-key-wide" onClick={() => onPress("BACKSPACE")} disabled={disabled} aria-label="Backspace">
                <span className="wd-key-label">Delete</span>
                <Delete className="wd-key-icon" aria-hidden="true" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
