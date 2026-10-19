export const siteConfig = {
  name: "Brian Kareithi",
  fullName: "Brian Kareithi",
  role: "Full-Stack Developer, Web, Mobile & Cloud-Native Systems",
  tagline: "Full-stack developer trained in IT and security. I build web and mobile products that hold up in the real world, and I am good at what I do.",
  url: "https://kareithi.vercel.app",
  title: "Brian Kareithi | Full-Stack Developer in Nairobi, Kenya",
  description:
    "Full-stack developer in Nairobi, Kenya. I build secure web and mobile products with Next.js, React Native and TypeScript. Trained in IT and security.",
  email: "kareithibrian2@gmail.com",
  phone: "+254119343294",
  phoneDisplay: "+254 119 343 294",
  location: "Nairobi, Kenya",
  lastUpdated: "2026-10-07",
  github: "https://github.com/Brian-Kareithi",
  linkedin: "https://www.linkedin.com/in/brian-kareithi-04007637b/",
  instagram: "https://www.instagram.com/kareithi._/",
  ogImage:
    "https://kareithi.vercel.app/kareithi.jpg",
} as const;

export type PageMeta = {
  title: string;
  heading?: string;
  description: string;
  path: string;
};

export function ogImageFor(title: string, subtitle: string) {
  return {
    url: `/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`,
    width: 1200,
    height: 630,
    alt: `${title} | ${siteConfig.name}`,
  };
}

export function pageMeta({ title, heading, description, path }: PageMeta) {
  const url = `${siteConfig.url}${path}`;
  const image = ogImageFor(heading ?? title, description.length > 120 ? `${description.slice(0, 117).trimEnd()}…` : description);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image.url],
    },
  };
}
