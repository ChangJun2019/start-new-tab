<h1 align="center">Start New Tab</h1>

<p align="center">A clean, private new tab for your local wallpaper.</p>
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/dlofaadadkacecikehaefpgdahbgdmen" alt="downloads extension">
    <img src="https://img.shields.io/badge/downloads-00dd83" alt="downloads extension"></img>
  </a>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/ChangJun2019/start-new-tab/main/preview.png" alt="Start New Tab preview" width="960">
</p>

## Features

- Replace Chrome's default new tab page with a quiet local page.
- Choose a local image as your wallpaper.
- Change or clear the wallpaper from a small corner menu.
- Store wallpaper data locally with IndexedDB.
- Request no Chrome extension permissions.

## Privacy

Start New Tab keeps your new tab local and private. It does not use accounts, cloud sync, analytics, remote wallpapers, network requests, `permissions`, or `host_permissions`.

## Chrome Web Store Copy

Short description:

```text
A clean, private new tab for your local wallpaper.
```

Detailed description:

```text
Start New Tab replaces Chrome's default new tab page with a quiet local wallpaper page.

Choose an image from your computer, keep it stored locally, and use the small corner menu whenever you want to change or clear it. The page stays intentionally minimal so your wallpaper can be the focus.

Privacy is the default: Start New Tab does not use accounts, cloud sync, analytics, remote wallpapers, network requests, or extra Chrome extension permissions.
```

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

GPL-3.0-only - Copyright (c) 2023 Chang Jun
