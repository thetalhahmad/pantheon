# Econos Fixed Assets v4 — Rebuild Spec

**Date:** 2026-05-09
**Phase:** Phase 10 rebuild — Fixed Assets module
**Status:** ✅ Shipped to Figma · 10 frames live at y=5000
**Figma file:** `RSqhYxJzRB87uMM9p4IxGx` · page "Fixed Assets" (`510:2`)
**Supersedes:** v3 strip at y=3111 (kept for side-by-side comparison)
**Brain spec:** `~/Brain/wiki/concepts/Econos_Phase10_FA_Rebuild_Spec.md`

---

## Why a rebuild

v3 had five clipping/collision defects all tracing to one Auto Layout violation: text and badge nodes set to FIXED width inside HUG containers, causing titles to clip ("Asset reg…", "Deprecia…", "IFRS 16 -") and category badges to render as solid dark-blue blocks. This rebuild applies a non-negotiable Auto Layout architecture to every frame.

---

## Frame inventory

All frames at y=5000 on the Fixed Assets page. v3 untouched at y=3111.

| #   | Screen                                  | Frame ID | x     | Size      |
| --- | --------------------------------------- | -------- | ----- | --------- |
| 1   | FixedAssets/Settings — v4               | `1228:2` | 10500 | 1440×3700 |
| 2   | FixedAssets/Asset Register — v4         | `1244:2` | 1500  | 1440×1110 |
| 3   | FixedAssets/Asset Detail — v4           | `1249:2` | 3000  | 1440×3106 |
| 4   | FixedAssets/New Asset — v4              | `1255:2` | 6000  | 1440×1378 |
| 5   | FixedAssets/Dashboard — v4              | `1258:2` | 0     | 1440×1125 |
| 6   | FixedAssets/Depreciation Run — v4       | `1261:2` | 4500  | 1440×894  |
| 7   | FixedAssets/Disposal — v4               | `1264:2` | 7500  | 1440×895  |
| 8   | FixedAssets/Reports — v4                | `1267:2` | 9000  | 1440×1278 |
| 9   | FixedAssets/IAS 36 Impairment Test — v4 | `1270:2` | 12000 | 1440×1674 |
| 10  | FixedAssets/IFRS 16 Lease Schedule — v4 | `1273:2` | 13500 | 1440×1293 |

---

## Layout architecture (non-negotiable)

1. **Page frame** = 1440 × auto. Sidebar FIXED 240. Top bar FIXED 64. Content area FILL within remaining ~1200, 24px gutters.
2. **Spacing scale = 8 only** — 8 / 16 / 24 / 32 / 48 / 64.
3. **Every text node = HUG**, with `textTruncation = "ENDING"` if living in a constrained cell. Never FIXED.
4. **Every badge instance = HUG width × HUG height** with internal Auto Layout. If it renders as a solid block, the inner label is FIXED — fix the component, not the instance.
5. **FILL children always get `minWidth`** — KPI minWidth=240, table cell minWidth=120, chart card minWidth=320.
6. **KPI strip** = horizontal Auto Layout, `layoutWrap=WRAP`, gap 16, counterAxisSpacing 16, children FIXED 280 / minWidth 240. **Cap at 4 cards.**
7. **Tables** = sticky first column 240, other columns FILL with `minWidth`. Row height 44 (comfortable). Column-priority hide at 1024.
8. **Filter chip row** = horizontal Auto Layout, WRAP, gap 8/8, chips at HUG.
9. **Right rail** = FIXED 416 (AI insight) / 480 (transaction inspector) / 320 (metadata). Show at ≥1280; collapse inline at ≤1024.
10. **Every screen ships 4 states**: loaded · loading (skeleton matching layout) · empty (illustration + headline + CTA) · error (inline banner with retry). v4 ships loaded; states pending.

Breakpoints: primary 1440, degrade clean to 1280 / 1024. Mobile out of scope for v1.

---

## 13 differentiators surfaced

