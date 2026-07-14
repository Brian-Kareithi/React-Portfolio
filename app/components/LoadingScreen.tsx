"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const messages = [
  "Hey there 👋",
  "I'm Kareithi",
  "Debatably the best engineer you've met!",
];

let audioPreloaded: HTMLAudioElement | null = null;

function preloadAudio() {
  if (audioPreloaded) return;
  audioPreloaded = new Audio("/sounds/sentmessage.mp3");
  audioPreloaded.preload = "auto";
  audioPreloaded.load();
}

function playBubbleSound() {
  try {
    const a = new Audio("/sounds/sentmessage.mp3");
    a.volume = 0.5;
    a.play();
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
  const [bubbleIds, setBubbleIds] = useState<number[]>([]);
  const [pagePhase, setPagePhase] = useState<"loading" | "fading">("loading");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMsgRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    preloadAudio();
    const unlock = () => {
      const a = new Audio("/sounds/sentmessage.mp3");
      a.volume = 0.01;
      a.play().catch(() => {});
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
      className={`fixed inset-0 z-[100] flex flex-col ${
        pagePhase === "fading" ? "pointer-events-none" : ""
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
          <div className="chat-topbar-status">online</div>
        </div>
      </div>
      <div className="chat-body">
        <div className="messages" style={{ maxWidth: "min(22rem, calc(100vw - 2rem))", paddingLeft: "1rem", paddingRight: "1rem" }}>
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
