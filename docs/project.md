# Start New Tab

Start New Tab is a minimal Chrome extension that replaces the default new tab page with a clean local wallpaper page.

## Features

- Replaces Chrome's default new tab page.
- Lets the user choose a local image as the wallpaper.
- Stores the wallpaper locally in IndexedDB.
- Provides a small corner menu for changing or clearing the wallpaper.
- Uses no remote services, analytics, accounts, or network requests.
- Requests no Chrome extension permissions.

## UI

The new tab page is intentionally empty. The only visible control is a quiet button in the bottom-right corner.

Opening the button shows a compact menu:

- `Choose image` / `Change image`
- `Clear image`

The first action label changes based on state. Before a wallpaper is set, it says `Choose image`. After a wallpaper exists, it says `Change image`.

## Implementation

The extension is built with plain browser technology:

- `src/manifest.json` defines the Manifest V3 extension and `chrome_url_overrides.newtab`.
- `src/newtab.html` contains the page shell, menu, SVG icons, and file input.
- `src/newtab.css` contains the full UI styling.
- `src/newtab.js` handles IndexedDB storage, image validation, menu behavior, and background rendering.

The runtime code has no framework and no runtime dependencies.

## Storage

Wallpaper data is stored in IndexedDB:

- Database: `start-db`
- Store: `wallpaper`
- Key: `current`

Older data from the previous `bg` store is migrated on database upgrade.

## Image Handling

When a user selects a file, the extension:

1. Checks that the file is an image.
2. Rejects files larger than 20 MB.
3. Verifies that the browser can load the image.
4. Saves the image file in IndexedDB.
5. Uses an object URL as the page background.

Object URLs are revoked when they are replaced or cleared.

## Build

The project uses Node.js 24 through mise and pnpm through Corepack.

```sh
mise install
corepack enable
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

The build creates `dist/StartNewTab.zip`, with `manifest.json` at the archive root.

## Privacy Model

The extension is local-first by design:

- No `permissions`.
- No `host_permissions`.
- No background worker.
- No toolbar popup.
- No network calls.
- No remote scripts or styles.
