# Skill: SaaS Metrics

## The Metrics That Actually Matter

### Revenue Metrics

**MRR (Monthly Recurring Revenue)**
Definition: The normalized, predictable revenue you receive each month from active subscriptions.
Formula: Sum of all active subscription monthly amounts
NOT included: one-time fees, setup fees, professional services

**MRR Breakdown**
- New MRR: From new customers signing up this month
- Expansion MRR: From existing customers upgrading or buying more
- Contraction MRR: From existing customers downgrading (negative)
- Churned MRR: From customers cancelling (negative)
- Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR

**ARR (Annual Recurring Revenue)**
Formula: MRR × 12
Only valid if your contracts are truly annual. Do not calculate ARR by annualizing monthly revenue from mostly month-to-month customers.

### Growth Metrics

**MoM Growth Rate**
Formula: (MRR this month - MRR last month) / MRR last month × 100
Target range: 10-20% MoM for early-stage (<€1M ARR)

**Rule of 40**
Formula: Revenue Growth Rate % + EBITDA Margin %
>40: Good. >60: Excellent. <40: Needs attention.
Used by investors to balance growth vs profitability.

### Retention Metrics

**Logo Churn Rate**
Formula: Customers churned in period / Customers at start of period × 100
Target: <5% annual for B2B SaaS

**Revenue Churn Rate (Gross)**
Formula: MRR churned in period / MRR at start of period × 100
Target: <1% monthly (>12% annual is a serious problem)

**Net Revenue Retention (NRR)**
Formula: (Starting MRR + Expansion MRR - Contraction MRR - Churned MRR) / Starting MRR × 100
Target: >100% (means existing customers are growing, offsetting any churn)
>130%: Exceptional (common in best-in-class SaaS)

### Efficiency Metrics

**CAC (Customer Acquisition Cost)**
Formula: Total Sales + Marketing spend / Number of new customers acquired
Calculate separately for different channels.

**LTV (Customer Lifetime Value)**
Formula: Average MRR per customer / Monthly churn rate
Or: Average MRR × Gross Margin % / Monthly churn rate (accounts for profitability)

**LTV:CAC Ratio**
Target: >3:1 (LTV is 3× the cost to acquire the customer)
>5:1 is excellent

**CAC Payback Period**
Formula: CAC / (Average MRR per customer × Gross Margin %)
Target: <12 months for SMB, <18 months for enterprise

## Data Model for SaaS Analytics

```sql
-- The key events to track
CREATE TABLE subscription_events (
  id UUID PRIMARY KEY,
  customer_id UUID NOT NULL,
  event_type VARCHAR(30) NOT NULL,  
  -- 'new', 'expansion', 'contraction', 'churn', 'reactivation'
  mrr_change_cents INTEGER NOT NULL,  -- positive or negative
  previous_mrr_cents INTEGER NOT NULL,
  new_mrr_cents INTEGER NOT NULL,
  currency CHAR(3) NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL,
  plan_id UUID,
  metadata JSONB
);

-- Monthly MRR snapshot (pre-calculated for reporting speed)
CREATE TABLE mrr_snapshots (
  id UUID PRIMARY KEY,
  snapshot_date DATE NOT NULL,
  total_mrr_cents INTEGER NOT NULL,
  new_mrr_cents INTEGER NOT NULL,
  expansion_mrr_cents INTEGER NOT NULL,
  contraction_mrr_cents INTEGER NOT NULL,
  churned_mrr_cents INTEGER NOT NULL,
  customer_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(snapshot_date)
);
```

## Dashboard Structure

### CEO/Investor view
- ARR (large number, MoM change)
- MRR growth chart (12 months)
- Net New MRR waterfall (New + Expansion - Contraction - Churn)
- NRR (net revenue retention)
- Rule of 40 score

### Sales view
- New MRR this month vs target
- Pipeline by stage
- Win rate (this month, 3-month rolling)
- Average deal size (trend)
- Top deals by ARR

### Customer success view
- Churn risk accounts (health score <40)
- Up for renewal in next 90 days
- NPS by segment
- Expansion opportunities (health score >80, usage growing)
