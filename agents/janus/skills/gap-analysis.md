# Skill: Gap Analysis

## What Gap Analysis Is
Gap analysis identifies the difference between the current state and the desired future state, then prioritizes the gaps by business impact.

## The Gap Analysis Process

### Step 1: Define Current State
Document what exists today with brutal honesty. Use process maps, interviews, data.

Current state sources:
- User interviews ("walk me through your day")
- System audits (what does the software actually do, not what we think it does)
- Data analysis (where are errors occurring, what takes longest)
- Support ticket analysis (what do users complain about most)

### Step 2: Define Future State
Document what must be true when we are done.

Future state sources:
- Business objectives (what does the business need to achieve)
- User research (what would make users significantly more successful)
- Regulatory requirements (what compliance demands)
- Market requirements (what competitors offer that we do not)

Future state must be specific. "Better user experience" is not a future state. "Radiologists complete their first AI-assisted review in under 10 minutes without training" is.

### Step 3: Identify Gaps
For each area of the current state, identify what is missing, broken, or insufficient.

Gap categories:
- **Missing capability** — something that does not exist at all
- **Insufficient quality** — something that exists but does not meet the standard
- **Process gap** — a workflow step that is manual, error-prone, or inefficient
- **Data gap** — information that is needed but not available or not accurate
- **People gap** — skills or knowledge that are missing
- **Compliance gap** — something required by regulation that is not in place

### Step 4: Prioritize Gaps

Score each gap on:
- **Business impact** (1-5): How much does closing this gap move the business forward?
- **User impact** (1-5): How much does it improve the user's experience or outcomes?
- **Risk** (1-5): What is the risk of NOT closing this gap?
- **Effort** (1-5, inverted): How much work is required? (5 = easy, 1 = very hard)

Priority Score = (Business Impact + User Impact + Risk) × Effort

## Gap Analysis Output Format

```
# Gap Analysis: [System/Process Name]

## Executive Summary
[2-3 sentences: what the most critical gaps are and what closing them enables]

## Current State Summary
[Brief description of what exists today]

## Future State Summary
[Brief description of the target]

## Gap Register
| ID | Gap | Category | Business Impact | User Impact | Risk | Effort | Priority |
|---|---|---|---|---|---|---|---|
| G-001 | [gap description] | Missing capability | 5 | 4 | 3 | 4 | 48 |

## Top 5 Priority Gaps (detailed)
For each of the top 5:
- Description of the gap
- Current state detail
- Future state requirement
- Why this priority ranking
- Recommended approach to close it
- Dependencies

## Out of Scope Gaps
[Gaps that were identified but are not being addressed in this phase, and why]
```
