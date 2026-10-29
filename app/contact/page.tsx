import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMeta, siteConfig } from "@/lib/site";

const description =
  "Contact Brian Kareithi in Nairobi, Kenya about a project, a collaboration, his work, or anything else worth discussing.";

export const metadata: Metadata = pageMeta({
  title: "Contact Brian Kareithi",
  heading: "Contact",
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
    <div id="contact" className="q-page">
      <JsonLd data={jsonLd} />
      <div className="q-wrap">
        <PageHeader
          index="04"
          label="Contact"
          title={<>Say <em>hello</em></>}
          description="Questions, ideas, collaborations or just a hello. I read every message myself and reply within a day."
        />

        <div className="c-layout">
          <ContactChannels />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
