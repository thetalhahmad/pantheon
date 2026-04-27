# Econos Partner Dashboard — Design Spec
**Date:** 2026-04-27
**Phase:** Phase 4 — Partner Portal, Main Dashboard
**Status:** Approved, ready for implementation
**Figma file:** RSqhYxJzRB87uMM9p4IxGx

---

## Overview

Two connected views sharing one shell: **Firm Home** (accounting firm sees all clients) and **Client Dashboard** (drill into a specific client). Full context switch between views — the sidebar transforms, the content transforms, but the shell persists. Competitive target: Fivaldi. Differentiators: multi-client intelligence, AI insights, visual analytics, action-oriented design.

---

## Competitive Reference

Fivaldi main dashboard has: single-company view only, 7 basic widgets (notifications, open tasks, bank accounts, cash flow chart, AR, AP), no cross-client view, no AI, no visual analytics, form-heavy enterprise aesthetic.

Econos beats Fivaldi on: firm-level multi-client overview, AI cash flow forecasting, invoice pipeline funnel, transaction confidence scoring, 14-day deadline strip, priority feed across all clients.

---

## Global Shell

### Left Sidebar — 240px, always visible

**Background:** `#1E1B4B` (dark indigo)  
**Text:** white / `rgba(255,255,255,0.6)` for secondary

**Top section:**
- Econos logo mark (indigo `#6366F1` square 28px, cornerRadius 6px) + "Econos" wordmark, Inter Semi Bold 16px, white
- Global search bar — placeholder "Search clients, invoices, transactions…", `rgba(255,255,255,0.08)` bg, `border-radius: 8px`, height 36px, magnifier icon left, Inter Regular 13px

**Navigation items** (Phosphor icons, Regular weight, 20px):
- Home — `House`
- Clients — `Buildings`
- Tasks — `Lightning`
- Invoices — `Receipt`
- Reports — `ChartBar`
- Settings — `Gear`

Active state: `rgba(99,102,241,0.2)` background, `#6366F1` left border 3px, white text. Inactive: `rgba(255,255,255,0.6)` text. Height 40px per item, `border-radius: 8px`, padding 0 12px. Item spacing 2px.

**Recent Clients section** (below nav, label "Recent" Inter Medium 11px `rgba(255,255,255,0.4)`, uppercase, letter-spacing 1px):
- 3 most recently accessed clients
- Each row: health dot (8px, green/amber/red) + company name (Inter Medium 13px, white) + one-click → context switch
- `rgba(255,255,255,0.04)` hover background

**Bottom section:**
- Firm name: "Protax Oy" — Inter Semi Bold 13px, white
- User avatar (32px circle, initials) + name + role ("Kirsti · Firm Admin") — Inter Regular 12px, `rgba(255,255,255,0.6)`
- Separator: `rgba(255,255,255,0.08)` 1px horizontal line above

### Sidebar — Client Context (after context switch)

Replaces firm nav entirely:

**Top:**
- ← back arrow + "Back to firm" — Inter Regular 13px, `rgba(255,255,255,0.6)`, clickable
- Client company name — Inter Semi Bold 18px, white (truncated to 2 lines)
- Y-tunnus below — Inter Regular 12px, `rgba(255,255,255,0.5)`

**Navigation items:**
- Overview — `House`
- Invoices — `Receipt`
- Purchases — `ShoppingBag`
- Bank — `Bank`
- VAT — `Percent`
- Payroll — `Users`
- Reports — `ChartBar`

**Bottom:** unchanged (firm name + user)

### Main Content Area

**Background:** `#F8FAFC` (light slate)  
**Content max-width:** 1200px, centered, padding 32px  
**Card style:** white `#FFFFFF`, `border-radius: 12px`, `box-shadow: 0 1px 4px rgba(0,0,0,0.06)`, padding 24px

---

## View 1 — Firm Home

### Header

- "Good morning, Kirsti." — Inter Semi Bold 24px, `#1E1B4B`
- Subtitle: "[N] items need your attention today" — Inter Regular 14px, `#64748B`
- Right-aligned: notification bell icon (Phosphor `Bell`, 22px, `#64748B`), badge count in `#EF4444`

### KPI Strip — 4 cards, horizontal, full width

