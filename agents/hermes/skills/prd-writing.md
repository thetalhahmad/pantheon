# Skill: PRD Writing

## Purpose
Structure and write complete Product Requirements Documents that eliminate ambiguity and give every downstream agent (Iris, Hephaestus, Nike, Apollo) exactly what they need to execute.

---

## PRD Quality Checklist

Before marking a PRD done, verify:

- [ ] Executive summary is one paragraph, not a bullet list
- [ ] Problem statement names a specific pain, not a generic category
- [ ] Target users are specific people, not broad demographics
- [ ] Every user story follows: "As a [specific user], I want [action], so that [outcome]"
- [ ] Functional requirements use MUST / SHOULD / COULD language
- [ ] Non-functional requirements have measurable targets (not "should be fast")
- [ ] Out of scope section exists and has at least 3 items
- [ ] Success metrics are quantified with a target and timeframe
- [ ] Open questions are numbered and each has an owner
- [ ] Implementation phases separate MVP from later work

---

## Requirement Language Standards

### MUST (non-negotiable)
Use when: failure to implement breaks the core value proposition
Example: "The system MUST allow users to upload DICOM files under 2GB"

### SHOULD (important, flexible)
Use when: strongly desired but can be deferred if necessary
Example: "The system SHOULD support bulk upload of multiple files simultaneously"

### COULD (nice to have)
Use when: beneficial but not required for MVP
Example: "The system COULD suggest tags based on file metadata"

### WON'T (explicit exclusion)
Use when: something might be assumed but is out of scope
Example: "The system WON'T support video file formats in this phase"

---

## Non-Functional Requirement Templates

### Performance
"The [feature] MUST load within [X]ms for [Y]% of requests under [Z] concurrent users"

### Security
"All [data type] MUST be encrypted at rest using AES-256 and in transit using TLS 1.2+"

### Accessibility
"All UI components MUST meet WCAG 2.1 Level AA standards"

### Availability
"The system MUST maintain [X]% uptime, measured monthly, excluding scheduled maintenance"

### Scalability
"The system MUST support [X] concurrent users without degradation in the first 12 months"

---

## User Story Anti-Patterns

### Bad user stories (never write these):
- "As a user, I want the system to be fast" — unmeasurable
- "As a user, I want all features to work" — meaningless
- "As an admin, I want a dashboard" — no outcome stated
- "The system shall allow users to..." — not a user story format

### Good user stories (write these):
- "As a radiologist reviewing a chest CT, I want AI-suggested findings highlighted on the image so that I can review them in order of clinical priority"
- "As an accountant closing month-end, I want to lock a period so that no one can post entries to it after close"

---

## Common PRD Mistakes to Avoid

1. **Solution in the requirements** — "The button should be blue" is a design decision, not a requirement
2. **Missing the why** — every requirement should trace back to a user need
3. **Implicit assumptions** — if you had to think about it, write it down
4. **Scope creep language** — "and also...", "additionally we could..." — flag these as separate stories
5. **No definition of done** — success metrics must be specific and measurable

---

## PRD Versioning

When updating an existing PRD:
- Increment version number (1.0 → 1.1 for minor, 1.0 → 2.0 for major scope change)
- Add change log entry with date and what changed
- Flag any changes that affect work already in progress
