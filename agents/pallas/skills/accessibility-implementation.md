# Skill: Accessibility Implementation

## Semantic HTML (the foundation)

Use the right element for the job. Semantic HTML gives screen readers context without ARIA.

| Instead of | Use |
|---|---|
| `<div onClick>` | `<button>` |
| `<div>` for navigation | `<nav>` |
| `<div>` for page header | `<header>` |
| `<div>` for main content | `<main>` |
| `<div>` for article | `<article>` |
| `<span>` for inline emphasis | `<strong>` or `<em>` |
| `<div>` for list | `<ul>` or `<ol>` with `<li>` |

## Keyboard Navigation

### Tab order
- Tab order must follow visual reading order (top-left to bottom-right)
- Interactive elements must be reachable by Tab
- Non-interactive elements must NOT be in tab order
- Manage focus on dynamic content (modals, dropdowns, navigation)

### Focus management for modals
```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isOpen) {
      // Move focus into modal when it opens
      modalRef.current?.focus()
    }
  }, [isOpen])
  
  // Trap focus inside modal
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    // Tab trapping logic here
  }
  
  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  ) : null
}
```

## ARIA Labels

### When to use aria-label
When a button or link has no visible text:
```tsx
// Icon-only button
<button aria-label="Delete invoice">
  <TrashIcon />
</button>

// Icon + text — no aria-label needed, the text is the label
<button>
  <TrashIcon aria-hidden="true" />
  Delete invoice
</button>
```

### aria-describedby (for additional context)
```tsx
<div>
  <label htmlFor="amount">Invoice amount</label>
  <input
    id="amount"
    type="number"
    aria-describedby="amount-hint amount-error"
  />
  <span id="amount-hint">Enter amount in GBP</span>
  <span id="amount-error" role="alert">Amount must be positive</span>
</div>
```

### Live regions (for dynamic content)
```tsx
// Announces changes to screen readers without moving focus
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>

// For urgent announcements (errors)
<div role="alert">
  {errorMessage}
</div>
```

## Focus Visible Styles
Never use `outline: none` without providing an alternative:

```css
/* tailwind — add to global styles */
:focus-visible {
  outline: 2px solid var(--color-interactive-primary);
  outline-offset: 2px;
}
```

In Tailwind:
```tsx
// Add focus-visible styles to every interactive component
<button className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
```

## Color Contrast Testing
Use these tools before marking a component done:
- Figma: A11y plugin shows contrast ratios inline
- Browser: Chrome DevTools → Elements → Accessibility tab
- Code: eslint-plugin-jsx-a11y catches many issues at build time

Minimum ratios:
- Normal text (<18px): 4.5:1
- Large text (≥18px, or ≥14px bold): 3:1
- UI components (borders, icons): 3:1
