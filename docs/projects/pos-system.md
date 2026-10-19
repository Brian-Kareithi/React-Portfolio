# POS System

> Point of sale for multi-branch retail

**Status:** Active · **Access:** Client project: source is proprietary · [Live demo](https://pos-zeta-eight.vercel.app/)

## Purpose

Give a multi-branch shop one system for selling, stock, accounts and a trustworthy record of every change.

## Problem

A shop needs one place to sell at the till, track stock across branches and expiry batches, and see exactly who changed a price, gave a discount or voided a sale.

## Target audience

| Audience | Needs |
| --- | --- |
| Owner | See sales, profit and cash flow across every branch, and who changed what. |
| Manager | Watch stock, reorder in time and review the day. |
| Cashier | Sell quickly with cash, card, M-Pesa or bank transfer. |
| Stockkeeper | Receive stock into the right branch and batch, with expiry dates. |

## Scope

### In scope

- Till with scan or tap selling
- Stock by branch with expiry batches
- Reorder and busy-hour insights
- Accounting for any period
- Audit log of price changes, discounts, voids and refunds
- CSV, Excel and PDF exports

### Out of scope

- Customer-facing storefront
- Supplier portal
- Payroll

## Solution

1. A till with scan-or-tap selling and keyboard shortcuts for search, charge, hold and discount
2. Stock by branch, with expiry batches and low-stock status
3. Reorder and busy-hour insights drawn from the shop's own sales history
4. Income, expenses and profit for any period, exported to CSV, Excel and PDF
5. An audit log of price changes, discounts, voids and refunds

## Architecture

Till & Back Office UI → API Layer → Branch Data Store

Branch from *API Layer*: Roles & Audit Trail.

## Data model

The data model is kept private with the client's source. The live demo exposes branches, stock batches with expiry, sales, accounts and an audit trail.

## Design priorities

- Fast at the till
- Every sensitive action is traceable
- Role-based access

## Technology

Next.js · TypeScript · Tailwind CSS

## My contribution

Client work, in progress. I am building the till, the back office and the audit trail end to end.
