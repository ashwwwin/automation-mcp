import { FastMCP, imageContent } from "fastmcp";
import { z } from "zod";
import * as child_process from "child_process";
import * as os from "os";
import * as path from "path";
import { screenInfo } from "./screenInfo";

// Import nutjs with error handling
let mouse: any,
  keyboard: any,
  Button: any,
  Key: any,
  Point: any,
  Region: any,
  Size: any,
  screen: any;
let getWindows: any, getActiveWindow: any;
let nutjsAvailable = false;

try {
  const nutjs = require("./nutjs/nut.js/core/nut.js/dist/index.js");
  ({
    mouse,
    keyboard,
    Button,
    Key,
    Point,
    Region,
    Size,
    screen,
    getWindows,
    getActiveWindow,
  } = nutjs);
  nutjsAvailable = true;
  console.log("✅ nutjs loaded successfully");
} catch (error: any) {
  console.warn("⚠️ nutjs not fully available:", error.message);
  console.log(
    "📋 Basic screenshot functionality will still work via macOS screencapture"
  );
}

// macOS permissions handling
let macPermissions: any;
let permissionsAvailable = false;

try {
  macPermissions = require("node-mac-permissions");
  permissionsAvailable = true;

  if (macPermissions.getAuthStatus("accessibility") !== "authorized") {
    macPermissions.askForAccessibilityAccess();
    console.log(
      '⚠️ Please enable Accessibility ("Control your Mac") for this app in System Settings > Privacy & Security > Accessibility.'
    );
  }
  if (macPermissions.getAuthStatus("screen") !== "authorized") {
    macPermissions.askForScreenCaptureAccess();
    console.log(
      "⚠️ Please enable Screen Recording for this app in System Settings > Privacy & Security > Screen Recording."
    );
  }
} catch (error: any) {
  console.warn("⚠️ macOS permissions module not available:", error.message);
}

// Suppress FastMCP console output
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.log = (...args: any[]) => {
  // Only allow our custom logs (those that start with emoji)
  if (args[0] && typeof args[0] === "string" && /^[🚀📋🔐⚠️✅]/.test(args[0])) {
    originalConsoleLog(...args);
  }
};
console.error = () => {}; // Suppress all error logs from FastMCP
console.warn = () => {}; // Suppress all warning logs from FastMCP

const server = new FastMCP({
  name: "Local Automation MCP",
  version: "1.0.0",
});

// Helper function to check nutjs availability
const requireNutjs = () => {
  if (!nutjsAvailable) {
    throw new Error(
      "nutjs functionality not available. Please ensure all dependencies are properly installed."
    );
  }
};

// ============== MOUSE TOOLS ==============

// Tool 1: Mouse Click Simulation
server.addTool({
  name: "mouseClick",
  description: "Simulate a mouse click at the given screen coordinates.",
  parameters: z.object({
    x: z.number().describe("Horizontal screen coordinate (pixels)"),
    y: z.number().describe("Vertical screen coordinate (pixels)"),
    button: z
      .enum(["left", "right", "middle"])
      .default("left")
      .describe("Mouse button to click (default left)"),
  }),
  execute: async ({ x, y, button }) => {
    requireNutjs();
    // Move mouse to (x,y) and perform the click
    await mouse.setPosition(new Point(x, y));
    const btn =
      button === "left"
        ? Button.LEFT
        : button === "right"
        ? Button.RIGHT
        : Button.MIDDLE;
    await mouse.click(btn);
    return `Mouse ${button}-click at (${x}, ${y}) completed.`;
  },
});

