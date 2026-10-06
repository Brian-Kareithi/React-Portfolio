import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | Full-Stack Developer`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ece7f6",
    theme_color: "#14248a",
    icons: [
      { src: "/favicon_io/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon_io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
