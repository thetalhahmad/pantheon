# Iris — Product Designer

**Guild:** Design
**Model:** Sonnet
**Engine:** Bridge DS (compiler-driven Figma generation)
**GitHub:** `pantheon/agents/iris/`

> *Goddess of the rainbow. Generates production-ready Figma designs that are guaranteed DS-compliant by construction, not by verification.*

---

## What Makes Iris Different

Most AI design tools approximate your design system. Iris uses **Bridge DS** — a compiler that takes declarative design intent (CSpec YAML) and enforces:
- All 26 Figma Plugin API rules automatically
- 100% DS token compliance (no hardcoded values)
- Real component instances imported from your actual Figma library
- Bound variables (not approximated fills)

The result is Figma output a designer would be proud of, not a mockup that needs manual cleanup.

---

## Architecture

```
Iris writes CSpec YAML
  → Converts to Scene Graph JSON
  → bridge-ds compile enforces all rules + resolves all tokens
  → Compiler output executed in Figma via MCP
  → Screenshot taken and verified
  → Design shipped
```

Iris never writes raw Figma Plugin API code. The compiler handles everything.

---

## Quick Start

```bash
# 1. Install Bridge DS
npm install -g @noemuch/bridge-ds

# 2. Initialize project (one time — extracts DS, scaffolds KB)
bridge-ds setup

# 3. Start designing
# In Claude Code:
> make an invoice list screen with sidebar navigation
```

---

## Commands

| Command | What happens |
|---|---|
| `make <description>` | Generate a new screen or component |
| `fix` | Learn from your manual Figma corrections |
| `done` / `ship it` | Archive and ship the design |
| `setup bridge` | Initialize or refresh the knowledge base |
| `drop` | Abandon current design |

---

## Workflow

```
setup bridge (once)
    ↓
make <description>   ← CSpec → compile → execute → screenshot → verify
    ↓
[iterate: describe changes OR "I adjusted in Figma" → fix]
    ↓
done                 ← final Gate B verification → archive → recipes updated
```

---

## What's Inside

```
agents/iris/
  agent.md                      ← Iris's core instructions + Bridge integration
  README.md                     ← this file

  skills/
    figma-workflow.md            ← Bridge setup and transport
    design-system-extraction.md  ← How DS keys work
    figma-api-rules.md           ← Reference (compiler handles these, but good to know)
    saas-ui-patterns.md          ← Dashboard, table, form patterns
    accessibility.md             ← WCAG 2.1 AA checklist

  bridge/                        ← Full Bridge DS embedded (always up to date)
    BRIDGE-CLAUDE.md             ← Bridge's own CLAUDE.md
    skills/
      using-bridge.md            ← Command map + Iron Laws (force-loaded)
      generating-figma-design.md ← Full make flow (5 phases, A-E)
      extracting-design-system.md← DS setup and extraction
      learning-from-corrections.md← fix flow
      shipping-and-archiving.md  ← done flow
    references/
      compiler-reference.md      ← Scene graph JSON format + node types
      transport-adapter.md       ← Console vs official MCP transport
      verification-gates.md      ← Gate A (compile) + Gate B (visual)
      red-flags-catalog.md       ← Rationalization → Reality table
    templates/
      screen-cspec.yaml          ← CSpec template for screens
      component-cspec.yaml       ← CSpec template for components
```

---

## Example Prompts

```
"Iris, make an invoice list screen"
"Iris, make a settings page with sidebar navigation"
"Iris, make a Button component with primary and secondary variants"
"I adjusted the header in Figma — fix"
"ship it"
"setup bridge"
```

---

## Source

Bridge DS is built by [noemuch](https://github.com/noemuch/bridge). The bridge/ folder in Iris is kept in sync with the upstream repo. When Bridge releases updates, pull the latest and re-embed.

```bash
# To update Bridge files in Iris:
git clone https://github.com/noemuch/bridge /tmp/bridge-latest
cp /tmp/bridge-latest/skills/*/SKILL.md pantheon/agents/iris/bridge/skills/
cp /tmp/bridge-latest/references/*.md pantheon/agents/iris/bridge/references/
cp /tmp/bridge-latest/skills/generating-figma-design/references/templates/*.yaml pantheon/agents/iris/bridge/templates/
cp /tmp/bridge-latest/CLAUDE.md pantheon/agents/iris/bridge/BRIDGE-CLAUDE.md
```
