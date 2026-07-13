"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const charSpeed = 25;

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

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setDisplayed("");
    const chars = [...text];
    const t = setInterval(() => {
      if (idxRef.current >= chars.length) {
        clearInterval(t);
        return;
      }
      idxRef.current += 1;
      setDisplayed(chars.slice(0, idxRef.current).join(""));
    }, charSpeed);
    return () => clearInterval(t);
  }, [text]);

  return <>{displayed}</>;
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

function Bubble({
  message,
  onRevealed,
}: {
  message: string;
  onRevealed: () => void;
}) {
  const [phase, setPhase] = useState<"enter" | "loading" | "typing" | "done">("enter");
  const soundPlayedRef = useRef(false);

  const typingDuration = message.length * charSpeed + 200;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("loading"), 60);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const t2 = setTimeout(() => {
      setPhase("typing");
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        playSound();
      }
      const t3 = setTimeout(() => {
        setPhase("done");
        setTimeout(onRevealed, 300);
      }, typingDuration);
    }, message.length * charSpeed + 300);
    return () => clearTimeout(t2);
  }, [phase, message, typingDuration, onRevealed]);

  return (
    <div
      className={`bubble ${phase === "done" ? "" : "cornered"}`}
      style={{
        opacity: phase === "enter" ? 0 : 1,
        transform: phase === "enter" ? "translateY(8px) scale(0.96)" : "none",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {(phase === "enter" || phase === "loading") && <LoadingDots />}
      {(phase === "typing" || phase === "done") && (
        <span className="message">
          <TypewriterText text={message} />
        </span>
      )}
    </div>
  );
}

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [bubbleIds, setBubbleIds] = useState<number[]>([]);
  const [phase, setPhase] = useState<"loading" | "fading">("loading");
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
        setPhase("fading");
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
        phase === "fading" ? "opacity-0" : "opacity-100"
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
