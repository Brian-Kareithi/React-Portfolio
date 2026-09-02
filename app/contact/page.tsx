import type { Metadata } from "next";
import ContactClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Get in touch with Brian Kareithi for full-stack development, React Native apps, cybersecurity work or collaboration. Based in Nairobi, Kenya, working with clients worldwide — typically replies within 24 hours.";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}