# Brian Kareithi, Portfolio

A multi-page portfolio for Brian Kareithi, a full-stack developer with an IT and security background, based in Nairobi, Kenya.

Live: https://kareithi.vercel.app

## Pages

- `/` Introduction, a scroll journey from the screen down to the network, and shipped work
- `/about` Journey, education, certifications and experience
- `/how-i-work` Why the work holds up, principles, stack by layer, delivery, standards and toolbox
- `/projects` Case studies, the POS system, an archive of smaller builds
- `/contact` A contact form and direct channels
- `/homelab` The 19-device Proxmox homelab, with an interactive network map
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

## Development

```bash
npm install
npm run dev
npm run build
npm run docs
```

`npm run docs` regenerates `docs/` from `app/lib/projects-data.ts` and `app/lib/project-docs.ts`.
