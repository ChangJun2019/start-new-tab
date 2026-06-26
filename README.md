<h1 align="center">Start - A Clean New Tab</h1>

<p align="center">A clean, simple new tab browser extension that supports local image backgrounds.</p>
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/dlofaadadkacecikehaefpgdahbgdmen" alt="downloads extension">
    <img src="https://img.shields.io/badge/downloads-00dd83" alt="downloads extension"></img>
  </a>
</p>

## Features

- Replace Chrome's default new tab page with a quiet local page.
- Use a local image as the wallpaper.
- Change or clear the wallpaper from a small corner menu.
- Store wallpaper data locally with IndexedDB.
- Request no Chrome extension permissions.

## Privacy

Start keeps the new tab local and private. It does not use accounts, cloud sync, analytics, remote wallpapers, network requests, `permissions`, or `host_permissions`.

## Development

This project uses [mise](https://mise.jdx.dev/) for Node.js and Corepack for pnpm.

```sh
mise install
corepack enable
pnpm install --frozen-lockfile
```

Run checks:

```sh
pnpm lint
pnpm build
```

## Load Locally

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Choose Load unpacked.
4. Select the `src` directory.

## Build

```sh
pnpm build
```

The build creates `dist/StartNewTab.zip`.

## Release Notes

- Keep `package.json` and `src/manifest.json` versions in sync.
- Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and use English.
- Use small, focused commits when changing tooling, UI, storage, and release behavior.

## License

MIT - Copyright (c) 2023 Chang Jun
