# Skill: User Story Mapping

## Purpose
Write user stories that are specific enough to be built, testable enough to be verified, and small enough to be completed in one sprint.

---

## User Story Formula

```
As a [specific user in a specific context],
I want [a specific action or capability],
So that [a specific outcome or benefit].

Acceptance Criteria:
- Given [context], when [action], then [result]
- Given [context], when [action], then [result]
```

---

## Story Sizing Guide

### Epic (too big to build directly)
"As a radiologist, I want to use AI to assist my diagnosis workflow"
→ Break into multiple features

### Feature (right size for a PRD section)
"As a radiologist reviewing chest CTs, I want AI-suggested findings highlighted on the image"
→ This is a PRD-level requirement

### Story (right size for a sprint)
"As a radiologist, I want to click on an AI finding highlight to see the confidence score and suggested diagnosis"
→ This is a sprint-level story

### Task (too small for a story)
"Update the highlight color from red to amber"
→ This is a development task inside a story

---

## Acceptance Criteria Patterns

### Happy path
"Given the AI has analyzed the image, when the radiologist opens the viewer, then all findings with confidence >80% are highlighted in amber"

### Edge case
"Given no findings were detected, when the radiologist opens the viewer, then a message reads 'No AI findings detected' with a timestamp"

### Error state
"Given the AI analysis failed, when the radiologist opens the viewer, then an error banner reads 'AI analysis unavailable — manual review required'"

### Permission
"Given the user is not authenticated, when they try to access a study, then they are redirected to the login page"

---

## Story Prioritization: MoSCoW

### Must Have
- Core to the value proposition
- Without it, the feature does not work
- Must be in MVP

### Should Have
- Important but not critical for MVP
- Workaround exists temporarily
- Ship in next sprint after MVP

### Could Have
- Nice to have
- Limited impact if excluded
- Add to backlog

### Won't Have (this release)
- Explicitly not in scope
- Document the reason — prevents future confusion

---

## Story Map Structure

A story map organizes stories horizontally by user journey and vertically by priority:

```
User Journey:  [Step 1] → [Step 2] → [Step 3] → [Step 4]

Must Have:     [story]    [story]    [story]    [story]
Should Have:   [story]    [story]    [story]
Could Have:    [story]               [story]
```

The horizontal "slice" through Must Have stories = your MVP.

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|---|---|---|
| "As a user, I want..." | Too vague | Name the specific user type |
| "As a system, I want..." | Systems don't have wants | Rewrite from the user's perspective |
| Story without acceptance criteria | Untestable | Always add Given/When/Then |
| Story that requires weeks to build | Too big | Split into smaller stories |
| Story that's actually a task | Too small | Group into a feature story |
| Outcome missing | No way to measure done | Always state the business benefit |
