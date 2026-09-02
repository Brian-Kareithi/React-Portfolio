import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/home"],
      },
    ],
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}