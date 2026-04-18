# Skill: Requirements Gathering

## The Problem with Requirements
Requirements written without proper elicitation are often:
- The stated requirement (what someone said they want)
- Not the real requirement (what they actually need)
- Missing the underlying need (why they need it)

A payment feature requested as "add a button to pay invoices" might actually be "reduce the time our finance team spends chasing late payments." These lead to completely different solutions.

## Elicitation Techniques

### 1. The Five Whys
Keep asking "why" until you reach the root need.

"We need a bulk upload feature"
→ Why? "Because uploading one by one takes too long"
→ Why does it take too long? "We have hundreds of records to import"
→ Why are you importing records? "We're migrating from our old system"
→ Why is this urgent? "The old system contract ends in 60 days"

Insight: The real requirement is "migrate hundreds of records within 60 days." Bulk upload is one solution, but an automated migration script might be better.

### 2. Process Walkthrough
Ask the user to walk through the process step by step, as if explaining to someone who has never seen it.

"Walk me through what happens from the moment a patient is referred until the radiologist signs off on the report."

Listen for: manual steps, workarounds, waiting periods, handoffs, exceptions, error handling.

### 3. Scenario Testing
Give concrete scenarios to uncover requirements that are assumed but not stated.

"What happens if a radiologist is on leave and a critical finding comes in?"
"What happens if the AI confidence is 49% — just below your threshold?"
"What happens if two radiologists are looking at the same study simultaneously?"

### 4. Edge Case Elicitation
"What is the strangest thing a user has ever tried to do with the current system?"
"What happens during your busiest hour of the day?"
"What is the most expensive mistake a user has made?"

## Requirements Documentation Standard

### Functional Requirements
Format: "[System/User] shall [action] [condition] [constraint]"

Examples:
- "The system shall display AI findings in order of clinical severity when a study is opened"
- "A radiologist shall be able to override any AI finding with a reason, and this shall be logged"
- "The system shall lock a financial period when a user with CFO role sets it to CLOSED"

### Non-Functional Requirements (must be measurable)

| Category | Template | Example |
|---|---|---|
| Performance | "[Feature] shall [perform] within [time] for [condition]" | "Search shall return results within 300ms for databases under 100,000 records" |
| Availability | "[System] shall be available [X]% of [period]" | "The platform shall be available 99.9% of each calendar month" |
| Security | "[Data] shall be [protection] using [standard]" | "PHI shall be encrypted at rest using AES-256" |
| Scalability | "[System] shall support [X] [units] without [degradation]" | "The system shall support 500 concurrent users without response time exceeding 500ms" |
| Usability | "[Task] shall be completable by [user] in [time] without [assistance]" | "A new radiologist shall be able to complete their first AI-assisted review within 10 minutes without training" |

## Traceability Matrix
Every requirement should trace to:
1. A user need or business goal (why it exists)
2. A test case (how it will be verified)
3. An implementation (how it was built)

This prevents requirements from being built without purpose or tested without coverage.

| Req ID | Requirement | Business Goal | Test Case | Status |
|---|---|---|---|---|
| FR-001 | System shall display findings by severity | Reduce miss rate | TC-001, TC-002 | Implemented |
