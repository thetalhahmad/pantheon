# Skill: Stakeholder Interview

## Purpose
Extract the right information from stakeholders before writing a PRD. Bad questions produce bad requirements. This skill ensures Hermes asks exactly what is needed — no more, no less.

---

## The Five Core Questions

Always ask these five before writing anything. If a stakeholder has already answered them, skip to clarification.

1. **What problem does this solve and for whom?**
   - Look for: specific user, specific pain, specific context
   - Red flag: "It's for everyone" or "multiple user types"
   - Follow-up: "Can you describe the last time a real user had this problem?"

2. **What does success look like in 90 days?**
   - Look for: measurable outcome, not feature completion
   - Red flag: "The feature is shipped" is not success
   - Follow-up: "How would you know if this worked?"

3. **What is explicitly out of scope?**
   - Look for: conscious exclusions, not just things they forgot to mention
   - Red flag: "We haven't thought about that"
   - Follow-up: "If a developer asks you about [related thing], what should they do?"

4. **What are the technical or regulatory constraints?**
   - Look for: existing systems, compliance requirements, performance targets
   - Red flag: "I don't know, that's engineering's problem"
   - Follow-up: "Is there anything this must integrate with or must not break?"

5. **What is the MVP vs the full vision?**
   - Look for: clear separation of must-have from nice-to-have
   - Red flag: "We need everything"
   - Follow-up: "If you could only ship one thing in 2 weeks, what would it be?"

---

## Domain-Specific Follow-up Questions

### Healthtech / Futuuri
- Who is the clinical user and what is their current workflow?
- What are the regulatory requirements (HIPAA, MDR, CE marking)?
- Does this involve PHI? If yes, what is the data flow?
- What happens if the AI is wrong? What is the clinician's fallback?
- Has a clinical workflow expert reviewed this requirement?

### Fintech / Accounting SaaS
- What accounting standard applies (GAAP, IFRS)?
- Does this touch financial records that require audit trail?
- What is the tax jurisdiction for this feature?
- Does this affect period closing or financial reporting?
- What happens if this calculation is wrong?

---

## Clarifying Question Patterns

### When requirements are vague:
"When you say [vague term], can you give me a specific example of what you mean?"

### When scope is unclear:
"If a user tries to do [edge case], what should happen?"

### When success is undefined:
"In 3 months, what number would tell you this worked?"

### When there is conflict between stakeholders:
"I heard [person A] say X and you are saying Y. Can we resolve that before I write the spec?"

### When something sounds like a solution, not a requirement:
"You mentioned [specific solution]. What is the underlying problem that solution is trying to solve? Is there another way to solve it?"

---

## Interview Output

After the interview, produce a structured summary:

```
## Interview Summary

Stakeholder: [name, role]
Date: [date]
Feature: [name]

## Confirmed Requirements
- [requirement 1]
- [requirement 2]

## Open Questions Remaining
1. [question] — Owner: [name] — Due: [date]

## Constraints Identified
- [constraint]

## Out of Scope (confirmed)
- [item]

## Risk Flags
- [anything that could derail this]
```
