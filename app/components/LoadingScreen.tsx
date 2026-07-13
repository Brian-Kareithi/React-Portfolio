"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const messages = [
  "Hey there 👋",
  "I'm Kareithi",
  "Debatably the best engineer you've met!",
];

let audioCtx: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;

function getCtx(): AudioContext | null {
  if (audioCtx) return audioCtx;
  const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (AC) {
    const ctx = new AC();
    ctx.resume();
    audioCtx = ctx;
  }
  return audioCtx;
}

async function loadAudio() {
  try {
    const ctx = getCtx();
    if (!ctx || audioBuffer) return;
    const res = await fetch("/sounds/sentmessage.mp3");
    const data = await res.arrayBuffer();
    audioBuffer = await ctx.decodeAudioData(data);
  } catch {}
}

function playBubbleSound() {
  try {
    const ctx = getCtx();
    if (!ctx || !audioBuffer) return;
    if (ctx.state === "suspended") ctx.resume();
    const src = ctx.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(ctx.destination);
    src.start(0);
  } catch {}
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
        playBubbleSound();
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
  const [mounted, setMounted] = useState(false);
  const [bubbleIds, setBubbleIds] = useState<number[]>([]);
  const [pagePhase, setPagePhase] = useState<"loading" | "fading">("loading");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMsgRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    loadAudio();
    const unlock = () => {
      const ctx = getCtx();
      if (ctx?.state === "suspended") ctx.resume();
      document.removeEventListener("pointerdown", unlock);
    };
    document.addEventListener("pointerdown", unlock);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("pointerdown", unlock);
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
      className={`fixed inset-0 z-[100] flex flex-col transition-opacity duration-700 ${
        pagePhase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="chat-topbar">
        <span className="chat-topbar-back">&lsaquo;</span>
        <div className="chat-topbar-center">
          <img
            src="https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg"
            alt=""
            className="chat-topbar-avatar"
          />
          <div>
            <div className="chat-topbar-name">Kareithi</div>
            <div className="chat-topbar-status">online</div>
          </div>
        </div>
      </div>
      <div className="chat-body">
        <div className="messages" style={{ maxWidth: "22rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
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
    </div>
  );
}
