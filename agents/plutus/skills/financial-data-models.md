# Skill: Financial Data Models

## The Cardinal Rule
**All monetary values are stored as integers (minor currency units).**
£10.50 is stored as 1050 (pence). $100.00 is stored as 10000 (cents). ¥1000 is stored as 1000 (yen, which has no minor unit).

Reason: Floating-point arithmetic is imprecise. 0.1 + 0.2 = 0.30000000000000004 in most languages. For money, this is unacceptable. Integers are exact.

## Core Financial Tables

### Transactions (source of truth)
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_minor_units INTEGER NOT NULL,  -- always positive
  debit_account_id UUID NOT NULL REFERENCES accounts(id),
  credit_account_id UUID NOT NULL REFERENCES accounts(id),
  currency CHAR(3) NOT NULL,            -- ISO 4217
  transaction_date DATE NOT NULL,       -- business date
  description TEXT NOT NULL,
  reference TEXT,                       -- external reference
  status VARCHAR(20) NOT NULL DEFAULT 'POSTED',
  period_id UUID REFERENCES periods(id),
  -- Audit
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(id),
  -- Never allow updates to posted transactions
  CONSTRAINT no_negative_amounts CHECK (amount_minor_units > 0)
);
```

### Accounts (chart of accounts)
```sql
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,   -- e.g., "1100" for cash
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL,          -- ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE
  currency CHAR(3) NOT NULL,
  parent_id UUID REFERENCES accounts(id),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Periods (for period locking)
```sql
CREATE TABLE periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,          -- e.g., "March 2024"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'OPEN',  -- OPEN, CLOSING, CLOSED
  closed_at TIMESTAMPTZ,
  closed_by UUID REFERENCES users(id)
);
```

## Audit Trail Pattern
Financial records must never be deleted or updated directly. Instead, use an immutable audit log:

```sql
CREATE TABLE transaction_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id),
  action VARCHAR(20) NOT NULL,        -- CREATED, VOIDED, AMENDED
  previous_state JSONB,               -- full previous row as JSON
  new_state JSONB,                    -- full new row as JSON
  reason TEXT,
  performed_by UUID NOT NULL REFERENCES users(id),
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Double-Entry Validation
Every transaction must balance: total debits = total credits.

```typescript
function validateDoubleEntry(entries: JournalEntry[]): boolean {
  const totalDebits = entries
    .filter(e => e.type === 'DEBIT')
    .reduce((sum, e) => sum + e.amountMinorUnits, 0)
  
  const totalCredits = entries
    .filter(e => e.type === 'CREDIT')
    .reduce((sum, e) => sum + e.amountMinorUnits, 0)
  
  return totalDebits === totalCredits
}
```

## Multi-Currency Handling
```sql
-- Store exchange rates with full precision
CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_currency CHAR(3) NOT NULL,
  to_currency CHAR(3) NOT NULL,
  rate NUMERIC(20, 10) NOT NULL,     -- 10 decimal places
  source VARCHAR(50) NOT NULL,        -- where the rate came from
  effective_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Rules for multi-currency:
- Always store the original currency and amount
- Store the exchange rate used at the time of conversion
- Do not recalculate historical transactions with new rates
- Report in functional currency, but preserve original currency for audit
