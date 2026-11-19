# Steadfast HR Portal

> HR office portal for staff leave, letters and records

**Status:** Shipped · **Access:** Private school system

## Purpose

Give the school's HR office one portal for staff leave, tickets, letters and announcements, with read-only access to the records it needs.

## Problem

HR at the school coordinates staff leave, complaints, formal letters and parent announcements, and needs to look up staff and student records. Each of those lived in a different place, and HR may only decide some leave requests: others must go to the Principal.

## Target audience

| Audience | Needs |
| --- | --- |
| HR officer | Decide leave, handle complaints, issue letters and reach parents from one place. |
| Staff | Leave requests decided promptly by the right person. |
| Parents | Clear, targeted announcements and a route for complaints. |

## Scope

### in the scope

- Leave decisions with routing by requester
- Ticket triage, escalation and meetings
- Staff letters with PDF download
- Targeted parent announcements with a live preview
- Read-only staff, student, attendance and consent records
- Own leave, letters and profile

### Out of scope

- Recruitment and onboarding
- Payroll
- Editing student records

## Solution

1. A dashboard with a pending-approvals queue, today's attendance, the inbox and leave and ticket analytics
2. Leave decisions routed by who is asking: HR can approve most staff requests, while requests from senior staff go to the Principal
3. Tickets HR can claim, assign, escalate, schedule a meeting for and resolve, plus staff letters with PDF download
4. Announcements to the whole school, a class, a stream or chosen students, with scheduling, pinning and a live preview
5. Read-only staff and student records, with sensitive fields stripped before they are shown

## Architecture

Next.js Portal → Route Guard (proxy.ts) → API Client → Steadfast REST API

Branch from *Route Guard (proxy.ts)*: HR-only Role Check.

## Data model

No local database. The portal reads and writes through the shared Steadfast REST API, and the data model lives in the backend repository.

## Design priorities

- HR sees only what HR needs
- Approval goes to the right person
- Works on a phone as well as a desk

## Technology

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · REST API

## My contribution

Solo build of the frontend: every screen, the two-layer route guard, the command menu and the light and dark themes.
