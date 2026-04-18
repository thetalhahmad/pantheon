# Skill: Database Query Optimization

## The Only Rule
Never optimise a query you have not measured first. EXPLAIN ANALYZE is not optional.

## Reading EXPLAIN ANALYZE Output

Key things to look for:

### Sequential Scan (bad on large tables)
```
Seq Scan on invoices (cost=0.00..2847.32 rows=89432 width=156)
```
This means Postgres is reading every row. If the table has >10k rows and you are filtering, you need an index.

### Index Scan (good)
```
Index Scan using idx_invoices_customer_id on invoices (cost=0.43..8.47 rows=3 width=156)
```
This means Postgres is using an index. Cost is low.

### Nested Loop with high row estimates (N+1 signal)
```
Nested Loop (cost=0.00..24847.32 rows=89432 loops=N)
```
If `loops=N` is high (>10), you likely have an N+1 problem in your ORM code.

## Index Strategy

### When to add an index
- Column appears in WHERE clause on queries running >100ms
- Column appears in JOIN condition
- Column used for ORDER BY on large result sets
- Foreign key column (Prisma does NOT auto-create these in Postgres)

### Index types
```sql
-- Standard B-tree (default, good for equality and range)
CREATE INDEX CONCURRENTLY idx_invoices_customer_id ON invoices(customer_id);

-- Composite index (when you always filter on both columns together)
CREATE INDEX CONCURRENTLY idx_invoices_user_status ON invoices(user_id, status);

-- Partial index (only index a subset — cheaper, faster)
CREATE INDEX CONCURRENTLY idx_invoices_unpaid 
  ON invoices(customer_id) WHERE status = 'UNPAID';

-- Text search
CREATE INDEX CONCURRENTLY idx_customers_name ON customers USING gin(to_tsvector('english', name));
```

### Always use CONCURRENTLY in production
```sql
-- Bad — locks the table during index creation
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);

-- Good — no table lock, safe in production
CREATE INDEX CONCURRENTLY idx_invoices_customer_id ON invoices(customer_id);
```

## Prisma-Specific Optimisations

### Select only what you need
```typescript
// BAD — fetches entire row including large fields
const users = await db.user.findMany()

// GOOD — only fetch what the query needs
const users = await db.user.findMany({
  select: { id: true, name: true, email: true }
})
```

### Avoid findUnique in loops
```typescript
// BAD — N queries
for (const id of userIds) {
  const user = await db.user.findUnique({ where: { id } })
}

// GOOD — 1 query
const users = await db.user.findMany({ where: { id: { in: userIds } } })
const userMap = Object.fromEntries(users.map(u => [u.id, u]))
```

### Use cursor pagination for large datasets
```typescript
// BAD for large offsets — Postgres still reads all skipped rows
const page10 = await db.invoice.findMany({ skip: 500, take: 50 })

// GOOD — cursor-based, always fast regardless of page
const nextPage = await db.invoice.findMany({
  take: 50,
  cursor: { id: lastSeenId },
  skip: 1,
  orderBy: { id: 'asc' }
})
```

## Caching Strategy

### What to cache
- Results that are expensive to compute and change rarely
- User-specific data that is read much more than written
- Reference data (tax rates, currency codes, country lists)

### Redis patterns with ioredis
```typescript
const CACHE_TTL = 60 * 5 // 5 minutes

async function getCustomerStats(customerId: string) {
  const cacheKey = `customer:${customerId}:stats`
  
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)
  
  const stats = await computeExpensiveStats(customerId) // DB query
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(stats))
  
  return stats
}

// Invalidate on write
async function updateCustomer(customerId: string, data: UpdateData) {
  await db.customer.update({ where: { id: customerId }, data })
  await redis.del(`customer:${customerId}:stats`) // invalidate
}
```
