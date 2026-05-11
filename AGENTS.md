# AGENTS.md

This repository is **ReactCasparClient**, a broadcast graphics and CasparCG control application.

Use these instructions whenever working in this repo with Codex or another coding agent.

## Project layout

- `client/` contains the React/CRACO frontend.
- `server/` contains the Node/Express backend, Socket.IO bridge, CasparCG AMCP control, media/template scanning, NRCS/database routes, and helper APIs.
- `client/src/` contains the main React UI, graphics controls, HTML renderer, drawing/canvas tools, Remotion components, and shared utilities.
- `server/main.js` is the main backend entry point.

## Important runtime facts

- The frontend is a React 18 app started through CRACO.
- The client start script uses HTTPS, `PORT=10000`, `cert.crt`, and `cert.key`.
- The server uses Node/Express, Socket.IO, MySQL, `casparcg-connection`, and CasparCG AMCP.
- CasparCG control normally targets `127.0.0.1:5250`.
- CasparCG media/template paths may come from `getCasparCGPaths()` and are also commonly under `c:/casparcg`.
- Server routes include raw AMCP pass-through through `/endpoint` with `{ string: "..." }`.
- Socket.IO events are used heavily for graphics control and preview/update flows.

## Build and run commands

From `client/`:

```bash
npm install
npm start
npm run build
npm run remotion
```

Do not assume a root-level `package.json`. Check `client/package.json` and server files before changing commands.

## Coding rules

- Prefer small, targeted changes.
- Keep existing JavaScript/JSX style unless refactoring is explicitly requested.
- Avoid converting large files to TypeScript unless requested.
- Do not remove existing CasparCG, Socket.IO, MySQL, or NRCS behavior while adding graphics features.
- Never hardcode private API keys or passwords. Move secrets to `.env` where possible.
- Treat broadcast playout reliability as more important than visual complexity.
- Before changing CasparCG command behavior, check existing `/endpoint`, `cgUpdate`, template, HTML, and Socket.IO flows.

## Broadcast graphics defaults

When creating graphics templates or components:

- Target 1920x1080 unless user asks otherwise.
- Target 25 fps timing for Indian broadcast workflows.
- Keep text inside title-safe area.
- Prefer transparent/alpha-safe HTML overlays for CasparCG use.
- Use readable font sizes and high-contrast text.
- Avoid heavy animations that may stutter on playout systems.
- Prefer deterministic animations using CSS, GSAP, Remotion, Theatre.js, or existing repo patterns.

## Lower-third guidance

For a lower third, normally create:

1. Background bar or shape
2. Name text
3. Designation/title text
4. Optional location/slug
5. Optional logo
6. Intro animation
7. Hold state
8. Outro animation

Suggested timing at 25 fps:

- Intro: 0–18 frames
- Text reveal: 10–28 frames
- Hold: until around 150 frames for a 7-second graphic
- Outro: final 20–25 frames

## CasparCG command guidance

Typical AMCP patterns:

```text
CG 1-20 ADD 1 "template-name" 1 "<json-data>"
CG 1-20 UPDATE 1 "<json-data>"
CG 1-20 STOP 1
PLAY 1-10 "media-name"
STOP 1-10
```

Use the existing server bridge where possible rather than opening new CasparCG socket code in the client.

## When adding a new Codex skill

Put skills under:

```text
skills/<skill-name>/SKILL.md
skills/<skill-name>/references/
skills/<skill-name>/examples/
skills/<skill-name>/scripts/
```

Each skill must have YAML front matter with `name` and `description`.

## Validation before finishing

When possible:

- Run or reason through `npm run build` from `client/`.
- Check imports and relative paths.
- Check that graphics still fit 1920x1080.
- Check that generated CasparCG commands are quoted safely.
- Mention any command that could not be run locally.
