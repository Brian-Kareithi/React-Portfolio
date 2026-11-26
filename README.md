# Brian Kareithi, Portfolio

A multi-page portfolio for Brian Kareithi, a full-stack developer with an IT and security background, based in Nairobi, Kenya.

Live: https://kareithi.vercel.app

## Pages

- `/` Introduction with a looping hero reel, featured work, live homelab status and an index of every page
- `/about` Journey, education, certifications and experience
- `/how-i-work` Why the work holds up, principles, stack by layer, delivery, standards and toolbox
- `/projects` Case studies, the POS system, an archive of smaller builds
- `/contact` A contact form and direct channels
- `/homelab` The Proxmox homelab, with an interactive 3D network map and topology view
- `/troubleshooting` The diagnostic method, field notes and an interactive debugging case
- `/resume` A resume tailored to a chosen role, generated as a PDF in the browser
- `/games` A capture-the-flag terminal and a word game
- `/llms.txt` A machine-readable profile

## Stack

Next.js 16, React 19, TypeScript and Tailwind CSS v4. Lenis and GSAP for scroll, Three.js with React Three Fiber for the 3D homelab, EmailJS for the contact form and React PDF for the resume and case study documents.

## Notes

- Per-route metadata and JSON-LD structured data
- Respects `prefers-reduced-motion`, and the 3D map falls back to a light SVG on small or low-power devices
- A command palette on Ctrl+K

## Video

Videos live in `public/` and play through `components/ui/AmbientVideo.tsx`: muted, looping, loaded only when near the viewport, and paused off screen. Under reduced motion or Data Saver they show a still frame instead.

- **Hero reel**: `public/hero/brag-loop.mp4` (1080×1080), shown in a glass frame beside the hero copy on desktop and under it on phones and tablets.
- **Project demos**: set `video` on a case study in `data/projects.ts`. Add `mobileSrc` for a portrait cut and screens 767px wide or less get it instead of `src`, switching live if the viewport crosses the breakpoint. The poster is skipped on phones, since it is a landscape frame. QuickPrint uses `quickprint.mp4` (1920×1080) and `quickprint mobile.mp4` (1080×1920).

Keep clips short and compressed: the hero reel is about 0.6 MB and the QuickPrint cuts 2 to 3 MB.

## Project structure

```
app/            Routes only: each page.tsx composes sections and owns its metadata and JSON-LD
components/
  layout/       Site shell, header, mobile menu, footer, boot screen, scroll indicator
  effects/      Global behaviour with no markup: smooth scroll, heading reveals, magnetic buttons, cursor glow
  command-palette/  Ctrl+K palette: provider, dialog and trigger button
  seo/          JSON-LD and breadcrumbs
  ui/           Shared building blocks: PageHeader, Section, SectionHeading, Eyebrow, Reveal, NextSection, Toast…
  <page>/       Sections used by one page (home, about, how-i-work, projects, homelab, troubleshooting, resume, contact, games, backstage)
hooks/          Reusable client hooks (useLocalTime, useScrollProgress, useBodyScrollLock, useHomelabSnapshot)
lib/            Logic and config: site config, navigation, homelab API, CTF and word game engines, helpers
data/           Content as typed data: projects, resume, skills, homelab gear, timeline and so on
styles/         globals.css (tokens, base, shared utilities) and sections.css (page sections)
docs/           Generated project write-ups
```

Pages are server components. Only the parts that need state or the browser are client components, such as the timeline filter, the capability tabs, the carousel, the games and the contact form.

### Conventions

- Components are PascalCase files with a matching named export (`SiteHeader.tsx` exports `SiteHeader`). Next.js route files keep their default exports.
- Hooks live in `hooks/` as `useSomething.ts`; a hook used by only one feature sits beside it (`components/games/ctf/useSolvedMissions.ts`).
- `lib/` and `data/` modules are kebab-case. Content belongs in `data/`, behaviour in `lib/`.
- Imports use the `@/` alias from the project root.
- CSS classes are prefixed by area: `q-` shared system, `h-`/`hh-` home, `a-` about, `w-` how I work, `p-`/`pc-` projects, `l-`/`hs-`/`net-` homelab, `d-` diagnostics, `r-` resume, `c-` contact, `g-`/`wd-` games, `sf-` footer, `m-` mobile menu.

## Development

```bash
npm install
npm run dev
npm run build
npm run docs
```

`npm run docs` regenerates `docs/` from `data/projects.ts` and `data/project-docs.ts`.

## Deployment

Vercel deploys every push to `main` to production through its GitHub integration. A deploy shows up as a Vercel status check on the commit in GitHub.

If a push gets no Vercel check at all, the push event never reached Vercel. A failed or skipped build still leaves a check. To recover:

1. Vercel dashboard → the project → Deployments → the latest deployment → **Redeploy**, or push another commit (`git commit --allow-empty -m "Trigger deploy" && git push`).
2. If it keeps happening, check Vercel → Settings → Git that the repository is still connected, and GitHub → Settings → Applications → Vercel that the app still has access to this repository.
3. Check that the commit author email belongs to the GitHub account linked to Vercel, since Vercel can block deploys from authors it does not recognise.