Card anatomy: white bg, `border-radius: 12px`, 4px left border (accent colour), padding 20px 24px, `box-shadow: 0 1px 4px rgba(0,0,0,0.06)`.

| # | Label | Accent colour | Icon (Phosphor) | Example value | Trend |
|---|---|---|---|---|---|
| 1 | Active Clients | `#6366F1` indigo | `Buildings` | 34 | ↑ 2 this month |
| 2 | Pending Actions | `#F59E0B` amber | `Lightning` | 12 | ↓ 3 from yesterday |
| 3 | VAT Deadlines (7 days) | `#EF4444` red | `CalendarCheck` | 3 | — |
| 4 | Unreconciled Statements | `#64748B` slate | `Bank` | 7 | ↑ 2 from yesterday |

Card layout: icon top-right (24px, accent colour, `rgba(accent,0.1)` bg circle 40px), label Inter Medium 13px `#64748B`, number Inter Semi Bold 32px `#1E1B4B`, trend Inter Regular 12px (green if improving, red if worsening).

Clicking a card filters the Client Status Grid below to show only relevant clients.

### Two-column layout (gap 24px)

#### Left column (65%) — Client Status Grid

**Section header:** "All Clients" — Inter Semi Bold 16px `#1E1B4B` + count badge + search input (right-aligned) + filter dropdown ("All" / "Needs attention" / "On track")

**Table columns:**
- **Company** — name Inter Medium 14px `#1E1B4B` + Y-tunnus Inter Regular 12px `#94A3B8` below
- **Health** — coloured dot (8px) + one-line reason Inter Regular 13px `#64748B` (e.g. "VAT due in 3 days", "All clear")
- **Accountant** — avatar (24px) + name Inter Regular 13px
- **Pending** — count badge (`#6366F1` bg, white text, `border-radius: 12px`) or "—"
- **Last activity** — relative time Inter Regular 13px `#94A3B8`
- **Action** — "Open →" ghost button, `border: 1px solid #E2E8F0`, `border-radius: 6px`, Inter Medium 13px `#6366F1`

Default sort: health status (🔴 first, then 🟡, then 🟢). Alternating row bg `#F8FAFC` / white. Row hover: `#F1F5F9`. Row height 56px.

Health colour system:
- 🟢 Green `#10B981` — all clear
- 🟡 Amber `#F59E0B` — attention needed (deadline <7 days, unreconciled >3 days)
- 🔴 Red `#EF4444` — urgent (overdue, missed deadline, unreconciled >7 days)

#### Right column (35%) — Today's Priority Feed

**Section header:** "Priority Feed" — Inter Semi Bold 16px `#1E1B4B`

Vertical list, grouped:

**Group labels:** "Overdue" (red), "Due Today" (amber), "Due This Week" (slate) — Inter Medium 11px uppercase letter-spacing 1px

Each item:
- Client pill: company name, `#EEF2FF` bg `#6366F1` text, `border-radius: 12px`, Inter Medium 11px
- Action text: Inter Regular 14px `#1E1B4B` (e.g. "VAT return due — Virtanen Oy")
- Due date: Inter Regular 12px `#94A3B8`
- Action button: small, "→ Open" or "→ File VAT"
- Separator: `1px solid #F1F5F9`

Item height: 64px. Max 10 items visible, "View all tasks →" link below.

### Bottom — Upcoming Deadlines Strip (full width)

**Section header:** "Next 14 Days" — Inter Semi Bold 16px + legend (VAT `#EF4444` · Payroll `#6366F1` · Invoices `#F59E0B`)

14-column grid (1 column per day). Each column:
- Day label: "Mon 28" — Inter Medium 12px `#64748B`
- Coloured dots stacked vertically (max 3 visible, "+N" overflow)
- Hover tooltip: card showing client name + deadline type + due date

Today column has `#6366F1` underline. Past days muted `opacity: 0.4`.

---

## View 2 — Client Dashboard

### Header

- Client company name — Inter Semi Bold 28px `#1E1B4B`
- Subtitle: "1234567-8 · Fiscal year: Jan–Dec · Accountant: Pekka Mäkinen" — Inter Regular 14px `#64748B`
- Right: "Last synced 2 min ago" `#94A3B8` + "← Back to firm" link `#6366F1` Inter Medium 14px

