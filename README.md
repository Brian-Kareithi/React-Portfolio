# React Portfolio

A modern, professional multi-page portfolio for Brian Kareithi — Fullstack Developer, Cybersecurity Engineer & React Native Developer from Nairobi, Kenya.

Built with an **Editorial Cobalt** design language: flat surfaces, hairline borders, a single cobalt accent, serif-italic accent words, mono labels, and dark/light themes.

## Pages

- **`/`** — Compact landing page with typewriter roles, portrait, and quick links
- **`/about`** — Professional journey, education, certifications & experience timeline
- **`/techstack`** — Technologies categorized by proficiency
- **`/projects`** — Work & experiments with expandable case details
- **`/contact`** — Contact form + direct channels
- **`/hobbies`** — Homelab showcase (servers, sensors, self-hosted gear)

Each page is a real route with its own active navigation state (true multi-page architecture).

## Features

- **Multi-page routing** with per-route active nav state
- **Dark / Light theme** — persistent via localStorage + system preference
- **First-visit loader** — a minimal splash shown once per session (gsap animation)
- **GSAP animations** — scroll reveals, stagger reveals, count-ups, parallax, scroll progress
- **Optimized images** — Next.js `<Image>` with lazy loading & blur
- **Accessibility** — reduced-motion support, `:focus-visible` rings, `aria-live` typewriter
- **SEO** — metadata, Open Graph, Twitter cards, sitemap & robots
- **Security headers** — set via `next.config.ts`
- **Responsive** — mobile-first with Tailwind CSS v4
- **Custom 404 page**

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP + ScrollTrigger
- **Email:** EmailJS (`@emailjs/browser`)
- **Icons:** React Icons & Lucide
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

The contact form uses EmailJS. Credentials (public key, service ID, template ID) are configured directly in `app/contact/page.tsx`. See the EmailJS dashboard for your IDs.

## Deployment

Deployed on Vercel at [https://kareithi.vercel.app](https://kareithi.vercel.app).
