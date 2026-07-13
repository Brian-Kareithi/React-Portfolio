"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const charSpeed = 30;

const messages = [
  "Hey there 👋",
  "I'm Kareithi",
  "Debatably the best engineer you've met",
];

let audioCtx: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;

function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const AC = (
    typeof window !== "undefined"
      ? window.AudioContext || (window as any).webkitAudioContext
      : null
  );
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
      setDisplayed(chars.slice(0, idxRef.current + 1).join(""));
      idxRef.current += 1;
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
  const [bubbleReady, setBubbleReady] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const soundPlayedRef = useRef(false);

  const loadingDuration = message.length * charSpeed + 600;

  useEffect(() => {
    const t = setTimeout(() => setBubbleReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!bubbleReady) return;
    const t = setTimeout(() => {
      setHasRevealed(true);
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        playSound();
      }
      const textDuration = message.length * charSpeed + 200;
      setTimeout(onRevealed, textDuration);
    }, loadingDuration);
    return () => clearTimeout(t);
  }, [bubbleReady, loadingDuration, onRevealed, message]);

  return (
    <div className="chat-row">
      <div className="chat-avatar">K</div>
      <div
        className={`bubble left${!hasRevealed ? " cornered" : ""}`}
        style={{ opacity: bubbleReady ? 1 : 0 }}
      >
        {!hasRevealed && <LoadingDots />}
        <span
          className="message"
          style={{ display: hasRevealed ? "inline" : "none" }}
        >
          {hasRevealed && <TypewriterText text={message} />}
        </span>
      </div>
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
      }, 1000);
      return;
    }
    nextMsgRef.current += 1;
    setBubbleIds((prev) => [...prev, idx]);
  }, [onFinish]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    addNextBubble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="chat-container max-w-xs sm:max-w-sm md:max-w-md pt-12 pl-3 sm:pl-5 md:pl-8">
        <div className="chat-header">
          <div className="chat-header-avatar">K</div>
          <div className="chat-header-info">
            <span className="chat-header-name">Kareithi</span>
            <span className="chat-header-status">online</span>
          </div>
        </div>
        <div className="messages">
          {bubbleIds.map((msgIdx) => (
            <Bubble
              key={msgIdx}
              message={messages[msgIdx]}
              onRevealed={handleRevealed}
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
