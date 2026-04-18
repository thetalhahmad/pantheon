# Iris — Product Designer

**Guild:** Design
**Model:** Sonnet
**Transport:** Bridge (WebSocket → Figma Plugin API) + Official Figma MCP
**GitHub:** `pantheon/agents/iris/`

> *Goddess of the rainbow. Translates product requirements into production-ready Figma designs using your real design system.*

---

## What Iris Does

- Reads PRDs from Notion and generates complete Figma screen designs
- Uses **Bridge** to write directly to Figma via the Plugin API — real DS components, bound variables, text styles
- Uses **atomic generation** — splits every screen into 5-7 sequential steps, screenshots after each
- Extracts your design system keys (components, variables, text styles) automatically
- Annotates all interaction states: default, hover, active, disabled, loading, error, empty
- Produces handoff notes for Hephaestus and Pallas

---

## When to Use Iris

- After Hermes writes a PRD and Mnemon compresses it
- When building new product screens or user flows
- When updating existing designs to match new requirements
- Before handing off to Hephaestus (full stack) or Pallas (frontend)

---

## Setup Requirements

```bash
# Install Bridge
curl -fsSL https://raw.githubusercontent.com/noemuch/bridge/main/install.sh | bash

# Initialize per project (connects Bridge to Figma, extracts DS keys)
bridge init

# Start server for each session
bridge start
```

Also connect the official Figma MCP for screenshot verification:
```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

---

## Skills

| Skill | Description |
|---|---|
| `figma-workflow.md` | Bridge setup, atomic generation pattern, script sending |
| `figma-api-rules.md` | All 26 Figma Plugin API rules — complete reference |
| `design-system-extraction.md` | How to extract and use DS component/variable/style keys |
| `saas-ui-patterns.md` | Dashboard, table, form, empty state patterns |
| `accessibility.md` | WCAG 2.1 AA checklist, contrast, keyboard nav |

---

## Example Prompts

```
"Iris, design the invoice list screen from this PRD: [Notion link]"
"Iris, extract the DS keys from our Figma library"
"Iris, design the empty state for the dashboard"
"Iris, add loading and error states to the invoice list"
"Iris, check the invoice form design for accessibility issues"
```

---

## How Atomic Generation Works

Iris never writes an entire screen in one script. Every design is built in sequential steps:

1. **Structure** — root frame + empty section frames
2. **Header/Nav** — populate with real DS components + screenshot verify
3. **Main content** — one step per major section + screenshot verify
4. **Secondary elements** — footer, labels, badges
5. **States** — loading, error, empty state variants

This means if step 3 has a bug, only step 3 is re-run. Steps 1 and 2 are unchanged.

---

## Key Difference from Standard Figma MCP

The official Figma MCP reads designs and generates code FROM Figma. Bridge WRITES designs TO Figma using real Plugin API — the same API used by human designers building Figma plugins. This means:

- Real design system components are imported and linked, not approximated
- Variables are bound, not hardcoded
- Text styles are applied, not manually sized
- The output is production-ready Figma that a designer would be proud of
