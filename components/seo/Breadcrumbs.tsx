"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";

const pageNames: Record<string, string> = {
  "/about": "About Brian Kareithi",
  "/troubleshooting": "Troubleshooting Method",
  "/projects": "Projects & Experiments",
  "/contact": "Contact Brian Kareithi",
  "/homelab": "Homelab & Infrastructure",
  "/how-i-work": "How I Work",
  "/resume": "Resume",
  "/games": "Minigames",
};

/** Screen-reader breadcrumb trail plus BreadcrumbList structured data for the current inner page. */
export function Breadcrumbs() {
  const pathname = usePathname();
  const name = pageNames[pathname];
  if (!name) return null;

  const items = [
    { name: "Home", path: "/" },
    { name, path: pathname },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${siteConfig.url}${item.path}`,
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>
    </>
  );
}
