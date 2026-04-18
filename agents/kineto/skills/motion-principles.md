# Skill: Motion Design Principles

## The Purpose Test
Before designing any animation, answer: what is this animation communicating?

Valid answers:
- "This element is appearing/disappearing"
- "These two elements are related"
- "This action was successful/failed"
- "The system is working (loading)"
- "This element's state has changed"
- "The user's attention should go here"

If the answer is "it looks cool" — remove the animation.

## The Five Principles of UI Motion

### 1. Responsive
Motion should feel immediate. Users should not wait for animations.
- Feedback animations (button press): under 100ms — feels instant
- Simple transitions: 150-250ms — feels smooth but not slow
- Complex transitions: 250-400ms — the maximum before it feels sluggish
- Never use the same duration for everything — varying durations create a sense of hierarchy

### 2. Natural
Motion should feel physical. Elements should follow the laws of nature:
- Things entering the screen accelerate then decelerate (ease-out)
- Things leaving the screen accelerate (ease-in)
- Things changing position in the same space decelerate at both ends (ease-in-out)
- Elements do not teleport — they always move from somewhere to somewhere

### 3. Purposeful
Every animation should guide the user's attention to something meaningful:
- New content appearing draws the eye to what is new
- Error states animate to draw attention to the problem
- Success states confirm the action was completed
- Navigation transitions show spatial relationships between screens

### 4. Consistent
The same type of interaction should always animate the same way:
- All modals open the same way
- All dropdowns open the same way
- All success toasts appear the same way
- Inconsistency creates cognitive load — users have to learn new patterns each time

### 5. Unobtrusive
Animation should never interrupt the user's workflow:
- Looping animations should stop when they are out of the viewport
- Background animations should be subtle, never distracting
- Hover effects should be fast — users should not have to wait to see them
- Never animate things the user sees multiple times per session at more than 200ms

## Easing Reference

### ease-out (decelerate): for elements entering
cubic-bezier(0, 0, 0.2, 1)
Use when: modal opening, dropdown appearing, notification showing, page element entering

### ease-in (accelerate): for elements leaving
cubic-bezier(0.4, 0, 1, 1)
Use when: modal closing, dropdown hiding, page element leaving

### ease-in-out (both): for position changes
cubic-bezier(0.4, 0, 0.2, 1)
Use when: element moving from one position to another, drawer sliding

### linear: for continuous motion
cubic-bezier(0, 0, 1, 1)
Use when: loading spinners, progress bars, anything looping

### What NOT to use
- Bounce (spring) easing on B2B, clinical, or financial products — feels playful and unprofessional
- Elastic easing on anything interactive — unpredictable, nauseating
- Extreme ease-in-out that makes elements "snap" at the start and end

## Clinical and Financial Product Rules

### Futuuri
- Maximum animation duration: 200ms for any interaction
- No looping decorative animations anywhere in the application
- Loading states: subtle pulse animation on skeleton screens only
- Error states: brief shake (3 frames) on the element + color change only
- AI findings: fade in at 150ms — not too dramatic, needs to feel trustworthy

### SaaS Accounting
- All animations: restrained, professional, never decorative
- Number changes: counter animation acceptable at 300ms maximum
- Chart loading: skeleton → data at 250ms
- No celebration animations (confetti, bouncing) — accountants are skeptical of software that acts casual about their financial data
