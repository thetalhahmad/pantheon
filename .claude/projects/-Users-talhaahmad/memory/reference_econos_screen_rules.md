# Econos Screen Build Rules — MANDATORY

Apply to every screen built using [Dashboard Shell v1](reference_econos_dashboard_shell.md). Don't deviate.

## Rule 1: Top Bar always has breadcrumb + date

Every screen's Content Panel **MUST** start with a Top Bar:

- **Left:** breadcrumb separated by "/" — last item Semi Bold body, earlier items Regular muted
- **Right:** "Today is" muted + current date Semi Bold body
- **Bottom:** 1px divider `#F1F5F9`

Breadcrumb levels:

- Firm-level page: `Partner Dashboard / [Page Name]`
- Client root: `All Clients / [Client Name]`
- Client section: `All Clients / [Client Name] / [Section Name]`
- Client sub-page: `All Clients / [Client Name] / [Section] / [Sub-page]`

**For sub-pages NOT in sidebar menu:** activate the parent menu item, add sub-page as last breadcrumb level. Developer wires the route.

## Rule 2: Date is always current

Use today's date. Format: `Monday, 04 May 2026`.

## Rule 3: Active sidebar item must match the page

Match the deepest visible level. Y positions in v1:

| Item                 | y                |
| -------------------- | ---------------- |
| Firm Dashboard       | 110              |
| All Clients          | 146              |
| Inbox                | 182              |
| OmaVero Filings      | 218              |
| Dashboard (Korhonen) | 286 ← v1 default |
| General Ledger       | 329              |
| Invoices             | 365              |
| Bank & Cash          | 401              |
| VAT & Tax            | 437              |
| Payroll              | 473              |
| Reports              | 509              |
| Fixed Assets         | 545              |

White pill goes at `y = target_y - 7`, size 234×36, dual shadow. Insert at index 4 in frame children.

## Rule 4: Bottom-pinned elements shift with frame height

Shift these by `SHIFT = newH - 900`:

- Texts: `Powered By Econos`, `Settings`, `Talha Ahmad`, `Partner · Econos Oy`
- Frames: Settings icon `(29, 783)`, User pill backdrop `(21, 828)`, Avatar frame `(33, 836)`, Pill chevron `(227, 846)`

## Rule 5: Content uses Auto Layout for responsiveness

Replace cloned Content Panel with fresh Auto Layout vertical container. Each section is horizontal Auto Layout with `layoutGrow=1` cards or fixed-width sidebars.

Section gaps: STRETCH-aligned spacer frames (layoutMode='NONE', no fill, fixed height).

## Rule 6: Dashed strokes only on shapes

`dashPattern` doesn't work on frames. Use `figma.createRectangle()` for dashed borders.

## Rule 7: Overlay states clone the base screen

Don't rebuild. Clone base screen, add dim overlay (rgba black at 0.07 subtle / 0.55 modal-blocking) + modal/panel on top. Naming: `[BasePage] — [Overlay Description] — v3`.

## Pre-save checklist

- [ ] Cloned v1
- [ ] Frame resized + bottom-pinned shifted
- [ ] Active sidebar matches page (or parent if sub-page)
- [ ] Full breadcrumb in top bar (with last sub-page if not in menu)
- [ ] Current date in top bar
- [ ] Old Content Panel removed, Auto Layout one added
- [ ] Section rows = horizontal Auto Layout with layoutGrow=1
- [ ] No dashPattern on frames
- [ ] Named `[Original Name] — v3`

## Brain doc

Full spec: `~/Brain/wiki/concepts/Econos_Screen_Build_Rules.md`

## Built screens — 200 v3 screens (as of 06 May 2026)

**Phase 1 (50)** — original sections with v1 designs
**Phase 2 (32)** — design-from-scratch new modules + Client Portal custom shell + Prototype Flows map
**Phase 3 (54)** — Tier 1-3 Fivaldi-gap closers (12 new modules, +1 E1 Climate added 06 May)

**Partner Dashboard — 5/5 ✅**

- Partner/Firm Home (786:95)
- Partner/Client Dashboard — Korhonen Oy (804:95)
- Partner/Firm Home — Empty State (803:95)
- Partner/Client Dashboard — AI Insight Active (798:95)
- Partner/OmaVero Filing Hub (796:95)

**General Ledger — 7/7 ✅**

- GL/Journal Entry List (810:176)
- GL/New Journal Entry · GL/Account Ledger · GL/Trial Balance · GL/Chart of Accounts
- GL/Journal Entry List — Edit Entry (overlay)
- GL/Journal Entry List — Anomaly Review (overlay)

