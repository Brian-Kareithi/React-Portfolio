import { useSyncExternalStore } from "react";

/** Live match state for a CSS media query. False on the server, so the first paint is the same everywhere. */
export default function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
