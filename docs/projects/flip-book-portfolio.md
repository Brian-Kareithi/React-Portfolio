# Flip-Book Portfolio

> A portfolio bound as an interactive book, with a full page-flipping experience

**Status:** Shipped · **Access:** Private repository · [Live demo](https://flip-book-portfolio-omega.vercel.app/)

## Purpose

Present a portfolio as a bound book so the structure of the content is the interface.

## Problem

Portfolio sites all look the same: grids of cards and scroll sections. I wanted a portfolio that reads like a bound volume, where each chapter (identity, journey, tech stack, selected work, expertise, homelab, contact) is a leaf you physically turn.

## Target audience

| Audience | Needs |
| --- | --- |
| Recruiters and hiring managers | Skim chapters quickly and jump to what matters via the index. |
| Fellow developers | See what a non-standard portfolio interaction model looks like. |

## Scope

### In scope

- Page turning by drag, swipe and keyboard
- Index of leaves with reading progress
- Day and night themes
- Optional page-turn sound

### Out of scope

- Content management system
- User accounts

## Solution

1. A skeuomorphic book with drag-a-corner, swipe, arrow-key and Home/End page turning
2. Seventeen leaves from Cover and Title Page through eleven chapters to Finis and Back Cover
3. An Index of Leaves drawer for jumping to any chapter, with live reading progress
4. Candlelight day/night theme and toggleable page-turn sounds for atmosphere

## Architecture

Next.js Frontend → Book Engine (Page Flip) → Static Content

Branch from *Book Engine (Page Flip)*: Sound & Theme.

## Data model

No database. Content is a static, typed list of leaves (cover, title page, eleven chapters, finis, back cover) bundled with the app.

## Design priorities

- Interaction feels physical but stays accessible by keyboard
- Sound is opt-in
- Runs from static content

## Technology

Next.js · React · TypeScript · Tailwind CSS · Web Audio API

## My contribution

Designed and built solo: the book engine, the chapter content model, the candlelight theming and the sound design.