// Tool 2: Mouse Double Click
server.addTool({
  name: "mouseDoubleClick",
  description: "Simulate a mouse double-click at the given screen coordinates.",
  parameters: z.object({
    x: z.number().describe("Horizontal screen coordinate (pixels)"),
    y: z.number().describe("Vertical screen coordinate (pixels)"),
    button: z
      .enum(["left", "right", "middle"])
      .default("left")
      .describe("Mouse button to double-click (default left)"),
  }),
  execute: async ({ x, y, button }) => {
    requireNutjs();
    await mouse.setPosition(new Point(x, y));
    const btn =
      button === "left"
        ? Button.LEFT
        : button === "right"
        ? Button.RIGHT
        : Button.MIDDLE;
    await mouse.doubleClick(btn);
    return `Mouse double-${button}-click at (${x}, ${y}) completed.`;
  },
});

// Tool 3: Mouse Move
server.addTool({
  name: "mouseMove",
  description: "Move the mouse to specific coordinates.",
  parameters: z.object({
    x: z.number().describe("Horizontal screen coordinate (pixels)"),
    y: z.number().describe("Vertical screen coordinate (pixels)"),
  }),
  execute: async ({ x, y }) => {
    requireNutjs();
    await mouse.setPosition(new Point(x, y));
    return `Mouse moved to (${x}, ${y}).`;
  },
});

// Tool 4: Mouse Get Position
server.addTool({
  name: "mouseGetPosition",
  description: "Get the current mouse cursor position.",
  parameters: z.object({}),
  execute: async () => {
    requireNutjs();
    const position = await mouse.getPosition();
    return `Current mouse position: (${position.x}, ${position.y})`;
  },
});

// Tool 5: Mouse Scroll
server.addTool({
  name: "mouseScroll",
  description: "Scroll the mouse wheel in a specified direction.",
  parameters: z.object({
    direction: z
      .enum(["up", "down", "left", "right"])
      .describe("Direction to scroll"),
    amount: z
      .number()
      .default(3)
      .describe("Number of scroll steps (default 3)"),
  }),
  execute: async ({ direction, amount }) => {
    requireNutjs();
    switch (direction) {
      case "up":
        await mouse.scrollUp(amount);
        break;
      case "down":
        await mouse.scrollDown(amount);
        break;
      case "left":
        await mouse.scrollLeft(amount);
        break;
      case "right":
        await mouse.scrollRight(amount);
        break;
    }
    return `Scrolled ${direction} ${amount} steps.`;
  },
});

// Tool 6: Mouse Drag
server.addTool({
  name: "mouseDrag",
  description: "Drag the mouse from current position to target coordinates.",
  parameters: z.object({
    x: z.number().describe("Target horizontal coordinate (pixels)"),
    y: z.number().describe("Target vertical coordinate (pixels)"),
  }),
  execute: async ({ x, y }) => {
    requireNutjs();
    const currentPos = await mouse.getPosition();
    await mouse.drag([new Point(x, y)]);
    return `Dragged mouse from (${currentPos.x}, ${currentPos.y}) to (${x}, ${y}).`;
  },
});

// Tool 7: Mouse Press/Release Button
server.addTool({
  name: "mouseButtonControl",
  description: "Press or release a mouse button without clicking.",
  parameters: z.object({
    action: z.enum(["press", "release"]).describe("Action to perform"),
    button: z
      .enum(["left", "right", "middle"])
      .default("left")
      .describe("Mouse button to control (default left)"),
  }),
  execute: async ({ action, button }) => {
    requireNutjs();
    const btn =
      button === "left"
        ? Button.LEFT
        : button === "right"
        ? Button.RIGHT
        : Button.MIDDLE;

    if (action === "press") {
      await mouse.pressButton(btn);
      return `${button} mouse button pressed.`;
    } else {
      await mouse.releaseButton(btn);
      return `${button} mouse button released.`;
    }
  },
});

// ============== KEYBOARD TOOLS ==============

