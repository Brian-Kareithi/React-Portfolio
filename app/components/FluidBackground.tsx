// Slow, soft liquid shapes behind the top of every page. The glass surfaces (nav, cards, slabs) blur and
// tint whatever is behind them, so this is what they are actually made of. Pure CSS, no JS.
export default function FluidBackground() {
  return (
    <div aria-hidden="true" className="fluid-bg">
      <span className="fluid-blob fluid-blob-a" />
      <span className="fluid-blob fluid-blob-b" />
      <span className="fluid-blob fluid-blob-c" />
    </div>
  );
}
