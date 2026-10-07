/**
 * Mini capture the flag. Everything here is a pure, sandboxed simulation: a tiny virtual
 * filesystem and a handful of fake commands, with pipes. Nothing touches the real machine.
 */

type Entry = { type: "dir"; children: Record<string, Entry> } | { type: "file"; content: string; locked?: boolean };

const dir = (children: Record<string, Entry>): Entry => ({ type: "dir", children });
const file = (content: string, locked = false): Entry => ({ type: "file", content, locked });

export interface Mission {
  id: string;
  level: "Easy" | "Medium" | "Hard";
  title: string;
  brief: string;
  flag: string;
  /** Revealed one at a time by the hint command, from a nudge to nearly the answer. */
  hints: string[];
  lesson: string;
}

export const missions: Mission[] = [
  {
    id: "hidden",
    level: "Easy",
    title: "Hidden in plain sight",
    brief: "Your home folder is keeping something from you.",
    flag: "FLAG{dot_files_hide_things}",
    hints: ["What you see is not everything that is there.", "Some files hide behind a dot. ls has an option for that.", "ls -a, then cat the file that does not belong."],
    lesson: "Dotfiles are hidden by default. Attackers and admins both rely on that.",
  },
  {
    id: "logs",
    level: "Medium",
    title: "The stranger who got in",
    brief: "Plenty of people log in. One of them should not have been able to.",
    flag: "FLAG{outsider_with_a_valid_login}",
    hints: [
      "Start with who succeeded, not who failed.",
      "Several logins succeeded. Which one came from outside the 10.0.0.x network?",
      "grep can also exclude: grep -v. Try: grep Accepted /var/log/auth.log | grep -v 10.0.0",
    ],
    lesson: "The skill is filtering. One success from the wrong place among thousands of failures is the breach.",
  },
  {
    id: "locked",
    level: "Medium",
    title: "Permission denied",
    brief: "The vault holds a note you are not allowed to read. Yet.",
    flag: "FLAG{chmod_is_the_key}",
    hints: ["Look at the permissions, not just the names.", "ls -l shows who can do what. You own the file, so you can change it.", "chmod +r <file>, then cat it."],
    lesson: "File permissions are access control. If you own a file you can usually change its mode, which is why ownership matters.",
  },
  {
    id: "encoded",
    level: "Hard",
    title: "Encoded, twice",
    brief: "The vault has a file that is gibberish. Then it turns out to be gibberish wrapped in gibberish.",
    flag: "FLAG{base64_is_not_encryption}",
    hints: ["It is an encoding, not encryption. The command is in help.", "One decode gives you something that still looks encoded.", "Pipe it through again: base64 -d vault/secret.b64 | base64 -d"],
    lesson: "Base64 is an encoding, not encryption. Anyone can reverse it, and stacking it adds nothing.",
  },
  {
    id: "backups",
    level: "Hard",
    title: "The one good backup",
    brief: "Somewhere under /srv is a backup that is not empty. Backups are not usually in the home folder.",
    flag: "FLAG{find_it_before_you_need_it}",
    hints: ["Do not browse by hand. Searching beats walking.", "find <where> -name <pattern>. Backups often end in .bak.", "find /srv -name *.bak, then check each. Only one is worth reading."],
    lesson: "find is how you search a whole system by name. During an incident you will not know where anything is.",
  },
  {
    id: "cipher",
    level: "Hard",
    title: "Caesar's shadow",
    brief: "/etc has a message of the day that was not meant for you. It is wrapped in two different layers.",
    flag: "FLAG{caesar_would_be_proud}",
    hints: [
      "Read the file first. The outer layer is one you have already met.",
      "After that decode the text is still scrambled. It shifts every letter by 13.",
      "cat /etc/motd.enc | base64 -d | rot13",
    ],
    lesson: "Real obfuscation stacks simple layers. Spotting each one, and piping them apart, is half of malware analysis.",
  },
];

/** Plausible-looking flags that are not real. Submitting one is a trap. */
const decoys = ["FLAG{nice_try_internal_login}", "FLAG{that_was_a_decoy}", "FLAG{the_cake_is_a_lie}"];
export const isDecoy = (value: string) => decoys.includes(value);

