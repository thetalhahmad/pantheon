# Skill: Accessibility — WCAG 2.1 AA

## Color Contrast Requirements
| Text Type | Minimum Ratio | Target |
|---|---|---|
| Normal text (<18px) | 4.5:1 | 7:1 |
| Large text (≥18px or ≥14px bold) | 3:1 | 4.5:1 |
| UI components (borders, icons) | 3:1 | 4.5:1 |
| Decorative elements | None | N/A |

Tools: Use Figma's built-in contrast checker or the A11y plugin.

## Focus States
Every interactive element must have a visible focus indicator:
- Default browser focus ring is acceptable but style it for brand consistency
- Minimum: 2px solid outline with 2px offset
- Never use outline: none without providing an alternative
- Focus must be visible in both light and dark mode

## Interactive Element Sizing
- Minimum touch target: 44×44px (WCAG 2.5.5)
- Minimum click target: 24×24px
- Ensure adequate spacing between targets (8px minimum)

## Text Readability
- Body text minimum: 14px (16px preferred)
- Line height: 1.5× font size minimum for body text
- Paragraph max-width: 66 characters (prevents line length fatigue)
- Do not use text over busy images without a scrim/overlay

## Color Independence
Never convey information through color alone:
- Error states: red color + error icon + error text
- Required fields: asterisk, not just a color
- Status badges: color + text label, not color alone
- Charts: use patterns or labels in addition to color

## Screen Reader Considerations (for engineering handoff)
- All images need meaningful alt text or alt="" if decorative
- Form inputs need associated labels (not just placeholder)
- Icon-only buttons need aria-label
- Modals need focus trap and return focus on close
- Landmarks: header, nav, main, footer elements

## Clinical Interface Specific
For Futuuri and medical products:
- Minimum text size: 16px (clinicians often work on high-DPI displays)
- High contrast mode must be supported
- No reliance on color for critical clinical information (e.g., abnormal findings)
- Reading order must match visual order (important for screen reader users)