### KPI Strip — 4 cards

| # | Label | Accent | Icon | Notes |
|---|---|---|---|---|
| 1 | Cash Position | `#10B981` green | `CurrencyEur` | Live bank balance |
| 2 | Receivables | `#6366F1` indigo | `ArrowFatLineUp` | Open invoices total |
| 3 | Payables | `#F59E0B` amber | `ArrowFatLineDown` | Unpaid purchases total |
| 4 | VAT Liability (est.) | `#EF4444` red | `Percent` | AI-estimated current period |

Same card anatomy as firm home KPI cards.

### Row 2 — two columns (gap 24px)

#### Left (60%) — Cash Flow Chart

White card. Section header: "Cash Flow" + toggle group `30d / 60d / 90d` (right-aligned, pill-style, active = `#6366F1` bg white text).

Chart: dual-line.
- **Actual** — solid `#6366F1` indigo line
- **AI Forecast** — dashed `#A5B4FC` line with `rgba(99,102,241,0.08)` confidence band shading between upper/lower bounds
- X-axis: dates, Inter Regular 11px `#94A3B8`
- Y-axis: EUR values
- Legend below: "● Actual  ⋯ Forecast (AI)"

This directly beats Fivaldi's flat prediction line.

#### Right (40%) — Invoice Pipeline

White card. Section header: "Invoice Pipeline"

Vertical funnel — 5 stages:
- **Draft** — `#94A3B8`
- **Sent** — `#6366F1`
- **Viewed** — `#A5B4FC`
- **Overdue** — `#EF4444`
- **Paid** — `#10B981`

Each stage: label + count badge + total EUR value. Bar width proportional to count. Click any stage → navigates to Invoices view filtered to that stage.

### Row 3 — two columns (gap 24px)

#### Left (60%) — Recent Transactions

White card. Section header: "Recent Transactions" + "View all →" right-aligned link.

Table columns: Date / Description / Amount / Category / Confidence

Category shown as: coloured pill (e.g. "Rent" `#EEF2FF`).
Confidence shown as: percentage, Inter Regular 12px. Rows where confidence <80% get a `4px solid #F59E0B` left border — visual cue to review.

Max 8 rows. "Load more" below.

#### Right (40%) — Quick Actions + AI Insight

**Quick Actions** (2×2 grid of ghost buttons, full width):
- `+ New Invoice`
- `Record Payment`
- `Reconcile Bank`
- `Run VAT Report`

Each button: white bg, `1px solid #E2E8F0`, `border-radius: 8px`, Phosphor icon + label, height 48px, Inter Medium 14px `#1E1B4B`. Hover: `#F8FAFC` bg.

**AI Insight Card** (below quick actions):
Background: `#EEF2FF` (indigo tint), `border-radius: 12px`, padding 16px, `border-left: 4px solid #6366F1`.
- Header: ✦ "AI Insight" — Inter Semi Bold 13px `#6366F1`
- Body: proactive insight text — Inter Regular 14px `#1E1B4B` (e.g. "Cash will be negative in ~23 days at current burn rate. 2 overdue invoices totalling €4,200 could resolve this.")
- CTA button: "Review overdue invoices →" — Inter Medium 14px `#6366F1`, underline on hover

---

## Frame Inventory (Figma)

All frames at 1440×900px on a new **"Partner Dashboard"** page in file `RSqhYxJzRB87uMM9p4IxGx`.

| Frame name | Description |
|---|---|
| `Partner/Firm Home` | Firm-level dashboard, all clients |
| `Partner/Firm Home — Empty state` | New firm, no clients yet |
| `Partner/Client Dashboard` | Individual client view |
| `Partner/Client Dashboard — AI Insight active` | With populated AI insight panel |

---

## States

| Screen | States |
|---|---|
| Firm Home | Default, filtered by KPI card, empty state |
| Client Status Grid | All clients, filtered, search active |
| Priority Feed | With items, empty ("All clear today 🎉") |
| Client Dashboard | Default, loading (skeleton), error (sync failed) |
| Cash Flow Chart | 30d / 60d / 90d toggle states |
| AI Insight | With insight, no insight ("Looking good — nothing to flag") |
