# Econos Firm Settings v4 — Rebuild Spec

**Date:** 2026-05-09
**Phase:** Firm Settings & User Management — full rebuild
**Status:** ✅ Shipped to Figma · 9 frames live at y=5000
**Figma file:** `RSqhYxJzRB87uMM9p4IxGx` · page "Firm Settings" (`539:2`)
**Supersedes:** 7 v3 frames at y=1638 (kept for comparison)

---

## Why a rebuild

The 7-screen v3 build (May 2026-05-01) was missing 11 features specified in the original Brain plan, plus had the wrong sidebar active state ("Firm Dashboard" instead of "Settings"). v4 closes the gaps, adds 2 new screens (Branding, Notifications) and applies the same Auto Layout architecture as Phase 10 Fixed Assets.

---

## Frame inventory

All frames at y=5000 on the Firm Settings page. Sidebar **Settings** (bottom-pinned) is active across all 9 — semantically correct for a global settings module.

| #   | Screen                              | Frame ID   | x     | Size      |
| --- | ----------------------------------- | ---------- | ----- | --------- |
| 1   | FirmSettings/General — v4           | `1283:2`   | 0     | 1440×1617 |
| 2   | FirmSettings/Branding — v4          | `1286:2`   | 1500  | 1440×1798 |
| 3   | FirmSettings/Users & Roles — v4     | `1286:139` | 3000  | 1440×1101 |
| 4   | FirmSettings/User Detail — v4       | `1286:276` | 4500  | 1440×1326 |
| 5   | FirmSettings/Client Management — v4 | `1286:413` | 6000  | 1440×1330 |
| 6   | FirmSettings/Integrations — v4      | `1286:550` | 7500  | 1440×1941 |
| 7   | FirmSettings/Billing & Plan — v4    | `1286:687` | 9000  | 1440×1725 |
| 8   | FirmSettings/Security & Audit — v4  | `1286:824` | 10500 | 1440×1971 |
| 9   | FirmSettings/Notifications — v4     | `1286:961` | 12000 | 1440×1559 |

Each frame uses a **left sub-nav rail (220w)** inside the content panel for screen-to-screen navigation — General · Branding · Users & roles (7) · Clients (12) · Integrations (11) · Billing & plan · Security & audit · Notifications.

---

## Per-screen sections

### 1. General

- **Firm profile** — firm name, Y-tunnus 3216547-2, VAT FI32165472, registered address, firm bank account, Authorisation TAL-2024-1182, Taloushallintoliitto membership
- **Locale & fiscal calendar** — UI language, date format DD.MM.YYYY, currency EUR, time zone Europe/Helsinki, default fiscal year, VAT period default (Quarterly per Verohallinto threshold ≤ €1m)
- **Accounting standard defaults** _(NEW)_ — Default GAAP (Finnish KPL), Recognition regime (KILA 3.12.2024 EVL-aligned), Multi-language KPL §3:4, Default chart of accounts (Liikekirjuri 2024)

### 2. Branding _(NEW dedicated screen)_