// Tool 8: Enhanced Keyboard Typing
server.addTool({
  name: "type",
  description:
    "Simulate typing text or pressing key combinations. Provide either 'text' to type literal text, or 'keys' as comma-separated key names for key combinations.",
  parameters: z.object({
    text: z.string().optional().describe("Literal text to type (optional)"),
    keys: z
      .string()
      .optional()
      .describe(
        "Comma-separated key names to press simultaneously (optional, e.g. 'LeftControl,C')"
      ),
  }),
  execute: async ({ text, keys }) => {
    requireNutjs();
    if (keys && keys.length > 0) {
      // Parse comma-separated key names
      const keyNames = keys.split(",").map((k) => k.trim());
      // Map each key name to nut.js Key constant
      const keyConsts: any[] = keyNames.map((name) => {
        const keyConst = (Key as any)[name];
        if (!keyConst) throw new Error(`Unknown key: ${name}`);
        return keyConst;
      });
      // Press and release the key combination
      await keyboard.pressKey(...keyConsts);
      await keyboard.releaseKey(...keyConsts);
      return `Pressed key combination [${keyNames.join(" + ")}].`;
    }
    if (text !== undefined) {
      await keyboard.type(text);
      return `Typed text: "${text}"`;
    }
    throw new Error(
      "Provide either 'text' to type or 'keys' for key combination."
    );
  },
});

// Tool 9: Key Press/Release Control
server.addTool({
  name: "keyControl",
  description: "Press or release specific keys for advanced key combinations.",
  parameters: z.object({
    action: z.enum(["press", "release"]).describe("Action to perform"),
    keys: z
      .string()
      .describe(
        "Comma-separated key names to control (e.g. 'LeftControl,LeftShift')"
      ),
  }),
  execute: async ({ action, keys }) => {
    requireNutjs();
    const keyNames = keys.split(",").map((k) => k.trim());
    const keyConsts: any[] = keyNames.map((name) => {
      const keyConst = (Key as any)[name];
      if (!keyConst) throw new Error(`Unknown key: ${name}`);
      return keyConst;
    });

    if (action === "press") {
      await keyboard.pressKey(...keyConsts);
      return `Pressed keys: [${keyNames.join(", ")}]`;
    } else {
      await keyboard.releaseKey(...keyConsts);
      return `Released keys: [${keyNames.join(", ")}]`;
    }
  },
});

// ============== SCREEN TOOLS ==============

