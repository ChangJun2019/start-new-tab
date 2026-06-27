<h1 align="center">Start New Tab</h1>

<p align="center">A clean, private new tab for your local wallpaper.</p>
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/dlofaadadkacecikehaefpgdahbgdmen">
    <img src="https://img.shields.io/badge/Chrome_Web_Store-Install-00dd83" alt="Install from Chrome Web Store">
  </a>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/ChangJun2019/start-new-tab/main/preview.png" alt="Start New Tab preview" width="960">
</p>

Start New Tab replaces Chrome's default new tab page with a quiet local wallpaper page. Choose an image from your computer, keep it stored locally, and use the small corner menu whenever you want to change or clear it.

## Features

- Replace Chrome's default new tab page with a minimal local page.
- Choose, change, or clear a local wallpaper image.
- Store wallpaper data locally with IndexedDB.
- Keep the interface visually quiet so the wallpaper stays in focus.
- Request no Chrome extension permissions.

## Privacy

Start New Tab is local-first by design. It does not use accounts, cloud sync, analytics, remote wallpapers, network requests, `permissions`, or `host_permissions`.

## Install

Install Start New Tab from the [Chrome Web Store](https://chrome.google.com/webstore/detail/dlofaadadkacecikehaefpgdahbgdmen).

To load the extension locally:

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Choose Load unpacked.
4. Select the `src` directory.

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

## Build

```sh
pnpm build
```

The build creates `dist/StartNewTab.zip` with `manifest.json` at the archive root.

## License

GPL-3.0-only - Copyright (c) 2023 Chang Jun