Beyond the existing `phase10_plan.md` content spec, three parallel research agents produced the following net-new differentiators, all wired into v4:

1. **4-tab register spine** (Pending Capitalization · Active · Drafts · Disposed) — Xero+Zoho pattern · replaces v3 flat list.
2. **All-books valuations card** on Asset Detail — KPL / EVL / IFRS side-by-side with cell-level GL drill (D365 pattern).
3. **History+Forecast chart split** with vertical "today" line, solid actual / dashed forecast (Zoho+Numeric pattern).
4. **Subledger framing** — FA auto-posts to GL with audit trail (Numeric pattern).
5. **Rollback button** on depreciation run Step 4 — posts reversal voucher (Xero killer feature, no Finnish competitor has it).
6. **KILA 3.12.2024 regime election** at entity setup — EVL-aligned plan vs poistoero (statute changed Dec 2024, no competitor has implemented).
7. **EVL §40a sunset banner** — countdown for accelerated 2× depreciation expiring 31.12.2025.
8. **Puhtaan siirtymän verohyvitys flag** on asset record — 20%/€150M tax credit (in force 1.5.2025), blocks §40a, deferred tax memo.
9. **CPI re-measurement queue** for IFRS 16 leases — Finanssivalvonta's #1 audit finding 2025.
10. **CIP ageing alert** — keskeneräiset hankinnat > 12 months (top auditor catch).
11. **KO-erittely auto-built** in KPA §2:4 layout with PRH iXBRL pre-validator (open-data API live since 22.4.2025).
12. **Insurance + Maintenance + Components subtabs** on Asset Detail (NetSuite pattern, missing from v3).
13. **Capitalization triage** at €1,200/€3,600 thresholds (raised EVL §33).

---

## Statutes referenced inline

EVL §§30 / 33 / 34 / 36 / 40a · KPL §§5:5 / 2:10 · IAS 16 / 36 · IFRS 16 §40 · KILA 3.12.2024 yleisohje · KPA §2:4 · Verohallinto · PRH iXBRL · Finanssivalvonta · Suomen Tilintarkastajat ry · KPMG / Grant Thornton practice notes.

---

## Build approach

- Cloned dashboard shell template (`706:2`) for each frame
- Reconfigured sidebar active pill to "Fixed Assets" via `figma.getNodeById` per the 2026-04-29 feedback memory
- Built content panel from scratch with proper Auto Layout (FILL/HUG/FIXED + minWidth) — no absolute positioning except in chart canvases
- Bottom-pinned elements (Settings, user pill) shifted by `frameH - 900` to stay anchored
- Verified each frame with screenshot

---

## Research sources

Three parallel general-purpose agents produced ~5,000 words of research:

- **International best-in-class FA modules** — NetSuite, Sage Intacct, Dynamics 365, Xero, QuickBooks Online, Zoho, Numeric · plus Pennylane / Mercury / Brex / Ramp dashboards
- **Finnish KLT lived workflow + 2024-2026 regulatory updates** — KILA 3.12.2024 yleisohje, EVL §40a sunset, EVL §33 thresholds, Puhtaan siirtymän verohyvitys (effective 1.5.2025), IFRS 16 SME adoption, KO-erittely auditor catches, Finanssivalvonta IFRS findings
- **Responsive Auto Layout patterns 2025-2026** — Figma 2025 features (minWidth, layoutWrap=WRAP), Linear / Stripe / Vercel / Qonto / Mercury / Brex / Ramp reference patterns

---

## Outstanding work

- States variants (loading / empty / error) — pending across all 10 frames
- Date sweep — frames currently show "Saturday, 09 May 2026"; needs dynamic binding at code time
- Mobile layout (out of scope for v1)
- Bridge-DS knowledge-base entry for new components introduced (wizard stepper, dual-book table header, sticky right rail, history+forecast chart card, capitalization inbox tab, inline AI strip, floating AI card, stepper footer bar, FA-flavoured empty state, skeleton row)
