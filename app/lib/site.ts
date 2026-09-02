export const siteConfig = {
  name: "Brian Kareithi",
  fullName: "Brian Kareithi",
  role: "Fullstack Developer, React Native & Cybersecurity Specialist",
  url: "https://kareithi.vercel.app",
  title: "Brian Kareithi | Fullstack Developer, React Native & Cybersecurity Specialist",
  description:
    "Brian Kareithi is a Fullstack Developer, React Native Developer, and Cybersecurity Specialist from Nairobi, Kenya. Specializing in Next.js, React, TypeScript, and secure cloud-native applications. 50+ projects delivered, 5+ years in tech.",
  email: "kareithibrian2@gmail.com",
  phone: "+254718593392",
  phoneDisplay: "+254 718 593 392",
  location: "Nairobi, Kenya",
  github: "https://github.com/Brian-Kareithi",
  linkedin: "https://www.linkedin.com/in/brian-kareithi-04007637b/",
  instagram: "https://www.instagram.com/kareithiv",
  ogImage:
    "https://ppkfgsakvcijmmhjwbcz.supabase.co/storage/v1/object/public/Photos/kareithi.jpg",
} as const;

export type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export function pageMeta({ title, description, path }: PageMeta) {
  const url = `${siteConfig.url}${path}`;
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
      images: [{ url: siteConfig.ogImage, width: 800, height: 800, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
  };
}