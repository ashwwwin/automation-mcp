# 🚀 Automation MCP

By [@ashwwwin](https://github.com/ashwwwin)
Check out my free mcp manager, [furi](https://github.com/ashwwwin/furi) for a better experience.

**The most comprehensive macOS automation server for AI models** - Give your AI assistant complete control over your Mac with detailed mouse, keyboard, screen, and window management capabilities.

![Automation MCP Demo](https://img.shields.io/badge/macOS-Compatible-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![MCP](https://img.shields.io/badge/MCP-Protocol-green)

## ✨ What is Automation MCP?

Automation MCP is a Model Context Protocol (MCP) server that provides AI models with **complete desktop automation capabilities** on macOS. It enables AI assistants to:

- 🖱️ **Control your mouse** (click, move, scroll, drag)
- ⌨️ **Type and send keyboard input** (including system shortcuts)
- 📸 **Take screenshots** and analyze screen content
- 🪟 **Manage windows** (focus, move, resize, minimize)
- 🎯 **Interact with UI elements** through coordinates
- 🎨 **Analyze screen colors** and highlight regions
- 🔍 **Wait for images** to appear on screen

## 🚀 Quick Start (under 30 seconds!)

Make sure you have furi installed, and then run the following command:

```bash
furi run automation-mcp
```

followed by

```bash
furi start automation-mcp
```

and you're done! (or you can just the use desktop app for no cli).

### Prerequisites

- **macOS** (Tested on macOS 15+)
- **Bun** runtime - Install with: `curl -fsSL https://bun.sh/install | bash`

### 1. Clone and Install

```bash
git clone https://github.com/ashwwwin/automation-mcp.git
cd automation-mcp
bun install
```

### 2. Grant Permissions

On first run, macOS will ask for permissions. **You must grant these** for full functionality:

1. **Accessibility** - Allows keyboard/mouse control
2. **Screen Recording** - Enables screenshots and screen analysis

Or manually enable in: **System Settings** → **Privacy & Security** → **Accessibility/Screen Recording**

### 3. Start the Server

```bash
# Start with HTTP transport (recommended for web apps)
bun run index.ts

# Or start with stdio transport (for command line tools)
bun run index.ts --stdio
```

### 4. Connect Your AI Tool

The server runs on `http://localhost:3010/stream` and provides 20+ automation tools ready to use with any MCP-compatible AI client.

## 🛠️ Available Tools

### 🖱️ Mouse Control

- `mouseClick` - Click at coordinates with left/right/middle button
- `mouseDoubleClick` - Double-click at coordinates
- `mouseMove` - Move cursor to position
- `mouseGetPosition` - Get current cursor location
- `mouseScroll` - Scroll in any direction
- `mouseDrag` - Drag from current position to target
- `mouseButtonControl` - Press/release mouse buttons
- `mouseMovePath` - Follow a smooth path with multiple points

### ⌨️ Keyboard Input

- `type` - Type text or press key combinations
- `keyControl` - Advanced key press/release control
- `systemCommand` - Common shortcuts (copy, paste, undo, save, etc.)

### 📸 Screen Capture & Analysis

- `screenshot` - Capture full screen, regions, or specific windows
- `screenInfo` - Get screen dimensions
- `screenHighlight` - Highlight screen regions visually
- `colorAt` - Get color of any pixel
- `waitForImage` - Wait for images to appear (template matching)

### 🪟 Window Management

- `getWindows` - List all open windows
- `getActiveWindow` - Get current active window
- `windowControl` - Focus, move, resize, minimize windows

## 🔧 Architecture

### Core Components

- **FastMCP Server** - Handles MCP protocol communication
- **nut.js Integration** - Cross-platform desktop automation (custom built from source)
- **macOS Permissions** - Native permission handling
- **Screen Utilities** - Screenshot and analysis tools
- **Fallback Systems** - Works even with limited dependencies

### Custom nut.js Build

This project includes a **custom-built nut.js** from source with:

- ✅ macOS 15+ compatibility fixes
- ✅ Local libnut-core native module
- ✅ No private registry dependencies
- ✅ Full TypeScript support

Located in `./nutjs/` - see [nutjs/README.md](nutjs/README.md) for build details.

## 🔒 Security & Permissions

### Required macOS Permissions

1. **Accessibility** - Required for:

   - Mouse clicks and movement
   - Keyboard input simulation
   - Window management

2. **Screen Recording** - Required for:
   - Taking screenshots
   - Screen analysis
   - Color detection

### Permission Handling

The server automatically:

- Detects missing permissions
- Requests permission grants
- Provides fallback functionality when possible
- Shows clear permission instructions

### Security Notes

- Runs locally only (no network access)
- Requires explicit permission grants
- Can be limited to specific applications
- All actions are logged

## 🚀 Integration Examples

### With Claude Desktop

1. Install Claude Desktop
2. Add to your MCP configuration:

```json
{
  "mcpServers": {
    "automation": {
      "command": "bun",
      "args": ["run", "/path/to/automation-mcp/index.ts", "--stdio"]
    }
  }
}
```

### With Custom Applications

```typescript
import { MCPClient } from "your-mcp-client";

const client = new MCPClient("http://localhost:3010/stream");

// Take screenshot and analyze
const screenshot = await client.call("screenshot", { mode: "full" });
// AI can now see your screen!
```

## 🐛 Troubleshooting

### Common Issues

**Permission Denied Errors**

- Ensure Accessibility permissions are granted
- Check Screen Recording permissions
- Restart the application after granting permissions

**nutjs Not Loading**

- Ensure Xcode Command Line Tools: `xcode-select --install`
- Try rebuilding: `cd nutjs && npm run build`
- Basic functionality still works via system commands

**Screenshot Failures**

- Verify Screen Recording permission
- Try the fallback: Uses macOS `screencapture` command

**Port Already in Use**

- Change port in index.ts or kill existing process
- Default port is 3010

## 📦 Dependencies

### Main Dependencies

- `fastmcp` - MCP protocol server
- `zod` - Schema validation
- `jimp` - Image processing
- `node-mac-permissions` - macOS permission handling
- `get-windows` - Window enumeration

### Native Dependencies

- nut.js build (included)
- libnut-core native module (included)

## 📄 License

MIT License - Use freely in your projects!

## 🤝 Contributing

Contributions welcome! Areas of interest:

- Additional automation tools
- Cross-platform support (Windows/Linux)
- Performance optimizations
- Integration examples

## 🙋‍♂️ Support

Having issues? Check the troubleshooting section above or open an issue with:

- Your macOS version
- Error messages
- Steps to reproduce

---

**Happy Automating! 🎉** Give your AI the power to control your Mac like never before.
