# Steadfast Library Portal

> Librarian workspace for a school library

**Status:** Shipped · **Access:** Private school system

## Purpose

Give the school librarian one workspace for the catalogue, the issue desk, reservations and fines.

## Problem

The school library tracked books, loans and fines by hand, so nobody could say which copies were out, who was overdue or what to buy next. The librarian needed one workspace for the catalogue, the issue desk and the fines book.

## Target audience

| Audience | Needs |
| --- | --- |
| Librarian | Issue and return books quickly, chase overdue loans and settle fines without a paper ledger. |
| Students and staff | Reserve a book and know roughly when it will be free. |
| School administration | Usage reports and a clear record of what the library asked to buy. |

## Scope

### in the scope

- Catalogue with copies, barcodes, bulk import and CSV export
- Issue and return by search or barcode scan
- Reservations with queue positions
- Fines ledger: pay, adjust, waive, resolve, mark lost
- Purchase requests, copy transfers and usage reports

### Out of scope

- Borrower self-service kiosk
- Online payment of fines
- Catalogue data from outside the school

## Solution

1. A catalogue with copies tracked by accession number and barcode, bulk import and CSV export
2. A step-by-step issue desk: search by title, author or ISBN, or scan a barcode to look up and select the book, then return it the same way
3. Reservations with queue positions and an estimate of when each copy will be free
4. A fines ledger for recording payments, adjusting, waiving or resolving fines, and marking books lost
5. Purchase requests from request to fulfilment, copy transfers between locations, and usage reports

## Architecture

Next.js Workspace → Library API Client → Steadfast REST API

Branch from *Next.js Workspace*: Librarian-only Session Guard.

## Data model

No local database. The portal reads and writes through the shared Steadfast REST API, and the data model lives in the backend repository.

## Design priorities

- Fast at the issue desk
- Every fine change recorded
- Only librarians can sign in

## Technology

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · REST API

## My contribution

Built the frontend: catalogue, issue desk, reservations, fines, reports and the app shell, on the shared Steadfast backend.
