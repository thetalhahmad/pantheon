# Skill: Figma Plugin API Rules — Complete Reference

This file documents every known Figma Plugin API pitfall discovered through production use. These are not opinions — they are real bugs that produce silent failures or broken layouts.

---

## Critical Ordering Rules

### The appendChild Order Problem
The most common bug. FILL sizing must be set AFTER the node is appended.

```javascript
// WRONG — FILL is ignored or throws
child.layoutSizingHorizontal = "FILL";
parent.appendChild(child);

// CORRECT
parent.appendChild(child);
child.layoutSizingHorizontal = "FILL";
child.layoutSizingVertical = "FIXED"; // or HUG or FILL
```

### The resize() Order Problem
resize() resets primaryAxisSizingMode back to FIXED. Set modes after resize.

```javascript
// WRONG — AUTO mode gets overridden back to FIXED
frame.primaryAxisSizingMode = "AUTO";
frame.resize(1440, 100);

// CORRECT
frame.layoutMode = "VERTICAL";  // always first
frame.resize(1440, 100);        // initial size
frame.primaryAxisSizingMode = "AUTO";    // now set modes
frame.counterAxisSizingMode = "FIXED";
```

### The Full Correct Order for Auto Layout Frames
```javascript
var frame = figma.createFrame();
frame.name = "Card";                           // 1. Name
frame.layoutMode = "VERTICAL";                  // 2. Direction
frame.resize(360, 100);                         // 3. Initial size
frame.primaryAxisSizingMode = "AUTO";           // 4. Sizing modes
frame.counterAxisSizingMode = "FIXED";
frame.primaryAxisAlignItems = "MIN";            // 5. Alignment
frame.counterAxisAlignItems = "CENTER";
frame.itemSpacing = 16;                         // 6. Gap
frame.paddingTop = 24;                          // 7. Padding (each individually)
frame.paddingBottom = 24;
frame.paddingLeft = 24;
frame.paddingRight = 24;
frame.cornerRadius = 12;                        // 8. Radius (before children)
frame.fills = [figma.util.solidPaint("#FFFFFF")]; // 9. Fills
frame.clipsContent = true;                      // 10. Clips
figma.currentPage.appendChild(frame);           // 11. Append to page
```

---

## Text Rules

### Font Loading
```javascript
// Load ALL fonts you will use BEFORE creating any text nodes
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "SemiBold" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });

// THEN create text
var t = figma.createText();
```

### Text Node Creation Order
```javascript
// WRONG — textAutoResize with empty text = 0 width/height
var t = figma.createText();
t.textAutoResize = "HEIGHT";
t.characters = "Hello world";

// CORRECT
var t = figma.createText();
t.characters = "Hello world";           // 1. Content first
parent.appendChild(t);                   // 2. Append
t.layoutSizingHorizontal = "FILL";      // 3. FILL after append
t.textAutoResize = "HEIGHT";            // 4. AutoResize last
```

### Setting Font Properties
```javascript
var t = figma.createText();
t.characters = "Label text";
t.fontSize = 14;                                      // size before name
t.fontName = { family: "Inter", style: "Medium" };   // then name
t.letterSpacing = { value: 0, unit: "PIXELS" };
t.lineHeight = { value: 20, unit: "PIXELS" };
t.textAlignHorizontal = "LEFT";   // "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED"
t.textAlignVertical = "TOP";      // "TOP" | "CENTER" | "BOTTOM"
```

### Mixed Font Styles in One Text Node
```javascript
// To apply different styles to different characters, use setRangeFontName
var t = figma.createText();
t.characters = "Bold text and regular text";
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
t.setRangeFontName(0, 9, { family: "Inter", style: "Bold" });
t.setRangeFontName(10, t.characters.length, { family: "Inter", style: "Regular" });
```

---

## Color and Variable Rules

### Solid Color Fill
```javascript
// Simple solid fill
frame.fills = [figma.util.solidPaint("#3B82F6")];

// With opacity
var paint = figma.util.solidPaint("#3B82F6");
paint = { ...paint, opacity: 0.1 };
frame.fills = [paint];
```

### Binding a Variable to a Fill
```javascript
var colorVar = await figma.variables.importVariableByKeyAsync("YOUR_VARIABLE_KEY");

// WRONG — does not work
frame.setBoundVariable('fills', colorVar);

// CORRECT
var paint = figma.util.solidPaint("#000000"); // placeholder color
paint = figma.variables.setBoundVariableForPaint(paint, "color", colorVar);
frame.fills = [paint];
```

