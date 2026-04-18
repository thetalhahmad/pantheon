# Workflow: Full Sprint

**Pipeline:** Hermes → Mnemon → Iris → Athena → Hephaestus + Talos + Pallas → Argus → Logos

Use this workflow to go from a product idea to shipped, tested, documented code.

---

## When to Use

- Building a new feature end-to-end
- Greenfield product builds
- Any work that needs design + code + QA

---

## Steps

### Step 1: Brief → PRD (Hermes)
```
"Hermes, write a PRD for [feature/product]"
```
Hermes asks clarifying questions, then produces a complete PRD saved to Notion.

---

### Step 2: Compress (Mnemon)
```
"Mnemon, compress this PRD for the engineering team: [Notion URL]"
```
Mnemon strips noise and produces a token-efficient spec.

---

### Step 3: Design (Iris)
```
"Iris, design the screens for this PRD: [compressed spec or Notion URL]"
```
Iris produces Figma screens and saves handoff notes to Notion.

---

### Step 4: Architecture (Athena)
```
"Athena, review this PRD and Iris's designs and define the technical architecture"
```
Athena produces an architecture doc covering data models, API design, and tech decisions.

---

### Step 5: Build (Hephaestus / Talos / Pallas)

Depending on scope, use one or split:

```
# Full stack (simpler features)
"Hephaestus, build this from the spec and designs: [links]"

# Split (larger features)
"Talos, build the backend API from this architecture doc"
"Pallas, build the frontend from Iris's Figma designs"
```

---

### Step 6: QA (Argus)
```
"Argus, test this implementation against the original PRD requirements"
```
Argus produces a test report with pass/fail against each requirement.

---

### Step 7: Document (Logos)
```
"Logos, write the technical documentation for this feature"
```
Logos produces user-facing docs and internal technical docs.

---

## Token Optimization Notes

- Always run Mnemon (Step 2) before any execution agent
- Use Haiku for Mnemon and Argus test generation
- Use Sonnet for Iris, Hephaestus, Athena
- Only use Opus for architecture decisions on complex systems

---

## ralph-starter Command

```bash
ralph-starter run \
  --from notion \
  --project "YOUR_PRD_NOTION_URL" \
  --preset full-sprint \
  --commit \
  --validate
```
