# Skill: Figma Workflow via Bridge

## What Bridge Is
Bridge is a WebSocket server that creates a tunnel between Claude Code and the Figma Plugin API. The official Figma MCP reads design context. Bridge WRITES production-ready designs using your real design system components, bound variables, and text styles.

```
Claude Code → Bridge Server (:9001) → WebSocket → Figma Plugin → Your Figma File
```

## Setup Per Project

```bash
# 1. Install Bridge (once)
curl -fsSL https://raw.githubusercontent.com/noemuch/bridge/main/install.sh | bash

# 2. Initialize project
cd your-project
bridge init
# Interactive setup: installs Figma plugin, starts server, extracts DS keys, generates CLAUDE.md

# 3. For subsequent sessions
bridge start
```

## Sending Scripts to Figma

```bash
# Send a script file
cat my-script.js | jq -Rs '{"action":"runScript","code":.}' | \
  curl -s --max-time 60 -X POST http://localhost:9001/command \
  -H "Content-Type: application/json" -d @-

# Send inline script
curl -s -X POST http://localhost:9001/command \
  -H "Content-Type: application/json" \
  -d '{"action":"runScript","code":"return (async function() { var f = figma.createFrame(); f.name = \"test\"; figma.currentPage.appendChild(f); return {id: f.id}; })();"}'
```

## Available Bridge Actions

| Action | Use |
|---|---|
| `runScript` | Execute arbitrary Figma Plugin API code — primary action |
| `ping` | Check connection |
| `getSelection` | Info about current Figma selection |
| `getNodeInfo` | Detailed info about a specific node |
| `getChildren` | List children of a node |
| `findByName` | Find nodes by name |
| `rename` | Rename a node |
| `resize` | Resize a node |
| `cloneNode` | Clone a node N times |
| `deleteNode` | Delete a node |

## Atomic Generation Pattern

### Why atomic?
One bug in a 200-line script = restart everything. One bug in step 3 of 5 = fix step 3 only.

### The pattern in practice

```javascript
// Step 1: Structure only — no content yet
return (async function() {
  try {
    var root = figma.createFrame();
    root.name = "InvoiceList/Default";
    root.layoutMode = "VERTICAL";
    root.resize(1440, 900);
    root.primaryAxisSizingMode = "FIXED";
    root.counterAxisSizingMode = "FIXED";
    root.fills = [figma.util.solidPaint("#F8FAFC")];
    figma.currentPage.appendChild(root);

    // Create empty section frames
    var header = figma.createFrame();
    header.name = "InvoiceList/Header";
    header.layoutMode = "HORIZONTAL";
    header.resize(1440, 64);
    header.primaryAxisSizingMode = "FIXED";
    header.counterAxisSizingMode = "FIXED";
    root.appendChild(header);
    header.layoutSizingHorizontal = "FILL";

    var content = figma.createFrame();
    content.name = "InvoiceList/Content";
    content.layoutMode = "VERTICAL";
    content.resize(1440, 100);
    content.primaryAxisSizingMode = "FIXED";
    content.counterAxisSizingMode = "AUTO";
    root.appendChild(content);
    content.layoutSizingHorizontal = "FILL";

    figma.viewport.scrollAndZoomIntoView([root]);
    return { success: true, rootId: root.id, headerId: header.id, contentId: content.id };
  } catch (e) {
    return { success: false, error: e.message };
  }
})();
```

Then take a screenshot. Verify the structure is correct. Save the IDs. Use them in step 2.

```javascript
// Step 2: Populate header using IDs from step 1
return (async function() {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "SemiBold" });

    var header = await figma.getNodeByIdAsync("HEADER_ID_FROM_STEP_1");

    // Import real DS component
    var logoComp = await figma.importComponentByKeyAsync("YOUR_LOGO_KEY");
    var logo = logoComp.createInstance();
    header.appendChild(logo);

    // Add title text
    var title = figma.createText();
    title.characters = "Invoices";
    title.fontSize = 20;
    title.fontName = { family: "Inter", style: "SemiBold" };
    header.appendChild(title);
    title.layoutSizingHorizontal = "FILL";

    figma.viewport.scrollAndZoomIntoView([header]);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
})();
```

## Verification After Each Step

After every step, use Figma MCP to take a screenshot:
```
"Use the Figma MCP to take a screenshot of the current selection and show it to me"
```

Check:
- Is the layout correct?
- Are components rendering at the right size?
- Is spacing matching the design spec?
- Are colors correct?

If wrong: fix that step, re-run. If correct: proceed.

## Working with Figma getNodeByIdAsync

When passing IDs between steps, use the async version:
```javascript
var node = await figma.getNodeByIdAsync("1:234");
// NOT figma.getNodeById() — the sync version may return null for remotely loaded nodes
```
