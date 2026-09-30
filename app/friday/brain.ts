import { siteConfig } from "@/app/lib/site";
import { caseStudies, otherProjects } from "@/app/lib/projects-data";
import { resumeRoles, resumeEducation } from "@/app/lib/resume-data";
import { experience, timeline, stats } from "@/app/about/Client";
import { domains } from "@/app/expertise/Client";
import { techs } from "@/app/techstack/Client";
import { gearCategories, builds, labStats, tinkering } from "@/app/hobbies/Client";
import { principles, architecture, workflow, stack } from "@/app/engineering/Client";
import { steps, cases } from "@/app/troubleshooting/Client";

/**
 * FRIDAY's local brain: answers are assembled from the same data the portfolio
 * pages render, so nothing here needs a network call or an API key.
 */

/** What FRIDAY remembers about the last thing discussed, for follow-ups. */
export interface Memory {
  subject?: Subject;
}

interface Subject {
  name: string;
  /** Deeper detail for "tell me more". */
  more?: string;
  stack?: string[];
  link?: string;
  page: string;
}

interface Entity extends Subject {
  aliases: string[];
  kind: "project" | "cert" | "tech" | "gear" | "build" | "case" | "domain";
  answer: () => string;
}

export interface Reply {
  text: string;
  memory: Memory;
}

// ─── Text helpers ────────────────────────────────────────────────────────────

const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const firstSentence = (s: string) => s.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? s;
const stripDot = (s: string) => s.replace(/[.!?]\s*$/, "");