**Invoice Management — 7/7 ✅**

- Invoice/Invoice List (818:140) · Invoice/New Invoice (819:140)
- Invoice/Invoice Detail — Overdue · Invoice/Credit Note
- Invoice/Bill Capture · Invoice/Bill Review · Invoice/Bill List — AP Pipeline

**Bank & Cash — 7/7 ✅**

- Bank/Overview (827:72) · Bank/Transaction Feed (828:72)
- Bank/Reconciliation Workspace (829:72)
- Bank/Payment - New Batch (830:72) · Bank/Payment - Batch Confirmation (831:72)
- Bank/Cash Flow Forecast (832:72) · Bank/Rule Builder (834:72)

**VAT & Reporting — 12/12 ✅** (incl. 2 overlays)

- VAT/Overview (836:122) · VAT/Period Return — KMVALV (837:122)
- Reports/Reports Hub (838:122) · Reports/Profit & Loss — Tuloslaskelma (839:122)
- Reports/Balance Sheet — Tase (840:122) · Period Close/Wizard (841:122)
- Tax Filing Center (842:122) · VAT/Recapitulative Statement — KMVTYHT (843:122)
- Year-End / Tilinpäätös Workspace (844:122) · Audit Trail / Kirjausketju (845:122)
- Overlays: KMVALV — Anomaly Review (846:122) · P&L — AI Variance Explainer (847:122)

**Payroll — 10/10 ✅**

- Payroll/Dashboard (849:102) · Payroll/Employees (850:102)
- Payroll/Employee Detail (851:102) · Payroll/Salary Run — Step 2 Review (852:102)
- Payroll/Salary Slip (854:102) · Payroll/Tulorekisteri Submission (855:102)
- Payroll/Tax Cards — Verokortit (856:102) · Payroll/Insurance & Annual Declarations (857:102)
- Payroll/Reports (858:102) · Payroll/Settings (859:102)

**Fixed Assets — 10/10 ✅**

- FixedAssets/Dashboard (861:102) · FixedAssets/Asset Register (862:102)
- FixedAssets/Asset Detail (863:102) · FixedAssets/Depreciation Run — Step 2 Review (864:102)
- FixedAssets/New Asset — Capitalize from Invoice (865:102)
- FixedAssets/Disposal (866:102) · FixedAssets/Reports (867:102)
- FixedAssets/Settings (868:102) · FixedAssets/IAS36 Impairment Test (869:102)
- FixedAssets/IFRS 16 Lease Schedule (870:102)

**Tax Advisory — 8/8 ✅**

- Tax/Dashboard (872:82) · Tax/Depreciation Planner (873:82)
- Tax/Deferred Tax Workbench (874:82) · Tax/Loss Carryforward (875:82)
- Tax/Return Builder (6B) (876:82) · Tax/Transfer Pricing (877:82)
- Tax/Advance Ruling Tracker (878:82) · Tax/AI Advisor (880:82)

**Firm Settings — 7/7 ✅**

- FirmSettings/General (882:72) · FirmSettings/Users & Roles (883:72)
- FirmSettings/User Detail (884:72) · FirmSettings/Client Management (885:72)
- FirmSettings/Integrations (886:72) · FirmSettings/Billing & Plan (887:72)
- FirmSettings/Security & Audit (889:72)

## Phase 2 — design-from-scratch sections (32 screens)

**Expense Management — 5/5 ✅** (parent: Invoices)

- Expenses/Dashboard (894:2) · Submitted Expenses (895:2) · New Expense — Receipt OCR (896:2)
- Expenses/Approval Queue (897:2) · Mileage & Per Diem (898:2)

**Budgeting & Forecasting — 5/5 ✅** (parent: Reports)

- Budget/Dashboard (900:2) · Annual Builder (901:2) · Driver-based Forecast (902:2)
- Budget/Scenarios (903:2) · Variance Analysis (904:2)

**Project & Time — 5/5 ✅** (parent: Reports)

- Projects/Dashboard (905:2) · Project Detail (906:2) · Timesheet (908:2)
- Projects/Profitability (909:2) · WIP & Revenue Recognition (910:2)

**Inventory & Stock — 5/5 ✅** (parent: General Ledger)

- Inventory/Dashboard (911:2) · Stock List (912:2) · Stock Movement (913:2)
- Inventory/Valuation (914:2) · Reorder Settings (916:2)

**Group Consolidation — 5/5 ✅** (parent: Reports)

