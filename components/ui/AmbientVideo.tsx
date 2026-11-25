"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/media";

interface AmbientVideoProps {
  src: string;
  poster: string;
  className?: string;
  label?: string;
}

/**
 * A muted, looping demo clip that plays only while on screen. It stays on the poster frame
 * under reduced motion or Data Saver, and doesn't download the video until it is near view.
 */
export function AmbientVideo({ src, poster, className, label }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (prefersReducedMotion() || nav.connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.setAttribute("src", src);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

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
      className={className}
    />
  );
}
