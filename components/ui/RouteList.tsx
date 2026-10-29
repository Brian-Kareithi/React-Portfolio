import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { NavRoute } from "@/lib/navigation";

function RouteRow({ route }: { route: NavRoute }) {
  return (
    <Link href={route.path} className="term-row group">
      <span className="term-num">{route.index}</span>
      <span className="term-name">{route.label}</span>
      <span className="term-desc">{route.description}</span>
      <ArrowRight className="term-arrow h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

/** Terminal-style list of pages, as on the home index and the 404 page. */
export function RouteList({ routes, reveal = false }: { routes: NavRoute[]; reveal?: boolean }) {
  return (
    <ul>
      {routes.map((route, i) => (
        <li key={route.path}>
          {reveal ? (
            <Reveal index={i}>
              <RouteRow route={route} />
            </Reveal>
          ) : (
            <RouteRow route={route} />
          )}
        </li>
      ))}
    </ul>
  );
}
