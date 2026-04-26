# Auth Screens — Design Spec
**Date:** 2026-04-26
**Phase:** Phase 3 — Auth Screens
**Status:** Approved, ready for implementation
**Figma file:** RSqhYxJzRB87uMM9p4IxGx

---

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Layout | Split Screen | Trusted B2B pattern; room for brand storytelling |
| Auth methods | Google SSO + Email/Password | Fastest sign-up path + standard fallback |
| Brand panel content | Trust signals (quote + company logos) | Credibility at first contact for B2B |
| Email verification | Required before onboarding | Security + deliverability |
| Onboarding | 3-step wizard | Company info → Accounting prefs → Invite/Connect (skippable) |
| Language | English | Product language |
| Scope | Full suite (11 screens + states) | Pre-launch, build it right once |

---

## Global Layout System

### Left Panel (480px, fixed)
- Background: `#1E1B4B`
- **Top-left:** Econos logo mark — indigo `#6366F1` square (32px) + "Econos" wordmark, Inter Semi Bold 18px, white
- **Center:** Tagline — "Accounting that works for you." Inter Semi Bold 28px, white, max-width 280px
- **Sub-tagline:** "AI-native accounting built for Finnish businesses." Inter Regular 15px, `rgba(255,255,255,0.6)`
- **Bottom:** Customer quote card
  - Background: `rgba(255,255,255,0.07)`, border: `1px solid rgba(255,255,255,0.1)`, `border-radius: 12px`, padding: 20px
  - Quote text: Inter Regular 14px, white — placeholder: *"Econos saved us hours every month. Our accountant loves it."*
  - Author + company: Inter Regular 13px, `rgba(255,255,255,0.5)` — placeholder: *"— Mikko Virtanen, CEO, Virtanen Oy"*
  - 3 company logo pills below: `rgba(255,255,255,0.15)` background, `border-radius: 6px`, white text 11px — placeholder names: "Virtanen Oy", "Nordic Build", "Koski & Co"

### Right Panel (fills remaining width)
- Background: `#F8FAFC`
- **Auth card:** white `#FFFFFF`, `border-radius: 16px`, `box-shadow: 0 4px 24px rgba(0,0,0,0.08)`, max-width 420px, padding 40px, vertically centered
- **Footer:** "Privacy · Terms" — Inter Regular 12px, `#94A3B8`, centered below card

### Shared Component Rules
- **Inputs:** `border-radius: 8px`, `1px solid #E2E8F0`, height 44px, focus ring `2px solid #A5B4FC`, label above (Inter Medium 14px, `#1E293B`)
- **Primary button:** full width, height 44px, `#6366F1`, hover `#4F46E5`, `border-radius: 8px`, Inter Semi Bold 15px, white
- **Ghost button:** full width, height 44px, white bg, `1px solid #E2E8F0`, `border-radius: 8px`, Inter Medium 15px, `#1E293B`
- **Google SSO button:** white bg, `1px solid #E2E8F0`, `border-radius: 8px`, Google "G" SVG left, "Continue with Google" Inter Medium 15px, `#1E293B`, centered
- **Divider:** thin `1px solid #E2E8F0` with "or" label, `#94A3B8` 13px, centered
- **Links:** `#6366F1`, Inter Regular 14px, underline on hover
- **Card title:** Inter Semi Bold 24px, `#1E293B`
- **Card subtitle:** Inter Regular 14px, `#64748B`, margin-bottom 24px
- **Spacing between form elements:** 16px gap

---

## Screens

### Screen 1 — Sign In
**Route:** `/auth/sign-in`

**Card content:**
1. Title: "Welcome back"
2. Subtitle: "Sign in to your Econos account"
3. Google SSO button
4. Divider "or"
5. Email input (label: "Work email", placeholder: "you@company.com")
6. Password input (label: "Password", placeholder: "••••••••") + "Forgot password?" link right-aligned in `#6366F1` 13px
7. "Sign In" primary button
8. Footer: "Don't have an account? **Sign up**" — centered, 14px

