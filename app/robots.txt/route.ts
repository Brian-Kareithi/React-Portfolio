import { NextResponse } from "next/server";
import { siteConfig } from "@/app/lib/site";

// Written by hand instead of robots.ts so it can carry a comment. The comment is part of the
// site's hidden flag trail (see /backstage).
const body = `# Crawlers: everything public is welcome.
User-agent: *
Allow: /
Disallow: /backstage

# Humans reading this: a Disallow line is a map, not a lock.
# Somebody told the robots to stay out of /backstage. What do you think is in there?

Sitemap: ${siteConfig.url}/sitemap.xml
`;

export function GET() {
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
