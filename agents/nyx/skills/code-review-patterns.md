# Skill: Code Review Patterns

## The Review Mindset
Code review is not a gatekeeping exercise. It is quality insurance. Every finding is a service to the person whose code you are reviewing — you are helping them ship something they will be proud of.

But quality insurance means catching real problems. "Looks good to me" without evidence is a liability, not a review.

## What Makes a Finding Actionable

Bad finding:
> "This function is too complex."

Good finding:
> "Line 47: `processInvoice()` has cyclomatic complexity of 14 and does 3 distinct things (validation, calculation, persistence). Split into `validateInvoice()`, `calculateInvoiceTotals()`, and `persistInvoice()`. This makes each unit independently testable."

Every finding needs:
1. **Location** — file:line
2. **What** — the specific problem
3. **Why** — why it matters
4. **Fix** — specific, implementable suggestion

## Severity Guide with Examples

### BLOCKER
```typescript
// BLOCKER: SQL injection — user input concatenated into query
const result = await db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`)
// Fix: await db.query('SELECT * FROM users WHERE email = $1', [req.body.email])

// BLOCKER: PHI in logs (healthtech)
console.log(`Processing patient ${patientId} with diagnosis ${diagnosis}`)
// Fix: console.log(`Processing patient record ${anonymousId}`)

// BLOCKER: Float for money (fintech)
const total = invoice.amount * 1.2 // float multiplication
// Fix: const total = Math.round(invoice.amountCents * 1.2) // integer cents
```

### HIGH
```typescript
// HIGH: Missing error handling on async
const data = await fetchUserData(userId) // no try/catch, will crash on network failure
// Fix: wrap in try/catch, return error state to caller

// HIGH: N+1 query
for (const order of orders) {
  const customer = await db.customer.findById(order.customerId) // DB call per order
}
// Fix: const customers = await db.customer.findMany({ where: { id: { in: customerIds }}})

// HIGH: No auth check
app.delete('/api/invoices/:id', async (req, res) => {
  await db.invoice.delete({ where: { id: req.params.id } }) // no ownership check!
})
// Fix: add where: { id, userId: session.userId } to enforce ownership
```

### MEDIUM
```typescript
// MEDIUM: Magic number
if (retries > 3) { ... }
// Fix: const MAX_RETRIES = 3; if (retries > MAX_RETRIES) { ... }

// MEDIUM: any type
function processData(data: any) { ... }
// Fix: define proper interface or use unknown with type narrowing
```

## Common Patterns by Tech Stack

### Next.js / React
- Missing `loading.tsx` and `error.tsx` in App Router routes
- Client components fetching data that should be server components
- `useEffect` dependencies missing or incorrect
- Missing `key` prop on list items (or using index as key)
- Form submission without loading/disabled state on submit button

### PostgreSQL / Prisma
- Missing `where` clause on `findMany` — returns all records
- `update` without ownership check in where clause
- Missing index on foreign key columns
- Transactions not used for multi-step operations that must be atomic
- `delete` instead of soft-delete on financial/audit-critical records

### API Design
- Missing `Content-Type: application/json` header handling
- No rate limiting on authentication endpoints
- Error responses leaking stack traces or internal paths
- Inconsistent error response shape across endpoints
- Missing pagination on list endpoints
