# Skill: Next.js App Router Patterns

## Project Structure
```
src/
  app/                    # App Router pages and layouts
    (auth)/               # Route group — no URL segment
      login/
        page.tsx
    (dashboard)/
      layout.tsx          # Dashboard shell
      page.tsx            # Dashboard home
      invoices/
        page.tsx          # List
        [id]/
          page.tsx        # Detail
  components/
    ui/                   # shadcn/ui base components
    [feature]/            # Feature-specific components
  lib/
    db.ts                 # Prisma client singleton
    auth.ts               # Auth helpers
    utils.ts              # Shared utilities
  types/                  # TypeScript type definitions
```

## Data Fetching Patterns

### Server Component (default — prefer this)
```typescript
// app/invoices/page.tsx
import { db } from '@/lib/db'

export default async function InvoicesPage() {
  const invoices = await db.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return <InvoiceList invoices={invoices} />
}
```

### Client Component with React Query
```typescript
'use client'
import { useQuery } from '@tanstack/react-query'

export function InvoiceList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => fetch('/api/invoices').then(r => r.json()),
  })
  if (isLoading) return <InvoiceSkeleton />
  if (error) return <ErrorState error={error} />
  return <>{data.map(i => <InvoiceRow key={i.id} invoice={i} />)}</>
}
```

## API Route Pattern
```typescript
// app/api/invoices/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

const CreateInvoiceSchema = z.object({
  customerId: z.string().uuid(),
  amountCents: z.number().int().positive(),
  currency: z.string().length(3),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const result = CreateInvoiceSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }

  const invoice = await db.invoice.create({ data: { ...result.data, userId: session.userId } })
  return NextResponse.json(invoice, { status: 201 })
}
```

## Environment Variables
```
# .env.local (never committed)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# .env.example (always committed)
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

## Error Handling Pattern
```typescript
// Every async server action
try {
  const result = await someAsyncOperation()
  return { success: true, data: result }
} catch (error) {
  console.error('[CONTEXT]', error)
  return { success: false, error: 'Something went wrong' }
}
```
