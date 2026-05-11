---
name: rcc-web-animator
description: Use this skill when creating, editing, debugging, or explaining animated broadcast graphics in ReactCasparClient WebAnimator using Fabric.js, Theatre.js, HTML output, Socket.IO, and CasparCG.
---

# RCC WebAnimator Skill

This skill is for **ReactCasparClient WebAnimator**, the custom connected animator software in this repository.

Use this skill for requests such as:

- create animated lower third
- create ticker
- create election strap
- create name/title graphic
- create full-frame graphic
- create animated bug/logo
- modify Fabric.js object animation
- modify Theatre.js keyframes
- generate CasparCG-ready HTML graphics
- connect WebAnimator output to CasparCG
- debug WebAnimator, Fabric.js, Theatre.js, HTML output, or data update flows

## Important files

Start by inspecting these files before making non-trivial changes:

- `client/src/theatrejs/WebAnimator.jsx`
- `client/src/common.js`
- `client/src/HtmlOutput.jsx`
- `client/src/theatrejs/ElementList.jsx`
- `client/src/theatrejs/DataUpdatePanel.jsx`
- `client/src/theatrejs/TheatreEditableTable.jsx`
- `client/src/theatrejs/TheatreImageSequence.jsx`
- `server/main.js`

Do not assume this is a normal React animation project. It is a **Fabric.js canvas + Theatre.js timeline + CasparCG/HTML broadcast graphics system**.

## Core architecture

WebAnimator normally works like this:

1. Fabric.js creates visual objects on canvas.
2. Each Fabric object has a unique `id` and `class`.
3. Theatre.js creates a matching animated object using the same id.
4. Theatre.js stores keyframes for properties such as position, scale, angle, opacity, fill, etc.
5. WebAnimator exports or generates HTML output.
6. The HTML output can be loaded/played/updated through the existing ReactCasparClient server and CasparCG flow.

Always preserve this relationship:

```text
Fabric object id === Theatre objectKey === exported HTML element identity
```

If this relationship breaks, editing, animation, update, and CasparCG output may fail.

## Existing global objects

`WebAnimator.jsx` exposes several globals for connected animator workflows:

- `window.studio`
- `window.sheet`
- `window.editor`
- `window.arrObject`
- `window.arrObjectProps`
- `window.dispatch`
- `window.clientId`
- `window.chNumber`

Be careful when changing these because other parts of the animator may depend on them.

## Theatre.js rules

The project uses:

```js
import studio from "@theatre/studio";
import { getProject, types, val, onChange } from "@theatre/core";
```

Main project/sheet pattern:

```js
var project = getProject("Fabricjs Object Animation");
sheet = project.sheet("Sheet 1");
```

FPS is applied to Theatre sequence using:

```js
api.set(sheet.sequence.pointer.subUnitsPerUnit, parseInt(FPS));
```

When adding animation, prefer Theatre.js transactions:

```js
studio.transaction(({ set }) => {
  set(object.props.left, 100);
  set(object.props.top, 800);
});
```

Do not directly change animation JSON unless there is no existing API path.

## Fabric.js rules

The animator uses Fabric.js canvas through `fabricjs-react`:

```js
import * as fabric from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
```

Objects should normally include:

```js
{
  id: uniqueId,
  class: uniqueId,
  selectable: true,
  evented: true
}
```

When modifying Fabric objects:

- call `canvas.requestRenderAll()` after changes
- keep `id` stable unless intentionally renaming
- if renaming, update both Fabric JSON and Theatre animation JSON
- preserve custom properties during `toJSON`, especially `id`, `class`, and `selectable`

Use existing helper functions from `client/src/common.js` whenever possible, for example:

- `generateUniqueId`
- `createTextBox`
- `createRect`
- `createCircle`
- `createTriangle`
- `addImage`
- `findElementWithId`
- `endpoint`
- `executeScript`
- `saveFile`

## Clip path rules

When importing WebAnimator content, clip paths need restoration.

Important functions in `WebAnimator.jsx`:

- `setclipPathWhileImportingWebAnimator(canvas)`
- `strinSetclipPathWhileImporting(layerNumber)`

When dealing with imported canvas JSON and clipped objects, ensure clip path objects are restored using object ids and `absolutePositioned: true`.

## Selection and deletion rules

Deleting an item must remove both Fabric object and Theatre object.

Existing deletion pattern:

```js
canvas.remove(element);
sheet.detachObject(element.id);
studio.transaction((api) => {
  api.__experimental_forgetObject(getObjectbyId(element.id));
});
```

Do not delete only the Fabric object, because stale Theatre tracks may remain.

## Export/import rules

When saving or reloading a page, preserve both:

1. Fabric canvas JSON
2. Theatre animation save content

Common pattern:

