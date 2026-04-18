# Skill: React Patterns for SaaS

## Component Architecture

### Atomic Design Hierarchy
1. **Atoms** — Button, Input, Badge, Avatar, Icon
2. **Molecules** — FormField (Label + Input + Error), SearchBar, CardHeader
3. **Organisms** — DataTable, InvoiceForm, UserProfileCard
4. **Templates** — DashboardLayout, AuthLayout
5. **Pages** — page.tsx files in Next.js App Router

Build from atoms up. Never build a page without its components.

## Component Patterns

### Server Component (default in Next.js App Router)
```typescript
// No 'use client' directive — renders on server
// Can be async, can access database directly
// Cannot use useState, useEffect, event handlers

export default async function InvoiceList({ userId }: { userId: string }) {
  const invoices = await db.invoice.findMany({ where: { userId } })
  return (
    <ul>
      {invoices.map(invoice => (
        <InvoiceRow key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  )
}
```

### Client Component (when needed)
```typescript
'use client'
// Use only when you need: useState, useEffect, event handlers, browser APIs

import { useState } from 'react'

export function InvoiceFilter({ onFilter }: { onFilter: (status: string) => void }) {
  const [selected, setSelected] = useState('all')
  
  const handleChange = (status: string) => {
    setSelected(status)
    onFilter(status)
  }
  
  return (
    <select value={selected} onChange={e => handleChange(e.target.value)}>
      <option value="all">All invoices</option>
      <option value="draft">Draft</option>
      <option value="sent">Sent</option>
    </select>
  )
}
```

### Loading and Error States (required on every data component)
```typescript
export function InvoiceListWithStates() {
  const { data, isLoading, error } = useInvoices()
  
  if (isLoading) return <InvoiceListSkeleton rows={5} />
  if (error) return <ErrorState message="Could not load invoices" onRetry={refetch} />
  if (!data?.length) return <EmptyState title="No invoices yet" cta="Create your first invoice" />
  
  return <InvoiceList invoices={data} />
}
```

## Forms with React Hook Form + Zod
```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const InvoiceSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  amountCents: z.number().int().positive('Amount must be positive'),
  dueDate: z.string().min(1, 'Due date is required'),
})

type InvoiceFormData = z.infer<typeof InvoiceSchema>

export function InvoiceForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
  })
  
  const onSubmit = async (data: InvoiceFormData) => {
    await createInvoice(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Customer" error={errors.customerName?.message}>
        <Input {...register('customerName')} />
      </FormField>
      <Button type="submit" loading={isSubmitting}>Create invoice</Button>
    </form>
  )
}
```

## State Management

### Server state: React Query
```typescript
// Use for: API calls, data fetching, cache invalidation
const { data, isLoading } = useQuery({
  queryKey: ['invoices', userId],
  queryFn: () => fetchInvoices(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

### Client state: Zustand
```typescript
// Use for: UI state shared across components (modals, filters, selection)
import { create } from 'zustand'

const useInvoiceStore = create<{
  selectedIds: string[]
  selectInvoice: (id: string) => void
  clearSelection: () => void
}>(set => ({
  selectedIds: [],
  selectInvoice: (id) => set(state => ({
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter(i => i !== id)
      : [...state.selectedIds, id]
  })),
  clearSelection: () => set({ selectedIds: [] }),
}))
```

## TypeScript Conventions
```typescript
// Props interfaces — always explicit
interface InvoiceRowProps {
  invoice: Invoice
  onSelect?: (id: string) => void
  isSelected?: boolean
}

// Never use 'any' — use 'unknown' if the type is genuinely unknown
function processApiResponse(data: unknown) {
  if (!isInvoice(data)) throw new Error('Invalid invoice data')
  return data
}

// Use type predicates for runtime type checking
function isInvoice(data: unknown): data is Invoice {
  return typeof data === 'object' && data !== null && 'id' in data && 'amountCents' in data
}
```
