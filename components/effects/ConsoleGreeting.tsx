"use client";

import { useEffect } from "react";

/** First clue of the robots.txt flag hunt, for visitors who open devtools. */
export function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      "%cHey, you opened the console.%c There is a flag hidden on this site. The trail is short: crawlers are told where not to go. Start at /robots.txt",
      "font: 600 14px monospace; color: #f2f4f3; background: #49111c; padding: 2px 6px",
      "font: 12px monospace",
    );
  }, []);

  return null;
}