// Tool 10: Enhanced Screenshot Capture
server.addTool({
  name: "screenshot",
  description:
    "Capture a screenshot (full screen, region, or window). This will also provide information about the user's screen. Note: Due to technical limitations, actual image data is not returned, but screenshot capture is confirmed.",
  parameters: z.object({
    mode: z
      .enum(["full", "region", "window"])
      .default("full")
      .describe("Capture mode: full (entire screen), region, or window"),
    regionX: z
      .number()
      .optional()
      .describe("Region X coordinate (for region mode)"),
    regionY: z
      .number()
      .optional()
      .describe("Region Y coordinate (for region mode)"),
    regionWidth: z
      .number()
      .optional()
      .describe("Region width (for region mode)"),
    regionHeight: z
      .number()
      .optional()
      .describe("Region height (for region mode)"),
    windowName: z.string().optional().describe("Window title (if mode=window)"),
    windowId: z.number().optional().describe("Window ID (if mode=window)"),
  }),
  execute: async ({
    mode,
    regionX,
    regionY,
    regionWidth,
    regionHeight,
    windowName,
    windowId,
  }) => {
    try {
      const filePath = path.join(
        os.tmpdir(),
        `mcp_screenshot_${Date.now()}.png`
      );

      // Perform the OS-level screencapture
      if (mode === "full") {
        child_process.execSync(`screencapture -x -D1 "${filePath}"`);
      } else if (mode === "region") {
        if (
          regionX === undefined ||
          regionY === undefined ||
          regionWidth === undefined ||
          regionHeight === undefined
        ) {
          throw new Error(
            "Region mode requires regionX, regionY, regionWidth, and regionHeight parameters"
          );
        }
        child_process.execSync(
          `screencapture -x -R${regionX},${regionY},${regionWidth},${regionHeight} "${filePath}"`
        );
      } else if (mode === "window") {
        let targetId = windowId;
        if (!targetId && windowName) {
          const { openWindows } = require("get-windows");
          const allWindows = await openWindows();
          const targetWin = allWindows.find(
            (w: any) => w.title && w.title.includes(windowName)
          );
          if (!targetWin)
            throw new Error(
              `Window containing title "${windowName}" not found`
            );
          targetId = targetWin.id;
        }
        if (!targetId)
          throw new Error(
            "Could not determine target window ID for screenshot."
          );
        child_process.execSync(`screencapture -x -l${targetId} "${filePath}"`);
      }

      if (!require("fs").existsSync(filePath)) {
        throw new Error(`Screenshot file was not created at ${filePath}`);
      }

      // Test imageContent to ensure it works, but don't return raw data
      let imageProcessingResult: string;
      try {
        const imageDataResult = await imageContent({ path: filePath });
        JSON.stringify(imageDataResult); // Verify it can be stringified
        imageProcessingResult = `Screenshot successfully captured and processed. File saved to: ${filePath}`;
      } catch (imageError: any) {
        imageProcessingResult = `Screenshot captured to ${filePath}, but image processing failed: ${String(
          imageError.message || imageError
        ).substring(0, 100)}`;
      }

      // Get screen info (this works fine)
      let screenInfoResult: string;
      try {
        screenInfoResult = await screenInfo(nutjsAvailable);
      } catch (error: any) {
        screenInfoResult = `Screen info unavailable: ${String(
          error.message || error
        ).substring(0, 100)}`;
      }

      return {
        content: [
          { type: "text", text: imageProcessingResult },
          { type: "text", text: screenInfoResult },
        ],
      };
    } catch (error: any) {
      if (error instanceof RangeError) {
        throw new Error("Screenshot failed: Stack overflow detected");
      }
      let errorMessage = "Unknown error";
      try {
        errorMessage =
          error && error.message ? String(error.message) : String(error);
      } catch (e) {
        errorMessage = "Error object could not be processed";
      }
      throw new Error(`Screenshot failed: ${errorMessage.substring(0, 300)}`);
    }
  },
});

// Tool 11: Screen Information
server.addTool({
  name: "screenInfo",
  description: "Get screen dimensions and information.",
  parameters: z.object({}),
  execute: async () => {
    return await screenInfo(nutjsAvailable);
  },
});

// Tool 12: Screen Highlight
server.addTool({
  name: "screenHighlight",
  description: "Highlight a region on the screen for visual feedback.",
  parameters: z.object({
    x: z.number().describe("Left coordinate of region"),
    y: z.number().describe("Top coordinate of region"),
    width: z.number().describe("Width of region"),
    height: z.number().describe("Height of region"),
  }),
  execute: async ({ x, y, width, height }) => {
    requireNutjs();
    const region = new Region(x, y, width, height);
    await screen.highlight(region);
    return `Highlighted region at (${x}, ${y}) with size ${width}x${height}`;
  },
});

// Tool 13: Color at Point
server.addTool({
  name: "colorAt",
  description: "Get the color of a pixel at specific screen coordinates.",
  parameters: z.object({
    x: z.number().describe("X coordinate"),
    y: z.number().describe("Y coordinate"),
  }),
  execute: async ({ x, y }) => {
    requireNutjs();
    const color = await screen.colorAt(new Point(x, y));
    return `Color at (${x}, ${y}): R=${color.R}, G=${color.G}, B=${color.B}, A=${color.A}`;
  },
});

// ============== WINDOW MANAGEMENT TOOLS ==============

