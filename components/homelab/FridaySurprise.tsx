"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, PartyPopper, Clock } from "lucide-react";

const FRIDAY = 5;
const KNOCK_OFF_HOUR = 17;

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

const surprises: { joke: string; why: string }[] = [
  { joke: "Programming is 10% writing code and 90% wondering why the other 10% works.", why: "Programmers spend most of their time puzzling over code that works for reasons they can't explain. It's a joke about how even working code can feel like magic." },
  { joke: "The cloud is just someone else's homelab with a better invoice.", why: "\"The cloud\" sounds like something floating in the sky, but it's really just other people's computers in a building somewhere. A homelab is a personal setup of computers at home, so the joke is that the cloud is the same thing with a bill attached." },
  { joke: "Another week survived. Close the laptop and go outside.", why: "Not really a joke, just a pat on the back for finishing the week." },
  { joke: "Why was the computer cold? It left its Windows open.", why: "\"Windows\" is the software on most computers, but it's also the glass in your walls. Leave a real window open and the room gets chilly." },
  { joke: "Why did the phone wear glasses? It lost its contacts.", why: "\"Contacts\" are the people saved in your phone. They are also contact lenses, which people lose and then can't see." },
  { joke: "Why did the computer show up late to work? It had a hard drive.", why: "A \"hard drive\" is where a computer stores its files. It also sounds like a long, tiring journey to work." },
  { joke: "What do you call a computer that sings? A Dell.", why: "Dell is a computer brand. Say it with \"A\" in front and it sounds like Adele, the singer." },
  { joke: "Why did the developer go broke? He used up all his cache.", why: "A \"cache\" is a computer's quick-access memory, and it sounds exactly like \"cash\". So he ran out of money." },
  { joke: "What's a computer's favourite snack? Microchips.", why: "Tiny parts inside every computer are called microchips. \"Chips\" are also a snack." },
  { joke: "Why did the Bluetooth go to the dentist? It had a blue tooth.", why: "Bluetooth is the wireless connection between your phone and headphones. Read it as two words, \"blue tooth\", and it sounds like a dental problem." },
  { joke: "Why did the programmer quit his job? He didn't get arrays.", why: "An \"array\" is a list in programming. It sounds like \"a raise\", which is what he didn't get, so he quit." },
  { joke: "How do you comfort a JavaScript bug? You console it.", why: "JavaScript is a programming language. Its tool for checking what's going on is called the \"console\", and to \"console\" someone is to comfort them." },
  { joke: "What did the router say to the doctor? \"It hurts when IP.\"", why: "An IP address is the number that identifies a device on the internet. Say \"IP\" quickly and it sounds like \"I pee\", which is the classic doctor's-office complaint." },
  { joke: "Why did the PowerPoint cross the road? To get to the other slide.", why: "It's the classic \"chicken crossing the road\" joke, with a slide from a presentation in the chicken's place." },
  { joke: "Why do Java developers wear glasses? Because they don't C#.", why: "Java and C# (\"C sharp\") are two programming languages. \"Don't C#\" sounds like \"don't see sharp\", which is why you'd need glasses." },
  { joke: "A SQL query walks into a bar, sees two tables and asks: \"Can I join you?\"", why: "SQL is how people ask databases for information, and a command in it is called \"join\", which combines tables of data. Here it also means asking to sit down at a table." },
  { joke: "What's the object-oriented way to become wealthy? Inheritance.", why: "\"Inheritance\" is a programming idea where code is handed down from one piece to another. It's also how people get rich when a relative passes away." },
  { joke: "Why do programmers mix up Halloween and Christmas? Because Oct 31 equals Dec 25.", why: "Oct is short for October and Dec for December. Programmers sometimes count in a number system where \"31\" in octal (Oct) equals 25 in the normal decimal (Dec) system. The joke only works on people who know that." },
  { joke: "I'd tell you a UDP joke, but you might not get it.", why: "UDP is a way of sending data that doesn't check the other side received it. So the joke may never land, which is the point." },
  { joke: "Why did the Wi-Fi go to therapy? It had too many connection issues.", why: "Wi-Fi connects your devices to the internet. \"Connection issues\" is what we call dropped signals, and it's also what people talk about in therapy." },
];

const confettiColors = ["var(--color-accent)", "var(--color-accent-secondary)", "var(--color-accent-light)", "var(--color-border-hover)"];

/** Countdown to Friday 17:00 local time, and a gift box of developer jokes. */
export function FridaySurprise() {
  const [now, setNow] = useState<Date | null>(null);
  const [opened, setOpened] = useState(false);
  const [pick, setPick] = useState(0);
  const [explained, setExplained] = useState(false);

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
    setPick((p) => {
      let next = Math.floor(Math.random() * surprises.length);
      if (opened && next === p) next = (next + 1) % surprises.length;
      return next;
    });
    setExplained(false);
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
          {opened ? surprises[pick].joke : "There's something in here for you."}
        </p>
        {opened && explained && (
          <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }} aria-live="polite">
            {surprises[pick].why}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button onClick={unwrap} className="btn-neon btn-neon-primary">
            {opened ? "Another one" : "Open the surprise"}
          </button>
          {opened && !explained && (
            <button onClick={() => setExplained(true)} className="btn-neon btn-neon-ghost">
              I didn&apos;t get the joke
            </button>
          )}
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
