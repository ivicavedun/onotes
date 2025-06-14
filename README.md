# Auto Timestamp Notes Plugin for Obsidian

This plugin automatically creates timestamped notes in a specific folder structure whenever you open Obsidian or create a new note.

## Features

-   Automatically creates and opens a new note when Obsidian starts
-   All notes are stored in `note/YYYY-MM-DD/<unix-timestamp>.md` format
-   Overrides the default "New note" behavior to use the same format
-   Empty notes (no template)

## Installation

### From source

1. Create a new folder called `auto-timestamp-notes` in your vault's `.obsidian/plugins/` directory
2. Copy all the files into this folder:

    - `main.ts`
    - `manifest.json`
    - `package.json`
    - `esbuild.config.mjs`
    - `tsconfig.json`

3. Open a terminal in the plugin folder and run:

    ```bash
    npm install
    npm run build
    ```

4. Reload Obsidian (Ctrl/Cmd + R)
5. Go to Settings → Community plugins
6. Enable "Auto Timestamp Notes"

## Development

To work on the plugin:

```bash
# Install dependencies
npm install

# Run in development mode (watches for changes)
npm run dev

# Build for production
npm run build
```

## Usage

-   The plugin automatically creates a new note when Obsidian starts
-   Use Ctrl/Cmd + N to create a new timestamped note
-   All notes are stored in folders like `note/2024-01-15/1705338942.md`

## Troubleshooting

If the plugin doesn't work:

1. Make sure you've run `npm install` and `npm run build`
2. Check the console for errors (Ctrl/Cmd + Shift + I)
3. Try reloading Obsidian
4. Ensure the plugin is enabled in Settings → Community plugins