// Tool 14: Get All Windows
server.addTool({
  name: "getWindows",
  description: "Get information about all open windows.",
  parameters: z.object({}),
  execute: async () => {
    if (nutjsAvailable) {
      try {
        const windows = await getWindows();
        const windowInfo = await Promise.all(
          windows.map(async (win: any, index: number) => {
            const title = await win.getTitle();
            const region = await win.getRegion();
            return `${index + 1}. "${title}" - Position: (${region.left}, ${
              region.top
            }), Size: ${region.width}x${region.height}`;
          })
        );
        return `Open windows:\n${windowInfo.join("\n")}`;
      } catch (e) {
        console.warn("nutjs getWindows failed, trying fallback");
      }
    }

    // Fallback to get-windows
    try {
      const { openWindows } = require("get-windows");
      const allWindows = await openWindows();
      const windowInfo = allWindows.map((win: any, index: number) => {
        return `${index + 1}. "${win.title}" - ID: ${win.id}`;
      });
      return `Open windows:\n${windowInfo.join("\n")}`;
    } catch (e) {
      throw new Error(`Failed to get windows: ${e}`);
    }
  },
});

// Tool 15: Get Active Window
server.addTool({
  name: "getActiveWindow",
  description: "Get information about the currently active window.",
  parameters: z.object({}),
  execute: async () => {
    if (nutjsAvailable) {
      try {
        const activeWindow = await getActiveWindow();
        const title = await activeWindow.getTitle();
        const region = await activeWindow.getRegion();
        return `Active window: "${title}" - Position: (${region.left}, ${region.top}), Size: ${region.width}x${region.height}`;
      } catch (e) {
        console.warn("nutjs getActiveWindow failed, trying fallback");
      }
    }

    // Fallback method
    try {
      const { openWindows } = require("get-windows");
      const allWindows = await openWindows();
      const activeWindow = allWindows.find((w: any) => w.active);
      if (activeWindow) {
        return `Active window: "${activeWindow.title}" - ID: ${activeWindow.id}`;
      }
    } catch (e) {
      // Another fallback using AppleScript
      try {
        const output = child_process
          .execSync(
            `osascript -e 'tell application "System Events" to get name of first application process whose frontmost is true'`
          )
          .toString()
          .trim();
        return `Active window: "${output}"`;
      } catch (e2) {
        throw new Error(`Failed to get active window: ${e2}`);
      }
    }

    return "Could not determine active window";
  },
});

// Tool 16: Window Control
server.addTool({
  name: "windowControl",
  description: "Control a window (focus, move, resize, minimize, restore).",
  parameters: z.object({
    action: z
      .enum(["focus", "move", "resize", "minimize", "restore"])
      .describe("Action to perform"),
    windowTitle: z
      .string()
      .optional()
      .describe("Window title to target (uses active window if not provided)"),
    x: z.number().optional().describe("X coordinate for move action"),
    y: z.number().optional().describe("Y coordinate for move action"),
    width: z.number().optional().describe("Width for resize action"),
    height: z.number().optional().describe("Height for resize action"),
  }),
  execute: async ({ action, windowTitle, x, y, width, height }) => {
    if (!nutjsAvailable) {
      // Limited functionality without nutjs
      if (action === "focus" && windowTitle) {
        try {
          child_process.execSync(
            `osascript -e 'tell application "${windowTitle}" to activate'`
          );
          return `Attempted to focus application: "${windowTitle}"`;
        } catch (e) {
          throw new Error(`Failed to focus application: ${e}`);
        }
      } else {
        throw new Error("Window control requires nutjs to be fully loaded");
      }
    }

    let targetWindow: any;

    if (windowTitle) {
      const windows = await getWindows();
      targetWindow = await Promise.all(
        windows.map(async (win: any) => ({
          window: win,
          title: await win.getTitle(),
        }))
      ).then(
        (windowsWithTitles) =>
          windowsWithTitles.find((w) => w.title.includes(windowTitle))?.window
      );

      if (!targetWindow) {
        throw new Error(
          `Window with title containing "${windowTitle}" not found`
        );
      }
    } else {
      targetWindow = await getActiveWindow();
    }

    const windowName = await targetWindow.getTitle();

    switch (action) {
      case "focus":
        await targetWindow.focus();
        return `Focused window: "${windowName}"`;

      case "move":
        if (x === undefined || y === undefined) {
          throw new Error("Move action requires x and y coordinates");
        }
        await targetWindow.move(new Point(x, y));
        return `Moved window "${windowName}" to (${x}, ${y})`;

      case "resize":
        if (width === undefined || height === undefined) {
          throw new Error("Resize action requires width and height");
        }
        await targetWindow.resize(new Size(width, height));
        return `Resized window "${windowName}" to ${width}x${height}`;

      case "minimize":
        await targetWindow.minimize();
        return `Minimized window: "${windowName}"`;

      case "restore":
        await targetWindow.restore();
        return `Restored window: "${windowName}"`;

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  },
});

// ============== ADVANCED AUTOMATION TOOLS ==============

// Tool 17: Wait and Find on Screen
server.addTool({
  name: "waitForImage",
  description: "Wait for an image to appear on screen and return its location.",
  parameters: z.object({
    imagePath: z.string().describe("Path to the template image file"),
    timeoutMs: z.number().default(5000).describe("Timeout in milliseconds"),
    confidence: z
      .number()
      .min(0)
      .max(1)
      .default(0.8)
      .describe("Match confidence (0-1)"),
  }),
  execute: async ({ imagePath, timeoutMs, confidence }) => {
    return `Image matching functionality requires additional setup. Would wait for image "${imagePath}" with confidence ${confidence} for ${timeoutMs}ms.`;
  },
});

// Tool 18: Sleep/Delay
server.addTool({
  name: "sleep",
  description: "Pause execution for a specified amount of time.",
  parameters: z.object({
    ms: z.number().describe("Time to sleep in milliseconds"),
  }),
  execute: async ({ ms }) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return `Slept for ${ms} milliseconds`;
  },
});