const b64 = (text: string) => (typeof btoa === "function" ? btoa(text) : "");
const rot13 = (text: string) =>
  text.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });

const authLog = (() => {
  const users = ["root", "admin", "test", "oracle", "ubuntu", "pi", "guest", "postgres"];
  const lines: string[] = [];
  for (let i = 0; i < 140; i++) {
    const m = 7 + Math.floor(i / 50);
    const t = `Oct ${String(m).padStart(2, "0")} ${String(2 + (i % 20)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`;
    lines.push(`${t} lab sshd[${1200 + i}]: Failed password for ${users[i % users.length]} from 203.0.113.${10 + (i % 40)} port ${40000 + i * 17}`);
  }
  const accepted = [
    { at: 12, user: "deploy", ip: "10.0.0.7", token: decoys[0] },
    { at: 31, user: "alice", ip: "10.0.0.21", token: "none" },
    { at: 58, user: "bob", ip: "10.0.0.34", token: "none" },
    { at: 77, user: "backup", ip: "10.0.0.9", token: decoys[1] },
    { at: 96, user: "deploy", ip: "198.51.100.23", token: missions[1].flag },
    { at: 121, user: "alice", ip: "10.0.0.21", token: "none" },
    { at: 133, user: "carol", ip: "10.0.0.52", token: decoys[2] },
  ];
  // insert from the back so earlier indexes stay valid
  [...accepted].sort((a, b) => b.at - a.at).forEach((a) => {
    lines.splice(a.at, 0, `Oct 08 ${String(9 + (a.at % 12)).padStart(2, "0")}:${String(a.at % 60).padStart(2, "0")}:12 lab sshd[${1500 + a.at}]: Accepted password for ${a.user} from ${a.ip} port ${50000 + a.at} token=${a.token}`);
  });
  return lines.join("\n");
})();

const doubleEncoded = b64(b64(`Wrapped twice. ${missions[3].flag}`));
const motd = b64(rot13(`The last message of the day: ${missions[5].flag}`));

const HOME = "/home/guest";

const root: Entry = dir({
  home: dir({
    guest: dir({
      "README.txt": file(
        "Welcome, guest.\n\nSix flags are hidden on this machine. Some are decoys.\nA real flag looks like FLAG{...}. Hand one in with:\n  submit FLAG{...}\n\nCommands are in help. hint costs nothing but your pride.",
      ),
      "notes.txt": file("TODO: tidy up my home folder.\nBackups live under /srv, not here.\nThe vault is for things I do not want anyone reading."),
      ".old_notes": file(`Keep this quiet.\n${missions[0].flag}`),
      vault: dir({
        "README.txt": file("Two files in here matter. One is encoded. One is locked.\nStart with the one you can already read."),
        "secret.b64": file(doubleEncoded),
        ".locked_note": file(`You made it past the lock.\n${missions[2].flag}`, true),
      }),
    }),
  }),
  var: dir({
    log: dir({
      "auth.log": file(authLog),
      syslog: file("Oct 08 03:00:01 lab CRON[991]: (root) CMD (run-parts /etc/cron.hourly)\nOct 08 03:00:02 lab systemd[1]: Started Daily apt download activities.\nOct 08 03:14:22 lab kernel: [ 4012.1] usb 1-1: new high-speed USB device"),
    }),
  }),
  srv: dir({
    backups: dir({
      "2023": dir({
        q1: dir({ "db.bak": file("") }),
        q3: dir({ "db.bak": file("") , "notes.txt": file("Rotated keys. Old dump removed.") }),
      }),
      "2024": dir({
        q1: dir({ "db.bak": file("-- dump truncated --") }),
        q2: dir({ "db.bak": file(`-- nightly dump, complete --\nINSERT INTO secrets VALUES ('${missions[4].flag}');`) }),
        q4: dir({ "db.bak": file("") }),
      }),
    }),
    www: dir({ "index.html": file("<h1>It works!</h1>") }),
  }),
  etc: dir({
    hostname: file("lab"),
    "motd.enc": file(motd),
    hosts: file("127.0.0.1 localhost\n10.0.0.1 gateway"),
  }),
});

