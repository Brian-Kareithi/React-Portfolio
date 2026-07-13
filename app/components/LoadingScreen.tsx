"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const messages = [
  "Hey there 👋",
  "I'm Kareithi",
  "Debatably the best engineer you've met",
];

function playSound(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const a = audioRef.current;
  if (!a) return;
  a.currentTime = 0;
  a.play().catch(() => {});
}

function LoadingDots() {
  return (
    <span className="loading">
      <b>•</b>
      <b>•</b>
      <b>•</b>
    </span>
  );
}

function Bubble({ message, onRevealed, audioRef }: { message: string; onRevealed: () => void; audioRef: React.RefObject<HTMLAudioElement | null> }) {
  const [phase, setPhase] = useState<"enter" | "loading" | "revealed">("enter");
  const soundPlayedRef = useRef(false);

  const loadingDuration = message.length * 20 + 500;

  useEffect(() => {
    const t = setTimeout(() => setPhase("loading"), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => {
      setPhase("revealed");
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        playSound(audioRef);
      }
      setTimeout(onRevealed, 500);
    }, loadingDuration);
    return () => clearTimeout(t);
  }, [phase, loadingDuration, onRevealed, audioRef]);

  return (
    <div className="bubble-wrapper">
      {phase !== "revealed" && (
        <div
          className="bubble-loading"
          style={{
            opacity: phase === "enter" ? 0 : 1,
            transform: phase === "enter" ? "translateY(6px) scale(0.95)" : "none",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <LoadingDots />
        </div>
      )}
      {phase === "revealed" && (
        <div
          className="bubble-message"
          style={{
            animation: "bubblePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [bubbleIds, setBubbleIds] = useState<number[]>([]);
  const [pagePhase, setPagePhase] = useState<"loading" | "fading">("loading");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMsgRef = useRef(0);
  const startedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const unlock = () => {
      if (ctx.state === "suspended") ctx.resume();
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/sentmessage.mp3");
        audioRef.current.preload = "auto";
        audioRef.current.load();
      }
      document.removeEventListener("pointerdown", unlock);
    };
    document.addEventListener("pointerdown", unlock);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("pointerdown", unlock);
      ctx.close();
    };
  }, []);

  const addNextBubble = useCallback(() => {
    const idx = nextMsgRef.current;
    if (idx >= messages.length) {
      setTimeout(() => {
        setPagePhase("fading");
        onFinish();
      }, 800);
      return;
    }
    nextMsgRef.current += 1;
    setBubbleIds((prev) => [...prev, idx]);
  }, [onFinish]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    addNextBubble();
  }, [addNextBubble]);

  const handleRevealed = useCallback(() => {
    addNextBubble();
  }, [addNextBubble]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bubbleIds]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-start transition-opacity duration-700 ${
        pagePhase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="messages" style={{ maxWidth: "22rem", paddingTop: "5rem", paddingLeft: "1.25rem" }}>
        {bubbleIds.map((msgIdx) => (
          <Bubble
            key={msgIdx}
            message={messages[msgIdx]}
            onRevealed={handleRevealed}
            audioRef={audioRef}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
