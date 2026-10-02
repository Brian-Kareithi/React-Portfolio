# React Portfolio

A modern, professional multi-page portfolio for Brian Kareithi — Fullstack Developer, Cybersecurity Engineer & React Native Developer from Nairobi, Kenya.

Built with an **Editorial Cobalt** design language: flat surfaces, hairline borders, a single cobalt accent, serif-italic accent words, mono labels, and dark/light themes.

## Pages

- **`/`** — Landing page: positioning, availability, featured project, and quick links
- **`/about`** — Professional journey, education, certifications & experience timeline
- **`/how-i-work`** — Principles, stack by layer, delivery workflow, capabilities & toolbox
- **`/troubleshooting`** — Diagnostic method with real field case studies
- **`/projects`** — Work & experiments with expandable case details
- **`/homelab`** — 24/7 homelab as infrastructure proof (servers, network, automation)
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
- **Icons:** Lucide (brand glyphs on /how-i-work via React Icons)
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

### FRIDAY (Firebase + Claude)

FRIDAY's Anthropic key is stored as a Firebase Function secret and is never sent to the browser. The Firebase function verifies Firebase App Check requests before calling Claude.

1. Create/select a Firebase project, install the Firebase CLI, then run `firebase login` and `firebase use --add` from this repository.
2. In the Firebase console, register a Web app and enable **App Check** with reCAPTCHA v3. Add your local and production site domains to the reCAPTCHA key's allowed domains.
3. Add the web app's settings, your reCAPTCHA v3 **site key** and the deployed function URL to `.env.local`:

   ```dotenv
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY=...
   NEXT_PUBLIC_FRIDAY_FUNCTION_URL=https://us-central1-your-project.cloudfunctions.net/friday
   ```

4. Create an Anthropic API key and store it in Firebase Secret Manager (do not put it in source code, `.env.local`, or any `NEXT_PUBLIC_` variable). `YOUR_ANTHROPIC_API_KEY` is only a placeholder name; enter the real replacement key when prompted:

   ```powershell
   firebase functions:secrets:set ANTHROPIC_API_KEY
   ```

5. Install and deploy the backend from the repository root:

   ```powershell
   cd functions
   npm install
   npm run build
   cd ..
   firebase deploy --only functions
   ```

6. Set `.env.local` as above and run the Next.js app. Enable App Check enforcement for the deployed function after confirming requests from your registered site work. In local development, use the Firebase App Check debug provider/token as documented by Firebase and register its debug token in the Firebase console.

The function is named `friday`, runs in `us-central1` by default, accepts `{ "messages": [{ "role": "user" | "assistant", "content": "..." }] }`, and returns FRIDAY's reply as plain text. Anthropic API usage and Firebase Functions may require billing to be enabled on their respective accounts.

## Deployment

Deployed on Vercel at [https://kareithi.vercel.app](https://kareithi.vercel.app).

Last updated: September 2026.
