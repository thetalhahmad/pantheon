# Skill: Customer Onboarding Design

## The Activation Framework
Activation = the moment a new user first experiences the core value of your product.

For Futuuri: First time a radiologist sees an AI finding highlighted on their own study.
For SaaS Accounting: First time an accountant successfully creates and sends an invoice.

**Everything in onboarding is designed to reach this moment as fast as possible.**

## First Principles

### Principle 1: One task at a time
Every screen in onboarding should ask the user to do ONE thing. Not "set up your profile, connect your PACS, and invite your team." One thing.

### Principle 2: Progress over completion
Show progress toward activation, not toward "setting up the account." 
"3 steps to your first AI analysis" beats "Complete your account setup."

### Principle 3: Value before data collection
Ask for information after the user has seen value, not before.
Wrong: "Tell us about your team before we show you anything"
Right: "Here is what Futuuri can do → now tell us about your setup so we can configure it for you"

### Principle 4: Skip over friction, not value
Remove setup friction. Do not remove the moments that create the aha experience.

## Onboarding Flow Design

### The Welcome Email
- Subject: Specific to what they signed up for (not "Welcome to [Company]!")
- Body: ONE sentence about what they can do now. ONE link. That is it.
- CTA: Takes them to the activation moment, not the dashboard

### The Empty Dashboard
The worst thing a new user sees is a dashboard full of empty states. Fix this:

Option A: Demo data
Preload the product with realistic sample data. The user can "play" before their own data arrives.

Option B: Guided first action
Replace the empty dashboard with a full-screen "first action" prompt. The dashboard appears once they complete it.

Option C: Progress checklist
Show a checklist of 3-5 setup tasks with the activation task most prominent. Visual progress bar.

### The Activation Moment
Design this carefully. It should feel like a payoff:
- The UI should feel "complete" for the first time
- Acknowledge the achievement: "You just [completed X]"
- Immediately show what is now possible: "Now you can..."
- Suggest the next step

### The Day 3 Check-in Email
Sent if the user has NOT activated:
- Subject: "Did you get a chance to [activation action]?"
- Body: Acknowledge it can be hard to find time. Offer help. One specific tip. One link.
- Offer: "Reply to this email if you'd like us to help you get set up"

Sent if the user HAS activated:
- Subject: "You've [activated X] — what's next?"
- Body: Congratulate briefly. Introduce the second most important capability. One CTA.

## Success Metrics for Onboarding

| Metric | How to Measure | Target |
|---|---|---|
| Time to activation | Signup timestamp to first activation event | <10 minutes |
| Day 1 activation rate | % of signups who activate within 24 hours | >40% |
| Day 7 retention | % of activated users who return in week 1 | >60% |
| Day 30 retention | % of activated users still active at day 30 | >40% |

Track these separately for different acquisition channels and ICP segments.
