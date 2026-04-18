# Skill: System Design

## The Architecture Decision Record (ADR)
Every significant technical decision should be documented. Future team members will thank you.

```markdown
# ADR-001: [Decision Title]

Date: [date]
Status: ACCEPTED / PROPOSED / DEPRECATED
Deciders: [who made the decision]

## Context
What is the situation that requires this decision?
What forces are at play? (technical, business, team constraints)

## Decision
What is the decision being made?
State it clearly and directly.

## Rationale
Why this decision over alternatives?
What data or reasoning supports it?

## Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|---|---|---|---|

## Consequences
Positive: what becomes easier or better
Negative: what becomes harder, what technical debt is accepted
Risks: what could go wrong, how to mitigate

## Review Trigger
Under what conditions should this decision be revisited?
```

## System Design Patterns for SaaS

### Multi-Tenancy
Three common approaches:

**Pool model** (same database, shared tables with tenant_id):
- Pros: Simple, cheap, easy to operate
- Cons: Risk of tenant data leakage if queries miss tenant_id filter
- Use when: Early stage, multiple small tenants

**Silo model** (separate database per tenant):
- Pros: Strong isolation, easier compliance, simpler queries
- Cons: Expensive, complex operations, hard to run cross-tenant analytics
- Use when: Enterprise contracts, strict compliance requirements, large tenants

**Bridge model** (shared infrastructure, isolated schemas):
- Pros: Balance of isolation and efficiency
- Cons: Complex to implement correctly
- Use when: Medium-scale with compliance requirements

### Event-Driven Architecture
Use when: actions in one part of the system should trigger reactions in another part without tight coupling.

```
User creates invoice
  → InvoiceCreated event published
    → EmailService sends confirmation email
    → AuditService logs the event
    → AnalyticsService records the event
    → BillingService checks usage limits
```

Benefits: loose coupling, easy to add new reactions, good for audit trails
Risks: eventual consistency, harder to debug, needs dead letter queue for failures

### CQRS (Command Query Responsibility Segregation)
Separate the write model from the read model.

Write side: normalized, transactionally correct, optimized for integrity
Read side: denormalized, optimized for the specific read patterns, can be eventually consistent

Use when: Read patterns are very different from write patterns (e.g., complex reporting on transactional data).

## Scalability Planning

### Identifying bottlenecks before they happen
1. What is the most expensive query in the system?
2. What happens to performance when you 10x the data?
3. Where are the N+1 query risks?
4. What is the maximum size of the largest table in 2 years?

### Database scaling sequence
1. Add indexes (free, immediate)
2. Optimize queries (free, requires time)
3. Add read replicas (moderate cost, solves read scaling)
4. Implement caching layer (Redis) (moderate cost, solves hot reads)
5. Vertical scaling (more expensive, but easy)
6. Horizontal scaling / sharding (expensive, complex, only if necessary)

## Security Architecture

### Defense in depth
Never rely on a single security control. Layer defenses:
- Network level: firewall, VPC, private subnets for databases
- Application level: authentication, authorization, input validation
- Data level: encryption at rest, field-level encryption for sensitive data
- Audit level: immutable logs of all access and changes

### Principle of least privilege
Every component should have access to only what it needs:
- Database user for the application: only the tables and operations it needs
- Service-to-service: authenticate with tokens, not shared secrets
- User roles: exactly the permissions their job requires, no more
