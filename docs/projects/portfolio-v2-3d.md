# Portfolio V2 (3D)

> Scroll-driven 3D portfolio built with Three.js

**Status:** Shipped · **Access:** Private repository · [Live demo](https://portfoliov2-ruby.vercel.app/)

## Purpose

Show range beyond standard UI: real-time 3D and scroll-driven storytelling carrying the full resume.

## Problem

My first portfolio proved clean UI. This one shows range: real-time 3D and scroll-driven storytelling.

## Target audience

| Audience | Needs |
| --- | --- |
| Portfolio visitors | A clear view of the same experience in a more visual format. |
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

1. A Three.js scene choreographed to scroll
2. Light and dark themes across the scene and content
3. Full portfolio content, from hero to contact
4. A section linking V1 and V2 to show growth

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

Solo build. 3D scene, scroll choreography, theming and content.
