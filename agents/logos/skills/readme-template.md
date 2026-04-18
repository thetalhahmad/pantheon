# Skill: README Writing

## The README Contract
A README makes an implicit promise: "If you follow these instructions, you will have a working [thing] in [X] minutes." If the README breaks that promise, it has failed.

## Required Sections (in order)

### 1. Project name and one-liner
```markdown
# Pantheon
A modular team of specialist AI agents for Claude Code. Deploy the ones you need, on any project.
```

### 2. Quick Start (THE most important section)
The fastest possible path from zero to working.
- Every command must be copy-pasteable
- Assume nothing is installed
- State what the expected output looks like
- This should work in under 5 minutes for a standard setup

```markdown
## Quick Start
# Install
curl -fsSL https://claude.ai/install.sh | bash

# Install Hermes (PRD Writer)
cp agents/hermes/agent.md ~/.claude/agents/

# Use Hermes
claude
> "Hermes, write a PRD for a user authentication system"
```

### 3. Prerequisites
List every dependency, with minimum version and installation link.
```markdown
## Prerequisites
- Claude Code v2.0+ — [install guide](https://claude.ai/install)
- Node.js 18+ — [nodejs.org](https://nodejs.org)
- Figma account — required for Iris agent only
```

### 4. Installation
Every step explicit. No implicit "of course you would..."
```markdown
## Installation

Clone the repository:
git clone https://github.com/thetalhahmad/pantheon
cd pantheon

Install all agents globally:
bash install.sh --all

Verify installation:
claude
> /agents
```

### 5. Configuration
Document every configuration option:
| Variable | Required | Default | Description |
|---|---|---|---|
| FIGMA_API_KEY | For Iris only | None | Get from Figma Settings > API |

### 6. Usage
Cover the most common use cases with examples. Not edge cases, not advanced usage — the thing 80% of users will do first.

### 7. Contributing
Link to CONTRIBUTING.md. State: "We welcome PRs for new agents, skill improvements, and bug fixes."

### 8. License
State the license clearly: "MIT License — see LICENSE file"

## README Anti-Patterns

| Anti-Pattern | Why Bad | Fix |
|---|---|---|
| Assumes developer has things installed | Breaks for new users | State all prerequisites |
| No example output | User doesn't know if it worked | Show expected output |
| Describes architecture before usage | Irrelevant before it works | Quick Start comes first |
| "See documentation for details" with no link | Dead end | Always link |
| Commands that will fail on a fresh machine | Frustrating | Test on fresh environment |
