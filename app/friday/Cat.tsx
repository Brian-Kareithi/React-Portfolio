"use client";

/**
 * Byte, FRIDAY's cat. Sits beside the orb: blinks and swishes its tail while
 * idle, and looks up at the orb with twitching ears while FRIDAY is busy.
 */
export default function Cat({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`cat ${active ? "is-active" : ""} ${className}`} aria-hidden="true">
      {/* Tail */}
      <path className="tail" d="M86 100 C 108 98, 112 76, 100 64" fill="none" stroke="var(--palette-shadow-grey)" strokeWidth="8" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="60" cy="90" rx="30" ry="25" fill="var(--palette-shadow-grey)" />
      <ellipse cx="60" cy="96" rx="16" ry="16" fill="var(--palette-soft-periwinkle)" opacity="0.55" />
      <ellipse cx="48" cy="113" rx="8" ry="5" fill="var(--palette-lavender-mist)" />
      <ellipse cx="72" cy="113" rx="8" ry="5" fill="var(--palette-lavender-mist)" />

      {/* Head */}
      <g className="head">
        <g className="ear ear-left">
          <path d="M38 40 L36 14 L56 30 Z" fill="var(--palette-shadow-grey)" />
          <path d="M41 34 L40 20 L51 29 Z" fill="var(--palette-periwinkle)" />
        </g>
        <g className="ear ear-right">
          <path d="M82 40 L84 14 L64 30 Z" fill="var(--palette-shadow-grey)" />
          <path d="M79 34 L80 20 L69 29 Z" fill="var(--palette-periwinkle)" />
        </g>
        <circle cx="60" cy="48" r="25" fill="var(--palette-shadow-grey)" />

        <g className="eyes">
          <ellipse cx="50" cy="47" rx="5" ry="6" fill="var(--palette-lavender-mist)" />
          <ellipse cx="70" cy="47" rx="5" ry="6" fill="var(--palette-lavender-mist)" />
          <g className="pupils">
            <ellipse cx="50" cy="48" rx="2.2" ry="4" fill="#28262c" />
            <ellipse cx="70" cy="48" rx="2.2" ry="4" fill="#28262c" />
          </g>
        </g>

        <path d="M57 56 L63 56 L60 59.5 Z" fill="var(--palette-periwinkle)" />
        <path d="M60 59.5 Q 57 63, 54 61 M60 59.5 Q 63 63, 66 61" fill="none" stroke="var(--palette-periwinkle)" strokeWidth="1.3" strokeLinecap="round" />
        <g stroke="var(--palette-soft-periwinkle)" strokeWidth="1" strokeLinecap="round" opacity="0.8">
          <path d="M44 57 L28 54 M44 60 L29 61" />
          <path d="M76 57 L92 54 M76 60 L91 61" />
        </g>
      </g>

      <style jsx>{`
        .cat { overflow: visible; }
        .tail, .ear, .eyes, .pupils, .head { transform-box: fill-box; }
        .tail {
          transform-origin: 0% 100%;
          animation: swish 3.2s ease-in-out infinite;
        }
        .eyes {
          transform-origin: center;
          animation: blink 5s infinite;
        }
        .pupils { transition: transform 0.4s ease; }
        .head {
          transform-origin: 50% 100%;
          transition: transform 0.5s ease;
        }
        .ear-left { transform-origin: 100% 100%; }
        .ear-right { transform-origin: 0% 100%; }

        .is-active .pupils { transform: translate(3px, -3px); }
        .is-active .head { transform: rotate(-6deg); }
        .is-active .tail { animation-duration: 1.2s; }
        .is-active .ear-left { animation: twitch-left 1.6s ease-in-out infinite; }
        .is-active .ear-right { animation: twitch-right 1.6s ease-in-out 0.3s infinite; }

        @keyframes swish { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }
        @keyframes blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
        @keyframes twitch-left { 0%, 80%, 100% { transform: rotate(0deg); } 88% { transform: rotate(-12deg); } }
        @keyframes twitch-right { 0%, 80%, 100% { transform: rotate(0deg); } 88% { transform: rotate(12deg); } }

        @media (prefers-reduced-motion: reduce) {
          .tail, .eyes, .ear-left, .ear-right { animation: none !important; }
          .pupils, .head { transition: none; }
        }
      `}</style>
    </svg>
  );
}
