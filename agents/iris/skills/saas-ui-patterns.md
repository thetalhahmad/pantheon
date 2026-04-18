# Skill: SaaS UI Patterns

## Dashboard Patterns
### Data Overview Dashboard
- Summary cards at top: 4 KPIs, never more
- Main chart below: primary metric over time
- Secondary data in a table or list
- Empty state when no data exists

### Navigation Patterns
- Left sidebar: for products with 5+ primary sections
- Top nav: for products with 3-4 primary sections
- Tabs: for sub-sections within a page
- Breadcrumbs: always when more than 2 levels deep

## Data Table Patterns
Required elements:
- Column headers with sort indicators
- Row hover state
- Bulk selection with checkbox column
- Pagination or infinite scroll (never load all at once)
- Search/filter above the table
- Empty state with CTA
- Loading skeleton (not spinner)

Column guidelines:
- First column: primary identifier, left-aligned
- Numbers: right-aligned
- Status: use colored badges, not text alone
- Actions: last column, right-aligned, only visible on hover

## Form Patterns
- Labels above inputs, never inside (placeholder only)
- Validation inline, immediately on blur
- Error message below the field with red text
- Required fields: asterisk with legend, not on every label
- Submit button: bottom right of form
- Destructive actions: require confirmation modal

## Empty States
Every data view needs an empty state with:
- Illustration or icon (not a generic "no data" message)
- Headline explaining what this space is for
- Body text explaining why it is empty
- CTA to add the first item

## Loading States
- Use skeleton screens, not spinners, for content that takes shape
- Spinner only for actions (save, upload, processing)
- Never show a blank screen — always show the layout shell while loading

## Modal Patterns
- Confirmation modals: max 3 buttons (Cancel, Secondary Action, Primary Action)
- Form modals: header + scrollable body + sticky footer with actions
- Max width: 600px for forms, 800px for complex content
- Always closeable via ESC and clicking outside (unless destructive action pending)
