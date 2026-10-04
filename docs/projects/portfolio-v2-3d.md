# Portfolio V2 (3D)

> Scroll-driven 3D portfolio experience built with Three.js

**Status:** Shipped · **Access:** Private repository · [Live demo](https://portfoliov2-ruby.vercel.app/)

## Purpose

Show range beyond standard UI: real-time 3D and scroll-driven storytelling carrying the full resume.

## Problem

My first portfolio proved I could ship clean UI, but I wanted a second version that showed range: real-time 3D, scroll-choreographed storytelling and a themeable experience, while still carrying the full resume (about, projects, experience, contact).

## Target audience

| Audience | Needs |
| --- | --- |
| Recruiters and hiring managers | The same facts as a conventional resume, presented memorably. |
| Creative-technology teams | Evidence of Three.js and animation craft. |

## Scope

### In scope

- Scroll-choreographed Three.js scene
- Light and dark themes across scene and content
- About, projects, experience and contact sections
- Preloader and section transitions

### Out of scope

- Backend or CMS
- Mobile-specific 3D optimisation beyond a responsive layout

## Solution

1. A Three.js experience canvas choreographed to scroll, with preloader and section transitions
2. Light/dark theme toggle carried across the 3D scene and the content layer
3. Full portfolio content: hero, about and skills grid, project archive, experience cards, contact dashboard
4. Personal-portfolio lineage section linking V1 (Vite) and V2 (Next.js) to show growth

## Architecture

Vite Frontend → Three.js Scene → GSAP Scroll Rig

## Data model

No database. All sections read from static content defined in the front end.

## Design priorities

- Smooth scroll-linked animation
- Theme parity between 3D and DOM layers

## Technology

Vite · Three.js · JavaScript · GSAP · CSS3

## My contribution

Solo build: the 3D scene, scroll choreography, theming and all content sections.
