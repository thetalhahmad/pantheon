# 🏛️ Pantheon

> *A team of specialist AI agents, each a master of their craft.*

Pantheon is a modular, reusable AI agent team built on Claude Code. Each agent is a self-contained specialist with their own skills, personality, and tools. Deploy the ones you need, on any project, at any time.

---

## The Six Guilds

| Guild | Agents |
|---|---|
| ⚡ [Strategy](#strategy-guild) | Hermes, Prometheus, Janus, Mnemon |
| 🎨 [Design](#design-guild) | Iris, Muse, Lumen, Kineto, Hestia |
| ⚙️ [Engineering](#engineering-guild) | Hephaestus, Athena, Talos, Pallas, Forge, Argus, Proteus, Chiron |
| 💰 [Sales](#sales-guild) | Nike, Peitho, Doros, Tyche |
| 📣 [Marketing](#marketing-guild) | Apollo, Calliope, Eos, Orpheus, Kratos |
| 🏛️ [Domain](#domain-guild) | Asclepius, Plutus, Themis |
| 🔧 [Ops](#ops-guild) | Logos, Aura |

---

## Quick Start

### Install a single agent
```bash
cp agents/hermes/agent.md ~/.claude/agents/
```

### Install all agents
```bash
bash install.sh
```

### Run an agent on a Notion doc
```bash
ralph-starter run --from notion --project "YOUR_NOTION_PRD_URL"
```

---

## Agent Design Principles

Every agent in Pantheon follows these rules:

1. **Self-contained** — each agent works independently, no dependencies on other agents unless explicitly in a workflow
2. **Token-aware** — agents are prompted to be concise; always run Mnemon first for long docs
3. **Notion-native** — agents read briefs from Notion and write outputs back to Notion
4. **Composable** — agents can be chained in workflows via ralph-starter
5. **Overridable** — any agent's defaults can be overridden via project-level `CLAUDE.md`

---

## Strategy Guild

| Agent | Role | File |
|---|---|---|
| **Hermes** | PRD Writer | `agents/hermes/` |
| **Prometheus** | Product Strategist | `agents/prometheus/` |
| **Janus** | Business Analyst | `agents/janus/` |
| **Mnemon** | Context Engineer | `agents/mnemon/` |

## Design Guild

| Agent | Role | File |
|---|---|---|
| **Iris** | Product Designer | `agents/iris/` |
| **Muse** | Brand Designer | `agents/muse/` |
| **Lumen** | UX Researcher | `agents/lumen/` |
| **Kineto** | Motion Designer | `agents/kineto/` |
| **Hestia** | Design Systems Architect | `agents/hestia/` |

## Engineering Guild

| Agent | Role | File |
|---|---|---|
| **Hephaestus** | Full Stack Developer | `agents/hephaestus/` |
| **Athena** | Tech Lead / Architect | `agents/athena/` |
| **Talos** | Backend Developer | `agents/talos/` |
| **Pallas** | Frontend Developer | `agents/pallas/` |
| **Forge** | DevOps / Infrastructure | `agents/forge/` |
| **Argus** | QA Engineer | `agents/argus/` |
| **Proteus** | Data Engineer | `agents/proteus/` |
| **Chiron** | Security Engineer | `agents/chiron/` |

## Sales Guild

| Agent | Role | File |
|---|---|---|
| **Nike** | Sales Strategist | `agents/nike/` |
| **Peitho** | Sales Copywriter | `agents/peitho/` |
| **Doros** | Demo Specialist | `agents/doros/` |
| **Tyche** | Revenue Ops / CRM | `agents/tyche/` |

## Marketing Guild

| Agent | Role | File |
|---|---|---|
| **Apollo** | Content Writer | `agents/apollo/` |
| **Calliope** | Copywriter | `agents/calliope/` |
| **Eos** | Social Media Manager | `agents/eos/` |
| **Orpheus** | Social Media Designer | `agents/orpheus/` |
| **Kratos** | SEO Specialist | `agents/kratos/` |

## Domain Guild

| Agent | Role | File |
|---|---|---|
| **Asclepius** | Healthcare / Regulatory | `agents/asclepius/` |
| **Plutus** | Finance / Accounting | `agents/plutus/` |
| **Themis** | Legal / Compliance | `agents/themis/` |

## Ops Guild

| Agent | Role | File |
|---|---|---|
| **Logos** | Technical Writer | `agents/logos/` |
| **Aura** | Customer Success | `agents/aura/` |

---

## Workflows

Pre-built agent pipelines for common project types:

| Workflow | Agents | File |
|---|---|---|
| PRD to Design | Hermes → Mnemon → Iris | `workflows/prd-to-design.md` |
| Design to Code | Iris → Athena → Hephaestus | `workflows/design-to-code.md` |
| Full Sprint | Hermes → Mnemon → Iris → Athena → Hephaestus → Argus | `workflows/full-sprint.md` |
| Content Campaign | Prometheus → Apollo → Calliope → Orpheus → Eos | `workflows/content-campaign.md` |
| Sales Pipeline | Hermes → Nike → Peitho → Doros → Tyche | `workflows/sales-pipeline.md` |

---

## Notion Setup

Pantheon uses Notion as its shared brain. See `notion-templates/` for the full workspace structure including:

- Agency HQ
- Agent Registry
- Project Template
- Shared Knowledge base

---

## Requirements

- Claude Code (`curl -fsSL https://claude.ai/install.sh | bash`)
- Figma account with MCP connected (for Iris)
- Notion workspace with MCP connected (for all agents)
- `ralph-starter` for autonomous loops (`npm install -g ralph-starter`)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) to add new agents or improve existing ones.

---

## License

MIT — free to use, fork, and build on.
