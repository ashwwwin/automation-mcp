# nut.js Local Build

This directory contains a local build of nut.js from source, including the native libnut-core dependency.

## What's Included

- **libnut-core/**: Native C++ module built from source for macOS
- **nut.js/**: Complete nut.js TypeScript codebase compiled from source
- **index.ts**: Example usage demonstrating basic functionality

## Build Process

This installation was built from source using the following steps:

1. **Clone repositories**:

   ```bash
   gh repo clone nut-tree/nut.js
   gh repo clone nut-tree/libnut-core
   ```

2. **Build libnut-core** (native module):

   ```bash
   cd libnut-core
   bun install
   MACOSX_DEPLOYMENT_TARGET=11.0 bun run build:release
   ```

3. **Configure nut.js** to use local libnut-core:

   - Modified `nut.js/providers/libnut/import_libnut.ts` to point to local build
   - Removed private registry dependencies
   - Added TypeScript configuration to skip lib checks

4. **Build nut.js**:
   ```bash
   cd nut.js
   bun install
   bun run compile
   ```

## Usage

### Basic Example

```typescript
import { screen, mouse, keyboard } from "./nut.js/core/nut.js/dist/index.js";

async function example() {
  // Get screen dimensions
  const width = await screen.width();
  const height = await screen.height();
  console.log(`Screen: ${width}x${height}`);

  // Get mouse position
  const pos = await mouse.getPosition();
  console.log("Mouse position:", pos);

  // Move mouse to center
  await mouse.setPosition({
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  });
}
```

### Run the Test

```bash
npm start
# or
node index.ts
```

## macOS Permissions

On macOS, you may need to grant accessibility and screen recording permissions:

1. Go to **System Preferences** → **Security & Privacy** → **Privacy**
2. Add your terminal application to:
   - **Accessibility**
   - **Screen Recording**

## Features Available

- ✅ Screen capture and manipulation
- ✅ Mouse control (position, clicks, scrolling)
- ✅ Keyboard automation (key presses, typing)
- ✅ Window management
- ✅ Image recognition and processing
- ✅ Cross-platform support (built for macOS, supports Linux/Windows)

## Notes

- Built with macOS 15 compatibility fixes
- Uses local libnut-core build instead of private registry packages
- TypeScript compilation configured to skip external library checks

## Scripts

- `npm run build:libnut` - Rebuild the native libnut-core module
- `npm run build:nutjs` - Recompile the nut.js TypeScript code
- `npm run build` - Build both components
- `npm start` - Run the example test

## Troubleshooting

If you encounter build issues:

1. Ensure Xcode Command Line Tools are installed: `xcode-select --install`
2. For macOS 15+ compatibility, the build uses `MACOSX_DEPLOYMENT_TARGET=11.0`
3. Make sure bun is installed: `curl -fsSL https://bun.sh/install | bash`

## License

Apache-2.0 (same as original nut.js project)
