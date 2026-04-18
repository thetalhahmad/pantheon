# Skill: HIPAA Requirements

## What is PHI?
Protected Health Information (PHI) is any information that can identify a patient AND relates to their health condition, treatment, or payment for treatment.

The 18 HIPAA identifiers:
1. Name
2. Geographic data (zip codes, addresses)
3. Dates (except year) related to an individual
4. Phone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate/license numbers
12. Vehicle identifiers
13. Device identifiers
14. Web URLs
15. IP addresses
16. Biometric identifiers (fingerprints, voiceprints)
17. Full-face photographs
18. Any other unique identifying number or code

## HIPAA Technical Safeguards (Required)

### Access Controls
- Unique user identification: every user has their own login
- Automatic logoff: sessions expire after inactivity (typically 15-30 mins in clinical settings)
- Encryption and decryption: PHI must be encrypted

### Audit Controls
- Hardware, software, and procedural mechanisms to record and examine access activity
- Log: who accessed what PHI, when, and what action was taken
- Logs must be retained for minimum 6 years
- Logs must be protected from tampering

### Integrity Controls
- Mechanisms to confirm PHI has not been altered or destroyed improperly
- Electronic measures to corroborate that PHI has not been altered

### Transmission Security
- Technical security measures to prevent unauthorized access to PHI in transit
- Minimum: TLS 1.2, preferably TLS 1.3
- Email with PHI must use encryption or a secure messaging platform

## Common HIPAA Violations in Software

### Critical (immediate BLOCKER)
- PHI in application logs or error messages
- PHI in URL parameters or query strings
- PHI stored in browser local storage
- PHI transmitted without TLS
- Authentication bypass allowing access to PHI
- No session timeout on PHI-containing pages

### High (fix before launch)
- Audit trail missing or incomplete
- User access not tied to specific minimum necessary PHI
- No BAA with third-party services that process PHI
- Backup data containing PHI not encrypted

### Medium (fix within sprint)
- Audit logs not retained for required duration
- No process documented for data subject access requests
- Training not documented for staff with PHI access

## Business Associate Agreements (BAA)
Any third-party service that processes PHI on your behalf requires a BAA.
Common services that need BAAs when processing PHI:
- Cloud hosting (AWS, Google Cloud, Azure — all offer HIPAA BAAs)
- Analytics platforms (check if PHI is sent)
- Error tracking (Sentry, Datadog — configure to exclude PHI)
- Email service providers (if sending PHI in emails)
- Customer support platforms (if support tickets contain PHI)

## De-identification
PHI can be de-identified by either:
1. Safe Harbor method: removing all 18 identifiers
2. Expert determination: statistical/scientific validation that re-identification risk is very small

De-identified data is not PHI and not subject to HIPAA.
