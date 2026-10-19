const lines = [
  <>
    <b>$</b> whoami
  </>,
  <>brian.kareithi <em>{"// full-stack, IT & security"}</em></>,
  <>
    <b>$</b> boot --stack
  </>,
  <>
    [ ok ] interface <em>react · next.js</em>
  </>,
  <>
    [ ok ] mobile <em>react native · expo</em>
  </>,
  <>
    [ ok ] network <em>19-device homelab</em>
  </>,
  <>
    [ ok ] security <em>Security+ · CCNA</em>
  </>,
  <>
    <b>$</b> scroll <span className="hero-term-cursor" aria-hidden="true" />
  </>,
];

export default function HeroTerminal() {
  return (
    <div className="hero-term" aria-hidden="true">
      <div className="hero-term-bar">
        <i />
        <i />
        <i />
        <span>kareithi.sys</span>
      </div>
      <div className="hero-term-body">
        {lines.map((line, i) => (
          <div key={i} className="hero-term-line" style={{ "--i": i } as React.CSSProperties}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
