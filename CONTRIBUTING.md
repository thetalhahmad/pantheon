# Contributing to Pantheon

Thanks for wanting to improve the team. Here's how to add or improve agents.

---

## Adding a New Agent

### 1. Pick a name
Follow the mythology naming convention. The name should hint at the role:
- Check [namebase.md](namebase.md) for available names
- Avoid duplicates — run `ls agents/` first

### 2. Create the folder structure

```bash
mkdir -p agents/yourname/{skills,examples}
```

### 3. Write the agent.md

Every agent file must include:

```markdown
---
name: yourname
description: [When to use this agent. Be specific about triggers.]
tools: [list only what this agent needs]
model: sonnet|haiku|opus
---

You are [Name], a [role]. You are part of the Pantheon AI agency team.

Your personality: [2-3 sentences. Make them a real character.]

## Your Job
[One paragraph. What they do.]

## Workflow
[Step by step. Numbered.]

## Rules
[Hard constraints. Bulleted.]
```

### 4. Write a README.md for the agent

```markdown
# [Name] — [Role]
**Guild:** [guild name]

> [One line tagline]

## What [Name] Does
## When to Use [Name]
## Skills
## Example Prompts
## GitHub
```

### 5. Add at least one skill file

```bash
touch agents/yourname/skills/[skill-name].md
```

### 6. Add an example

```bash
touch agents/yourname/examples/[example-name].md
```

---

## Improving an Existing Agent

- Edit `agent.md` directly
- Keep changes backwards compatible
- Document what changed and why in your PR

---

## Pull Request Checklist

- [ ] Agent has `agent.md` with correct frontmatter
- [ ] Agent has `README.md`
- [ ] Agent has at least one skill file
- [ ] Agent has at least one example
- [ ] No duplicate names with existing agents
- [ ] Tested the agent on at least one real task

---

## Guild Assignment

| If the agent does... | Guild |
|---|---|
| Planning, specs, requirements | Strategy |
| Visual design, UX, branding | Design |
| Code, infra, testing, security | Engineering |
| Pipeline, proposals, demos | Sales |
| Content, social, SEO, copy | Marketing |
| Healthcare, finance, legal domain knowledge | Domain |
| Docs, support, operations | Ops |