function resolve(cwd: string, input: string): string {
  const base = input.startsWith("/") ? [] : input.startsWith("~") ? HOME.split("/").filter(Boolean) : cwd.split("/").filter(Boolean);
  const rest = input.startsWith("~") ? input.slice(1) : input;
  const parts = [...base];
  for (const seg of rest.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return "/" + parts.join("/");
}

function lookup(path: string): Entry | null {
  let node: Entry = root;
  for (const seg of path.split("/").filter(Boolean)) {
    if (node.type !== "dir" || !(seg in node.children)) return null;
    node = node.children[seg];
  }
  return node;
}

export const prompt = (cwd: string) => `guest@lab:${cwd === HOME ? "~" : cwd}$`;
export const startDir = HOME;

export interface CommandResult {
  lines: { kind: "out" | "ok" | "err"; text: string }[];
  cwd?: string;
  clear?: boolean;
  /** A flag the player submitted, for the UI to check. */
  submitted?: string;
  wantsHint?: boolean;
  /** A file the player made readable with chmod. */
  unlocked?: string;
}

const out = (text: string) => ({ kind: "out" as const, text });
const err = (text: string) => ({ kind: "err" as const, text });

type Stage = { lines: string[] } | { error: string };
const fail = (error: string): Stage => ({ error });

const COMMANDS = ["help", "ls", "cat", "cd", "pwd", "grep", "find", "head", "tail", "wc", "sort", "uniq", "rev", "rot13", "base64", "chmod", "whoami", "hint", "submit", "clear"];

/** Text a filter command works on: piped input if there is any, otherwise the file argument. */
function readInput(name: string, fileArg: string | undefined, cwd: string, unlocked: string[], stdin: string[] | null): { lines: string[] } | { error: string } {
  if (stdin) return { lines: stdin };
  if (!fileArg) return { error: `usage: ${name} <file>` };
  const path = resolve(cwd, fileArg);
  const node = lookup(path);
  if (!node) return { error: `${name}: ${fileArg}: no such file or directory` };
  if (node.type === "dir") return { error: `${name}: ${fileArg}: is a directory` };
  if (node.locked && !unlocked.includes(path)) return { error: `${name}: ${fileArg}: Permission denied` };
  return { lines: node.content.split("\n") };
}

function globToRegExp(glob: string) {
  return new RegExp("^" + glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "i");
}

function walk(path: string, node: Entry, test: (name: string) => boolean, acc: string[]) {
  if (node.type !== "dir") return;
  for (const [name, child] of Object.entries(node.children)) {
    const full = `${path === "/" ? "" : path}/${name}`;
    if (test(name)) acc.push(full);
    walk(full, child, test, acc);
  }
}

function stage(cmd: string, args: string[], cwd: string, unlocked: string[], stdin: string[] | null): Stage {
  switch (cmd) {
    case "ls": {
      const showAll = args.some((a) => /^-[a-z]*a/.test(a));
      const long = args.some((a) => /^-[a-z]*l/.test(a));
      const path = args.find((a) => !a.startsWith("-"));
      const target = resolve(cwd, path ?? ".");
      const node = lookup(target);
      if (!node) return fail(`ls: cannot access '${path}': no such file or directory`);
      if (node.type === "file") return { lines: [path ?? target] };
      const names = Object.keys(node.children).filter((n) => showAll || !n.startsWith(".")).sort();
      if (!names.length) return { lines: ["(empty)"] };
      if (!long) return { lines: [names.map((n) => (node.children[n].type === "dir" ? `${n}/` : n)).join("  ")] };
      return {
        lines: names.map((n) => {
          const child = node.children[n];
          const full = `${target === "/" ? "" : target}/${n}`;
          const locked = child.type === "file" && child.locked && !unlocked.includes(full);
          const mode = child.type === "dir" ? "drwxr-xr-x" : locked ? "----------" : "-rw-r--r--";
          return `${mode} guest guest ${child.type === "dir" ? `${n}/` : n}`;
        }),
      };
    }
    case "cat": {
      const r = readInput("cat", args[0], cwd, unlocked, stdin);
      return "error" in r ? fail(r.error) : r;
    }
    case "head":
    case "tail": {
      const nIdx = args.indexOf("-n");
      const n = nIdx >= 0 ? Math.max(0, parseInt(args[nIdx + 1] ?? "10", 10) || 10) : 10;
      const fileArg = args.find((a, i) => !a.startsWith("-") && i !== nIdx + 1);
      const r = readInput(cmd, fileArg, cwd, unlocked, stdin);
      if ("error" in r) return fail(r.error);
      return { lines: cmd === "head" ? r.lines.slice(0, n) : r.lines.slice(-n) };
    }
    case "wc": {
      const fileArg = args.find((a) => !a.startsWith("-"));
      const r = readInput("wc", fileArg, cwd, unlocked, stdin);
      return "error" in r ? fail(r.error) : { lines: [String(r.lines.filter((l, i, a) => l !== "" || i < a.length - 1).length)] };
    }
    case "sort": {
      const r = readInput("sort", args.find((a) => !a.startsWith("-")), cwd, unlocked, stdin);
      return "error" in r ? fail(r.error) : { lines: [...r.lines].sort() };
    }
    case "uniq": {
      const r = readInput("uniq", args.find((a) => !a.startsWith("-")), cwd, unlocked, stdin);
      return "error" in r ? fail(r.error) : { lines: r.lines.filter((l, i, a) => i === 0 || l !== a[i - 1]) };
    }
    case "rev": {
      const r = readInput("rev", args[0], cwd, unlocked, stdin);
      return "error" in r ? fail(r.error) : { lines: r.lines.map((l) => [...l].reverse().join("")) };
    }
    case "rot13": {
      const r = readInput("rot13", args[0], cwd, unlocked, stdin);
      return "error" in r ? fail(r.error) : { lines: r.lines.map(rot13) };
    }
    case "grep": {
      const invert = args.includes("-v");
      const rest = args.filter((a) => a !== "-v" && a !== "-i");
      const word = rest[0];
      if (!word) return fail("usage: grep [-v] <word> [file]");
      const r = readInput("grep", rest[1], cwd, unlocked, stdin);
      if ("error" in r) return fail(r.error);
      const w = word.toLowerCase();
      const hits = r.lines.filter((l) => l.toLowerCase().includes(w) !== invert);
      return { lines: hits.length ? hits : [] };
    }
    case "base64": {
      if (args[0] !== "-d") return fail("usage: base64 -d [file]");
      const r = readInput("base64", args[1], cwd, unlocked, stdin);
      if ("error" in r) return fail(r.error);
      try {
        return { lines: atob(r.lines.join("").trim()).split("\n") };
      } catch {
        return fail("base64: invalid input");
      }
    }
    case "find": {
      const nameIdx = args.indexOf("-name");
      if (nameIdx < 0 || !args[nameIdx + 1]) return fail("usage: find <dir> -name <pattern>");
      const where = args[0] && args[0] !== "-name" ? args[0] : ".";
      const start = resolve(cwd, where);
      const node = lookup(start);
      if (!node) return fail(`find: '${where}': no such file or directory`);
      const re = globToRegExp(args[nameIdx + 1].replace(/^["']|["']$/g, ""));
      const found: string[] = [];
      walk(start, node, (n) => re.test(n), found);
      return { lines: found.length ? found.sort() : [] };
    }
    default:
      return fail(`${cmd}: command not found. Try help.`);
  }
}

export function runCommand(raw: string, cwd: string, unlocked: string[] = []): CommandResult {
  const input = raw.trim();
  if (!input) return { lines: [] };

  const segments = input.split("|").map((s) => s.trim());
  const [firstCmd, ...firstArgs] = segments[0].split(/\s+/);

  // Commands that act on the session itself, and cannot be piped.
  if (segments.length === 1) {
    switch (firstCmd) {
      case "help":
        return {
          lines: [
            out("Commands:"),
            out("  ls [-a] [-l] [dir]       list files (-a hidden, -l permissions)"),
            out("  cat <file>               read a file"),
            out("  cd <dir>   pwd           move around"),
            out("  grep [-v] <word> [file]  keep lines with a word (-v drops them)"),
            out("  find <dir> -name <pat>   search by name, * is a wildcard"),
            out("  head | tail [-n N]       first or last lines"),
            out("  wc -l  sort  uniq  rev   count, sort, dedupe, reverse"),
            out("  rot13 [file]             shift letters by 13"),
            out("  base64 -d [file]         decode base64"),
            out("  chmod +r <file>          make a file readable"),
            out("  hint                     a nudge for the current flag"),
            out("  submit FLAG{...}         hand in a flag"),
            out("  clear"),
            out("Chain commands with |, like: cat file | grep word"),
          ],
        };
      case "pwd":
        return { lines: [out(cwd)] };
      case "whoami":
        return { lines: [out("guest")] };
      case "clear":
        return { lines: [], clear: true };
      case "hint":
        return { lines: [], wantsHint: true };
      case "submit": {
        const value = firstArgs.join(" ");
        if (!value) return { lines: [err("usage: submit FLAG{...}")] };
        return { lines: [], submitted: value };
      }
      case "cd": {
        const target = resolve(cwd, firstArgs[0] ?? "~");
        const node = lookup(target);
        if (!node) return { lines: [err(`cd: ${firstArgs[0]}: no such file or directory`)] };
        if (node.type !== "dir") return { lines: [err(`cd: ${firstArgs[0]}: not a directory`)] };
        return { lines: [], cwd: target };
      }
      case "chmod": {
        if (firstArgs[0] !== "+r" || !firstArgs[1]) return { lines: [err("usage: chmod +r <file>")] };
        const path = resolve(cwd, firstArgs[1]);
        const node = lookup(path);
        if (!node) return { lines: [err(`chmod: cannot access '${firstArgs[1]}': no such file or directory`)] };
        if (node.type === "dir" || !node.locked) return { lines: [] };
        return { lines: [], unlocked: path };
      }
    }
  } else if (["help", "pwd", "whoami", "clear", "hint", "submit", "cd", "chmod"].includes(firstCmd)) {
    return { lines: [err(`${firstCmd}: cannot be piped`)] };
  }

  // Everything else is a data command that can sit in a pipeline.
  let data: string[] | null = null;
  for (const seg of segments) {
    const [cmd, ...args] = seg.split(/\s+/);
    if (!cmd) return { lines: [err("syntax error near '|'")] };
    if (!COMMANDS.includes(cmd)) return { lines: [err(`${cmd}: command not found. Try help.`)] };
    const result = stage(cmd, args, cwd, unlocked, data);
    if ("error" in result) return { lines: [err(result.error)] };
    data = result.lines;
  }
  const lines = (data ?? []).map(out);
  return { lines: lines.length ? lines : [] };
}

/** Tab completion for the command name or the last path-like word. Returns the new input, or null. */
export function complete(input: string, cwd: string): string | null {
  const words = input.split(/\s+/);
  const last = words[words.length - 1];
  const inPipeStart = words.length === 1 || words[words.length - 2] === "|";
  let candidates: string[];
  let prefix: string;

  if (inPipeStart) {
    prefix = last;
    candidates = COMMANDS.filter((c) => c.startsWith(last));
  } else {
    const slash = last.lastIndexOf("/");
    const dirPart = slash >= 0 ? last.slice(0, slash + 1) : "";
    const namePart = slash >= 0 ? last.slice(slash + 1) : last;
    const node = lookup(resolve(cwd, dirPart || "."));
    if (!node || node.type !== "dir") return null;
    prefix = dirPart + namePart;
    candidates = Object.keys(node.children)
      .filter((n) => n.startsWith(namePart))
      .map((n) => dirPart + n + (node.children[n].type === "dir" ? "/" : ""));
  }
  if (!candidates.length) return null;
  let common = candidates[0];
  for (const c of candidates) while (!c.startsWith(common)) common = common.slice(0, -1);
  if (common.length <= prefix.length && candidates.length > 1) return null;
  words[words.length - 1] = common;
  return words.join(" ") + (candidates.length === 1 && inPipeStart ? " " : "");
}
