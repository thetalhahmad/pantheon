# Skill: Design System Extraction

## Why You Must Extract DS Keys
The Figma Plugin API imports components and variables by their unique KEY, not by name. Keys are stable identifiers that do not change when you rename components. Without keys, you cannot import real DS components — you would have to create everything from scratch, which defeats the purpose.

## Running the Extraction

```bash
# With Bridge initialized and Figma plugin connected:
bridge extract

# This runs three extraction scripts and saves JSON files:
# registries/components.json  — all components with keys
# registries/variables.json   — all variables with keys
# registries/text-styles.json — all text styles with keys
```

## Manual Extraction (if bridge extract is unavailable)

```javascript
// Extract components
return (async function() {
  var components = figma.root.findAllWithCriteria({ types: ["COMPONENT"] });
  var result = components.map(c => ({
    name: c.name,
    key: c.key,
    id: c.id,
    description: c.description
  }));
  return { components: result, count: result.length };
})();
```

```javascript
// Extract variables
return (async function() {
  var collections = figma.variables.getLocalVariableCollections();
  var result = [];
  for (var col of collections) {
    var vars = col.variableIds.map(id => {
      var v = figma.variables.getVariableById(id);
      return { name: v.name, key: v.key, type: v.resolvedType, collection: col.name };
    });
    result = result.concat(vars);
  }
  return { variables: result, count: result.length };
})();
```

```javascript
// Extract text styles
return (async function() {
  var styles = figma.getLocalTextStyles();
  var result = styles.map(s => ({
    name: s.name,
    key: s.key,
    fontSize: s.fontSize,
    fontFamily: s.fontName.family,
    fontStyle: s.fontName.style,
    lineHeight: s.lineHeight
  }));
  return { textStyles: result, count: result.length };
})();
```

## Reading the Output

### components.json structure
```json
{
  "components": [
    {
      "name": "Button/Primary/Medium",
      "key": "abc123def456",
      "id": "1:234",
      "description": "Primary button, medium size"
    }
  ]
}
```

### variables.json structure
```json
{
  "variables": [
    {
      "name": "color/interactive/primary",
      "key": "xyz789abc123",
      "type": "COLOR",
      "collection": "Semantic Colors"
    }
  ]
}
```

## Organizing Keys in CLAUDE.md

After extraction, add the most-used keys to the project CLAUDE.md so they are available in every session:

```markdown
## Design System Keys

### Components
- Button Primary: `abc123def456`
- Button Secondary: `def456ghi789`
- Input Default: `ghi789jkl012`
- Card Base: `jkl012mno345`
- Badge: `mno345pqr678`
- Avatar: `pqr678stu901`

### Color Variables
- color/interactive/primary: `xyz789abc123`
- color/surface/default: `def123ghi456`
- color/text/default: `ghi456jkl789`
- color/border/default: `jkl789mno012`
- color/feedback/error: `mno012pqr345`

### Text Styles
- heading/xl: `abc987def654`
- heading/lg: `def654ghi321`
- body/md: `ghi321jkl098`
- body/sm: `jkl098mno765`
- label/md: `mno765pqr432`
```

## Component Naming Patterns (how to find what you need)

Most DS components follow a naming pattern. Learn yours from components.json:

```
Button/[variant]/[size]   → Button/Primary/Medium
Form/Input/[state]        → Form/Input/Default, Form/Input/Error
Card/[type]               → Card/Default, Card/Elevated
Badge/[color]             → Badge/Blue, Badge/Green, Badge/Red
Navigation/[type]         → Navigation/Sidebar, Navigation/TopBar
Table/[element]           → Table/Row, Table/Header, Table/Cell
```

When searching components.json, filter by the feature name you need:
- Designing a form? Filter for "Input", "Label", "Select", "Checkbox"
- Designing a table? Filter for "Table", "Row", "Cell", "Sort"
- Designing navigation? Filter for "Nav", "Sidebar", "Tab", "Breadcrumb"

## Keeping Keys Fresh

Keys change when a component is published to a new library or moved between files. Re-run extraction when:
- DS library has been updated
- Components have been moved to a new file
- Variables have been reorganized into new collections
- Keys stop working (404 in importComponentByKeyAsync)

```bash
bridge extract  # re-run to refresh all registries
```
