"use client";

import { usePathname } from "next/navigation";
import { pageRoutes, routes } from "@/lib/navigation";

/** "04 / 09": where this page sits in the site index. Renders nothing for unlisted paths. */
export function PageIndex() {
  const pathname = usePathname();
  const route = routes.find((r) => r.path !== "/" && r.path === pathname);
  if (!route) return null;
  const total = pageRoutes[pageRoutes.length - 1]?.index;
  return (
    <span className="q-head-count" aria-label={`Page ${Number(route.index)} of ${Number(total)}`}>
      <b>{route.index}</b> / {total}
    </span>
  );
}
