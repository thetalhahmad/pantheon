# Skill: Design Token Architecture

## Token Tiers (Three-Tier System)

### Tier 1: Global tokens (primitives)
Raw values with no semantic meaning. Never used directly in components.
```
color-blue-500: #3B82F6
color-blue-600: #2563EB
font-size-14: 14px
spacing-4: 4px
radius-8: 8px
```

### Tier 2: Semantic tokens (aliases)
Meaningful names that reference global tokens. These are used in components.
```
color-interactive-primary: {color-blue-600}
color-interactive-primary-hover: {color-blue-700}
color-text-default: {color-neutral-900}
color-text-muted: {color-neutral-500}
color-surface-default: {color-neutral-50}
color-border-default: {color-neutral-200}
color-error: {color-red-600}
color-success: {color-green-600}
```

### Tier 3: Component tokens (component-specific)
Only when a component has values that cannot be expressed by semantic tokens.
```
button-primary-background: {color-interactive-primary}
button-primary-background-hover: {color-interactive-primary-hover}
button-padding-horizontal: {spacing-16}
button-border-radius: {radius-8}
```

## Naming Convention
Format: `[category]-[property]-[variant]-[state]`

Examples:
- `color-text-default` ✓
- `color-text-muted` ✓
- `color-text-error` ✓
- `color-button-primary-background-hover` ✓
- `blue500` ✗ (not semantic)
- `buttonColor` ✗ (not structured)

## Color Token Categories

### Brand colors
- `color-brand-primary`
- `color-brand-secondary`
- `color-brand-accent`

### Semantic colors
- `color-interactive-primary` (clickable elements)
- `color-interactive-secondary`
- `color-feedback-error`
- `color-feedback-warning`
- `color-feedback-success`
- `color-feedback-info`

### Text colors
- `color-text-default` (primary text)
- `color-text-secondary` (supporting text)
- `color-text-muted` (disabled, placeholder)
- `color-text-inverse` (text on dark backgrounds)
- `color-text-link` (clickable text)
- `color-text-error`

### Surface colors
- `color-surface-default` (page background)
- `color-surface-raised` (card, popover)
- `color-surface-overlay` (modal backdrop)
- `color-surface-brand` (branded sections)

### Border colors
- `color-border-default`
- `color-border-strong`
- `color-border-focus`
- `color-border-error`

## Typography Scale
Use a modular scale with a ratio of 1.25 (major third):

| Token | Value | Use |
|---|---|---|
| `font-size-xs` | 11px | Labels, captions |
| `font-size-sm` | 13px | Helper text, badges |
| `font-size-base` | 14px | Body text (minimum for clinical) |
| `font-size-md` | 16px | Body text, inputs |
| `font-size-lg` | 18px | Subheadings |
| `font-size-xl` | 20px | Section headings |
| `font-size-2xl` | 24px | Page headings |
| `font-size-3xl` | 30px | Display |
| `font-size-4xl` | 36px | Hero text |

## Implementing Tokens in Tailwind
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'interactive-primary': 'var(--color-interactive-primary)',
        'text-default': 'var(--color-text-default)',
        'surface-default': 'var(--color-surface-default)',
        // ... etc
      },
    },
  },
}
```
