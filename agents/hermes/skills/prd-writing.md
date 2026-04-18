# Skill: PRD Writing

## The PRD Contract
A PRD makes an implicit promise to every downstream agent: "If you read this document completely, you will have everything you need to execute your part of the work without asking follow-up questions."

If Iris needs to ask Hermes a question, the PRD failed. If Hephaestus makes an assumption that turns out wrong, the PRD failed.

---

## Requirement Quality Standard: SMART+T

Every functional requirement must be:
- **Specific** — names the exact thing that must happen
- **Measurable** — can be verified with a test
- **Achievable** — realistic given constraints
- **Relevant** — traces back to a user story
- **Time-bound** — assigned to a phase
- **Testable** — Argus can write a test case for it directly

### Vague vs Specific Requirements

| Vague (never write this) | Specific (write this) |
|---|---|
| "The system should be fast" | "Page load must be under 300ms at p95 for up to 500 concurrent users" |
| "The UI should be intuitive" | "New users must complete first invoice in under 5 minutes without help documentation" |
| "Support multiple users" | "Support up to 50 concurrent users in the same organisation with role-based access" |
| "Handle errors gracefully" | "All API errors return a consistent JSON error shape with code, message, and recovery hint" |
| "Secure the data" | "All PHI encrypted at rest (AES-256) and in transit (TLS 1.2+), audit log on every access" |

---

## RICE Scoring

Use RICE to prioritise features when stakeholders disagree or when you have more P1s than Phase 1 can hold.

**Formula:** `(Reach × Impact × Confidence%) / Effort`

| Factor | What it means | How to estimate |
|---|---|---|
| Reach | Users affected per month | Count from analytics or estimate from user base |
| Impact | How much does it move the needle? | 3=massive, 2=significant, 1=low, 0.5=minimal |
| Confidence | How sure are you? | 100%=high, 80%=medium, 50%=low |
| Effort | Person-weeks to build | Ask Athena or Hephaestus |

**Example:**
- Invoice bulk export: Reach=200, Impact=2, Confidence=80%, Effort=2 → RICE = (200×2×0.8)/2 = 160
- Dashboard chart: Reach=200, Impact=1, Confidence=60%, Effort=3 → RICE = (200×1×0.6)/3 = 40
- Build invoice bulk export first.

---

## Risk Assessment Framework

### Risk Severity Matrix
```
           | Low Impact | High Impact
-----------|------------|------------
High Prob  |  MEDIUM    |    HIGH
Low Prob   |   LOW      |   MEDIUM
```

### Risk Categories for SaaS Products

**Technical risks:**
- New technology or framework the team hasn't used
- Complex third-party integration with poor documentation
- Data migration from existing system
- Performance requirements that push limits of current architecture

**Regulatory risks (especially relevant for Futuuri + accounting SaaS):**
- HIPAA/GDPR compliance for new data flows
- SOC 2 implications for new infrastructure
- Financial reporting compliance (ASC 606, audit trail)
- MDR SaMD classification if clinical functionality added

**Adoption risks:**
- Feature too complex — users won't learn it
- Change in workflow — users will resist it
- Missing onboarding — users won't discover it

**Timeline risks:**
- Dependency on another team or external API
- Unclear requirements (open questions not answered)
- Integration testing taking longer than expected

---

## User Story Sizing Reference

| Size | Time | What fits |
|---|---|---|
| XS | <4 hours | Single UI change, copy update, simple config |
| S | 4-8 hours | Single endpoint + UI component |
| M | 1-2 days | Feature with 2-3 endpoints + UI |
| L | 3-5 days | Feature with data model changes + full UI |
| XL | 1-2 weeks | Complex feature with multiple integrations |

**Split any story larger than L.** XL stories have too much uncertainty to estimate accurately and too much scope to review cleanly.

---

## Acceptance Criteria Format (Given-When-Then)

Every P0 user story needs at least 3 acceptance criteria:

```
Scenario: [descriptive name]
Given: [initial context / precondition]
When: [action taken]
Then: [expected outcome]

AND: [additional outcome if needed]
```

**Example for "As an accountant, I want to export invoices to CSV":**

```
Scenario: Standard export
Given: I am on the invoice list with at least one invoice
When: I click "Export to CSV"
Then: A CSV file downloads immediately containing all visible invoices

Scenario: Empty state
Given: I am on the invoice list with no invoices
When: I click "Export to CSV"
Then: I see a message "No invoices to export" and no file downloads

Scenario: Large export
Given: I have 10,000+ invoices
When: I click "Export to CSV"
Then: I see a progress indicator and receive the file within 30 seconds
```

---

## The Agent Handoff Section

This section is what makes Hermes's PRDs different from standard PRDs. Every PRD must end with explicit instructions for each agent that will work on it.

**Why it matters:** Mnemon will compress the PRD before passing it to other agents. Without clear handoff instructions, Mnemon might remove something Iris needs, or Hephaestus might build Phase 2 scope in Phase 1.

**Template:**
```
## 13. Agent Handoff

- **Mnemon:** Compress sections 4-6. Preserve all P0 requirements, acceptance criteria, 
  non-functional requirements, and the phase scope exactly. Remove: stakeholder background, 
  risk rationale, RICE calculations.

- **Iris:** Design all P0 user stories in section 4. Cover all states: default, loading, 
  error, empty. Reference design system. Do not design P1/P2 items unless Phase 1 is complete.

- **Hephaestus:** Implement Phase 1 scope only (section 12). Use tech spec in section 6. 
  Flag section 8 risks before starting.

- **Argus:** Each user story = one test suite. Use acceptance criteria as test cases. 
  Section 10 metrics = pass/fail thresholds.

- **Athena:** Review sections 5, 6, 8. Produce architecture doc before Hephaestus starts.
```
