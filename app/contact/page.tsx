import type { Metadata } from "next";
import ContactClient from "./Client";
import { pageMeta, siteConfig } from "@/app/lib/site";
import { JsonLd } from "@/app/components/JsonLd";

const description =
  "Get in touch with Brian Kareithi for full-stack development, React Native apps, cybersecurity work or collaboration. Based in Nairobi, Kenya, working with clients worldwide. Typically replies within 24 hours.";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description,
  path: "/contact",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${siteConfig.url}/contact`,
  name: "Contact Brian Kareithi",
  description,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactClient />
    </>
  );
}