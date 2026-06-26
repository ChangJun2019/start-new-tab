# AGENTS.md

This file gives coding agents project-specific guidance. It is intended to work for Codex, Claude Code, and other agentic coding tools.

## Project Summary

Start New Tab is a minimal Chrome extension that replaces the default new tab page with a clean local wallpaper page.

The product principles are:

- Local-first.
- Private by default.
- Visually quiet.
- No remote services.
- No unnecessary Chrome extension permissions.

## Tech Stack

- Manifest V3 Chrome extension.
- Plain HTML, CSS, and JavaScript.
- IndexedDB for local wallpaper persistence.
- Node.js 24 managed by mise.
- pnpm managed by Corepack.
- ESLint with Antfu config.

Do not introduce React, Vue, Tailwind, UnoCSS, a UI component library, or runtime dependencies unless the user explicitly asks for that change.

## Commands

Install:

```sh
mise install
corepack enable
pnpm install --frozen-lockfile
```

Check:

```sh
pnpm lint
pnpm build
```

Build output:

```text
dist/StartNewTab.zip
```

## Source Map

- `src/manifest.json`: Chrome extension manifest.
- `src/newtab.html`: new tab page markup and SVG icons.
- `src/newtab.css`: visual styling.
- `src/newtab.js`: menu behavior, image validation, IndexedDB persistence, and background rendering.
- `scripts/build.mjs`: extension package build script.
- `docs/project.md`: concise project and implementation documentation.

## Coding Rules

- Keep the new tab page minimal and quiet.
- Keep all wallpaper data local.
- Do not add network requests, analytics, accounts, cloud sync, or remote wallpaper sources.
- Do not add `permissions` or `host_permissions` unless the user explicitly approves the product need.
- Keep comments rare. If a comment is necessary, write it in English and explain why the code exists, not what each line does.
- Use inline SVG for UI icons.
- Keep menu actions honest. Do not show keyboard shortcuts unless they are implemented.

## Git Rules

- Work on a branch whose name does not contain `codex`.
- Commit messages must be in English.
- Commit messages must follow Conventional Commits 1.0.0.
- Prefer small commits grouped by intent.

Examples:

```text
refactor(ui): compact wallpaper menu items
chore(tooling): modernize build workflow
docs: update project documentation
```

## Manual QA

Before handing off UI or storage changes, verify:

- `pnpm lint`
- `pnpm build`
- `dist/StartNewTab.zip` has `manifest.json` at the archive root.
- A local page load has no console warnings or errors.
- The corner menu opens and closes with mouse and Escape.
- The menu only shows implemented actions.
