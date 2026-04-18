# Skill: GDPR Compliance

## The Six Lawful Bases for Processing

You must have ONE lawful basis before processing any personal data. Document it.

1. **Consent** — Freely given, specific, informed, unambiguous. Can be withdrawn at any time.
   - When to use: Marketing emails, optional analytics, non-essential cookies
   - Requirement: Affirmative action (checkbox ticked, not pre-ticked)

2. **Contract** — Processing necessary to perform a contract or take pre-contractual steps.
   - When to use: Processing payment details to charge for a subscription
   - Requirement: Processing must be genuinely necessary, not just convenient

3. **Legal obligation** — Processing required by EU or member state law.
   - When to use: Tax record retention, anti-money laundering checks
   - Requirement: Specific legal obligation must exist

4. **Vital interests** — Processing necessary to protect life.
   - When to use: Medical emergencies only
   - Requirement: Extremely narrow, rarely applies to software

5. **Public task** — Processing necessary for a task in the public interest.
   - When to use: Government and public authority contexts mainly
   - Requirement: Specific legal basis in EU/member state law

6. **Legitimate interests** — Your interests or a third party's, unless overridden by the individual's rights.
   - When to use: Fraud prevention, network security, direct marketing to existing customers
   - Requirement: Three-part test (purpose test, necessity test, balancing test)

## Data Subject Rights — Implementation Requirements

### Right to Access (Article 15)
- Timeframe: 1 month (extendable by 2 months for complex requests)
- What to provide: confirmation of processing, copy of data, all required information
- Implementation: user data export in human-readable format (JSON or CSV acceptable)

### Right to Erasure / Right to be Forgotten (Article 17)
- Timeframe: 1 month
- When it applies: consent withdrawn, data no longer necessary, unlawful processing
- Implementation: Account deletion flow that removes all personal data
- Exceptions: Legal obligation to retain (financial records, legal claims)
- Financial data exception: You can retain financial transaction data even after deletion request if required by law (typically 7 years)

### Right to Data Portability (Article 20)
- Timeframe: 1 month
- What to provide: data in structured, machine-readable format (JSON, CSV)
- Applies to: data provided by the user, processed by automated means, under consent or contract

### Right to Rectification (Article 16)
- Timeframe: 1 month
- What to do: correct inaccurate personal data, complete incomplete data
- Implementation: profile editing functionality

### Right to Restriction (Article 18)
- What it means: you can store data but not use it
- When it applies: during accuracy disputes, objection processing, unlawful processing
- Implementation: flag account as restricted, prevent processing while flag is set

### Right to Object (Article 21)
- Applies to: legitimate interests basis, direct marketing (absolute right)
- Direct marketing: must stop immediately and absolutely upon objection
- Legitimate interests: must stop unless you can demonstrate compelling legitimate grounds

## Data Retention Policy
Every category of personal data must have a defined retention period.

Example framework:
| Data Category | Retention Period | Reason |
|---|---|---|
| Account data | Duration of contract + 30 days | Service delivery |
| Financial/billing records | 7 years from transaction | Legal obligation (tax) |
| Marketing consents | 3 years from last interaction | Legitimate interest |
| Support tickets | 2 years from resolution | Service improvement |
| Security logs | 1 year | Security monitoring |
| Analytics data | 2 years | Business intelligence |

Retention must be technically enforced — a policy that says "delete after 2 years" that no one implements is still a GDPR violation.
