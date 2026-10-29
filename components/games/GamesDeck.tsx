const BUTTON_TILES = [
  { letter: "B", state: "g" },
  { letter: "U", state: "y" },
  { letter: "T", state: "x" },
  { letter: "T", state: "g" },
  { letter: "O", state: "x" },
  { letter: "N", state: "y" },
];

/** Two preview cards beside the games page header, each jumping to its game. */
export function GamesDeck() {
  return (
    <div className="g-deck">
      <a href="#ctf" className="g-card g-card-ctf" aria-label="Capture the flag">
        <span className="g-card-label">01 · capture the flag</span>
        <code>$ cat README.txt</code>
        <code>six flags, some decoys</code>
        <code className="g-caret">$ _</code>
      </a>
      <a href="#wordle-title" className="g-card g-card-word" aria-label="Guess the button">
        <span className="g-card-label">02 · guess the button</span>
        <span className="g-tiles" aria-hidden="true">
          {BUTTON_TILES.map((tile, i) => (
            <i key={i} data-s={tile.state}>
              {tile.letter}
            </i>
          ))}
        </span>
      </a>
    </div>
  );
}
