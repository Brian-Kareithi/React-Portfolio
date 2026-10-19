# Flip-Book Portfolio

> A portfolio bound as an interactive book

**Status:** Shipped · **Access:** Private repository · [Live demo](https://flip-book-portfolio-omega.vercel.app/)

## Purpose

Present a portfolio as a bound book so the structure of the content is the interface.

## Problem

Portfolios all look the same. I wanted one that reads like a bound volume, where each chapter is a page you turn.

## Target audience

| Audience | Needs |
| --- | --- |
| Portfolio visitors | Skim chapters quickly and jump to the details that matter via the index. |
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

1. Drag, swipe or use the keyboard to turn pages
2. Seventeen leaves, from cover to back cover
3. An index drawer with live reading progress
4. Candlelight theme and optional page-turn sounds

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

Solo build. Book engine, content model, theming and sound.