```js
const modifiedcanvasContent = JSON.stringify(
  canvas.toJSON(["id", "class", "selectable"])
);
const modifiedAnimationContent = JSON.stringify(
  studio.createContentOfSaveFile(sheet.address.projectId)
);
importHtml(modifiedcanvasContent, modifiedAnimationContent);
```

When creating features, keep both content streams in sync.

## Broadcast graphics defaults

Use these defaults unless the user says otherwise:

- Resolution: 1920x1080
- FPS: 25
- Safe area: keep text inside title-safe area
- Lower-third y-position: around 780–900
- Avoid covering subtitles and tickers
- Prefer transparent/alpha-safe output
- Use high contrast and readable fonts
- Avoid excessive blur/heavy effects for playout reliability

## Lower-third creation pattern

For an animated lower third, create these logical layers:

1. Main background bar
2. Accent strip or color block
3. Name text
4. Designation/title text
5. Optional location text
6. Optional logo

Suggested animation at 25 fps:

```text
Frame 0-18:    background slide in
Frame 8-22:    accent/logo appear
Frame 12-28:   name fade/slide in
Frame 18-34:   designation fade/slide in
Frame 35-150:  hold
Frame 150-175: outro
```

Good default motion:

- background bar: left from off-screen to final x
- text: slight x movement + opacity
- logo/accent: fade or scale
- outro: reverse intro or slide out

## CasparCG integration rules

The repo server already provides CasparCG control in `server/main.js` using `casparcg-connection` and AMCP.

Use existing server routes and flows when possible:

- `/endpoint` for raw AMCP command pass-through
- `/html`
- `/updateHtml`
- `/loadHtml`
- `/callScript`
- `/executeScript`
- `/updateData`
- `/stopGraphics`

Typical AMCP examples:

```text
CG 1-20 ADD 1 "template-name" 1 "<json-data>"
CG 1-20 UPDATE 1 "<json-data>"
CG 1-20 STOP 1
PLAY 1-10 "media-name"
STOP 1-10
```

When generating commands, quote JSON safely. Avoid breaking AMCP strings with unescaped quotes.

## Data update rules

For data-driven graphics:

- Prefer stable element ids.
- Text elements should be updateable without recreating the whole canvas.
- Use existing update paths such as data update panel, `/updateData`, `/updateHtml`, and related Socket.IO events.
- Do not hardcode a single name/title unless the user specifically asks for a fixed graphic.

Good dynamic field names:

```text
name
designation
title
location
strap
tickerText
party
seatCount
headline
```

## Animation property guidance

For Fabric/Theatre objects, common animated properties include:

```text
left
top
scaleX
scaleY
angle
opacity
fill
stroke
width
height
```

For path objects, preserve point/path structure and use existing path sync helpers where possible.

The existing `syncProps(mypath, myObj)` handles path point synchronization. Do not bypass it for path editing unless necessary.

## Connected animator behavior

Because this is connected animator software, assume the user may want Codex to operate the project like an assistant operator:

- inspect existing graphics
- create a template
- add animation
- generate preview HTML
- prepare CasparCG commands
- update dynamic text fields
- make it reusable for news/election workflows

Prefer creating reusable components/templates over one-time hardcoded output.

## What not to do

Do not:

- replace WebAnimator with a generic React animation page
- bypass Fabric.js object ids
- create Theatre animations without matching Fabric objects
- delete Fabric objects without cleaning Theatre objects
- break Socket.IO event names without updating both client and server
- hardcode CasparCG paths unless existing repo behavior already does so
- add heavy dependencies if existing GSAP/Theatre/Fabric can do the job
- assume browser-only output if the user asks for CasparCG playout

## Before finishing a change

When possible:

1. Check imports and relative paths.
2. Check the object id relationship.
3. Check Fabric JSON export still includes custom properties.
4. Check Theatre save content still matches object ids.
5. Check 1920x1080 layout and safe area.
6. Check build from `client/` if environment allows:

```bash
cd client
npm run build
```

If build cannot be run, clearly say it was not run.

## Example request handling

User request:

```text
Create animated lower third for Vimlesh Kumar, Senior Engineering Assistant.
```

Preferred Codex behavior:

1. Inspect existing WebAnimator helper functions.
2. Create or modify a reusable lower-third template using Fabric objects.
3. Add Theatre.js animation tracks/keyframes.
4. Keep object ids stable and meaningful.
5. Make text fields data-driven where possible.
6. Generate/update HTML output path if required.
7. Provide CasparCG play/update command examples.

## File naming guidance

For new WebAnimator-related code, use clear names such as:

```text
LowerThirdTheatreTemplate.jsx
createLowerThirdTemplate.js
rccLowerThirdPreset.js
webAnimatorLowerThird.json
```

Keep new files close to the existing Theatre/WebAnimator area unless repo structure suggests otherwise.