**States:** default, loading (spinner in button, disabled), error (Alert Banner component, error variant above form)

---

### Screen 2 — Sign Up
**Route:** `/auth/sign-up`

**Card content:**
1. Title: "Create your account"
2. Subtitle: "Start your free trial — no credit card required"
3. Google SSO button
4. Divider "or"
5. Full Name input (label: "Full name", placeholder: "Talha Ahmad")
6. Work Email input (label: "Work email", placeholder: "you@company.com")
7. Password input (label: "Password") + inline password strength bar (4 segments below input: 1=red `#EF4444`, 2=orange `#F59E0B`, 3=yellow `#EAB308`, 4=green `#10B981`, with label "Weak / Fair / Good / Strong")
8. "Create Account" primary button
9. Footer: "Already have an account? **Sign in**" + "By signing up you agree to our **Terms** and **Privacy Policy**" — 12px, `#94A3B8`

**States:** default, loading, error (account already exists → redirects to Screen 8), password strength updating inline

---

### Screen 3 — Check Your Inbox
**Route:** `/auth/verify-email`

**Card content (no form):**
1. Envelope icon — Phosphor `Envelope` Regular weight, 64px, `#6366F1`
2. Title: "Check your inbox"
3. Body: "We sent a verification link to **{email}**. Click it to activate your account." — 15px, `#64748B`
4. "Resend email" ghost button
5. "Wrong email? Go back" link — `#6366F1`, centered, 14px

**States:** default, resend cooldown (button disabled + "Resend in 45s" countdown), resent success (Alert Banner, success variant: "Email resent!")

---

### Screen 4 — Email Verified
**Route:** `/auth/email-verified`

**Card content (no form):**
1. Check circle icon — Phosphor `CheckCircle` Regular weight, 64px, `#10B981`
2. Title: "Email verified!"
3. Body: "Your account is ready. Let's set up your company." — 15px, `#64748B`
4. "Continue to setup" primary button
5. Auto-redirect to onboarding after 3 seconds (progress indicator: thin indigo bar animating across bottom of card)

---

### Screen 5 — Forgot Password
**Route:** `/auth/forgot-password`

**Card content:**
1. Title: "Reset your password"
2. Subtitle: "Enter your work email and we'll send a reset link"
3. Work Email input
4. "Send reset link" primary button
5. "Back to sign in" link — `#6366F1`, centered

**Post-submit state:** Replace form with: Envelope icon 48px + "Reset link sent" title + "Check your inbox at **{email}**" body + "Resend" ghost button

---

### Screen 6 — Reset Password
**Route:** `/auth/reset-password?token={token}`

**Card content:**
1. Title: "Create new password"
2. Subtitle: "Must be at least 8 characters"
3. New Password input + strength bar
4. Confirm Password input (inline error if mismatch: "Passwords don't match" in `#EF4444` 13px)
5. "Set new password" primary button

**Post-submit:** Auto-redirect to Sign In with success Alert Banner: "Password updated. Please sign in."

---

### Screen 7 — Session Expired
**Route:** `/auth/session-expired`

**Card content (no form):**
1. Lock icon — Phosphor `LockSimple` Regular weight, 48px, `#F59E0B`
2. Title: "Session expired"
3. Body: "Your session timed out for security. Please sign in again." — 15px, `#64748B`
4. "Sign in again" primary button → redirects to Sign In

---

### Screen 8 — Account Already Exists
**Route:** `/auth/sign-up` (state, not a separate route)

**Card content:**
- Alert Banner (warning variant, `#FFFBEB`) pinned to top of card: "An account with **{email}** already exists."
- Title: "Account already exists"
- Body: "Try signing in, or reset your password if you've forgotten it."
- "Sign in instead" primary button
- "Reset password" ghost button

---

### Screen 9 — Onboarding Step 1: Company Info
**Route:** `/onboarding/company`

