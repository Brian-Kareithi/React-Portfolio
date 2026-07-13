"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const messages = [
  "Hey there 👋",
  "I'm Kareithi",
  "Debatably the best engineer you've met",
];

let audioCtx: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;

function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const AC =
    typeof window !== "undefined"
      ? (window as any).AudioContext || (window as any).webkitAudioContext
      : null;
  if (AC) audioCtx = new AC();
  return audioCtx;
}

async function loadSound() {
  const ctx = getAudioCtx();
  if (!ctx || audioBuffer) return;
  try {
    const res = await fetch("/sounds/sentmessage.mp3");
    const arrayBuf = await res.arrayBuffer();
    audioBuffer = await ctx.decodeAudioData(arrayBuf);
  } catch {}
}

function playSound() {
  const ctx = getAudioCtx();
  if (!ctx || !audioBuffer) return;
  if (ctx.state === "suspended") ctx.resume();
  const src = ctx.createBufferSource();
  src.buffer = audioBuffer;
  src.connect(ctx.destination);
  src.start(0);
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

function Bubble({ message, onRevealed }: { message: string; onRevealed: () => void }) {
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
        playSound();
      }
      setTimeout(onRevealed, 500);
    }, loadingDuration);
    return () => clearTimeout(t);
  }, [phase, loadingDuration, onRevealed]);

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

  useEffect(() => {
    loadSound();
    const unlock = () => {
      const ctx = getAudioCtx();
      if (ctx?.state === "suspended") ctx.resume();
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
    };
    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock);
    return () => {
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
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
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
