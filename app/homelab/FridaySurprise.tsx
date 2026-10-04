"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, PartyPopper, Clock } from "lucide-react";

const FRIDAY = 5;
const KNOCK_OFF_HOUR = 17;

/** Next Friday 17:00 local time. */
function nextKnockOff(now: Date) {
  const target = new Date(now);
  target.setHours(KNOCK_OFF_HOUR, 0, 0, 0);
  target.setDate(now.getDate() + ((FRIDAY - now.getDay() + 7) % 7));
  return target;
}

function isWeekendMode(now: Date) {
  const day = now.getDay();
  return (day === FRIDAY && now.getHours() >= KNOCK_OFF_HOUR) || day === 6 || day === 0;
}

const surprises = [
  "You made it through another week. Ship it, log off, touch grass.",
  "No deploys after 4pm. That's not a rule, it's a kindness.",
  "The bug will still be there on Monday. So will you, rested.",
  "git commit -m \"weekend\" && git push --force-with-joy",
  // Tech dad jokes
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I would tell you a UDP joke, but you might not get it.",
  "Why did the developer go broke? He used up all his cache.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "Why was the JavaScript developer sad? He didn't know how to null his feelings.",
  "I told my Wi-Fi we needed to talk. It lost connection.",
  "Why do Java developers wear glasses? Because they don't C#.",
  "A SQL query walks into a bar, sees two tables and asks: can I join you?",
  "Why did the computer go to the doctor? It had a virus. Doctor said: take two restarts and call me in the morning.",
  "My password is the last 8 digits of pi. Nobody's getting that one.",
  "Why was the server so calm? It had plenty of bandwidth to process its feelings.",
  "I'd tell you a TCP joke, but I'd have to keep repeating it until you acknowledge it.",
  "Why did the router break up with the switch? It needed more space on the network.",
  "Debugging: being the detective in a crime movie where you're also the murderer.",
  "Why don't keyboards ever sleep? Two shifts, every day.",
  "What's a computer's favourite snack? Microchips.",
  "Why did the IT guy bring a ladder? He heard the issue was on a higher level.",
  "Why did the developer quit his job? He didn't get arrays.",
  "How does a Proxmox server stay cool? It leaves all its windows open. Just kidding, it runs Linux.",
  "Why was the ESP32 always invited to parties? It really knew how to connect.",
];

const confettiColors = ["var(--color-accent)", "var(--color-accent-secondary)", "var(--color-accent-light)", "var(--color-border-hover)"];

/** "Is it Friday yet?" countdown plus a click-to-unwrap surprise. */
export default function FridaySurprise() {
  const [now, setNow] = useState<Date | null>(null);
  const [opened, setOpened] = useState(false);
  const [pick, setPick] = useState(0);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const start = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, []);

  const unwrap = () => {
    // Random pick, never the same one twice in a row.
    setPick((p) => {
      let next = Math.floor(Math.random() * surprises.length);
      if (opened && next === p) next = (next + 1) % surprises.length;
      return next;
    });
    setOpened(true);
  };

  const weekend = now ? isWeekendMode(now) : false;
  const isFriday = now?.getDay() === FRIDAY;
  const remaining = now && !weekend ? Math.max(0, nextKnockOff(now).getTime() - now.getTime()) : 0;
  const parts = [
    { label: "Days", value: Math.floor(remaining / 86_400_000) },
    { label: "Hours", value: Math.floor(remaining / 3_600_000) % 24 },
    { label: "Min", value: Math.floor(remaining / 60_000) % 60 },
    { label: "Sec", value: Math.floor(remaining / 1000) % 60 },
  ];

  const verdict = !now ? "Checking…" : weekend ? "It's the weekend." : isFriday ? "Yes. It's Friday." : "Not yet.";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Live verdict + countdown */}
      <div className="flat-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "var(--color-border)" }}>
          <Clock className="w-3.5 h-3.5" style={{ color: "var(--color-accent)" }} />
          <p className="font-mono text-[11px] truncate" style={{ color: "var(--color-text-muted)" }}>
            brian@homelab:~$ ./is-it-friday.sh
          </p>
        </div>
        <div className="p-5 md:p-6">
          <p className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }} aria-live="polite">
            {verdict}
          </p>
          <p className="mt-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
            {weekend ? "Laptop lid closed. Enjoy it." : `Countdown to Friday ${KNOCK_OFF_HOUR}:00, your local time.`}
          </p>
          {!weekend && (
            <div className="mt-5 grid grid-cols-4 gap-2">
              {parts.map((p) => (
                <div key={p.label} className="rounded-xl border px-2 py-3 text-center" style={{ borderColor: "var(--color-border)" }}>
                  <p className="font-mono text-xl font-bold" style={{ color: "var(--color-accent)" }}>
                    {now ? String(p.value).padStart(2, "0") : "--"}
                  </p>
                  <p className="text-[9px] font-medium tracking-[0.2em] uppercase mt-1" style={{ color: "var(--color-text-muted)" }}>
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The surprise */}
      <div className="flat-card relative flex flex-col items-center justify-center overflow-hidden p-6 text-center">
        {opened && (
          <div className="friday-confetti pointer-events-none absolute inset-0" aria-hidden="true" key={pick}>
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                style={{
                  left: `${(i * 37) % 100}%`,
                  backgroundColor: confettiColors[i % confettiColors.length],
                  animationDelay: `${(i % 7) * 0.08}s`,
                  transform: `rotate(${i * 29}deg)`,
                }}
              />
            ))}
          </div>
        )}
        <span
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}
        >
          {opened ? <PartyPopper className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
        </span>
        <p
          className="max-w-sm text-base font-medium leading-relaxed min-h-[3.5rem]"
          style={{ color: "var(--color-text-primary)" }}
          aria-live="polite"
        >
          {opened ? surprises[pick] : "There's something in here for you."}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button onClick={unwrap} className="btn-neon btn-neon-primary">
            {opened ? "Another one" : "Open the surprise"}
          </button>
          <Link href="/contact" className="btn-neon btn-neon-ghost">
            Say hi
          </Link>
        </div>
      </div>
      <style jsx>{`
        .friday-confetti span {
          position: absolute;
          top: -12px;
          width: 7px;
          height: 12px;
          border-radius: 2px;
          animation: friday-fall 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes friday-fall {
          to {
            top: 110%;
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .friday-confetti {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
