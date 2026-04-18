# Skill: Loading State Design

## Why Loading States Matter
A blank screen or frozen interface is the worst user experience. Loading states communicate:
1. The system is working (not broken)
2. How long to expect (sets expectations)
3. What the loaded content will look like (reduces jarring transitions)

## Skeleton Screens vs Spinners

### Use skeleton screens when:
- Loading content that takes a recognizable shape (cards, lists, tables, profiles)
- The content area is larger than 100px
- Loading takes more than 300ms

### Use spinners when:
- Processing an action (save, submit, upload, calculate)
- Loading is in a small contained area
- The content shape is unknown or variable
- Loading is expected to be very fast (<300ms) — show spinner but with a delay

### Never use:
- A blank white screen with no indicator
- Progress percentages unless you can actually calculate them
- "Loading..." text alone with no visual indicator

## Skeleton Screen Design Rules

### Shape matching
The skeleton must match the shape of the loaded content:
- Text lines: horizontal rectangles at appropriate widths
- Images/avatars: circles or squares at the correct dimensions
- Buttons: rectangles at button dimensions
- Do not show placeholder text — use rectangles

### The pulse animation
Skeleton screens use a "pulse" animation (opacity oscillation) or a "shimmer" (light sweep):
- Pulse: opacity oscillates from 0.4 to 0.7 over 750ms on ease-in-out
- Shimmer: gradient sweeps left to right over 1500ms
- Shimmer feels more "alive" but is more complex to implement — consult Pallas

### Stagger loading
When multiple items are loading (a list of cards):
- Items do not all pulse in sync — this looks like a grid of lights
- Stagger each item by 50-100ms
- Items fade in sequentially as they load, not all at once

## Specific Loading Patterns

### Table loading
Show 5-8 skeleton rows at the correct row height, with column placeholders matching column widths.

### Dashboard loading
Load the layout shell first (sidebar, header, navigation). Then load each card independently as data arrives. Never wait for all cards before showing any.

### Chart loading
Show the chart axis and grid lines as a skeleton while data loads. When data arrives, animate bars/lines growing in from the baseline.

### Image loading
- Show a colored placeholder the same dimensions as the image
- Use the image's dominant color as the placeholder if available
- Fade the real image in over 200ms when it loads

## Error States in Loading
When a load fails:
- Replace the skeleton with an error state (not a blank space)
- Show: icon + message + retry action
- Message: specific ("Could not load invoices") not generic ("Error occurred")
- Retry: visible and accessible — do not hide it
