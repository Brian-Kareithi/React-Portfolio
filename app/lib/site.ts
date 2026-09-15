export const siteConfig = {
  name: "Brian Kareithi",
  fullName: "Brian Kareithi",
  role: "Software Engineer : Web, Mobile & Cloud-Native Systems",
  tagline: "I build secure, cloud-native products, from React Native apps to hardened infrastructure.",
  url: "https://kareithi.vercel.app",
  title: "Brian Kareithi | Software Engineer : Web, Mobile & Cloud-Native Systems",
  description:
    "Brian Kareithi is a Software Engineer based in Nairobi, Kenya, building secure web and mobile products with Next.js, React Native and TypeScript, from architecture through deployment. IT support and infrastructure background, 6 certifications, 50+ projects delivered.",
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