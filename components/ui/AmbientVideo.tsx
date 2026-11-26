"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/media";

/** Phones get the `mobileSrc` cut when one exists. */
export const MOBILE_VIDEO = "(max-width: 767px)";

interface AmbientVideoProps {
  src: string;
  /** A smaller, portrait cut for phones. */
  mobileSrc?: string;
  poster?: string;
  className?: string;
  label?: string;
}

/**
 * A muted, looping demo clip that plays only while on screen. It stays on the poster frame
 * under reduced motion or Data Saver, and doesn't download the video until it is near view.
 */
export function AmbientVideo({ src, mobileSrc, poster, className, label }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia(MOBILE_VIDEO);
    const isMobile = () => Boolean(mobileSrc) && mq.matches;
    const pick = () => (isMobile() ? mobileSrc! : src);
    // The poster is a landscape frame; on phones the portrait cut would only show it cropped.
    const syncPoster = () => {
      if (!poster) return;
      if (isMobile()) video.removeAttribute("poster");
      else video.setAttribute("poster", poster);
    };
    syncPoster();

    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const stillOnly = prefersReducedMotion() || nav.connection?.saveData;
    const showFirstFrame = () => {
      // No usable poster: load just the first frame so the frame isn't empty.
      if (poster && !isMobile()) return video.removeAttribute("src");
      video.preload = "metadata";
      video.setAttribute("src", `${pick()}#t=0.1`);
    };

    let visible = false;
    const onBreakpoint = () => {
      syncPoster();
      if (stillOnly) return showFirstFrame();
      if (!video.getAttribute("src")) return;
      video.setAttribute("src", pick());
      if (visible) video.play().catch(() => {});
    };
    mq.addEventListener("change", onBreakpoint);

    if (stillOnly) {
      showFirstFrame();
      return () => mq.removeEventListener("change", onBreakpoint);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!video.getAttribute("src")) video.setAttribute("src", pick());
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      mq.removeEventListener("change", onBreakpoint);
    };
  }, [src, mobileSrc, poster]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-portrait-mobile={mobileSrc ? "" : undefined}
      className={className}
    />
  );
}
