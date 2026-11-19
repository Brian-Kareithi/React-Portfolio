# Samsung TV Idle Screen

> Motorsport ambient screen for an idle Samsung Tizen TV

**Status:** Shipped · **Access:** Public repository. Runs on a PC on the same network as the TV · [Source](https://github.com/Brian-Kareithi/Samsung-TV)

## Purpose

Turn an idle Samsung TV into an ambient screen with the time, the weather and motorsport photos, opened automatically.

## Problem

An idle TV either shows a blank No Signal screen or sits on a streaming app's menu. The TV can't report its input, so I needed a way to tell when it was idle and show something worth looking at: a clock, the weather and race photos.

## Target audience

| Audience | Needs |
| --- | --- |
| Anyone in the room | Time and weather at a glance, and something better than No Signal on an idle TV. |

## Scope

### in the scope

- Idle detection over the Samsung TV WebSocket API
- Opening the page full screen on the TV
- Clock and Nairobi weather
- Rotating, credited motorsport wallpapers
- Tech-joke card
- Windows auto-start

### Out of scope

- A Tizen app installed on the TV
- Detecting HDMI input or No Signal (the TV doesn't expose it)
- Running without a PC on the network

## Solution

1. A Python watcher polls the TV over its WebSocket API and treats it as idle when it is on, no streaming app is visible and the screen itself isn't showing
2. After 5 idle minutes it opens the page in the TV browser and presses OK so it goes full screen. If someone switches input, it waits 15 minutes before reopening
3. Big Nairobi clock and Open-Meteo weather, independent of the TV's own settings
4. 243 Wikimedia Commons race photos across seven series, each credited on screen, rotating every 20 s with a Ken Burns drift
5. A tech-joke card with a fake blur, since the 2018 Tizen browser has no backdrop-filter, written in ES5 to run on it

## Architecture

Idle Watcher (Python) → Samsung TV WebSocket API → Tizen Browser → Idle Screen (ES5)

Branch from *Idle Screen (ES5)*: Heartbeat Ping.

## Data model

No database. Photos and jokes are static files (screen/photos.js, screen/quotes.js); the watcher keeps its state in memory and the TV pairing token in a local file.

## Design priorities

- Never interrupts someone watching
- Runs on a 2018 Tizen browser
- Every photo credited

## Technology

Python · samsungtvws · JavaScript (ES5) · HTML · CSS · Open-Meteo · JokeAPI · Tizen

## My contribution

Solo build. Idle detection, TV remote control, the idle screen, and curating and crediting the photo set.