- Logo upload + preview · Brand colours (Primary #54B500, Dark #0F2000, Page bg #D9E0BE, Accent #92E957) · Typography (Inter for UI, Fraunces 300/500 for editorial) · Email signature · Live client portal preview

### 3. Users & Roles

- **AI workload alert banner** _(NEW)_ — Sami Lehto 96% / Kirsi Salo 92% with auto-rebalance suggestion
- 4 role summary cards (Partner 2 · Senior Accountant 1 · Accountant 2 · Read-only 1)
- Users table — 7 rows with workload bar, MFA status, Active/Pending
- SSO setup footer — Google Workspace + Suomi.fi e-tunnistautuminen

### 4. User Detail

- User header with avatar, role, status pills (ACTIVE · MFA · Suomi.fi-AUTH), Reset MFA / Suspend / Edit
- **Module permissions matrix** _(NEW)_ — 8 modules × Full/Edit/Read/None radios with notes
- Client access — 8 of 12 with per-client VIEW/EDIT/SIGN PAYMENTS/SIGN FILINGS pills + expiry dates
- Right rail — Role & Access · Security · Recent activity

### 5. Client Management

- 4-stat strip — Active 12 · MRR €18.420 · Churn 0 · Avg tenure 2.8 yrs
- 5-step Onboarding Wizard CTA strip _(NEW)_
- Client table with Health score column _(NEW)_ and Churn AI column (LOW/MED/HIGH) _(NEW)_

### 6. Integrations

- **7-day connection health timeline** _(NEW)_ — 12 connectors × 7 days with incident markers
- 4 category sections (12 connector cards):
  - Banking (PSD2): Nordea · OP Osuuspankki · Stripe
  - Authorities: OmaVero · Tulorekisteri · YTJ + PRH
  - Accounting & productivity: Ilmarinen · Pohjola Vakuutus · Google Workspace · Maventa Finvoice
  - AI & document intelligence: OpenAI GPT-4 Turbo · Azure Doc Intelligence · Browse marketplace

### 7. Billing & Plan

- Hero plan card (dark) — Econos Firm Pro · annual · €3.588/year · Upgrade to Enterprise CTA
- 4 usage meters — Clients 12/25 · Users 7 · AI credits 12.4k/50k · Storage 42/200 GB
- **MoM revenue chart** _(NEW)_ — 12 months with +14.9% YoY chip
- **Per-client cost breakdown** _(NEW)_ — Plan / Base / Ad-hoc / AI / Total / MoM Δ
- Recent invoices · Payment method · Billing contact · Refer & earn

### 8. Security & Audit

- Posture banner (STRONG · 100% MFA · 0 incidents · SOC 2 Q3 2026 · GDPR DPIA on file)
- 4-KPI strip — MFA coverage · Active sessions · Last incident · Audit log size
- 3 toggle sections — Authentication (5 toggles) · Sessions (4 toggles) · GDPR & data residency (4 toggles)
- **Field-level audit log table** _(NEW)_ — 8 entry types (UPDATE/POST/SIGN/AUTO/DELETE/LOGIN/FILE) with Timestamp/User/Action/Module/Entity/Old→New, GDPR Art. 30 CSV export
- Right rail — Certifications (dark) · Active sessions · Data Protection Officer (Sami Lehto)

### 9. Notifications _(NEW screen)_

- 4 channels (Email · In-app · Slack · Mobile push) with toggles
- 8-event matrix — Filing deadlines · Filing accepted · AI insights · Payment & SEPA batches · Sign-off requested · Audit & security alerts · Client portal activity · Billing & subscription. Per-event channel checkboxes + audience routing.
- Quiet hours (21:00–07:00 default) · Active days (Mon–Fri) · Critical event escalation (15 min) · Suomi.fi Viestit relay toggle
- Per-user override note · Send test notification

---

## 13 v3 gaps closed

1. ✓ AI workload chip per staff (Users & Roles)
2. ✓ Per-module permission matrix (User Detail)
3. ✓ Client health score column (Client Management)
4. ✓ Churn AI flag column (Client Management)
5. ✓ 5-step Onboarding Wizard CTA (Client Management)
6. ✓ 7-day integration health timeline (Integrations)
7. ✓ Per-client cost breakdown table (Billing & Plan)
8. ✓ MoM revenue chart (Billing & Plan)
9. ✓ Field-level audit log table (Security & Audit)
10. ✓ GDPR Art. 30 CSV export (Security & Audit)
11. ✓ Notifications page (was empty in v3)
12. ✓ Branding as dedicated page
13. ✓ Settings correctly active in sidebar (was on Firm Dashboard)

---

## Layout architecture (non-negotiable)

Same 10 rules as Phase 10 FA v4 ([2026-05-09-fixed-assets-v4-rebuild.md](2026-05-09-fixed-assets-v4-rebuild.md#layout-architecture-non-negotiable)).

Plus **left sub-nav rail discipline**:

- Sub-nav rail FIXED 220w with 1px right border
- "FIRM SETTINGS" 11px medium uppercase label, 0.6 letter-spacing
- Each item: 12 padding, 8 cornerRadius, active item = green-50 bg + green-700 semibold text + white badge for any count
- Inactive items = transparent bg + slate-700 medium text + slate-100 badge

---

## Build approach

- Cloned dashboard shell template (`706:2`) for each frame
- Sidebar reconfigured: Settings (bottom-pinned) is active green pill, Korhonen Dashboard reverted to inactive default
- Bottom-pinned elements shifted by `frameH - 900`
- Content panel built from scratch with horizontal root (sub-nav left + body right) — both FILL with body taking remaining width
- Verified each frame with screenshot

---

## Outstanding work

- States variants (loading / empty / error) — pending across all 9 frames
- Date sweep — frames show "Saturday, 09 May 2026"; needs dynamic binding at code time
- Mobile layout (out of scope for v1)
- Per-event override flow (Notifications) — modal pending
- Onboarding Wizard modal (Client Management Step 1-5) — only CTA strip in v4
