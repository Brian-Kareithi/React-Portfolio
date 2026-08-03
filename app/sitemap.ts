import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://kareithi.vercel.app";
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/home`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/techstack`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/projects`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/hobbies`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
