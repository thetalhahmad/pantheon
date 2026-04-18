# Workflow: PRD to Design

**Pipeline:** Hermes → Mnemon → Iris

Use this when you have a feature idea and need designs before touching any code.

---

## Steps

### Step 1: Write the PRD (Hermes)
```
"Hermes, write a PRD for [feature]"
```

### Step 2: Compress for Iris (Mnemon)
```
"Mnemon, compress this PRD for Iris: [Notion URL]"
```

### Step 3: Design (Iris)
```
"Iris, design the screens for this: [compressed spec]"
```

Iris outputs Figma screens + handoff notes in Notion.

---

## Token Estimate
- Hermes: ~2,000 tokens
- Mnemon: ~500 tokens (compresses PRD by ~70%)
- Iris: ~3,000 tokens (reads compressed spec + writes to Figma)
- **Total: ~5,500 tokens**
