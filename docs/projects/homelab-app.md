# Homelab

> Native Android dashboard for my self-hosted homelab

**Status:** Shipped · **Access:** Public repository. Build the APK with Gradle · [Source](https://github.com/Brian-Kareithi/Homelab)

## Purpose

Put a phone-friendly view of my self-hosted homelab in one app, without storing service credentials on the device.

## Problem

My homelab runs Jellyfin, the *arr stack, qBittorrent and Seerr behind a Homepage dashboard, which is clumsy on a phone. I wanted to check the whole lab from my pocket without putting service API keys on the device.

## Target audience

| Audience | Needs |
| --- | --- |
| Homelab owner | Check server health, media services and activity from a phone, at home or away. |
| Self-hosting tinkerer | A dashboard that reflects whatever services are configured on the server. |

## Scope

### in the scope

- Dashboard driven by Homepage's /api/services with CPU, RAM, disk and Docker status
- Activity feed for Jellyfin now-playing, the Sonarr queue and active torrents
- Per-service detail screens
- Automatic LAN vs Tailscale resolution with an offline snapshot cache
- Background checks with notifications for stopped containers, downtime or finished torrents

### Out of scope

- Managing or reconfiguring services from the app
- Storing Sonarr, Radarr or Jellyfin API keys on the device
- iOS

## Solution

1. Dashboard built from Homepage's /api/services: add a service on the server and it appears in the app, with CPU, RAM and disk gauges and Docker status
2. Talks to one URL only. Homepage's server-side widget proxy adds the Sonarr, Radarr and Jellyfin keys, so the app stores no service credentials
3. Auto mode probes the LAN for 1.5 s and falls back to Tailscale, re-checking when the network changes
4. Activity feed with Jellyfin now-playing, the Sonarr queue and active torrents, plus per-service detail screens
5. Offline snapshot cache, and a WorkManager check every 15 minutes that notifies when a container stops, the server goes down or a torrent finishes

## Architecture

Compose UI → Repository + Cache → Homepage API → Service Widgets

Branch from *Homepage API*: LAN / Tailscale Resolver.

## Data model

No database. The app reads from the Homepage API and caches snapshots locally for offline use; service credentials stay on the server-side widget proxy.

## Design priorities

- Single endpoint with no device-held service keys
- Works on LAN and over Tailscale
- Useful offline from cached snapshots

## Technology

Kotlin · Jetpack Compose · Material 3 · Retrofit · kotlinx.serialization · DataStore · WorkManager · Coil · Tailscale

## My contribution

Solo build. Networking, widget mappers, Compose UI, notifications and unit tests, with a small manual DI container instead of Hilt.