function list(items: readonly string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function normalize(q: string) {
  return ` ${q.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9+#.\s-]/g, " ").replace(/\s+/g, " ").trim()} `;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whole-phrase match that also works for names like C#, C++ and Node.js. */
function mentions(q: string, alias: string) {
  return new RegExp(`(^|[^a-z0-9+#])${escape(alias)}($|[^a-z0-9+#])`).test(q);
}

const has = (q: string, re: RegExp) => re.test(q);

const opener = () => pick(["", "", "", "Sure. ", "Good question. ", "Happy to help. ", "Ah, good one. "]);

/** "a"/"an" prefix, skipped when the phrase already starts with an article. */
function article(phrase: string) {
  if (/^(a|an|the) /i.test(phrase)) return lower(phrase);
  return `${/^[aeiou]/i.test(phrase) ? "an" : "a"} ${lower(phrase)}`;
}

function conjugate(verb: string) {
  if (/ed$/.test(verb) || ["was", "had", "did", "built", "kept", "made", "wrote", "ran", "can", "will", "would", "could", "should"].includes(verb)) return verb;
  const irregular: Record<string, string> = { am: "is", have: "has", do: "does", go: "goes" };
  if (irregular[verb]) return irregular[verb];
  if (/(s|sh|ch|x|z|o)$/.test(verb)) return `${verb}es`;
  if (/[^aeiou]y$/.test(verb)) return `${verb.slice(0, -1)}ies`;
  return `${verb}s`;
}

/** Page copy is written by Brian in first person; FRIDAY talks about him. */
function thirdPerson(s: string) {
  return s
    .replace(/\bI['’]m\b/g, "he's")
    .replace(/\bI['’]ve\b/g, "he's")
    .replace(/\bI (\w+ly )?(\w+)/g, (_, adverb = "", verb: string) => `he ${adverb}${conjugate(verb)}`)
    .replace(/\bMy\b/g, "His")
    .replace(/\bmy\b/g, "his")
    .replace(/\bme\b/g, "him")
    .replace(/(^|[.!?]\s+)he\b/g, (_, lead: string) => `${lead}He`);
}
const boss = () => (Math.random() < 0.25 ? ", boss" : "");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function say(text: string) {
  return cap(opener() + text);
}

// ─── Knowledge built from the pages ──────────────────────────────────────────

const projectAliases: Record<string, string[]> = {
  roadsafe360: ["roadsafe", "road safe", "road safety", "demerit"],
  "sapio-homes": ["sapio", "real estate", "real-estate"],
  "steadfast-parent": ["parent portal", "parent app", "steadfast portal", "teacher portal"],
  quickprint: ["quick print", "printing", "cyber cafe"],
  "fitness-tracker": ["fitness", "workout", "sleep tracker"],
  "flip-book-portfolio": ["flip-book", "flipbook", "flip book"],
  "portfolio-v2-3d": ["portfolio v2", "3d portfolio", "three.js portfolio", "threejs"],
};

const caseAliases = [
  ["disk full", "disk-full", "disk space", "log rotation"],
  ["wifi", "wi-fi", "dropped", "wireless"],
  ["reboot", "reboot loop", "restarts", "ram stick"],
  ["blue screen", "bsod", "failing ssd", "ssd"],
  ["thermal", "overheating", "throttle", "throttling", "thermal paste"],
  ["race condition", "no stack trace", "app crash", "application crash"],
  ["tls", "encrypted traffic", "middlebox", "data corruption"],
];

const buildAliases = [
  ["home automation", "smart home", "automation", "presence detection"],
  ["media server", "backup server", "backups", "media & backup"],
  ["robot", "robots", "robotics", "drone", "drones", "line-following"],
];

const certAliases: Record<string, string[]> = {
  "Microsoft Azure Fundamentals": ["azure fundamentals", "az-900"],
  "CompTIA Security+": ["security+", "security plus", "sec+", "comptia"],
  "AWS Cloud Practitioner": ["cloud practitioner", "aws cert", "aws certification"],
  "Google Cybersecurity Professional": ["google cybersecurity", "google cert"],
  CCNA: ["ccna", "cisco cert"],
  "IBM Cybersecurity Analyst": ["ibm", "cybersecurity analyst"],
};

const techLevels = techs.flatMap((c) => c.items.map((i) => ({ name: i.title, level: i.level, group: c.heading })));
const gearAliases: Record<string, string[]> = {
  "Glorious Model O": ["model o", "glorious"],
  "AULA S2027": ["aula"],
  "HP 745 G7": ["745", "daily driver laptop"],
  "HP 820 G3": ["820"],
  "HP Tower Server": ["tower server"],
  "HP Tower (Kali Linux)": ["kali", "kali linux", "pentest", "pentesting", "penetration testing", "pen testing"],
  "Galaxy A05s": ["galaxy", "samsung"],
  "ORAiMO SpaceBuds Neo Plus": ["spacebuds", "earbuds"],
  "ORAiMO SmartWatch 5N": ["smartwatch", "smart watch"],
  "ESP32 Dev Kit": ["esp32"],
  "ThinkVision 24\"": ["thinkvision"],
};

/** Generic gear words mapped to the items on the homelab page they describe. */
const gearKinds: { test: RegExp; label: string; match: RegExp }[] = [
  { test: / (laptops?|computers?|pcs?|machines?)\b/, label: "computers", match: /^HP /i },
  { test: / (mouse|mice)\b/, label: "mice", match: /model o|mouse/i },
  { test: / keyboards?\b/, label: "keyboards", match: /keyboard|aula/i },
  { test: / (monitors?|displays?|screens?)\b/, label: "displays", match: /monitor|thinkvision/i },
  { test: / phones?\b/, label: "phones", match: /galaxy|kaduda/i },
  { test: / (headphones|earphones|audio|watch)\b/, label: "audio and wearables", match: /oraimo/i },
  { test: / (router|wifi|wi-fi|internet)\b/, label: "networking gear", match: /router/i },
];

const allGear = gearCategories.flatMap((c) => c.items);

function gearAnswer(q: string) {
  const kind = gearKinds.find((k) => k.test.test(q));
  if (!kind) return undefined;
  const items = allGear.filter((g) => kind.match.test(g.name));
  if (!items.length) return undefined;
  const [first, ...rest] = items;
  const others = rest.length ? ` He also has the ${list(rest.map((g) => g.name))}.` : "";
  return `For ${kind.label}, his main one is the ${first.name}. ${thirdPerson(first.outcome)}${others} I've got the full specs on /hobbies.`;
}

const techAliases: Record<string, string[]> = {
  "Node.js": ["node", "nodejs"],
  "Next.js": ["nextjs"],
  "Vue.js": ["vue"],
  "React Native": ["rn"],
  "C#": [".net", "dotnet"],
  "Windows 11": ["windows"],
};
const extraTech = ["React Native", "Expo", "Tailwind", "PostgreSQL", "Express", "Three.js", "Rust", "Dart", "SQLite", "Azure", "GCP"];

function usedIn(tech: string) {
  const t = tech.toLowerCase().replace(/\s+\d+$/, "");
  return [...caseStudies.map((p) => ({ title: p.title, stack: p.stack })), ...otherProjects]
    .filter((p) => p.stack.some((s) => s.toLowerCase().replace(/\s+\d+$/, "") === t || s.toLowerCase().startsWith(`${t} `)))
    .map((p) => p.title);
}

function stackUse(tech: string) {
  const t = tech.toLowerCase();
  return stack.find((s) => s.item.toLowerCase().split(" / ").some((part) => part === t || part === t.replace(".js", "")))?.use;
}

const entities: Entity[] = [
  ...caseStudies.map<Entity>((p) => ({
    kind: "project",
    name: p.title,
    aliases: [p.title.toLowerCase(), ...(projectAliases[p.id] ?? [])],
    stack: p.stack,
    link: p.access.demo ?? p.access.repo,
    page: "/projects",
    more: `A few highlights: ${list(p.solution.slice(0, 3).map(lower))}. The flow goes ${p.architecture.stages.join(" → ")}.`,
    answer: () =>
      `${p.title} is ${article(p.tagline)}. ${firstSentence(p.problem)} Brian's part: ${lower(p.contribution)} It's ${p.status.toLowerCase()} and built with ${list(p.stack.slice(0, 5))}.`,
  })),
  ...otherProjects.map<Entity>((p) => ({
    kind: "project",
    name: p.title,
    aliases: [p.title.toLowerCase(), ...(p.title === "Custom Jellyfin Client" ? ["jellyfin"] : [])],
    stack: p.stack,
    link: p.repo || undefined,
    page: "/projects",
    more: thirdPerson(p.details.join(" ")),
    answer: () =>
      `${p.title} is ${article(p.type.toLowerCase())}: ${lower(stripDot(thirdPerson(p.description)))}. It's ${p.status}, built with ${list(p.stack)}.`,
  })),
  ...timeline
    .filter((t) => t.category === "certification")
    .map<Entity>((t) => ({
      kind: "cert",
      name: t.title,
      aliases: [t.title.toLowerCase(), ...(certAliases[t.title] ?? [])],
      page: "/about",
      more: `What it covers for him in practice: ${list((t.metrics ?? []).map(lower))}.`,
      answer: () => `Yes, Brian holds the ${t.title} from ${t.institution}, earned in ${t.period}. ${t.description}`,
    })),
  ...[...techLevels.map((t) => t.name), ...extraTech].map<Entity>((name) => ({
    kind: "tech",
    name,
    aliases: [name.toLowerCase(), ...(techAliases[name] ?? [])],
    page: "/techstack",
    answer: () => {
      const known = techLevels.find((t) => t.name === name);
      const projects = usedIn(name);
      const use = stackUse(name);
      const parts = [
        known ? `${name} is on his stack at ${/^[aeiou]/.test(known.level) ? "an" : "a"} ${known.level} level` : `${name} is part of his toolkit`,
        use ? `he mainly uses it for ${lower(use)}` : "",
      ].filter(Boolean);
      const where = projects.length ? ` You can see it in ${list(projects.slice(0, 3))}.` : "";
      return `Yep, ${parts.join(", and ")}.${where}`;
    },
  })),
  ...gearCategories.flatMap((c) =>
    c.items.map<Entity>((g) => ({
      kind: "gear",
      name: g.name,
      aliases: [g.name.toLowerCase().replace(/"/g, ""), ...(gearAliases[g.name] ?? [])],
      page: "/hobbies",
      more: `Specs: ${list(g.specs)}.`,
      answer: () => `The ${g.name} is part of his ${c.title.toLowerCase()} gear. ${thirdPerson(g.outcome)}`,
    })),
  ),
  ...builds.map<Entity>((b, i) => ({
    kind: "build",
    name: b.title,
    aliases: [b.title.toLowerCase(), ...buildAliases[i]],
    page: "/hobbies",
    more: `Under the hood: ${b.stack}.`,
    answer: () => `${b.title} is one of his homelab builds (${b.status.toLowerCase()}). ${thirdPerson(b.outcome)}`,
  })),
  ...cases.map<Entity>((c, i) => ({
    kind: "case",
    name: c.title,
    aliases: [c.title.toLowerCase(), ...(caseAliases[i] ?? [])],
    page: "/troubleshooting",
    more: `How he approached it: ${thirdPerson(c.approach)}`,
    answer: () => `That's the "${c.title}" case. ${c.summary} The root cause? ${c.rootCause} ${thirdPerson(c.resolution)}`,
  })),
  ...domains.map<Entity>((d) => ({
    kind: "domain",
    name: d.label,
    aliases: [d.label.toLowerCase(), d.id, ...(d.id === "security" ? ["cybersecurity", "cyber security"] : d.id === "cloudops" ? ["devops", "cloud"] : d.id === "networking" ? ["network", "networks"] : [])],
    page: "/expertise",
    stack: d.tools,
    more: thirdPerson(d.capabilities.map((c) => `${c.title}: ${lower(stripDot(c.description))}.`).join(" ")),
    answer: () => `${d.label} is one of his core areas. ${thirdPerson(d.summary)} Tools he leans on: ${list(d.tools)}.`,
  })),
];

function findEntity(q: string): Entity | undefined {
  const certHint = has(q, / cert| certif| exam| certified| qualif/);
  const techHint = has(q, / know | use | using | skill| good at| proficien| level| experience with| work with/);
  let best: { entity: Entity; score: number } | undefined;
  for (const entity of entities) {
    const hit = entity.aliases.filter((a) => a && mentions(q, a)).sort((a, b) => b.length - a.length)[0];
    if (!hit) continue;
    let score = hit.length;
    if (entity.kind === "cert" && certHint) score += 20;
    if (entity.kind === "tech" && techHint) score += 4;
    if (entity.kind === "project") score += 3;
    if (!best || score > best.score) best = { entity, score };
  }
  return best?.entity;
}

// ─── Topic answers ───────────────────────────────────────────────────────────

const certs = timeline.filter((t) => t.category === "certification");
const jobs = timeline.filter((t) => t.category === "professional" || t.category === "entrepreneurial").filter((t) => t.year <= new Date().getFullYear());
const stat = (label: string) => stats.find((s) => s.label === label);
const years = `${stat("Years in Tech")?.value ?? 3}+`;
const projectCount = `${stat("Projects")?.value ?? 50}+`;
const devices = labStats.find((s) => s.label === "Devices Managed")?.value ?? "18";

interface Topic {
  test: RegExp;
  answer: (q: string) => string;
  subject?: Subject;
}

const topics: Topic[] = [
  {
    test: / hire| hiring| work with him| available| availability| freelance| job offer| opportunit| collaborat/,
    answer: () =>
      `He's open to conversations, so the easiest way is to reach out directly. Email ${siteConfig.email} or call ${siteConfig.phoneDisplay}; he usually replies within 24 hours. The form on /contact works too, and /resume has a CV tailored to software, mobile or IT roles.`,
  },
  {
    test: / contact| email| e-mail| phone| call him| reach| get in touch| number| whatsapp/,
    answer: () =>
      `You can email Brian at ${siteConfig.email} or call ${siteConfig.phoneDisplay}. There's also a contact form on /contact, and he usually responds within 24 hours.`,
  },
  {
    test: / linkedin| github| socials?| instagram| twitter/,
    answer: () => `Here you go: GitHub ${siteConfig.github}, LinkedIn ${siteConfig.linkedin}, and Instagram ${siteConfig.instagram}.`,
  },
  {
    test: / where .*(live|based|from)| location| located| based in| country| city| nairobi| kenya/,
    answer: () => `Brian's based in ${siteConfig.location}, and he's happy working with people remotely.`,
  },
  {
    test: / certif| certs?\b| qualification/,
    answer: () =>
      `He holds ${certs.length} certifications: ${list(certs.map((c) => `${c.title} (${c.period})`))}. Ask me about any one of them if you want the details.`,
    subject: { name: "certifications", page: "/about" },
  },
  {
    test: / educat| degree| universit| college| school| study| studied| graduat/,
    answer: () =>
      `He's doing a ${resumeEducation.degree} at ${resumeEducation.institution} (${resumeEducation.period}), with a ${lower(resumeEducation.note)}. Before that, ${timeline.filter((t) => t.category === "education" && t.year < 2021).map((t) => `${t.title} at ${t.institution}`).join(" and ")}.`,
    subject: { name: "education", page: "/about" },
  },
  {
    test: / experience| job| work history| career| employ| steadfast| current(ly)? (work|role|job)| where does he work| company| companies/,
    answer: () =>
      `Right now he's in ${experience.role} at ${experience.company} (${experience.period}): ${lower(experience.summary)} Before that he did security work at the ICT Authority of Kenya and freelance full-stack projects on Fiverr and Upwork. He also co-founded Thee Entity Limited.`,
    subject: {
      name: "his experience",
      page: "/about",
      more: `At ${experience.company} he has ${list(experience.duties.slice(0, 4).map(lower))}. Full timeline: ${jobs.map((j) => `${j.title} at ${j.institution} (${j.period})`).join("; ")}.`,
    },
  },
  {
    test: / homelab| home lab| lab\b| server| proxmox| raid| setup| gear| hardware he (has|owns|uses)| hobb/,
    answer: () =>
      `His homelab is a proper little data centre: ${devices} devices, a Proxmox node running 24/7, 3TB of RAID-1 storage and zero data lost since day one. The fun builds are ${list(builds.map((b) => b.title.toLowerCase()))}.`,
    subject: {
      name: "the homelab",
      page: "/hobbies",
      more: `Lately he's been tinkering with ${list(tinkering.map((t) => `${t.title} (${lower(stripDot(t.desc))})`))}.`,
    },
  },
  {
    test: / resume| cv\b| curriculum/,
    answer: () =>
      `His resume comes in three flavours: ${list(resumeRoles.map((r) => r.label))}. Each one's tailored to that kind of role, and you can grab them on /resume.`,
  },
  {
    test: / projects?| built| build| portfolio| work samples?| case stud| made| created/,
    answer: () =>
      `He's delivered ${projectCount} projects. The featured ones are ${list(caseStudies.map((p) => p.title))}. Want the story behind any of them?`,
    subject: {
      name: "his projects",
      page: "/projects",
      more: `Some smaller builds too: ${list(otherProjects.map((p) => `${p.title} (${p.type.toLowerCase()})`))}.`,
    },
  },
  {
    test: / process| workflow| approach| how does he (work|build)| methodology/,
    answer: () => `His workflow has six steps: ${workflow.map((w) => w.title.toLowerCase()).join(" → ")}. ${thirdPerson(workflow[0].desc)}`,
    subject: { name: "his workflow", page: "/engineering", more: thirdPerson(workflow.map((w) => `${w.title}: ${w.desc}`).join(" ")) },
  },
  {
    test: / principle| philosoph| values| believe/,
    answer: () => `A few principles he builds by: ${list(principles.map((p) => lower(p.title)))}. ${thirdPerson(principles[2].desc)}`,
    subject: { name: "his principles", page: "/engineering", more: thirdPerson(principles.map((p) => p.desc).join(" ")) },
  },
  {
    test: / architect| system design| backend| frontend| full.?stack/,
    answer: () => `Across the stack: ${architecture.map((a) => `${a.title.toLowerCase()} with ${a.stack}`).join("; ")}.`,
    subject: { name: "architecture", page: "/engineering" },
  },
  {
    test: / troubleshoot| debug| diagnos| fix(es|ing)? (things|problems|issues)| problem.?solv/,
    answer: () =>
      `He troubleshoots methodically: ${steps.map((s) => s.title.toLowerCase()).join(", then ")}. /troubleshooting has real cases, like the "${cases[0].title}" and a "${cases[3].title}". Ask about one!`,
    subject: { name: "troubleshooting", page: "/troubleshooting" },
  },
  {
    test: / mobile| android| ios| app developer| apps\b/,
    answer: () => {
      const r = resumeRoles.find((x) => x.id === "mobile")!;
      return `${thirdPerson(r.summary)} Go-to tools: ${list(r.topSkills.slice(0, 5))}.`;
    },
  },
  {
    test: / languages?| programming| code in| coding/,
    answer: () => {
      const langs = techs.find((c) => c.heading === "Languages")!.items;
      return `He writes ${list(langs.map((l) => l.title))}. TypeScript is his everyday language for web and mobile, and C/C++ comes out for embedded firmware.`;
    },
  },
  {
    test: / skills?| tech stack| stack| tools| technolog| good at| strengths?| expertise| speciali/,
    answer: () =>
      `Brian works across three areas: software engineering (React, Next.js, TypeScript, Node.js), mobile (React Native, Expo) and IT & infrastructure (Linux, networking, system administration). He goes deeper on ${list(domains.map((d) => d.label.toLowerCase()))} on /expertise.`,
    subject: { name: "his skills", page: "/techstack", more: techs.map((c) => `${c.heading}: ${c.items.map((i) => i.title).join(", ")}.`).join(" ") },
  },
  {
    test: / how (many|long)| years| stats| numbers/,
    answer: () =>
      `Quick numbers: ${years} years in tech, ${projectCount} projects delivered, ${certs.length} certifications and ${devices} devices in his homelab.`,
  },
  {
    test: / who is| about (him|brian)| tell me about (him|brian)| brian\b| introduce/,
    answer: () =>
      `Brian Kareithi is a software engineer in ${siteConfig.location}. He builds secure web and mobile products with Next.js, React Native and TypeScript, and he has a solid IT and infrastructure background. That's ${years} years in tech, ${projectCount} projects and ${certs.length} certifications so far.`,
    subject: { name: "Brian", page: "/about", more: `He's currently at ${experience.company}, studying at ${resumeEducation.institution}, and runs an ${devices}-device homelab for fun.` },
  },
];

// ─── Small talk ──────────────────────────────────────────────────────────────

const smallTalk: { test: RegExp; replies: string[] }[] = [
  {
    test: /^ (hi|hello|hey|hiya|yo|sup|whats up|howdy|good (morning|afternoon|evening)|greetings)( friday| there)? $/,
    replies: [
      "Hey! What would you like to know about Brian?",
      "Hi there. Ask me anything about Brian's work, projects or skills.",
      "Hello! I'm all ears. Projects, certifications, homelab, you name it.",
    ],
  },
  {
    test: / how are you| how you doing| hows it going| how r u/,
    replies: ["Running smoothly, thanks for asking. What can I tell you about Brian?", "All systems green. What's on your mind?"],
  },
  {
    test: / thank| thanks| thx| appreciate/,
    replies: ["Anytime!", "Happy to help. Anything else?", "You're welcome. Shout if you need anything else."],
  },
  {
    test: /^ (bye|goodbye|see you|see ya|later|cya)/,
    replies: ["Take care! If you want to talk to the man himself, /contact is the place.", "Bye for now!"],
  },
  {
    test: / who are you| what are you| your name| are you (a bot|an ai|real|human)/,
    replies: [
      "I'm FRIDAY, Brian's assistant on this site, named after Tony Stark's. I know everything that's on these pages, so ask away.",
    ],
  },
  {
    test: / what can you do| help me| what (can|should) i ask| options/,
    replies: [
      "I can tell you about Brian's projects, skills, certifications, experience, homelab, the way he works, or how to get hold of him. Try \"What's RoadSafe360?\" or \"Does he know Docker?\"",
    ],
  },
  {
    test: / (cat|kitty|kitten|mascot|byte)/,
    replies: [
      "That's Byte, my cat. Mostly moral support, occasionally sits on the keyboard. Brian doesn't seem to mind.",
      "Oh, that's Byte. He keeps me company and watches the orb when I'm thinking.",
    ],
  },
  {
    test: / joke| funny/,
    replies: ["Brian's homelab has 18 devices and zero data lost. The only thing that's ever crashed in there is his sleep schedule."],
  },
  {
    test: /^ (ok|okay|cool|nice|great|awesome|wow|interesting|got it|alright) $/,
    replies: ["Right? Anything else you'd like to know?", "Glad you think so. What else can I dig up?"],
  },
];

// ─── Follow-ups ──────────────────────────────────────────────────────────────

function followUp(q: string, subject: Subject): string | undefined {
  const words = q.trim().split(" ").length;
  // Only treat a question as a follow-up when it is terse or points back at "it/that".
  const refersBack = words <= 4 || has(q, / (it|its|that|this|them)\b/);
  if (refersBack && has(q, / (link|url|demo|repo|source|see it|try it|visit)/)) {
    return subject.link
      ? `Here's ${subject.name}: ${subject.link}. There's more context on ${subject.page}.`
      : `There isn't a public link for ${subject.name}, but ${subject.page} has the full write-up.`;
  }
  if (refersBack && subject.stack && has(q, / (stack|built with|tech|tools|made with|language|framework)/)) {
    return `${cap(subject.name)} uses ${list(subject.stack)}.`;
  }
  if ((words <= 3 && has(q, /^ (more|go on|and|continue|elaborate|details?|explain|why|how|really|such as|like what|what else|anything else)\b/)) || has(q, / tell me more| more (about|detail|info)| go deeper| elaborate/)) {
    return subject.more ? `${subject.more} There's more on ${subject.page}.` : `That's the gist of it. ${subject.page} has the full picture.`;
  }
  return undefined;
}

// ─── Entry point ─────────────────────────────────────────────────────────────

export function respond(question: string, memory: Memory): Reply {
  const q = normalize(question);

  for (const talk of smallTalk) {
    if (talk.test.test(q)) return { text: pick(talk.replies), memory };
  }

  const entity = findEntity(q);

  if (memory.subject && !entity) {
    const text = followUp(q, memory.subject);
    if (text) return { text, memory };
  }

  if (entity) {
    const suffix = pick([` I've got more on ${entity.page}.`, ` Want me to go deeper?`, ` You'll find the rest on ${entity.page}.`, ""]);
    return { text: say(entity.answer() + suffix), memory: { subject: entity } };
  }

  const gear = gearAnswer(q);
  if (gear) return { text: say(gear), memory };

  const topic = topics.find((t) => t.test.test(q));
  if (topic) {
    return { text: say(topic.answer(q)), memory: { subject: topic.subject ?? memory.subject } };
  }

  return {
    text: pick([
      `Hmm, I don't have anything on that in Brian's files${boss()}. I can tell you about his projects, skills, certifications, experience, homelab or how to reach him.`,
      `That one's not on the pages I know. Try asking about his projects, tech stack, certifications or how to hire him.`,
      `I'm drawing a blank on that. It's not on the site. Ask me about his work, skills or homelab instead?`,
    ]),
    memory,
  };
}
