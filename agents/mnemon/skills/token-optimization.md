# Skill: Token Optimization

## Purpose
Minimize token consumption across Pantheon workflows without losing output quality. Every token saved is money saved and context window preserved.

---

## Model Selection by Task

| Task | Right Model | Wrong Model | Why |
|---|---|---|---|
| Compression (Mnemon) | Haiku | Sonnet/Opus | Mechanical task, no reasoning needed |
| QA test writing (Argus) | Haiku | Sonnet | Pattern-based, not creative |
| Revenue ops (Tyche) | Haiku | Sonnet | Structured data processing |
| Social calendar (Eos) | Haiku | Sonnet | Template-based output |
| Architecture decisions (Athena) | Sonnet | Haiku | Requires deep reasoning |
| Security audits (Chiron) | Sonnet | Haiku | Requires adversarial thinking |
| Clinical compliance (Asclepius) | Sonnet | Haiku | High-stakes domain knowledge |
| Complex strategy (Prometheus) | Sonnet | Haiku | Multi-step reasoning |
| Simple data tasks | Haiku | Any | Cost efficiency |

**Rule: Use the cheapest model that produces acceptable output quality.**

---

## Context Window Management

### Signs the context window is filling up
- Agent starts forgetting earlier instructions
- Responses become shorter and less detailed
- Agent asks questions it already has the answer to
- Output quality degrades mid-session

### When to call Mnemon
- Any document over 500 words before passing to another agent
- When the session has been running more than 30 minutes
- Before starting a new major phase in a workflow
- When switching from one agent's output to another's input

### Context window sizes (approximate)
- Claude Haiku: 200K tokens
- Claude Sonnet: 200K tokens
- Practical useful window: ~150K tokens (leave 25% for output)
- A 2000-word document uses ~2,600 tokens = 1.7% of window

---

## Prompt Optimization

### Inefficient prompt:
"Could you please help me by taking a look at this document and then going through it carefully to identify and list all of the functional requirements that are mentioned throughout the text, making sure to include all of them?"

**Tokens: ~45**

### Efficient prompt:
"List all functional requirements from this document."

**Tokens: ~10**
**Saving: 35 tokens per call**

### Prompt patterns to avoid:
- "Could you please..." (just give the instruction)
- "I was wondering if you might be able to..." (just ask)
- "As an AI language model..." (never write this)
- Repeating context that is already in the system prompt

---

## Batching Strategies

Instead of:
```
Call 1: "Compress this for Iris"
Call 2: "Also compress it for Hephaestus"
Call 3: "And summarize the key risks"
```

Do:
```
Call 1: "Compress this document three ways:
1. Version for Iris (focus: UI/UX requirements)
2. Version for Hephaestus (focus: technical requirements)
3. Risk summary (focus: open questions and constraints)"
```

**Saves 2 full API calls and their associated context loading.**

---

## Caching Opportunities

Shared context (system prompts, agent definitions, brand guidelines) can be cached and does not need to be re-sent each call. In production Claude Code setups:
- CLAUDE.md is read once at session start
- Skill files are loaded when relevant, not every call
- Project context is established at the start and referenced, not restated

**Design skill files to be loaded on demand, not included in every prompt.**