### Gradient Fill
```javascript
frame.fills = [{
  type: "GRADIENT_LINEAR",
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
  gradientStops: [
    { position: 0, color: { r: 0.23, g: 0.34, b: 0.86, a: 1 } },
    { position: 1, color: { r: 0.09, g: 0.09, b: 0.44, a: 1 } }
  ]
}];
```

### Transparent Fill (no fill)
```javascript
frame.fills = []; // empty array = no fill
```

---

## Component and Instance Rules

### Import and Instantiate
```javascript
// importComponentByKeyAsync — async, returns the master component
var comp = await figma.importComponentByKeyAsync("COMPONENT_KEY");
var instance = comp.createInstance(); // creates an instance
parent.appendChild(instance);
instance.layoutSizingHorizontal = "FILL"; // FILL after append
```

### Set Variant Properties
```javascript
instance.setProperties({
  "Size": "Medium",       // property name: value
  "State": "Default",
  "Has Icon": true,
  "Icon": "arrow-right"
});
```

### Exposable Props (Component Sets)
```javascript
// For components with multiple props, check what's available
console.log(JSON.stringify(instance.componentProperties));
// Then set only what you need
```

### When to Detach
Only detach if you must modify internal layers that cannot be set via properties:
```javascript
var detached = instance.detachInstance(); // returns FrameNode
// Now you can modify internal layers directly
// But this breaks the component link — cannot update from DS anymore
```

---

## Shadow and Effect Rules

```javascript
// Drop shadow
frame.effects = [{
  type: "DROP_SHADOW",
  color: { r: 0, g: 0, b: 0, a: 0.08 },
  offset: { x: 0, y: 4 },
  radius: 12,
  spread: 0,
  visible: true,
  blendMode: "NORMAL"
}];

// Inner shadow
frame.effects = [{
  type: "INNER_SHADOW",
  color: { r: 0, g: 0, b: 0, a: 0.1 },
  offset: { x: 0, y: 2 },
  radius: 4,
  spread: 0,
  visible: true,
  blendMode: "NORMAL"
}];

// Multiple effects
frame.effects = [shadowEffect, blurEffect];
```

---

## Stroke Rules

```javascript
frame.strokes = [figma.util.solidPaint("#E2E8F0")];
frame.strokeWeight = 1;
frame.strokeAlign = "INSIDE"; // "INSIDE" | "OUTSIDE" | "CENTER"

// Individual stroke sides (for table cells, etc.)
frame.strokeTopWeight = 0;
frame.strokeBottomWeight = 1;
frame.strokeLeftWeight = 0;
frame.strokeRightWeight = 0;
```

---

## Image Fill

```javascript
// Load image from URL and create fill
var imageHash = await figma.createImageAsync("https://example.com/image.jpg");
frame.fills = [{
  type: "IMAGE",
  imageHash: imageHash.hash,
  scaleMode: "FILL" // "FILL" | "FIT" | "CROP" | "TILE"
}];
```

---

## Opacity and Blend Mode

```javascript
frame.opacity = 0.5;                // 0 to 1
frame.blendMode = "MULTIPLY";       // "NORMAL" | "MULTIPLY" | "SCREEN" | "OVERLAY" etc.
```

---

## Debugging Patterns

### When a script returns undefined
The `return` before the IIFE is missing:
```javascript
// WRONG — Promise is lost
(async function() { ... })();

// CORRECT
return (async function() { ... })();
```

### When FILL is not working
The node was not appended before setting FILL:
```javascript
parent.appendChild(child);          // append first
child.layoutSizingHorizontal = "FILL"; // then FILL
```

### When AUTO sizing reverts to FIXED
resize() was called after setting AUTO:
```javascript
frame.resize(width, height);         // resize first
frame.primaryAxisSizingMode = "AUTO"; // then AUTO
```

### When text is 0px wide
textAutoResize was set before characters:
```javascript
t.characters = "text";               // characters first
t.textAutoResize = "WIDTH_AND_HEIGHT"; // then autoResize
```

### When importComponentByKeyAsync fails
- Key is wrong or from a different file → re-run bridge extract
- Library is not connected to the current file → connect the library in Figma
- Component was deleted → update your components.json
