# Partner Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 4 Figma frames for the Econos Partner Dashboard (Firm Home + Client Dashboard, including empty and AI-active states) in file `RSqhYxJzRB87uMM9p4IxGx`.

**Architecture:** Write scene graph JSON files → compile via bridge-ds → execute compiled JS via Figma MCP `use_figma` tool → verify via `get_screenshot` → commit. Shared sidebar components are written once and referenced by all frames. Frames are 1440×900px on a new "Partner Dashboard" page.

**Tech Stack:** `@noemuch/bridge-ds` (installed globally), Figma MCP official transport (`use_figma`, `get_screenshot`), Figma file `RSqhYxJzRB87uMM9p4IxGx`, Inter font family.

**Design spec:** `docs/superpowers/specs/2026-04-27-partner-dashboard-design.md`

**Token reference:** Check `bridge-ds/knowledge-base/registries/` for exact token names before writing scene graphs. Key tokens used:
- Colours: `$colour/primary/500` (#6366F1), `$colour/primary/950` (#1E1B4B), `$colour/neutral/50` (#F8FAFC), `$colour/neutral/white`, `$colour/neutral/900` (#1E1B4B), `$colour/semantic/success` (#10B981), `$colour/semantic/warning` (#F59E0B), `$colour/semantic/error` (#EF4444)
- Radius: `$radius/radius-lg`, `$radius/radius-xl`, `$radius/radius-sm`, `$radius/radius-pill`
- Text: `$text/heading/2/semibold`, `$text/body/md/regular`, `$text/label/sm/medium`, `$text/label/xs/regular`, `$text/caption/regular`

---

## File Map

| File | Purpose |
|---|---|
| `bridge-ds/specs/active/partner-sidebar-firm.json` | Firm-mode sidebar (240px dark indigo) |
| `bridge-ds/specs/active/partner-sidebar-client.json` | Client-mode sidebar (back arrow + client nav) |
| `bridge-ds/specs/active/partner-firm-home.json` | Full Firm Home frame (1440×900) |
| `bridge-ds/specs/active/partner-firm-home-empty.json` | Firm Home empty state (no clients yet) |
| `bridge-ds/specs/active/partner-client-dashboard.json` | Full Client Dashboard frame (1440×900) |
| `bridge-ds/specs/active/partner-client-dashboard-ai.json` | Client Dashboard with AI Insight populated |

---

## Task 0: Create Partner Dashboard page in Figma

**Files:** none (Figma only)

- [ ] **Step 1: Create the page**

```javascript
// use_figma
const newPage = figma.createPage();
newPage.name = 'Partner Dashboard';
return { pageId: newPage.id, pages: figma.root.children.map(p => p.name) };
```

Expected: `pages` array includes `"Partner Dashboard"`.

- [ ] **Step 2: Verify**

```javascript
// use_figma
return figma.root.children.map(p => ({ name: p.name, id: p.id }));
```

Expected: page named `"Partner Dashboard"` present.

- [ ] **Step 3: Commit**

```bash
git commit --allow-empty -m "design: create Partner Dashboard Figma page"
```

---

## Task 1: Firm-mode sidebar scene graph

**Files:**
- Create: `bridge-ds/specs/active/partner-sidebar-firm.json`

- [ ] **Step 1: Write the scene graph**

Save to `bridge-ds/specs/active/partner-sidebar-firm.json`:

```json
{
  "type": "FRAME",
  "name": "SidebarFirm",
  "width": 240,
  "fillV": true,
  "fill": "$colour/primary/950",
  "layout": "VERTICAL",
  "padding": { "top": 24, "right": 16, "bottom": 24, "left": 16 },
  "gap": 8,
  "children": [
    {
      "type": "FRAME",
      "name": "Logo",
      "layout": "HORIZONTAL",
      "gap": 10,
      "counterAxisAlignItems": "CENTER",
      "padding": { "top": 0, "right": 0, "bottom": 8, "left": 0 },
      "children": [
        { "type": "RECTANGLE", "name": "LogoMark", "width": 28, "height": 28, "fill": "$colour/primary/500", "cornerRadius": "$radius/radius-sm" },
        { "type": "TEXT", "name": "LogoText", "characters": "Econos", "textStyle": "$text/label/lg/semibold", "fill": "$colour/neutral/white" }
      ]
    },
    {
      "type": "FRAME",
      "name": "SearchBar",
      "layout": "HORIZONTAL",
      "gap": 8,
      "fillH": true,
      "counterAxisAlignItems": "CENTER",
      "padding": { "top": 8, "right": 10, "bottom": 8, "left": 10 },
      "cornerRadius": "$radius/radius-sm",
      "fill": "rgba(255,255,255,0.08)",
      "children": [
        { "type": "RECTANGLE", "name": "SearchIcon", "width": 14, "height": 14, "fill": "rgba(255,255,255,0.4)", "cornerRadius": "$radius/radius-pill" },
        { "type": "TEXT", "name": "SearchPlaceholder", "characters": "Search clients, invoices…", "textStyle": "$text/label/sm/regular", "fill": "rgba(255,255,255,0.4)" }
      ]
    },
    { "type": "FRAME", "name": "NavDivider", "fillH": true, "height": 1, "fill": "rgba(255,255,255,0.08)" },
    {
      "type": "FRAME",
      "name": "NavItems",
      "layout": "VERTICAL",
      "gap": 2,
      "fillH": true,
      "children": [
        {
          "type": "FRAME",
          "name": "NavHome",
          "layout": "HORIZONTAL",
          "gap": 10,
          "fillH": true,
          "counterAxisAlignItems": "CENTER",
          "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 },
          "cornerRadius": "$radius/radius-sm",
          "fill": "rgba(99,102,241,0.2)",
          "stroke": "$colour/primary/500",
          "strokeWeight": 0,
          "children": [
            { "type": "RECTANGLE", "name": "ActiveBorder", "width": 3, "height": 20, "fill": "$colour/primary/500", "cornerRadius": "$radius/radius-pill" },
            { "type": "TEXT", "name": "NavLabel", "characters": "Home", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/white" }
          ]
        },
        {
          "type": "FRAME", "name": "NavClients", "layout": "HORIZONTAL", "gap": 10, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "TEXT", "name": "NavLabel", "characters": "Clients", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }
          ]
        },
        {
          "type": "FRAME", "name": "NavTasks", "layout": "HORIZONTAL", "gap": 10, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "TEXT", "name": "NavLabel", "characters": "Tasks", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }
          ]
        },
        {
          "type": "FRAME", "name": "NavInvoices", "layout": "HORIZONTAL", "gap": 10, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "TEXT", "name": "NavLabel", "characters": "Invoices", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }
          ]
        },
        {
          "type": "FRAME", "name": "NavReports", "layout": "HORIZONTAL", "gap": 10, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "TEXT", "name": "NavLabel", "characters": "Reports", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }
          ]
        },
        {
          "type": "FRAME", "name": "NavSettings", "layout": "HORIZONTAL", "gap": 10, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "TEXT", "name": "NavLabel", "characters": "Settings", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }
          ]
        }
      ]
    },
    { "type": "FRAME", "name": "NavDivider2", "fillH": true, "height": 1, "fill": "rgba(255,255,255,0.08)" },
    {
      "type": "FRAME",
      "name": "RecentClients",
      "layout": "VERTICAL",
      "gap": 4,
      "fillH": true,
      "children": [
        { "type": "TEXT", "name": "RecentLabel", "characters": "RECENT", "textStyle": "$text/label/xs/regular", "fill": "rgba(255,255,255,0.4)" },
        {
          "type": "FRAME", "name": "RecentClient1", "layout": "HORIZONTAL", "gap": 8, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 6, "right": 8, "bottom": 6, "left": 8 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "ELLIPSE", "name": "HealthDot", "width": 8, "height": 8, "fill": "$colour/semantic/success" },
            { "type": "TEXT", "name": "ClientName", "characters": "Virtanen Oy", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/white" }
          ]
        },
        {
          "type": "FRAME", "name": "RecentClient2", "layout": "HORIZONTAL", "gap": 8, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 6, "right": 8, "bottom": 6, "left": 8 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "ELLIPSE", "name": "HealthDot", "width": 8, "height": 8, "fill": "$colour/semantic/warning" },
            { "type": "TEXT", "name": "ClientName", "characters": "Nordic Build Oy", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/white" }
          ]
        },
        {
          "type": "FRAME", "name": "RecentClient3", "layout": "HORIZONTAL", "gap": 8, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 6, "right": 8, "bottom": 6, "left": 8 },
          "cornerRadius": "$radius/radius-sm",
          "children": [
            { "type": "ELLIPSE", "name": "HealthDot", "width": 8, "height": 8, "fill": "$colour/semantic/error" },
            { "type": "TEXT", "name": "ClientName", "characters": "Koski & Co", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/white" }
          ]
        }
      ]
    },
    { "type": "FRAME", "name": "Spacer", "layout": "VERTICAL", "fillV": true },
    { "type": "FRAME", "name": "BottomDivider", "fillH": true, "height": 1, "fill": "rgba(255,255,255,0.08)" },
    {
      "type": "FRAME",
      "name": "UserSection",
      "layout": "VERTICAL",
      "gap": 4,
      "fillH": true,
      "padding": { "top": 8, "right": 0, "bottom": 0, "left": 0 },
      "children": [
        { "type": "TEXT", "name": "FirmName", "characters": "Protax Oy", "textStyle": "$text/label/sm/semibold", "fill": "$colour/neutral/white" },
        {
          "type": "FRAME", "name": "UserRow", "layout": "HORIZONTAL", "gap": 8, "fillH": true, "counterAxisAlignItems": "CENTER",
          "children": [
            { "type": "ELLIPSE", "name": "Avatar", "width": 32, "height": 32, "fill": "$colour/primary/500" },
            {
              "type": "FRAME", "name": "UserInfo", "layout": "VERTICAL", "gap": 2,
              "children": [
                { "type": "TEXT", "name": "UserName", "characters": "Kirsti Mäkinen", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/white" },
                { "type": "TEXT", "name": "UserRole", "characters": "Firm Admin", "textStyle": "$text/label/xs/regular", "fill": "rgba(255,255,255,0.5)" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add bridge-ds/specs/active/partner-sidebar-firm.json
git commit -m "design: firm-mode sidebar scene graph"
```

---

## Task 2: Client-mode sidebar scene graph

**Files:**
- Create: `bridge-ds/specs/active/partner-sidebar-client.json`

- [ ] **Step 1: Write the scene graph**

Save to `bridge-ds/specs/active/partner-sidebar-client.json`:

```json
{
  "type": "FRAME",
  "name": "SidebarClient",
  "width": 240,
  "fillV": true,
  "fill": "$colour/primary/950",
  "layout": "VERTICAL",
  "padding": { "top": 24, "right": 16, "bottom": 24, "left": 16 },
  "gap": 8,
  "children": [
    {
      "type": "FRAME", "name": "BackRow", "layout": "HORIZONTAL", "gap": 6, "fillH": true,
      "counterAxisAlignItems": "CENTER", "padding": { "top": 0, "right": 0, "bottom": 4, "left": 0 },
      "children": [
        { "type": "TEXT", "name": "BackArrow", "characters": "←", "textStyle": "$text/label/sm/regular", "fill": "rgba(255,255,255,0.6)" },
        { "type": "TEXT", "name": "BackLabel", "characters": "Back to firm", "textStyle": "$text/label/sm/regular", "fill": "rgba(255,255,255,0.6)" }
      ]
    },
    {
      "type": "FRAME", "name": "ClientHeader", "layout": "VERTICAL", "gap": 4, "fillH": true,
      "padding": { "top": 0, "right": 0, "bottom": 12, "left": 0 },
      "children": [
        { "type": "TEXT", "name": "ClientName", "characters": "Virtanen Oy", "textStyle": "$text/heading/sm/semibold", "fill": "$colour/neutral/white" },
        { "type": "TEXT", "name": "ClientYTunnus", "characters": "1234567-8", "textStyle": "$text/label/xs/regular", "fill": "rgba(255,255,255,0.5)" }
      ]
    },
    { "type": "FRAME", "name": "NavDivider", "fillH": true, "height": 1, "fill": "rgba(255,255,255,0.08)" },
    {
      "type": "FRAME", "name": "ClientNavItems", "layout": "VERTICAL", "gap": 2, "fillH": true,
      "children": [
        {
          "type": "FRAME", "name": "NavOverview", "layout": "HORIZONTAL", "gap": 10, "fillH": true,
          "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 },
          "cornerRadius": "$radius/radius-sm", "fill": "rgba(99,102,241,0.2)",
          "children": [
            { "type": "RECTANGLE", "name": "ActiveBorder", "width": 3, "height": 20, "fill": "$colour/primary/500", "cornerRadius": "$radius/radius-pill" },
            { "type": "TEXT", "name": "NavLabel", "characters": "Overview", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/white" }
          ]
        },
        { "type": "FRAME", "name": "NavInvoices", "layout": "HORIZONTAL", "gap": 10, "fillH": true, "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 }, "cornerRadius": "$radius/radius-sm", "children": [{ "type": "TEXT", "name": "NavLabel", "characters": "Invoices", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }] },
        { "type": "FRAME", "name": "NavPurchases", "layout": "HORIZONTAL", "gap": 10, "fillH": true, "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 }, "cornerRadius": "$radius/radius-sm", "children": [{ "type": "TEXT", "name": "NavLabel", "characters": "Purchases", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }] },
        { "type": "FRAME", "name": "NavBank", "layout": "HORIZONTAL", "gap": 10, "fillH": true, "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 }, "cornerRadius": "$radius/radius-sm", "children": [{ "type": "TEXT", "name": "NavLabel", "characters": "Bank", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }] },
        { "type": "FRAME", "name": "NavVAT", "layout": "HORIZONTAL", "gap": 10, "fillH": true, "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 }, "cornerRadius": "$radius/radius-sm", "children": [{ "type": "TEXT", "name": "NavLabel", "characters": "VAT", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }] },
        { "type": "FRAME", "name": "NavPayroll", "layout": "HORIZONTAL", "gap": 10, "fillH": true, "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 }, "cornerRadius": "$radius/radius-sm", "children": [{ "type": "TEXT", "name": "NavLabel", "characters": "Payroll", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }] },
        { "type": "FRAME", "name": "NavReports", "layout": "HORIZONTAL", "gap": 10, "fillH": true, "counterAxisAlignItems": "CENTER", "padding": { "top": 10, "right": 12, "bottom": 10, "left": 12 }, "cornerRadius": "$radius/radius-sm", "children": [{ "type": "TEXT", "name": "NavLabel", "characters": "Reports", "textStyle": "$text/label/sm/medium", "fill": "rgba(255,255,255,0.6)" }] }
      ]
    },
    { "type": "FRAME", "name": "Spacer", "layout": "VERTICAL", "fillV": true },
    { "type": "FRAME", "name": "BottomDivider", "fillH": true, "height": 1, "fill": "rgba(255,255,255,0.08)" },
    {
      "type": "FRAME", "name": "UserSection", "layout": "VERTICAL", "gap": 4, "fillH": true, "padding": { "top": 8, "right": 0, "bottom": 0, "left": 0 },
      "children": [
        { "type": "TEXT", "name": "FirmName", "characters": "Protax Oy", "textStyle": "$text/label/sm/semibold", "fill": "$colour/neutral/white" },
        {
          "type": "FRAME", "name": "UserRow", "layout": "HORIZONTAL", "gap": 8, "fillH": true, "counterAxisAlignItems": "CENTER",
          "children": [
            { "type": "ELLIPSE", "name": "Avatar", "width": 32, "height": 32, "fill": "$colour/primary/500" },
            {
              "type": "FRAME", "name": "UserInfo", "layout": "VERTICAL", "gap": 2,
              "children": [
                { "type": "TEXT", "name": "UserName", "characters": "Kirsti Mäkinen", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/white" },
                { "type": "TEXT", "name": "UserRole", "characters": "Firm Admin", "textStyle": "$text/label/xs/regular", "fill": "rgba(255,255,255,0.5)" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add bridge-ds/specs/active/partner-sidebar-client.json
git commit -m "design: client-mode sidebar scene graph"
```

---

## Task 3: Firm Home — full frame scene graph

**Files:**
- Create: `bridge-ds/specs/active/partner-firm-home.json`

- [ ] **Step 1: Write the full Firm Home scene graph**

Save to `bridge-ds/specs/active/partner-firm-home.json`:

```json
{
  "version": "3.0",
  "metadata": { "name": "Partner/Firm Home", "width": 1440, "height": 900, "transport": "official" },
  "fonts": [
    { "family": "Inter", "style": "Regular" },
    { "family": "Inter", "style": "Medium" },
    { "family": "Inter", "style": "Semi Bold" }
  ],
  "nodes": [{
    "type": "FRAME", "name": "Partner/Firm Home", "layout": "HORIZONTAL",
    "width": 1440, "height": 900, "fill": "$colour/neutral/50",
    "children": [
      { "$ref": "bridge-ds/specs/active/partner-sidebar-firm.json" },
      {
        "type": "FRAME", "name": "MainContent", "fillH": true, "fillV": true,
        "layout": "VERTICAL", "gap": 24,
        "padding": { "top": 32, "right": 32, "bottom": 32, "left": 32 },
        "fill": "$colour/neutral/50",
        "children": [
          {
            "type": "FRAME", "name": "Header", "layout": "HORIZONTAL", "fillH": true,
            "counterAxisAlignItems": "CENTER",
            "children": [
              {
                "type": "FRAME", "name": "HeaderLeft", "layout": "VERTICAL", "gap": 4, "fillH": true,
                "children": [
                  { "type": "TEXT", "name": "Greeting", "characters": "Good morning, Kirsti.", "textStyle": "$text/heading/2/semibold", "fill": "$colour/neutral/900" },
                  { "type": "TEXT", "name": "Subtitle", "characters": "12 items need your attention today", "textStyle": "$text/body/md/regular", "fill": "$colour/neutral/500" }
                ]
              },
              {
                "type": "FRAME", "name": "NotificationBell", "layout": "HORIZONTAL",
                "width": 40, "height": 40, "cornerRadius": "$radius/radius-sm",
                "fill": "$colour/neutral/white", "counterAxisAlignItems": "CENTER", "primaryAxisAlignItems": "CENTER",
                "children": [
                  { "type": "TEXT", "name": "BellIcon", "characters": "🔔", "textStyle": "$text/body/md/regular", "fill": "$colour/neutral/500" }
                ]
              }
            ]
          },
          {
            "type": "FRAME", "name": "KPIStrip", "layout": "HORIZONTAL", "fillH": true, "gap": 16,
            "children": [
              {
                "type": "FRAME", "name": "KPI-ActiveClients", "layout": "VERTICAL", "gap": 8,
                "fillH": true, "padding": { "top": 20, "right": 24, "bottom": 20, "left": 20 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  { "type": "TEXT", "name": "KPILabel", "characters": "Active Clients", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                  { "type": "TEXT", "name": "KPIValue", "characters": "34", "textStyle": "$text/heading/2/semibold", "fill": "$colour/neutral/900" },
                  { "type": "TEXT", "name": "KPITrend", "characters": "↑ 2 this month", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/success" }
                ]
              },
              {
                "type": "FRAME", "name": "KPI-PendingActions", "layout": "VERTICAL", "gap": 8,
                "fillH": true, "padding": { "top": 20, "right": 24, "bottom": 20, "left": 20 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  { "type": "TEXT", "name": "KPILabel", "characters": "Pending Actions", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                  { "type": "TEXT", "name": "KPIValue", "characters": "12", "textStyle": "$text/heading/2/semibold", "fill": "$colour/neutral/900" },
                  { "type": "TEXT", "name": "KPITrend", "characters": "↓ 3 from yesterday", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/success" }
                ]
              },
              {
                "type": "FRAME", "name": "KPI-VATDeadlines", "layout": "VERTICAL", "gap": 8,
                "fillH": true, "padding": { "top": 20, "right": 24, "bottom": 20, "left": 20 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  { "type": "TEXT", "name": "KPILabel", "characters": "VAT Deadlines (7 days)", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                  { "type": "TEXT", "name": "KPIValue", "characters": "3", "textStyle": "$text/heading/2/semibold", "fill": "$colour/semantic/error" },
                  { "type": "TEXT", "name": "KPITrend", "characters": "Needs attention", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/error" }
                ]
              },
              {
                "type": "FRAME", "name": "KPI-Unreconciled", "layout": "VERTICAL", "gap": 8,
                "fillH": true, "padding": { "top": 20, "right": 24, "bottom": 20, "left": 20 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  { "type": "TEXT", "name": "KPILabel", "characters": "Unreconciled Statements", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                  { "type": "TEXT", "name": "KPIValue", "characters": "7", "textStyle": "$text/heading/2/semibold", "fill": "$colour/neutral/900" },
                  { "type": "TEXT", "name": "KPITrend", "characters": "↑ 2 from yesterday", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/error" }
                ]
              }
            ]
          },
          {
            "type": "FRAME", "name": "TwoColumn", "layout": "HORIZONTAL", "fillH": true, "fillV": true, "gap": 24,
            "children": [
              {
                "type": "FRAME", "name": "ClientGrid", "layout": "VERTICAL", "gap": 16,
                "fillH": true, "fillV": true,
                "padding": { "top": 20, "right": 24, "bottom": 20, "left": 24 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  {
                    "type": "FRAME", "name": "GridHeader", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER",
                    "children": [
                      { "type": "TEXT", "name": "GridTitle", "characters": "All Clients", "textStyle": "$text/label/lg/semibold", "fill": "$colour/neutral/900", "fillH": true },
                      { "type": "INSTANCE", "name": "FilterDropdown", "component": "Select", "properties": { "placeholder": "All clients" } }
                    ]
                  },
                  {
                    "type": "FRAME", "name": "TableHeader", "layout": "HORIZONTAL", "fillH": true,
                    "padding": { "top": 8, "right": 0, "bottom": 8, "left": 0 },
                    "children": [
                      { "type": "TEXT", "name": "ColCompany", "characters": "Company", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "width": 200 },
                      { "type": "TEXT", "name": "ColHealth", "characters": "Health", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "width": 160 },
                      { "type": "TEXT", "name": "ColAccountant", "characters": "Accountant", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "width": 120 },
                      { "type": "TEXT", "name": "ColPending", "characters": "Pending", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "width": 80 },
                      { "type": "TEXT", "name": "ColActivity", "characters": "Last activity", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "fillH": true }
                    ]
                  },
                  {
                    "type": "FRAME", "name": "ClientRow1", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER",
                    "padding": { "top": 12, "right": 0, "bottom": 12, "left": 0 },
                    "children": [
                      {
                        "type": "FRAME", "name": "CompanyCell", "layout": "VERTICAL", "gap": 2, "width": 200,
                        "children": [
                          { "type": "TEXT", "name": "CompanyName", "characters": "Koski & Co Oy", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/900" },
                          { "type": "TEXT", "name": "YTunnus", "characters": "7654321-0", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }
                        ]
                      },
                      {
                        "type": "FRAME", "name": "HealthCell", "layout": "HORIZONTAL", "gap": 6, "width": 160, "counterAxisAlignItems": "CENTER",
                        "children": [
                          { "type": "ELLIPSE", "name": "HealthDot", "width": 8, "height": 8, "fill": "$colour/semantic/error" },
                          { "type": "TEXT", "name": "HealthReason", "characters": "VAT overdue", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/500" }
                        ]
                      },
                      { "type": "TEXT", "name": "AccountantCell", "characters": "Pekka M.", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/600", "width": 120 },
                      {
                        "type": "FRAME", "name": "PendingCell", "layout": "HORIZONTAL", "width": 80, "counterAxisAlignItems": "CENTER",
                        "children": [
                          {
                            "type": "FRAME", "name": "Badge", "layout": "HORIZONTAL",
                            "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 },
                            "cornerRadius": "$radius/radius-pill", "fill": "$colour/semantic/error",
                            "children": [{ "type": "TEXT", "name": "BadgeCount", "characters": "5", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/white" }]
                          }
                        ]
                      },
                      { "type": "TEXT", "name": "ActivityCell", "characters": "2 hours ago", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "fillH": true }
                    ]
                  },
                  {
                    "type": "FRAME", "name": "ClientRow2", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER",
                    "padding": { "top": 12, "right": 0, "bottom": 12, "left": 0 },
                    "children": [
                      { "type": "FRAME", "name": "CompanyCell", "layout": "VERTICAL", "gap": 2, "width": 200, "children": [{ "type": "TEXT", "name": "CompanyName", "characters": "Nordic Build Oy", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/900" }, { "type": "TEXT", "name": "YTunnus", "characters": "2345678-9", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }] },
                      { "type": "FRAME", "name": "HealthCell", "layout": "HORIZONTAL", "gap": 6, "width": 160, "counterAxisAlignItems": "CENTER", "children": [{ "type": "ELLIPSE", "name": "HealthDot", "width": 8, "height": 8, "fill": "$colour/semantic/warning" }, { "type": "TEXT", "name": "HealthReason", "characters": "Bank unreconciled", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/500" }] },
                      { "type": "TEXT", "name": "AccountantCell", "characters": "Kirsti M.", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/600", "width": 120 },
                      { "type": "FRAME", "name": "PendingCell", "layout": "HORIZONTAL", "width": 80, "counterAxisAlignItems": "CENTER", "children": [{ "type": "FRAME", "name": "Badge", "layout": "HORIZONTAL", "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/semantic/warning", "children": [{ "type": "TEXT", "name": "BadgeCount", "characters": "2", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/white" }] }] },
                      { "type": "TEXT", "name": "ActivityCell", "characters": "Yesterday", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "fillH": true }
                    ]
                  },
                  {
                    "type": "FRAME", "name": "ClientRow3", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER",
                    "padding": { "top": 12, "right": 0, "bottom": 12, "left": 0 },
                    "children": [
                      { "type": "FRAME", "name": "CompanyCell", "layout": "VERTICAL", "gap": 2, "width": 200, "children": [{ "type": "TEXT", "name": "CompanyName", "characters": "Virtanen Oy", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/900" }, { "type": "TEXT", "name": "YTunnus", "characters": "1234567-8", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }] },
                      { "type": "FRAME", "name": "HealthCell", "layout": "HORIZONTAL", "gap": 6, "width": 160, "counterAxisAlignItems": "CENTER", "children": [{ "type": "ELLIPSE", "name": "HealthDot", "width": 8, "height": 8, "fill": "$colour/semantic/success" }, { "type": "TEXT", "name": "HealthReason", "characters": "All clear", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/500" }] },
                      { "type": "TEXT", "name": "AccountantCell", "characters": "Pekka M.", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/600", "width": 120 },
                      { "type": "TEXT", "name": "PendingCell", "characters": "—", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/400", "width": 80 },
                      { "type": "TEXT", "name": "ActivityCell", "characters": "3 days ago", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "fillH": true }
                    ]
                  }
                ]
              },
              {
                "type": "FRAME", "name": "PriorityFeed", "layout": "VERTICAL", "gap": 16,
                "width": 320, "fillV": true,
                "padding": { "top": 20, "right": 24, "bottom": 20, "left": 24 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  { "type": "TEXT", "name": "FeedTitle", "characters": "Priority Feed", "textStyle": "$text/label/lg/semibold", "fill": "$colour/neutral/900" },
                  { "type": "TEXT", "name": "OverdueLabel", "characters": "OVERDUE", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/error" },
                  {
                    "type": "FRAME", "name": "FeedItem1", "layout": "VERTICAL", "gap": 4, "fillH": true,
                    "padding": { "top": 12, "right": 0, "bottom": 12, "left": 0 },
                    "children": [
                      {
                        "type": "FRAME", "name": "ClientPill", "layout": "HORIZONTAL",
                        "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 },
                        "cornerRadius": "$radius/radius-pill", "fill": "$colour/primary/50",
                        "children": [{ "type": "TEXT", "name": "PillLabel", "characters": "Koski & Co", "textStyle": "$text/label/xs/medium", "fill": "$colour/primary/500" }]
                      },
                      { "type": "TEXT", "name": "ActionText", "characters": "VAT return overdue — file immediately", "textStyle": "$text/body/sm/regular", "fill": "$colour/neutral/900" },
                      { "type": "TEXT", "name": "DueDate", "characters": "Was due Apr 25", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/error" }
                    ]
                  },
                  { "type": "TEXT", "name": "TodayLabel", "characters": "DUE TODAY", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/warning" },
                  {
                    "type": "FRAME", "name": "FeedItem2", "layout": "VERTICAL", "gap": 4, "fillH": true,
                    "padding": { "top": 12, "right": 0, "bottom": 12, "left": 0 },
                    "children": [
                      { "type": "FRAME", "name": "ClientPill", "layout": "HORIZONTAL", "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/primary/50", "children": [{ "type": "TEXT", "name": "PillLabel", "characters": "Nordic Build", "textStyle": "$text/label/xs/medium", "fill": "$colour/primary/500" }] },
                      { "type": "TEXT", "name": "ActionText", "characters": "Reconcile April bank statement", "textStyle": "$text/body/sm/regular", "fill": "$colour/neutral/900" },
                      { "type": "TEXT", "name": "DueDate", "characters": "Due today", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/warning" }
                    ]
                  },
                  { "type": "TEXT", "name": "WeekLabel", "characters": "DUE THIS WEEK", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" },
                  {
                    "type": "FRAME", "name": "FeedItem3", "layout": "VERTICAL", "gap": 4, "fillH": true,
                    "padding": { "top": 12, "right": 0, "bottom": 12, "left": 0 },
                    "children": [
                      { "type": "FRAME", "name": "ClientPill", "layout": "HORIZONTAL", "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/primary/50", "children": [{ "type": "TEXT", "name": "PillLabel", "characters": "Virtanen Oy", "textStyle": "$text/label/xs/medium", "fill": "$colour/primary/500" }] },
                      { "type": "TEXT", "name": "ActionText", "characters": "Q1 financial report to client", "textStyle": "$text/body/sm/regular", "fill": "$colour/neutral/900" },
                      { "type": "TEXT", "name": "DueDate", "characters": "Due Apr 30", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }]
}
```

- [ ] **Step 2: Compile**

```bash
bridge-ds compile \
  --input bridge-ds/specs/active/partner-firm-home.json \
  --kb bridge-ds/knowledge-base \
  --transport official
```

Expected: exit 0. Output: `bridge-ds/specs/active/partner-firm-home.compiled.js`

- [ ] **Step 3: Execute in Figma**

Switch to Partner Dashboard page, run compiled output via `use_figma`:

```javascript
// use_figma — switch page first
const page = figma.root.children.find(p => p.name === 'Partner Dashboard');
await figma.setCurrentPageAsync(page);
// then run compiled output
```

- [ ] **Step 4: Screenshot and verify**

Use `get_screenshot` on the new frame. Check: dark indigo sidebar, 4 KPI cards, client grid with 3 rows and health dots, priority feed with grouped items.

- [ ] **Step 5: Commit**

```bash
git add bridge-ds/specs/active/partner-firm-home.json
git commit -m "design: Partner/Firm Home — full frame"
```

---

## Task 4: Firm Home — Empty State

**Files:**
- Create: `bridge-ds/specs/active/partner-firm-home-empty.json`

- [ ] **Step 1: Write empty state scene graph**

Save to `bridge-ds/specs/active/partner-firm-home-empty.json`:

```json
{
  "version": "3.0",
  "metadata": { "name": "Partner/Firm Home — Empty State", "width": 1440, "height": 900, "transport": "official" },
  "fonts": [{ "family": "Inter", "style": "Regular" }, { "family": "Inter", "style": "Medium" }, { "family": "Inter", "style": "Semi Bold" }],
  "nodes": [{
    "type": "FRAME", "name": "Partner/Firm Home — Empty State", "layout": "HORIZONTAL",
    "width": 1440, "height": 900, "fill": "$colour/neutral/50",
    "children": [
      { "$ref": "bridge-ds/specs/active/partner-sidebar-firm.json" },
      {
        "type": "FRAME", "name": "MainContent", "fillH": true, "fillV": true,
        "layout": "VERTICAL", "gap": 24,
        "padding": { "top": 32, "right": 32, "bottom": 32, "left": 32 },
        "fill": "$colour/neutral/50",
        "children": [
          {
            "type": "FRAME", "name": "Header", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER",
            "children": [
              { "type": "FRAME", "name": "HeaderLeft", "layout": "VERTICAL", "gap": 4, "fillH": true, "children": [
                { "type": "TEXT", "name": "Greeting", "characters": "Good morning, Kirsti.", "textStyle": "$text/heading/2/semibold", "fill": "$colour/neutral/900" },
                { "type": "TEXT", "name": "Subtitle", "characters": "Get started by adding your first client.", "textStyle": "$text/body/md/regular", "fill": "$colour/neutral/500" }
              ]}
            ]
          },
          {
            "type": "FRAME", "name": "EmptyState", "layout": "VERTICAL", "fillH": true, "fillV": true,
            "primaryAxisAlignItems": "CENTER", "counterAxisAlignItems": "CENTER", "gap": 16,
            "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
            "children": [
              { "type": "RECTANGLE", "name": "EmptyIllustration", "width": 80, "height": 80, "fill": "$colour/primary/50", "cornerRadius": "$radius/radius-xl" },
              { "type": "TEXT", "name": "EmptyTitle", "characters": "No clients yet", "textStyle": "$text/heading/sm/semibold", "fill": "$colour/neutral/900" },
              { "type": "TEXT", "name": "EmptyBody", "characters": "Add your first client company to start managing their accounts.", "textStyle": "$text/body/md/regular", "fill": "$colour/neutral/500" },
              { "type": "INSTANCE", "name": "AddClientBtn", "component": "Button", "variant": { "variant": "primary", "size": "md" }, "properties": { "label": "+ Add first client" } }
            ]
          }
        ]
      }
    ]
  }]
}
```

- [ ] **Step 2: Compile, execute, screenshot, verify**

```bash
bridge-ds compile --input bridge-ds/specs/active/partner-firm-home-empty.json --kb bridge-ds/knowledge-base --transport official
```

Execute via `use_figma`. Screenshot: check empty state card centered, indigo illustration placeholder, Add button.

- [ ] **Step 3: Commit**

```bash
git add bridge-ds/specs/active/partner-firm-home-empty.json
git commit -m "design: Partner/Firm Home — empty state"
```

---

## Task 5: Client Dashboard — full frame

**Files:**
- Create: `bridge-ds/specs/active/partner-client-dashboard.json`

- [ ] **Step 1: Write Client Dashboard scene graph**

Save to `bridge-ds/specs/active/partner-client-dashboard.json`:

```json
{
  "version": "3.0",
  "metadata": { "name": "Partner/Client Dashboard", "width": 1440, "height": 900, "transport": "official" },
  "fonts": [{ "family": "Inter", "style": "Regular" }, { "family": "Inter", "style": "Medium" }, { "family": "Inter", "style": "Semi Bold" }],
  "nodes": [{
    "type": "FRAME", "name": "Partner/Client Dashboard", "layout": "HORIZONTAL",
    "width": 1440, "height": 900, "fill": "$colour/neutral/50",
    "children": [
      { "$ref": "bridge-ds/specs/active/partner-sidebar-client.json" },
      {
        "type": "FRAME", "name": "MainContent", "fillH": true, "fillV": true,
        "layout": "VERTICAL", "gap": 20,
        "padding": { "top": 28, "right": 32, "bottom": 28, "left": 32 },
        "fill": "$colour/neutral/50",
        "children": [
          {
            "type": "FRAME", "name": "ClientHeader", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 16,
            "children": [
              {
                "type": "FRAME", "name": "ClientInfo", "layout": "VERTICAL", "gap": 4, "fillH": true,
                "children": [
                  { "type": "TEXT", "name": "ClientName", "characters": "Virtanen Oy", "textStyle": "$text/heading/2/semibold", "fill": "$colour/neutral/900" },
                  { "type": "TEXT", "name": "ClientMeta", "characters": "1234567-8  ·  Fiscal year: Jan–Dec  ·  Accountant: Pekka Mäkinen", "textStyle": "$text/body/sm/regular", "fill": "$colour/neutral/500" }
                ]
              },
              { "type": "TEXT", "name": "SyncStatus", "characters": "Last synced 2 min ago", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/400" },
              { "type": "TEXT", "name": "BackLink", "characters": "← Back to firm", "textStyle": "$text/label/sm/medium", "fill": "$colour/primary/500" }
            ]
          },
          {
            "type": "FRAME", "name": "KPIStrip", "layout": "HORIZONTAL", "fillH": true, "gap": 16,
            "children": [
              { "type": "FRAME", "name": "KPI-Cash", "layout": "VERTICAL", "gap": 8, "fillH": true, "padding": { "top": 16, "right": 20, "bottom": 16, "left": 20 }, "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg", "children": [
                { "type": "TEXT", "name": "KPILabel", "characters": "Cash Position", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                { "type": "TEXT", "name": "KPIValue", "characters": "€24,340", "textStyle": "$text/heading/2/semibold", "fill": "$colour/semantic/success" },
                { "type": "TEXT", "name": "KPITrend", "characters": "Live bank balance", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }
              ]},
              { "type": "FRAME", "name": "KPI-Receivables", "layout": "VERTICAL", "gap": 8, "fillH": true, "padding": { "top": 16, "right": 20, "bottom": 16, "left": 20 }, "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg", "children": [
                { "type": "TEXT", "name": "KPILabel", "characters": "Receivables", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                { "type": "TEXT", "name": "KPIValue", "characters": "€8,200", "textStyle": "$text/heading/2/semibold", "fill": "$colour/primary/500" },
                { "type": "TEXT", "name": "KPITrend", "characters": "4 open invoices", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }
              ]},
              { "type": "FRAME", "name": "KPI-Payables", "layout": "VERTICAL", "gap": 8, "fillH": true, "padding": { "top": 16, "right": 20, "bottom": 16, "left": 20 }, "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg", "children": [
                { "type": "TEXT", "name": "KPILabel", "characters": "Payables", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                { "type": "TEXT", "name": "KPIValue", "characters": "€3,150", "textStyle": "$text/heading/2/semibold", "fill": "$colour/semantic/warning" },
                { "type": "TEXT", "name": "KPITrend", "characters": "2 unpaid purchases", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }
              ]},
              { "type": "FRAME", "name": "KPI-VAT", "layout": "VERTICAL", "gap": 8, "fillH": true, "padding": { "top": 16, "right": 20, "bottom": 16, "left": 20 }, "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg", "children": [
                { "type": "TEXT", "name": "KPILabel", "characters": "VAT Liability (est.)", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/500" },
                { "type": "TEXT", "name": "KPIValue", "characters": "€1,840", "textStyle": "$text/heading/2/semibold", "fill": "$colour/semantic/error" },
                { "type": "TEXT", "name": "KPITrend", "characters": "AI estimate · Apr period", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }
              ]}
            ]
          },
          {
            "type": "FRAME", "name": "Row2", "layout": "HORIZONTAL", "fillH": true, "gap": 20,
            "children": [
              {
                "type": "FRAME", "name": "CashFlowCard", "layout": "VERTICAL", "gap": 12,
                "fillH": true, "height": 200,
                "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  {
                    "type": "FRAME", "name": "CardHeader", "layout": "HORIZONTAL", "fillH": true", "counterAxisAlignItems": "CENTER",
                    "children": [
                      { "type": "TEXT", "name": "CardTitle", "characters": "Cash Flow", "textStyle": "$text/label/lg/semibold", "fill": "$colour/neutral/900", "fillH": true },
                      {
                        "type": "FRAME", "name": "ToggleGroup", "layout": "HORIZONTAL", "gap": 4, "counterAxisAlignItems": "CENTER",
                        "children": [
                          { "type": "FRAME", "name": "Toggle30", "layout": "HORIZONTAL", "padding": { "top": 4, "right": 10, "bottom": 4, "left": 10 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/primary/500", "children": [{ "type": "TEXT", "characters": "30d", "textStyle": "$text/label/xs/medium", "fill": "$colour/neutral/white" }] },
                          { "type": "FRAME", "name": "Toggle60", "layout": "HORIZONTAL", "padding": { "top": 4, "right": 10, "bottom": 4, "left": 10 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/neutral/100", "children": [{ "type": "TEXT", "characters": "60d", "textStyle": "$text/label/xs/medium", "fill": "$colour/neutral/500" }] },
                          { "type": "FRAME", "name": "Toggle90", "layout": "HORIZONTAL", "padding": { "top": 4, "right": 10, "bottom": 4, "left": 10 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/neutral/100", "children": [{ "type": "TEXT", "characters": "90d", "textStyle": "$text/label/xs/medium", "fill": "$colour/neutral/500" }] }
                        ]
                      }
                    ]
                  },
                  { "type": "RECTANGLE", "name": "ChartPlaceholder", "fillH": true, "height": 100, "fill": "$colour/primary/50", "cornerRadius": "$radius/radius-sm" },
                  {
                    "type": "FRAME", "name": "Legend", "layout": "HORIZONTAL", "gap": 16, "counterAxisAlignItems": "CENTER",
                    "children": [
                      { "type": "FRAME", "name": "LegendActual", "layout": "HORIZONTAL", "gap": 6, "counterAxisAlignItems": "CENTER", "children": [{ "type": "RECTANGLE", "width": 20, "height": 3, "fill": "$colour/primary/500" }, { "type": "TEXT", "characters": "Actual", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/500" }] },
                      { "type": "FRAME", "name": "LegendForecast", "layout": "HORIZONTAL", "gap": 6, "counterAxisAlignItems": "CENTER", "children": [{ "type": "RECTANGLE", "width": 20, "height": 3, "fill": "$colour/primary/200" }, { "type": "TEXT", "characters": "Forecast (AI)", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/500" }] }
                    ]
                  }
                ]
              },
              {
                "type": "FRAME", "name": "InvoicePipeline", "layout": "VERTICAL", "gap": 8,
                "width": 260, "height": 200,
                "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  { "type": "TEXT", "name": "PipelineTitle", "characters": "Invoice Pipeline", "textStyle": "$text/label/lg/semibold", "fill": "$colour/neutral/900" },
                  { "type": "FRAME", "name": "Stage-Draft", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 8, "children": [{ "type": "TEXT", "characters": "Draft", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/400", "width": 60 }, { "type": "RECTANGLE", "name": "Bar", "width": 100, "height": 8, "fill": "$colour/neutral/200", "cornerRadius": "$radius/radius-pill" }, { "type": "TEXT", "characters": "2  ·  €1,200", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }] },
                  { "type": "FRAME", "name": "Stage-Sent", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 8, "children": [{ "type": "TEXT", "characters": "Sent", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/400", "width": 60 }, { "type": "RECTANGLE", "name": "Bar", "width": 140, "height": 8, "fill": "$colour/primary/400", "cornerRadius": "$radius/radius-pill" }, { "type": "TEXT", "characters": "4  ·  €5,800", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400" }] },
                  { "type": "FRAME", "name": "Stage-Overdue", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 8, "children": [{ "type": "TEXT", "characters": "Overdue", "textStyle": "$text/label/sm/regular", "fill": "$colour/semantic/error", "width": 60 }, { "type": "RECTANGLE", "name": "Bar", "width": 60, "height": 8, "fill": "$colour/semantic/error", "cornerRadius": "$radius/radius-pill" }, { "type": "TEXT", "characters": "1  ·  €2,400", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/error" }] },
                  { "type": "FRAME", "name": "Stage-Paid", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 8, "children": [{ "type": "TEXT", "characters": "Paid", "textStyle": "$text/label/sm/regular", "fill": "$colour/semantic/success", "width": 60 }, { "type": "RECTANGLE", "name": "Bar", "width": 180, "height": 8, "fill": "$colour/semantic/success", "cornerRadius": "$radius/radius-pill" }, { "type": "TEXT", "characters": "12  ·  €24,000", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/success" }] }
                ]
              }
            ]
          },
          {
            "type": "FRAME", "name": "Row3", "layout": "HORIZONTAL", "fillH": true, "fillV": true, "gap": 20,
            "children": [
              {
                "type": "FRAME", "name": "TransactionsCard", "layout": "VERTICAL", "gap": 12,
                "fillH": true, "fillV": true,
                "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 },
                "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                "children": [
                  { "type": "FRAME", "name": "CardHeader", "layout": "HORIZONTAL", "fillH": true", "counterAxisAlignItems": "CENTER", "children": [
                    { "type": "TEXT", "name": "CardTitle", "characters": "Recent Transactions", "textStyle": "$text/label/lg/semibold", "fill": "$colour/neutral/900", "fillH": true },
                    { "type": "TEXT", "name": "ViewAll", "characters": "View all →", "textStyle": "$text/label/sm/medium", "fill": "$colour/primary/500" }
                  ]},
                  { "type": "FRAME", "name": "TxRow1", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 12, "padding": { "top": 8, "right": 0, "bottom": 8, "left": 0 }, "children": [
                    { "type": "TEXT", "characters": "Apr 26", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "width": 50 },
                    { "type": "TEXT", "characters": "Office rent — April", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/900", "fillH": true },
                    { "type": "TEXT", "characters": "−€1,200", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/900", "width": 80 },
                    { "type": "FRAME", "name": "Category", "layout": "HORIZONTAL", "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/neutral/100", "children": [{ "type": "TEXT", "characters": "Rent", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/600" }] },
                    { "type": "TEXT", "characters": "98%", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/success", "width": 35 }
                  ]},
                  { "type": "FRAME", "name": "TxRow2", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 12, "padding": { "top": 8, "right": 0, "bottom": 8, "left": 0 }, "children": [
                    { "type": "TEXT", "characters": "Apr 25", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "width": 50 },
                    { "type": "TEXT", "characters": "Puumalainen Oy — Invoice #42", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/900", "fillH": true },
                    { "type": "TEXT", "characters": "+€3,400", "textStyle": "$text/label/sm/medium", "fill": "$colour/semantic/success", "width": 80 },
                    { "type": "FRAME", "name": "Category", "layout": "HORIZONTAL", "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/neutral/100", "children": [{ "type": "TEXT", "characters": "Revenue", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/600" }] },
                    { "type": "TEXT", "characters": "95%", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/success", "width": 35 }
                  ]},
                  { "type": "FRAME", "name": "TxRow3-LowConfidence", "layout": "HORIZONTAL", "fillH": true, "counterAxisAlignItems": "CENTER", "gap": 12, "padding": { "top": 8, "right": 0, "bottom": 8, "left": 0 }, "stroke": "$colour/semantic/warning", "strokeWeight": 0, "children": [
                    { "type": "TEXT", "characters": "Apr 24", "textStyle": "$text/label/xs/regular", "fill": "$colour/neutral/400", "width": 50 },
                    { "type": "TEXT", "characters": "Transfer — unknown reference", "textStyle": "$text/label/sm/regular", "fill": "$colour/neutral/900", "fillH": true },
                    { "type": "TEXT", "characters": "−€540", "textStyle": "$text/label/sm/medium", "fill": "$colour/neutral/900", "width": 80 },
                    { "type": "FRAME", "name": "Category", "layout": "HORIZONTAL", "padding": { "top": 2, "right": 8, "bottom": 2, "left": 8 }, "cornerRadius": "$radius/radius-pill", "fill": "$colour/semantic/warning/light", "children": [{ "type": "TEXT", "characters": "Review", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/warning" }] },
                    { "type": "TEXT", "characters": "42%", "textStyle": "$text/label/xs/regular", "fill": "$colour/semantic/warning", "width": 35 }
                  ]}
                ]
              },
              {
                "type": "FRAME", "name": "ActionsAndAI", "layout": "VERTICAL", "gap": 12,
                "width": 260, "fillV": true,
                "children": [
                  {
                    "type": "FRAME", "name": "QuickActions", "layout": "VERTICAL", "gap": 8, "fillH": true",
                    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 },
                    "fill": "$colour/neutral/white", "cornerRadius": "$radius/radius-lg",
                    "children": [
                      { "type": "TEXT", "name": "ActionsTitle", "characters": "Quick Actions", "textStyle": "$text/label/sm/semibold", "fill": "$colour/neutral/900" },
                      {
                        "type": "FRAME", "name": "ActionGrid", "layout": "HORIZONTAL", "fillH": true, "gap": 8, "wrap": true,
                        "children": [
                          { "type": "INSTANCE", "name": "BtnInvoice", "component": "Button", "variant": { "variant": "ghost", "size": "sm" }, "properties": { "label": "+ New Invoice" }, "fillH": true },
                          { "type": "INSTANCE", "name": "BtnPayment", "component": "Button", "variant": { "variant": "ghost", "size": "sm" }, "properties": { "label": "Record Payment" }, "fillH": true },
                          { "type": "INSTANCE", "name": "BtnReconcile", "component": "Button", "variant": { "variant": "ghost", "size": "sm" }, "properties": { "label": "Reconcile Bank" }, "fillH": true },
                          { "type": "INSTANCE", "name": "BtnVAT", "component": "Button", "variant": { "variant": "ghost", "size": "sm" }, "properties": { "label": "Run VAT Report" }, "fillH": true }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "FRAME", "name": "AIInsight-Empty", "layout": "VERTICAL", "gap": 8, "fillH": true",
                    "padding": { "top": 16, "right": 16, "bottom": 16, "left": 16 },
                    "fill": "$colour/primary/50", "cornerRadius": "$radius/radius-lg",
                    "stroke": "$colour/primary/200", "strokeWeight": 1,
                    "children": [
                      { "type": "TEXT", "name": "AILabel", "characters": "✦ AI Insight", "textStyle": "$text/label/sm/semibold", "fill": "$colour/primary/500" },
                      { "type": "TEXT", "name": "AIBody", "characters": "Looking good — nothing to flag for Virtanen Oy right now.", "textStyle": "$text/body/sm/regular", "fill": "$colour/neutral/700" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }]
}
```

- [ ] **Step 2: Compile**

```bash
bridge-ds compile \
  --input bridge-ds/specs/active/partner-client-dashboard.json \
  --kb bridge-ds/knowledge-base \
  --transport official
```

Expected: exit 0.

- [ ] **Step 3: Execute in Figma** — switch to Partner Dashboard page, run compiled output.

- [ ] **Step 4: Screenshot and verify**

Check: client-mode sidebar (back arrow + Virtanen Oy), 4 KPI cards, cash flow card with toggle, invoice pipeline with bars, transactions table with low-confidence row highlighted, quick actions grid, AI insight card.

- [ ] **Step 5: Commit**

```bash
git add bridge-ds/specs/active/partner-client-dashboard.json
git commit -m "design: Partner/Client Dashboard — full frame"
```

---

## Task 6: Client Dashboard — AI Insight Active state

**Files:**
- Create: `bridge-ds/specs/active/partner-client-dashboard-ai.json`

- [ ] **Step 1: Clone base frame via use_figma and update AI panel**

```javascript
// use_figma
const page = figma.root.children.find(p => p.name === 'Partner Dashboard');
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

const baseFrame = page.children.find(n => n.name === 'Partner/Client Dashboard');
const aiFrame = baseFrame.clone();
aiFrame.name = 'Partner/Client Dashboard — AI Insight Active';
aiFrame.x = baseFrame.x + 1500;

// Find the AI Insight card and update it
const aiCard = aiFrame.findOne(n => n.name === 'AIInsight-Empty');
if (aiCard) {
  aiCard.name = 'AIInsight-Active';
  aiCard.fills = [{ type: 'SOLID', color: { r: 0.933, g: 0.945, b: 1 } }]; // #EEF2FF

  const aiBody = aiCard.findOne(n => n.name === 'AIBody');
  if (aiBody) {
    aiBody.characters = 'Cash will be negative in ~23 days at current burn rate. 2 overdue invoices totalling €4,200 could resolve this.';
  }

  // Add CTA button text node
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  const cta = figma.createText();
  cta.characters = 'Review overdue invoices →';
  cta.fontName = { family: 'Inter', style: 'Medium' };
  cta.fontSize = 13;
  cta.fills = [{ type: 'SOLID', color: { r: 0.388, g: 0.4, b: 0.945 } }];
  aiCard.appendChild(cta);
  cta.layoutSizingHorizontal = 'FILL';
}

return { clonedId: aiFrame.id };
```

- [ ] **Step 2: Screenshot and verify**

Use `get_screenshot` on the cloned frame. Check: AI Insight card has warning text about cash negative in 23 days and the CTA link.

- [ ] **Step 3: Commit**

```bash
git commit -m "design: Partner/Client Dashboard — AI Insight active state"
```

---

## Task 7: Final verification

- [ ] **Step 1: List all frames on Partner Dashboard page**

```javascript
// use_figma
const page = figma.root.children.find(p => p.name === 'Partner Dashboard');
await figma.setCurrentPageAsync(page);
return page.children.map(n => ({ name: n.name, w: n.width, h: n.height, x: n.x }));
```

Expected frames:
- `Partner/Firm Home` — 1440×900
- `Partner/Firm Home — Empty State` — 1440×900
- `Partner/Client Dashboard` — 1440×900
- `Partner/Client Dashboard — AI Insight Active` — 1440×900

- [ ] **Step 2: Screenshot all 4 frames** — use `get_screenshot` on each node ID.

- [ ] **Step 3: Archive shipped specs**

```bash
mv bridge-ds/specs/active/partner-*.json bridge-ds/specs/shipped/
```

- [ ] **Step 4: Final commit**

```bash
git add bridge-ds/specs/shipped/
git commit -m "design: archive Partner Dashboard scene graphs — all 4 frames complete"
```

---

> **Note on `$ref` syntax:** If bridge-ds rejects `"$ref"` in scene graphs, inline the full sidebar JSON content in place of each `$ref` entry. Check `bridge-ds --help` for `$ref` support before Task 3.
