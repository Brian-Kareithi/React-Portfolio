# QuickPrint

> Print-shop management and customer ordering portal

**Status:** Shipped · **Access:** Public repository. Backend: github.com/Thee-Entity/QuickPrint-Backend · [Live demo](https://quickprint-ten.vercel.app/auth/login) · [Source](https://github.com/Brian-Kareithi/QuickPrint)

## Purpose

Run a print shop from one QR code: customers upload and pay from their phone, and the shop works a live queue.

## Problem

Cyber cafés and print shops run on WhatsApp attachments, flash drives and a shouted queue. QuickPrint gives each shop a QR code: customers upload, choose print options and see the price from their phone, and the shop works a live queue.

## Target audience

| Audience | Needs |
| --- | --- |
| Print-shop customers | Upload a file, choose print options and see the price from their own phone, with no app or account fuss. |
| Shop owners and cashiers | A live queue, payment status and daily numbers, without chasing WhatsApp attachments. |
| Platform admins | Oversight of every shop, plus controls for how long customer files are kept. |

## Scope

### In scope

- Shop-branded customer portal opened by QR code
- Live print queue and searchable orders
- Cash, M-Pesa, Airtel Money and bank payments
- Printable QR posters and shop branding
- Team and cashier access
- Revenue, peak-hour and printer analytics
- Super-admin console for shops, users and retention

### Out of scope

- Native mobile apps (installable web app instead)
- Card payments
- Printer drivers: jobs are printed from the shop's own machine

## Solution

1. Shop-branded upload portal reached by QR code, with print options, live pricing and order tracking
2. Live print queue with searchable orders and one-tap status updates
3. Cash, M-Pesa, Airtel Money and bank transfer, with payment status tracking
4. Printable QR posters, team and cashier access, and per-shop branding
5. Revenue, peak-hour and printer-utilisation analytics, plus a platform admin for super admins

## Architecture

Next.js Portal (QR Upload) → REST API → Database

Branch from *REST API*: Queue & Payments.

## Data model

Frontend in Next.js 16 talking to a separate REST backend (Thee-Entity/QuickPrint-Backend). The data model lives in the backend repository.

## Design priorities

- Customers need nothing but a phone browser
- Honest prices before the customer pays
- Files do not linger after an order is done

## Technology

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · REST API · Docker

## My contribution

Built the web app end to end: customer portal, shop dashboard, admin console and QR tooling. Backend in a separate repository.
