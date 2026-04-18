# Skill: OWASP Top 10 Web Application Vulnerabilities

## A01: Broken Access Control
What: Users can act outside of their intended permissions.
Examples: Accessing other users' data by changing an ID, accessing admin pages without authorization.

Check:
- Every data query must include user ownership check
- Admin routes must verify admin role before processing
- Never trust client-supplied IDs without verification

```typescript
// WRONG — trusts client-supplied userId
const invoice = await db.invoice.findFirst({ where: { id: req.params.id } })

// CORRECT — enforces ownership
const invoice = await db.invoice.findFirst({
  where: { id: req.params.id, userId: session.userId }
})
```

## A02: Cryptographic Failures
What: Sensitive data exposed due to weak or missing cryptography.
Examples: PHI stored in plaintext, passwords hashed with MD5, HTTP instead of HTTPS.

Check:
- Passwords: bcrypt or argon2 only (never MD5, SHA1, SHA256 without salt)
- Sensitive data at rest: AES-256
- All connections: TLS 1.2 minimum, TLS 1.3 preferred
- No sensitive data in logs, URLs, or error messages

## A03: Injection
What: Hostile data sent to an interpreter as part of a command or query.
Examples: SQL injection, NoSQL injection, OS command injection.

Check:
- Use parameterized queries / ORM (never string concatenation in SQL)
- Validate and sanitize all user inputs
- Use allowlists, not denylists, for input validation

```typescript
// WRONG — SQL injection vulnerable
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`

// CORRECT — parameterized
const user = await db.user.findFirst({ where: { email: req.body.email } })
```

## A04: Insecure Design
What: Missing or ineffective security controls in the design phase.
Examples: No rate limiting on login endpoint, no CAPTCHA on signup.

Mitigations:
- Threat modeling before building
- Rate limiting on all authentication endpoints
- Account lockout after failed attempts
- Secure defaults (deny by default, not allow by default)

## A05: Security Misconfiguration
What: Missing security hardening, unnecessary features enabled, default credentials.
Examples: Debug mode in production, default admin passwords, verbose error messages exposing stack traces.

Check:
- Error messages to users: generic messages only (no stack traces)
- Debug mode: disabled in production
- Unnecessary endpoints: removed or disabled
- Default credentials: changed on all services
- HTTP security headers: configured (CSP, HSTS, X-Frame-Options, etc.)

## A07: Identification and Authentication Failures
What: Incorrect implementation of authentication functions.
Examples: Weak passwords allowed, no MFA, insecure session management.

Check:
- Session tokens: cryptographically random, minimum 128 bits
- Session invalidation: on logout AND on privilege change
- JWT: verify signature, check expiry, never trust without verification
- Password policy: minimum 8 characters, check against known breached passwords

## A09: Security Logging and Monitoring Failures
What: Insufficient logging to detect and respond to breaches.
Examples: Login failures not logged, no alerting on suspicious patterns.

Required logs:
- All authentication attempts (success and failure)
- All access to PHI or financial records
- All admin actions
- All security-relevant configuration changes
- Application errors

Log format must include: timestamp, user ID, action, resource, outcome, IP address.
