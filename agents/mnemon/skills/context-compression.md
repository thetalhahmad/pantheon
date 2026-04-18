# Skill: Context Compression

## Purpose
Reduce document size by 60-80% while preserving 100% of actionable information. Mnemon is not a summarizer. Summarizers lose detail. Mnemon is a compressor — he removes redundancy, not meaning.

---

## What Is Safe to Remove

### Always safe to remove:
- Greeting and preamble ("Thanks for the brief, here is what I understand...")
- Repetition of the same point in different words
- Filler phrases ("It is important to note that...", "As mentioned above...")
- Examples that only illustrate a point already made clearly
- Meta-commentary ("This section covers...", "We will explore...")
- Hedge phrases when the underlying point is clear ("It might potentially be worth considering...")
- Section headers when content is short enough to run together

### Safe to remove if not domain-critical:
- Background context already known to the target agent
- Analogies and metaphors (keep the point, remove the comparison)
- Historical context (unless it directly constrains the requirement)

---

## What Is Never Safe to Remove

- Numbers (amounts, dates, percentages, counts, sizes)
- Named entities (people, systems, companies, products)
- Technical constraints (must use X, cannot use Y, integrates with Z)
- Compliance and regulatory requirements
- Explicit exclusions (out of scope items)
- Success metrics and targets
- Open questions
- Edge cases and error conditions
- Security requirements

---

## Compression Techniques

### 1. Paragraph to bullets
Before:
"The system needs to support multiple user roles. There should be an admin role that can manage users and settings. There should also be a standard user role that can only view their own data. We also need a read-only role for external auditors."

After:
- Admin: manage users and settings
- Standard user: view own data only
- Auditor (read-only): external access

### 2. Merge duplicates
Before:
"The interface must be accessible. We need to ensure WCAG compliance. Accessibility is important for our user base. We should meet AA standards at minimum."

After:
"UI must meet WCAG 2.1 AA minimum"

### 3. Strip hedge language
Before: "It would potentially be beneficial to consider implementing some form of caching mechanism that could possibly improve performance in certain scenarios"
After: "Implement caching to improve performance"

### 4. Preserve specificity
Before: "The system should handle a large number of users"
After: Keep as-is — "large number" is vague and cannot be safely compressed. Flag as ambiguous instead.

---

## Compression by Target Agent

### Compressing for Iris (designer)
Keep: user stories, UI requirements, interaction states, accessibility requirements, brand constraints
Remove: backend logic, API details, database schema, deployment requirements

### Compressing for Hephaestus (full stack dev)
Keep: technical requirements, API contracts, data models, integrations, error states
Remove: design rationale, brand guidelines, marketing context

### Compressing for Nike (sales)
Keep: value proposition, target user, outcomes, differentiators, market context
Remove: technical implementation details, design specifications

---

## Token Estimation

Rough token counts (GPT/Claude tokenization):
- 1 word ≈ 1.3 tokens
- 1 sentence ≈ 15-25 tokens
- 1 paragraph ≈ 60-100 tokens
- 1 page (500 words) ≈ 650 tokens
- 2000-word PRD ≈ 2,600 tokens
- Compressed version (400 words) ≈ 520 tokens
- Saving: ~2,080 tokens ≈ ~$0.006 per run at Sonnet pricing

Over 100 runs: ~$0.60 saved per document compressed. Small but compounds.
