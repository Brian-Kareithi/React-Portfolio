/**
 * "Debug it yourself": a case file played as a decision tree. Each node shows what you can see so
 * far, then offers three next moves. A good move advances; a detour or a wrong turn costs a step,
 * explains why, and leaves you where you were. The endings mirror the cases on the page.
 */

export type Verdict = "good" | "detour" | "wrong";

export interface Choice {
  /** What you would type or do. */
  label: string;
  verdict: Verdict;
  /** What happens, and why it was or was not the right call. */
  result: string;
  /** Node to move to. Only good moves have one. */
  next?: string;
}

export interface PuzzleNode {
  /** Evidence on screen: a command and its output, as a terminal would show it. */
  evidence: string[];
  question: string;
  choices: Choice[];
}

export interface Puzzle {
  id: string;
  title: string;
  domain: string;
  report: string;
  start: string;
  nodes: Record<string, PuzzleNode>;
  rootCause: string;
  fix: string;
}

export const puzzles: Puzzle[] = [
  {
    id: "disk",
    title: "The disk that filled overnight",
    domain: "Linux / Storage",
    report: "Monitoring paged at 03:12: the app server stopped accepting writes. Yesterday the disk was at 40%.",
    start: "df",
    nodes: {
      df: {
        evidence: ["$ df -h /", "Filesystem  Size  Used Avail Use% Mounted on", "/dev/sda1    50G   50G     0 100% /"],
        question: "The root disk is full. What do you do first?",
        choices: [
          {
            label: "Reboot the server and see if it clears",
            verdict: "wrong",
            result: "It comes back at 100%. Worse, a reboot wipes the running state you wanted to inspect. Find what is using the space before you touch the machine.",
          },
          {
            label: "du -xh / --max-depth=1 | sort -h",
            verdict: "good",
            result: "Right. Measure before you change anything, and -x keeps it on this one filesystem.",
            next: "du",
          },
          {
            label: "Delete everything in /tmp",
            verdict: "detour",
            result: "That frees 180 MB. The disk is at 100% again within the hour. You treated the symptom and learned nothing about the cause.",
          },
        ],
      },
      du: {
        evidence: ["$ du -xh / --max-depth=1 | sort -h", "1.1G   /usr", "2.4G   /home", "6.0G   /opt", "40G    /var", "50G    /"],
        question: "/var holds 40 of the 50 GB. Where next?",
        choices: [
          {
            label: "Run apt autoremove and clean the package cache",
            verdict: "detour",
            result: "You recover 600 MB of a 40 GB problem. The package cache was never the culprit.",
          },
          {
            label: "du -xh /var --max-depth=1 | sort -h",
            verdict: "good",
            result: "Keep drilling down one level at a time. Each step halves the search space.",
            next: "var",
          },
          {
            label: "Resize the partition and move on",
            verdict: "wrong",
            result: "You would be paying for more disk to hold something growing without limit. It would just fill the bigger disk a little later.",
          },
        ],
      },
      var: {
        evidence: ["$ ls -lhS /var/log | head -4", "-rw-r--r-- 1 app app  38G  Nov  3 03:10 app.log", "-rw-r----- 1 root adm 412M  Nov  3 00:00 syslog", "-rw-r----- 1 root adm  96M  Nov  2 06:25 auth.log"],
        question: "One file is 38 GB. It has no rotated copies beside it. What is your next move?",
        choices: [
          {
            label: "cat /var/log/app.log to see what is in it",
            verdict: "wrong",
            result: "You just tried to print 38 GB to your terminal. Use tail -n 50 if you want a look, and ask why it is this big, not what it says.",
          },
          {
            label: "Check why it never rotated: ls /etc/logrotate.d and grep for app.log",
            verdict: "good",
            result: "A log that large with no rotated siblings means rotation never ran for it. That is the real question.",
            next: "rotate",
          },
          {
            label: "truncate -s 0 /var/log/app.log",
            verdict: "detour",
            result: "The space comes back instantly, and so does the problem. Without finding why it grew, you will be paged again the same way next month.",
          },
        ],
      },
      rotate: {
        evidence: ["$ ls /etc/logrotate.d", "apt  dpkg  nginx  rsyslog", "$ grep -r app.log /etc/logrotate.d", "(no output)"],
        question: "There is no rotation rule for app.log. You have your answer. What did you find?",
        choices: [
          {
            label: "The app log has no logrotate rule, so it grew without limit",
            verdict: "good",
            result: "That is the root cause. Nothing was wrong with the disk, the app or the cron schedule.",
            next: "done",
          },
          {
            label: "The disk is failing and reporting the wrong size",
            verdict: "wrong",
            result: "Nothing in the evidence points at hardware. df and du agree, and the file is really 38 GB.",
          },
          {
            label: "The app has a bug that writes too much",
            verdict: "detour",
            result: "Possible, but you cannot say that from this evidence. The proven fact is the missing rule. Fix that, then watch the growth rate.",
          },
        ],
      },
    },
    rootCause: "One application log had no rotation rule and grew without limit until it filled the disk.",
    fix: "Add a logrotate rule, set a disk-usage alert at 80%, then watch it for two weeks to confirm it stays flat.",
  },
  {
    id: "wifi",
    title: "The laptop that keeps dropping Wi-Fi",
    domain: "Networking",
    report: "One laptop loses its Wi-Fi connection every so often. Phones and the other laptop on the same router are fine.",
    start: "scope",
    nodes: {
      scope: {
        evidence: ["Affected: one laptop", "Not affected: 2 phones, 1 desktop, 1 other laptop", "Router uptime: 41 days"],
        question: "Only one device is affected. Where do you start?",
        choices: [
          {
            label: "Reboot the router",
            verdict: "wrong",
            result: "Four other devices are happily connected through it. The router is working, and a reboot would just reset your evidence.",
          },
          {
            label: "Look for a pattern: when exactly does the laptop drop?",
            verdict: "good",
            result: "A fault that hits one device is about that device, and a pattern in the timing narrows it quickly.",
            next: "pattern",
          },
          {
            label: "Buy a new router",
            verdict: "wrong",
            result: "That is an expensive guess against evidence that says the router is fine for everything else.",
          },
        ],
      },
      pattern: {
        evidence: [
          "$ journalctl -u NetworkManager | grep -i disconnect",
          "10:02:11 wlan0: disconnected (reason 3)",
          "10:48:40 wlan0: disconnected (reason 3)",
          "11:31:05 wlan0: disconnected (reason 3)",
          "(each one follows ~10 min with no user activity)",
        ],
        question: "Every drop follows a stretch of idling. What is your next check?",
        choices: [
          {
            label: "Change the router's Wi-Fi channel",
            verdict: "detour",
            result: "Interference does not care whether you are idle. This is a long way from the pattern you just found.",
          },
          {
            label: "iw dev wlan0 get power_save",
            verdict: "good",
            result: "Idle-triggered drops on one adapter is the classic signature of aggressive power saving.",
            next: "power",
          },
          {
            label: "Reinstall the operating system",
            verdict: "wrong",
            result: "Far too heavy for a fault with a clear signature. Test the cheap, specific theory first.",
          },
        ],
      },
      power: {
        evidence: ["$ iw dev wlan0 get power_save", "Power save: on"],
        question: "Power save is on. What do you do?",
        choices: [
          {
            label: "Turn it off for this session, then watch for a drop",
            verdict: "detour",
            result: "Good instinct, but it is only half the job. A runtime setting resets on reboot, so make it permanent after you have proven it.",
          },
          {
            label: "Disable power save, make it persistent in NetworkManager, and watch for a drop",
            verdict: "good",
            result: "Change one thing, make it stick, and verify under the original conditions.",
            next: "done",
          },
          {
            label: "Ignore it. Power save is normal.",
            verdict: "wrong",
            result: "It is normal, and it is also exactly what the logs implicate. The evidence says this adapter handles it badly.",
          },
        ],
      },
    },
    rootCause: "Wi-Fi power saving was dropping the link whenever the laptop sat idle.",
    fix: "Disable power save and persist it in NetworkManager, then confirm no drops across a few idle periods.",
  },
];