// Tool 19: Complex Mouse Path Movement
server.addTool({
  name: "mouseMovePath",
  description: "Move mouse along a path of coordinates with smooth animation.",
  parameters: z.object({
    path: z
      .array(z.number())
      .describe(
        "Array of coordinates to move through (alternating x,y values: [x1,y1,x2,y2,...])"
      ),
  }),
  execute: async ({ path }) => {
    requireNutjs();

    // Validate that we have an even number of coordinates
    if (path.length % 2 !== 0) {
      throw new Error(
        "Path array must contain an even number of values (alternating x,y coordinates)"
      );
    }

    // Convert flat array to Point objects
    const points: any[] = [];
    for (let i = 0; i < path.length; i += 2) {
      points.push(new Point(path[i], path[i + 1]));
    }

    await mouse.move(points);
    return `Mouse moved along path with ${points.length} points`;
  },
});

// Tool 20: System Key Combinations
server.addTool({
  name: "systemCommand",
  description:
    "Execute common system key combinations (copy, paste, undo, etc.).",
  parameters: z.object({
    command: z
      .enum([
        "copy",
        "paste",
        "cut",
        "undo",
        "redo",
        "selectAll",
        "save",
        "quit",
        "minimize",
        "switchApp",
        "newTab",
        "closeTab",
      ])
      .describe("System command to execute"),
  }),
  execute: async ({ command }) => {
    if (nutjsAvailable) {
      const isMac = process.platform === "darwin";
      const cmdKey = isMac ? Key.LeftSuper : Key.LeftControl;

      switch (command) {
        case "copy":
          await keyboard.pressKey(cmdKey, Key.C);
          await keyboard.releaseKey(cmdKey, Key.C);
          return "Executed copy command";

        case "paste":
          await keyboard.pressKey(cmdKey, Key.V);
          await keyboard.releaseKey(cmdKey, Key.V);
          return "Executed paste command";

        case "cut":
          await keyboard.pressKey(cmdKey, Key.X);
          await keyboard.releaseKey(cmdKey, Key.X);
          return "Executed cut command";

        case "undo":
          await keyboard.pressKey(cmdKey, Key.Z);
          await keyboard.releaseKey(cmdKey, Key.Z);
          return "Executed undo command";

        case "redo":
          if (isMac) {
            await keyboard.pressKey(cmdKey, Key.LeftShift, Key.Z);
            await keyboard.releaseKey(cmdKey, Key.LeftShift, Key.Z);
          } else {
            await keyboard.pressKey(cmdKey, Key.Y);
            await keyboard.releaseKey(cmdKey, Key.Y);
          }
          return "Executed redo command";

        case "selectAll":
          await keyboard.pressKey(cmdKey, Key.A);
          await keyboard.releaseKey(cmdKey, Key.A);
          return "Executed select all command";

        case "save":
          await keyboard.pressKey(cmdKey, Key.S);
          await keyboard.releaseKey(cmdKey, Key.S);
          return "Executed save command";

        case "quit":
          if (isMac) {
            await keyboard.pressKey(cmdKey, Key.Q);
            await keyboard.releaseKey(cmdKey, Key.Q);
          } else {
            await keyboard.pressKey(Key.LeftAlt, Key.F4);
            await keyboard.releaseKey(Key.LeftAlt, Key.F4);
          }
          return "Executed quit command";

        case "minimize":
          if (isMac) {
            await keyboard.pressKey(cmdKey, Key.M);
            await keyboard.releaseKey(cmdKey, Key.M);
          } else {
            await keyboard.pressKey(Key.LeftSuper, Key.Down);
            await keyboard.releaseKey(Key.LeftSuper, Key.Down);
          }
          return "Executed minimize command";

        case "switchApp":
          if (isMac) {
            await keyboard.pressKey(cmdKey, Key.Tab);
            await keyboard.releaseKey(cmdKey, Key.Tab);
          } else {
            await keyboard.pressKey(Key.LeftAlt, Key.Tab);
            await keyboard.releaseKey(Key.LeftAlt, Key.Tab);
          }
          return "Executed switch app command";

        case "newTab":
          await keyboard.pressKey(cmdKey, Key.T);
          await keyboard.releaseKey(cmdKey, Key.T);
          return "Executed new tab command";

        case "closeTab":
          await keyboard.pressKey(cmdKey, Key.W);
          await keyboard.releaseKey(cmdKey, Key.W);
          return "Executed close tab command";

        default:
          throw new Error(`Unknown command: ${command}`);
      }
    } else {
      // Fallback using AppleScript for macOS
      const commandMap: { [key: string]: string } = {
        copy: 'keystroke "c" using command down',
        paste: 'keystroke "v" using command down',
        cut: 'keystroke "x" using command down',
        undo: 'keystroke "z" using command down',
        redo: 'keystroke "z" using {command down, shift down}',
        selectAll: 'keystroke "a" using command down',
        save: 'keystroke "s" using command down',
        quit: 'keystroke "q" using command down',
        minimize: 'keystroke "m" using command down',
        switchApp: "keystroke tab using command down",
        newTab: 'keystroke "t" using command down',
        closeTab: 'keystroke "w" using command down',
      };

      const script = commandMap[command];
      if (script) {
        child_process.execSync(
          `osascript -e 'tell application "System Events" to ${script}'`
        );
        return `Executed ${command} command using AppleScript`;
      } else {
        throw new Error(`Unknown command: ${command}`);
      }
    }
  },
});

// Parse command line arguments
const args = process.argv.slice(2);
const useStdio = args.includes("--stdio");
const useHttp = args.includes("--sse") || !useStdio; // Default to HTTP/SSE if no flag specified

// Start the MCP server with the specified transport
if (useStdio) {
  server.start({
    transportType: "stdio",
  });
  console.log(`🚀 MCP Server started with stdio transport`);
} else {
  // Use HTTP streaming transport (which supports SSE)
  server.start({
    transportType: "httpStream",
    httpStream: { port: 3010 },
  });
  console.log(
    `🚀 MCP Server started with HTTP streaming transport on http://localhost:3010/stream`
  );
}

console.log(`📋 nutjs available: ${nutjsAvailable}`);
console.log(`🔐 Permissions available: ${permissionsAvailable}`);
