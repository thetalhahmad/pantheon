# Skill: Requirements Taxonomy

## The Four-Layer Requirements Model

Every complete PRD addresses four layers. Missing any layer creates gaps that cause rework.

### Layer 1: Business Requirements
What the business needs to achieve (outcomes, not features).
- "Reduce invoice processing time by 50%"
- "Enable accountants to close month-end 2 days faster"
- "Achieve 99.9% uptime for clinical AI processing"

### Layer 2: User Requirements
What users need to be able to do (user stories + acceptance criteria).
- "As an accountant, I want to bulk-approve invoices so that I can process 50 invoices in under 5 minutes"

### Layer 3: Functional Requirements
What the system must do (behaviors, rules, processes).
- "The system MUST allow selection of multiple invoices via checkbox"
- "The system MUST process bulk approval in a single API call"

### Layer 4: Non-Functional Requirements
How well the system must perform (quality attributes).
- "Bulk approval must complete in under 2 seconds for up to 100 invoices"
- "All invoice data must be encrypted at rest (AES-256)"

**The traceability rule:** Every functional requirement must trace to a user requirement. Every user requirement must trace to a business requirement. If you can't trace it, question whether it belongs.

---

## MoSCoW in Depth

### Must Have
- Without it, the product fails to solve the core problem
- Stakeholders would not accept the product without it
- No workaround exists
- Examples: user authentication, core CRUD operations, payment processing

### Should Have
- Important but not critical for MVP
- Temporary workaround exists (manual process, different tool)
- High value, will be built soon after MVP
- Examples: bulk actions, export features, advanced filters

### Could Have
- Nice to have, limited impact if absent
- Would only include if time and budget allow
- Examples: themes, keyboard shortcuts, analytics charts

### Won't Have (this release)
**This is the most important category.** Explicitly stating what you WON'T build:
- Prevents scope creep
- Sets clear stakeholder expectations
- Protects engineering from "while you're in there" requests
- Examples: mobile app (web only), third-party integrations (future), AI features (Phase 2)

**Rule:** Every PRD must have at least 3 explicit Won't Haves. If you can't name 3 things you're NOT building, you haven't thought hard enough about scope.

---

## Non-Functional Requirements Reference

### Performance
```
Template: "[Action] must complete in under [time] for [condition] at [percentile]"
Example: "Invoice list must load in under 300ms for up to 10,000 records at p95"
Example: "CSV export must complete in under 30 seconds for up to 50,000 rows"
```

### Security
```
Template: "[Data type] must be [protection] using [standard]"
Example: "All PHI must be encrypted at rest using AES-256 and in transit using TLS 1.2+"
Example: "All financial records must have an immutable audit trail logging user, action, timestamp"
```

### Scalability
```
Template: "[System] must support [X] [units] without [degradation] in [timeframe]"
Example: "The platform must support 500 concurrent users without response time exceeding 500ms"
Example: "The invoice database must handle 1M records without query time exceeding 100ms"
```

### Availability
```
Template: "[System] must be available [X]% of [period] excluding [exceptions]"
Example: "The API must be available 99.9% of each calendar month excluding scheduled maintenance"
```

### Accessibility
- Always include: "All UI components must meet WCAG 2.1 Level AA standards"
- For clinical products: "All UI components must meet WCAG 2.1 AA with minimum 16px body text"

---

## What Belongs in a PRD vs What Doesn't

### Belongs in the PRD
- What the product must do (requirements)
- Who it is for (personas, user stories)
- How success is measured (metrics)
- What is explicitly excluded (out of scope)
- Risks and mitigations
- Phase breakdown

### Does NOT belong in the PRD
- How to implement it (that's Athena's job)
- Specific technology choices (unless constrained)
- File structure or code organisation
- Detailed database schemas (unless a constraint)
- Specific UI layouts (that's Iris's job)
- Timeline with developer names (that's Themis's job)

**The rule:** If an engineer can make a reasonable implementation decision without this information, it belongs in the architecture doc, not the PRD. The PRD describes the problem and requirements. The architecture doc describes the solution.
