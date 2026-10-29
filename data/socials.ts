import { Github, Instagram, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site";

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const github: SocialLink = { label: "GitHub", href: siteConfig.github, icon: Github };
export const linkedin: SocialLink = { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin };
export const instagram: SocialLink = { label: "Instagram", href: siteConfig.instagram, icon: Instagram };
export const email: SocialLink = { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail };

export const allSocials = [github, linkedin, instagram, email];
