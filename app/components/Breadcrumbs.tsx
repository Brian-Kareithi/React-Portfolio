"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/app/lib/site";

export const breadcrumbMap: Record<string, { label: string; name: string }> = {
  "/about": { label: "About", name: "About Brian Kareithi" },
  "/expertise": { label: "Expertise", name: "Expertise & Capabilities" },
  "/engineering": { label: "Engineering", name: "Engineering Approach" },
  "/troubleshooting": { label: "Diagnostics", name: "Troubleshooting Method" },
  "/techstack": { label: "Tech Stack", name: "Technical Stack" },
  "/projects": { label: "Selected Work", name: "Projects & Experiments" },
  "/contact": { label: "Contact", name: "Contact Brian Kareithi" },
  "/hobbies": { label: "Homelab", name: "Homelab & Gear" },
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const entry = breadcrumbMap[pathname];
  if (!entry) return null;

  const items = [
    { name: "Home", path: "/", position: 1 },
    { name: entry.name, path: pathname, position: 2 },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="mb-10">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] xs:text-[11px]">
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" style={{ color: "var(--color-text-muted)" }}>
                  /
                </span>
              )}
              {index < items.length - 1 ? (
                <Link
                  href={item.path}
                  className="uppercase tracking-widest transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="uppercase tracking-widest"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
