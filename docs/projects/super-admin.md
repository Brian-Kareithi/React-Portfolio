# Steadfast Super Admin

> Native Android port of a school's super-admin portal

**Status:** Shipped · **Access:** Private repository. Signing in needs a Steadfast super-admin account

## Purpose

Let a school's super admins do everything the web portal does from an Android phone, against the same backend.

## Problem

Steadfast's super admins run the whole school from a Next.js web portal, covering users, classes, discipline, leave, exams and the timetable. It was built for a desktop, with a sidebar, wide tables and hover menus, so I rebuilt it as a native Android app with the same features.

## Target audience

| Audience | Needs |
| --- | --- |
| Super admins | Approve, assign and fix things across users, classes, discipline, leave, exams and the timetable while away from a desk. |
| School leadership | See what is waiting on them and hear about new notifications without opening a laptop. |

## Scope

### in the scope

- All 29 web portal modules, with the same tabs, dialogs and actions
- Sign-in with two-factor, trusted devices, password reset and forced password change
- Smart search, quick actions and a notification bell
- Background notification polling and deep links into any screen

### Out of scope

- Roles other than super admin
- A separate mobile backend or API
- iOS

## Solution

1. Every screen, tab, dialog and action from the web portal, across 29 modules in four sections: Overview, Manage, Operations and System
2. Uses the same REST API as the web. A 401 triggers one token refresh shared by every request in flight, then one retry, and losing signal never signs you out
3. The refresh token is encrypted with AES-256-GCM under an Android Keystore key, replacing the web's httpOnly cookie. Any account that isn't a super admin is signed out right after login
4. A small port of TanStack Query: one cache per key, refetching when data goes stale or the app returns, and invalidation by key prefix
5. Desktop layouts become a drawer, bottom sheets and stacked cards under liquid-glass chrome, with smart search, deep links and background notification polling

## Architecture

Compose UI → Query Cache → ApiClient (OkHttp) → Steadfast REST API

Branch from *ApiClient (OkHttp)*: Keystore Token Refresh.

## Data model

No local database. The app reads and writes through the same Steadfast REST API as the web portal, and the data model lives in the backend. The phone keeps only the Keystore-encrypted refresh token, preferences and a cached copy of the user's quick actions.

## Design priorities

- Matches the web portal feature for feature
- Tokens never stored in plain text
- Dropping offline never ends the session

## Technology

Kotlin · Jetpack Compose · Material 3 · Navigation Compose · OkHttp · kotlinx.serialization · DataStore · Android Keystore · WorkManager · Coil · Haze

## My contribution

Solo build. Networking and auth, the query cache, the app shell, every module's screens and 44 unit tests, with a small manual DI container instead of Hilt.
