# Skill: Test Plan Writing

## Test Case Structure
```
Test ID: TC-[feature]-[number]
Title: [What is being tested]
Preconditions: [What must be true before this test]
Steps:
  1. [Action]
  2. [Action]
  3. [Action]
Expected Result: [What should happen]
Actual Result: [What did happen — filled in during execution]
Status: PASS / FAIL / BLOCKED / SKIPPED
Notes: [Any relevant observations]
```

## Coverage Matrix
For every PRD requirement, write minimum:
- 1 happy path test
- 1 edge case test
- 1 error/failure test

For auth-gated features:
- 1 test as authenticated user
- 1 test as unauthenticated user
- 1 test as wrong-role user (if RBAC exists)

## Priority Test Categories

### P0 — Must Pass Before Any Release
- Core happy path flows
- Authentication and authorization
- Data integrity (no data loss, no corruption)
- Payment processing (if applicable)
- PHI handling (healthtech)
- Financial calculations (fintech)

### P1 — Must Pass Before Production Release  
- All error states handled gracefully
- All empty states display correctly
- Mobile responsiveness at 375px
- Accessibility keyboard navigation

### P2 — Should Pass (can ship with known issues if documented)
- Edge cases with very low occurrence
- Browser-specific minor visual issues
- Performance under extreme load

## Financial Test Cases (always include for Plutus products)
- Zero amount: what happens with a £0 invoice?
- Maximum amount: what is the highest value supported?
- Negative amounts: are they rejected correctly?
- Multi-currency: does the currency symbol display correctly?
- Rounding: does £10.005 round to £10.00 or £10.01?
- VAT calculations: spot-check 3 different rates

## Clinical Test Cases (always include for Asclepius products)
- PHI in error messages: confirm no patient data leaks
- Audit log entries: confirm every action is logged
- Concurrent access: two clinicians accessing same record
- Session timeout: does PHI disappear after timeout?
- Failed AI analysis: does the system fail gracefully?
