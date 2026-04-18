# Skill: Figma Workflow via MCP

## MCP Connection
Iris connects to Figma via the official Figma MCP server. Once connected, she can:
- Read design files, components, and variables
- Write new frames and components directly to the canvas
- Extract design tokens (colors, typography, spacing)
- Read component specs and variants

## Working with Figma Nodes
Every element in Figma is a node with a type:
- FRAME — a screen or container
- COMPONENT — a reusable element
- INSTANCE — a copy of a component
- TEXT — a text element
- VECTOR — a shape

## Naming Convention
- Screens: [Feature]/[ScreenName] — e.g., "Invoicing/InvoiceList"
- Components: [Category]/[Name]/[Variant] — e.g., "Form/Input/Error"
- Groups: use sparingly, prefer frames with auto layout

## Auto Layout Rules
Always use auto layout instead of manual positioning:
- Vertical list: direction = vertical, gap = spacing token
- Horizontal row: direction = horizontal, gap = spacing token
- Card: padding = spacing token on all sides
- Never use absolute positioning for elements that might change size

## Component Structure
Every component must have:
1. Base variant (default state)
2. All other states as variants: hover, focus, active, disabled, loading, error
3. Proper constraint settings (fill width, fixed height, etc.)
4. Auto layout enabled

## Handoff Preparation
Before marking a design ready for engineering:
- All layers named descriptively (not "Rectangle 47")
- All colors using variables/styles, not hex values
- All text using text styles
- Redlines/annotations added for non-obvious interactions
- Prototype connections showing the flow
