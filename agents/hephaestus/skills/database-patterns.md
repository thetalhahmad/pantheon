# Skill: Database Patterns with Prisma

## Schema Best Practices

```prisma
model Invoice {
  id          String   @id @default(cuid())
  // Money: ALWAYS integers (cents), NEVER Float
  amountCents Int
  currency    String   @db.Char(3)  // ISO 4217
  status      InvoiceStatus @default(DRAFT)
  
  // Audit fields — on every model
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdById String
  
  // Soft delete — never hard delete financial records
  deletedAt   DateTime?
  
  // Relations
  customer    Customer @relation(fields: [customerId], references: [id])
  customerId  String
  
  @@index([customerId])
  @@index([status])
  @@index([createdAt])
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
  CANCELLED
}
```

## Query Patterns

### Paginated list
```typescript
const PAGE_SIZE = 50

async function getInvoices(page: number, userId: string) {
  return db.invoice.findMany({
    where: { userId, deletedAt: null },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: { customer: { select: { name: true } } },
  })
}
```

### Safe update (prevent overwriting concurrent changes)
```typescript
async function updateInvoice(id: string, data: UpdateInvoiceData, userId: string) {
  return db.invoice.update({
    where: { id, userId }, // ownership check inline
    data,
  })
}
```

### Soft delete
```typescript
async function deleteInvoice(id: string, userId: string) {
  return db.invoice.update({
    where: { id, userId },
    data: { deletedAt: new Date() },
  })
}
```

## Migration Strategy
1. Never drop columns in production — add new, migrate data, then deprecate
2. Always test migrations on a copy of production data before running
3. Large table migrations: use batched updates, not a single UPDATE statement
4. Add indexes concurrently in Postgres to avoid table locks

## Connection Management
```typescript
// lib/db.ts — singleton pattern for Next.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```
