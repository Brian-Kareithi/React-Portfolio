# React Portfolio

A modern, professional multi-page portfolio for Brian Kareithi — Fullstack Developer, Cybersecurity Engineer & React Native Developer from Nairobi, Kenya.

Built with an **Editorial Cobalt** design language: flat surfaces, hairline borders, a single cobalt accent, serif-italic accent words, mono labels, and dark/light themes.

## Pages

- **`/`** — Compact landing page with typewriter roles, portrait, and quick links
- **`/about`** — Professional journey, education, certifications & experience timeline
- **`/techstack`** — Technologies categorized by proficiency
- **`/expertise`** — Six hands-on skill domains with capabilities
- **`/engineering`** — Engineering principles, architecture & delivery workflow
- **`/troubleshooting`** — Diagnostic method with real field case studies
- **`/projects`** — Work & experiments with expandable case details
- **`/hobbies`** — Homelab showcase (servers, sensors, self-hosted gear)
- **`/contact`** — Contact form + direct channels
- **`/llms.txt`** — Machine-readable profile for LLM/AI tools

Each page is a real route with its own active navigation state (true multi-page architecture).

## Features

- **Multi-page routing** with per-route active nav state
- **Per-page SEO** — unique titles, meta descriptions, canonical URLs, Open Graph & Twitter cards
- **Structured data** — Organization, Person & ProfessionalService (LocalBusiness) JSON-LD plus BreadcrumbList on every inner page
- **Breadcrumbs & internal linking** — navigable trails and contextual "keep exploring" link blocks so every page links onward
- **Dark / Light theme** — persistent via localStorage + system preference
- **Lightweight animations** — IntersectionObserver-based scroll reveals and count-ups (no animation library)
- **Optimized images** — Next.js `<Image>` with lazy loading & blur
- **Accessibility** — reduced-motion support, `:focus-visible` rings, `aria-live` typewriter
- **SEO plumbing** — `sitemap.xml`, `robots.txt`, custom brand 404 page
- **Security headers** — set via `next.config.ts`
- **Responsive** — mobile-first with Tailwind CSS v4

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** IntersectionObserver + CSS transitions
- **Email:** EmailJS (`@emailjs/browser`)
- **Icons:** Lucide (brand glyphs on /techstack via React Icons)
- **Analytics:** Vercel Analytics

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Environment

The contact form uses EmailJS. Credentials (public key, service ID, template ID) are configured directly in `app/contact/Client.tsx`. See the EmailJS dashboard for your IDs.

## Deployment

Deployed on Vercel at [https://kareithi.vercel.app](https://kareithi.vercel.app).

Last updated: September 2026.