**Layout:** Full-width white page (no split screen — onboarding breaks out of auth shell). Max-width 600px card, centered. Econos logo top-left.

**Progress header:**
- "Step 1 of 3" label — Inter Medium 13px, `#64748B`
- 3-segment progress bar (`#6366F1` for completed + current, `#E2E8F0` for upcoming), `border-radius: 4px`, height 4px

**Card content:**
1. Title: "Tell us about your company"
2. Subtitle: "We use this to set up your chart of accounts and compliance settings"
3. Company Name input\* (label: "Company name")
4. Business ID input\* (label: "Business ID (Y-tunnus)", placeholder: "1234567-8", helper text: "Found on ytj.fi")
5. Industry dropdown\* (Select component)
6. Company size dropdown (Select component: 1–10 / 11–50 / 51–200 / 200+)
7. "Continue" primary button

---

### Screen 10 — Onboarding Step 2: Accounting Preferences
**Route:** `/onboarding/accounting`

**Progress header:** Step 2 of 3

**Card content:**
1. Title: "Accounting preferences"
2. Subtitle: "These can be changed later in Settings"
3. Fiscal year start — month picker (12 pill buttons, Jan–Dec, selected = `#6366F1` bg white text)
4. VAT period — 3 radio pills: Monthly / Quarterly / Yearly
5. Accounting standard — read-only field: "Finnish GAAP (FAS)" with info tooltip
6. "Continue" primary button + "Back" ghost button (left-aligned, below primary)

---

### Screen 11 — Onboarding Step 3: Invite & Connect
**Route:** `/onboarding/connect`

**Progress header:** Step 3 of 3 + "Skip for now" link top-right (`#6366F1`)

**Card content:**
1. Title: "Almost there!"
2. Subtitle: "These steps are optional — you can do them anytime from Settings"
3. Two side-by-side option cards (`border: 1px solid #E2E8F0`, `border-radius: 12px`, padding 24px):
   - **Invite your accountant:** Phosphor `UserPlus` icon 32px `#6366F1` → "Invite your accountant" heading → Email input → "Send Invite" ghost button
   - **Connect your bank:** Phosphor `Bank` icon 32px `#6366F1` → "Connect your bank" heading → 3 placeholder text pills (Nordea / OP / Danske Bank) in `#E2E8F0` bg → "Connect" ghost button
4. "Go to dashboard" primary button (full width, below both cards)

Note: "Skip for now" appears only in the progress header (top-right). The "Go to dashboard" button and the header skip link are the two CTAs — do not add a third "Skip for now" below the button.

---

## States Summary

| Screen | States designed |
|---|---|
| Sign In | Default, Loading, Error |
| Sign Up | Default, Loading, Error, Password strength (4 levels) |
| Check Inbox | Default, Resend cooldown, Resent success |
| Email Verified | Default, Auto-redirect animation |
| Forgot Password | Default, Post-submit confirmation |
| Reset Password | Default, Mismatch error, Post-submit redirect |
| Session Expired | Default |
| Account Exists | Warning state |
| Onboarding 1–3 | Default, Validation errors, Skip (step 3) |

---

## Figma Delivery

- New page: **"Auth Screens"** added to file `RSqhYxJzRB87uMM9p4IxGx`
- All 11 screens as top-level frames, 1440×900px
- Components used from existing library: Button, Input, Select, Alert Banner, Form Field, Modal, Navigation Item, Sidebar Navigation, Badge, Spinner
- New components created (if needed): Password Strength Bar, Progress Steps, Month Picker Pills, Option Card
- All frames named: `Auth/Sign In`, `Auth/Sign Up`, `Auth/Check Inbox`, `Auth/Email Verified`, `Auth/Forgot Password`, `Auth/Reset Password`, `Auth/Session Expired`, `Auth/Account Exists`, `Onboarding/Step 1`, `Onboarding/Step 2`, `Onboarding/Step 3`
