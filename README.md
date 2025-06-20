# 🤖 Automation MCP

Automation MCP is a Model Context Protocol (MCP) server that provides AI models with **complete desktop automation capabilities** on macOS. It enables AI assistants to:

- 🖱️ **Control your mouse** (click, move, scroll, drag)
- ⌨️ **Type and send keyboard input** (including system shortcuts)
- 📸 **Take screenshots** and analyze screen content
- 🪟 **Manage windows** (focus, move, resize, minimize)
- 🎯 **Interact with UI elements** through coordinates
- 🎨 **Analyze screen colors** and highlight regions
- 🔍 **Wait for images** to appear on screen

## 🚀 Quick start

Make sure you have [furi](https://github.com/ashwwwin/furi) installed, and then run the following command:

```bash
furi add ashwwwin/automation-mcp
```

followed by:

```bash
furi start ashwwwin/automation-mcp
```

and you're done! (or you can just use the furi desktop app for no cli).

## 🥲 Normal start (without furi)

### Prerequisites

- **Bun** runtime - Install with: `curl -fsSL https://bun.sh/install | bash`

### 1. Clone and Install

```bash
git clone https://github.com/ashwwwin/automation-mcp.git
cd automation-mcp
bun install
```

### 2. Start the Server

```bash
# Start with HTTP transport (recommended for web apps)
bun run index.ts

# Or start with stdio transport (for command line tools)
bun run index.ts --stdio
```

### 3. Grant Permissions

On first run, macOS will ask for permissions. **You must grant these** for full functionality:

1. **Accessibility** - Allows keyboard/mouse control
2. **Screen Recording** - Enables screenshots and screen analysis

Or manually enable in: **System Settings** → **Privacy & Security** → **Accessibility/Screen Recording**

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

## 🔒 Security & Permissions

1. **Accessibility** - Required for:

   - Mouse clicks and movement
   - Keyboard input simulation
   - Window management

2. **Screen Recording** - Required for:
   - Taking screenshots
   - Screen analysis
   - Color detection

## 🚀 Integration Examples

### With Claude Desktop + furi

If you've already configured furi with Claude Desktop, you don't need to do anything.

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "furi": {
      "command": "furi",
      "args": ["connect"]
    }
  }
}
```

### With Claude Desktop

Add to your MCP configuration:

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

## 🐛 Troubleshooting

### Common Issues

**Permission Denied Errors**

- Ensure Accessibility and Screen Recording permissions are granted
- Ensure Xcode Command Line Tools: `xcode-select --install`

## 🙋‍♂️ Support

Having issues? Check the troubleshooting section above or open an issue with:

- Your operating system and version
- Error messages
- Steps to reproduce
