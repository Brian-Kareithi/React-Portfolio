import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date("2026-09-02");

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/expertise`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/engineering`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/troubleshooting`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/techstack`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/projects`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/hobbies`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}