- Group/Dashboard (918:2) · Subsidiary Setup & FX Rates (919:2) · Eliminations Workbench (920:2)
- Group/Consolidated P&L (921:2) · Consolidated Balance Sheet (922:2)

**Client Portal — 6/6 ✅** (CUSTOM SHELL — branded for client, not Econos)

- Custom sidebar with Korhonen Oy logo + client-only menu · 1440×1100 frame · 1150 wide content panel
- ClientPortal/Home (923:2) · Documents (924:2) · Invoices to me (925:2)
- ClientPortal/Bills to pay (926:2) · Tax & VAT (927:2) · Messages (928:2)

**Prototype Flows — 1/1 ✅**

- Flows/Map of User Journeys (929:2) — visual map of 6 major flows × 35 screens

## Phase 3 — Tier 1-3 Fivaldi-gap closers (54 screens, all FULLY BUILT 06 May 2026)

12 new pages on Figma file `RSqhYxJzRB87uMM9p4IxGx`. Per [[reference_econos_fivaldi_gaps]].

> **Note (06 May 2026):** All 54 frames had their Body containers clipped at h=100px, hiding all content. Fixed by recursive expand of all section frames + Content Panel + outer frame. Also added missing CSRD E1 Climate frame (1068:2) at x=3000 on page 939:10 with full GHG/energy/targets/transition plan content. Total: 41 frames fixed + 1 new = 42 operations.

**Tier 1 — Foundation gap-closers (18 screens)**

- **Contacts (page 939:2) — 5/5 ✅** Dashboard · Customer Register · Supplier Register · Contact Detail · Statement of Account
- **E-invoicing (939:3) — 5/5 ✅** Dashboard (946:2 built) · Outbox (948:2) · Inbox (949:2) · Envelope Detail (951:2) · Connector Setup (952:2)
- **Recurring Billing (939:4) — 4/4 ✅** Schedule List (953:2) · New Schedule Wizard (954:2) · Upcoming Runs (955:2) · Failed Invoices (957:2)
- **Document Archive (939:5) — 4/4 ✅** Browser (959:2) · Search (960:2) · Document Detail (961:2) · Retention Rules (962:2)

**Tier 2 — Medium impact (17 screens)**

- **Quotes & Sales Orders (939:6) — 5/5 ✅** Quote List (964:2) · New Quote (965:2) · Quote Detail (966:2) · Order List (968:2) · Convert to Invoice (970:2)
- **Purchase Orders (939:7) — 4/4 ✅** PO List (971:2) · New PO (971:297) · PO Detail (972:2) · 3-Way Match Workspace (973:2)
- **Debt Collection (939:8) — 4/4 ✅** Overdue Dashboard (975:2) · Reminder Schedule (975:286) · Send to Agency (976:2) · Write-off Workflow (976:229)
- **KYC & AML (939:9) — 4/4 ✅** Dashboard (977:2) · New Client Onboarding (977:326) · Verification Status (978:2) · Periodic Re-screening (978:251)

**Tier 3 — Strategic / regulatory (19 screens — +1 E1 Climate added)**

- **CSRD Sustainability (939:10) — 6/6 ✅** Materiality Matrix (979:2) · Data Points Dashboard (979:253) · **E1 Climate (1068:2) NEW** · S1 Workforce (981:2) · G1 Governance (982:2) · Report Builder (982:271)
- **Property Management / Isännöinti (939:11) — 6/6 ✅** Dashboard (983:2) · Vastike Billing (983:306) · Yhtiökokous Prep (984:2) · PTS Plan (984:277) · Hankerahoitus (985:2) · Asukasrekisteri (985:342)
- **Loans & Leases (939:12) — 3/3 ✅** Loan List (986:2) · Schedule per Loan (986:257) · Interest Accrual Posting (986:636)
- **Light CRM (939:13) — 3/3 ✅** Contact 360 (987:2) · Activity Feed (987:277) · Custom Fields (987:561)

## Pending work

**Auth & Onboarding — 0/11 (need different shell pattern, unauthenticated):**

- Auth/Sign In · Sign Up · Check Inbox · Email Verified
- Auth/Forgot Password · Reset Password · Session Expired · Account Exists
- Onboarding/Step 7 · Step 8 · Step 9

**Widget panels — 2/6 built:**

- ✅ Notifications (734:2) · ✅ Search (736:2)
- ⏳ AI Assistant · ⏳ Quick Add · ⏳ Deadlines · ⏳ Help

**Cosmetic:**

- Date sweep — earlier screens still show "Monday, 04 May 2026" (built before 05 May)
