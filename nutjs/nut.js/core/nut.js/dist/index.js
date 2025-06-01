"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelWithColor = exports.windowWithTitle = exports.textLine = exports.singleWord = exports.imageResource = exports.saveImage = exports.loadImage = exports.getActiveWindow = exports.getWindows = exports.right = exports.left = exports.down = exports.up = exports.straightTo = exports.assert = exports.screen = exports.mouse = exports.keyboard = exports.clipboard = exports.fetchFromUrl = exports.ConsoleLogLevel = exports.useConsoleLogger = exports.useLogger = exports.Window = exports.linear = exports.randomPointIn = exports.centerOf = exports.sleep = exports.jestMatchers = exports.MatchResult = exports.MatchRequest = exports.providerRegistry = exports.ScreenClass = exports.MouseClass = exports.KeyboardClass = exports.ClipboardClass = exports.AssertClass = void 0;
const assert_class_1 = require("./lib/assert.class");
Object.defineProperty(exports, "AssertClass", { enumerable: true, get: function () { return assert_class_1.AssertClass; } });
const clipboard_class_1 = require("./lib/clipboard.class");
Object.defineProperty(exports, "ClipboardClass", { enumerable: true, get: function () { return clipboard_class_1.ClipboardClass; } });
const keyboard_class_1 = require("./lib/keyboard.class");
Object.defineProperty(exports, "KeyboardClass", { enumerable: true, get: function () { return keyboard_class_1.KeyboardClass; } });
const mouse_class_1 = require("./lib/mouse.class");
Object.defineProperty(exports, "MouseClass", { enumerable: true, get: function () { return mouse_class_1.MouseClass; } });
const movement_function_1 = require("./lib/movement.function");
const screen_class_1 = require("./lib/screen.class");
Object.defineProperty(exports, "ScreenClass", { enumerable: true, get: function () { return screen_class_1.ScreenClass; } });
const linehelper_class_1 = require("./lib/util/linehelper.class");
const window_function_1 = require("./lib/window.function");
const provider_registry_class_1 = __importDefault(require("./lib/provider/provider-registry.class"));
exports.providerRegistry = provider_registry_class_1.default;
const imageResources_function_1 = require("./lib/imageResources.function");
var shared_1 = require("@nut-tree/shared");
Object.defineProperty(exports, "MatchRequest", { enumerable: true, get: function () { return shared_1.MatchRequest; } });
var shared_2 = require("@nut-tree/shared");
Object.defineProperty(exports, "MatchResult", { enumerable: true, get: function () { return shared_2.MatchResult; } });
__exportStar(require("@nut-tree/provider-interfaces"), exports);
__exportStar(require("@nut-tree/shared"), exports);
var jest_matcher_function_1 = require("./lib/expect/jest.matcher.function");
Object.defineProperty(exports, "jestMatchers", { enumerable: true, get: function () { return jest_matcher_function_1.jestMatchers; } });
var sleep_function_1 = require("./lib/sleep.function");
Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return sleep_function_1.sleep; } });
var location_function_1 = require("./lib/location.function");
Object.defineProperty(exports, "centerOf", { enumerable: true, get: function () { return location_function_1.centerOf; } });
Object.defineProperty(exports, "randomPointIn", { enumerable: true, get: function () { return location_function_1.randomPointIn; } });
var mouse_movement_function_1 = require("./lib/mouse-movement.function");
Object.defineProperty(exports, "linear", { enumerable: true, get: function () { return mouse_movement_function_1.linear; } });
var window_class_1 = require("./lib/window.class");
Object.defineProperty(exports, "Window", { enumerable: true, get: function () { return window_class_1.Window; } });
var logging_function_1 = require("./lib/logging.function");
Object.defineProperty(exports, "useLogger", { enumerable: true, get: function () { return logging_function_1.useLogger; } });
Object.defineProperty(exports, "useConsoleLogger", { enumerable: true, get: function () { return logging_function_1.useConsoleLogger; } });
Object.defineProperty(exports, "ConsoleLogLevel", { enumerable: true, get: function () { return logging_function_1.ConsoleLogLevel; } });
const lineHelper = new linehelper_class_1.LineHelper();
const clipboard = new clipboard_class_1.ClipboardClass(provider_registry_class_1.default);
exports.clipboard = clipboard;
const keyboard = new keyboard_class_1.KeyboardClass(provider_registry_class_1.default);
exports.keyboard = keyboard;
const mouse = new mouse_class_1.MouseClass(provider_registry_class_1.default);
exports.mouse = mouse;
const screen = new screen_class_1.ScreenClass(provider_registry_class_1.default);
exports.screen = screen;
const assert = new assert_class_1.AssertClass(screen);
exports.assert = assert;
const { straightTo, up, down, left, right } = (0, movement_function_1.createMovementApi)(provider_registry_class_1.default, lineHelper);
exports.straightTo = straightTo;
exports.up = up;
exports.down = down;
exports.left = left;
exports.right = right;
const { getWindows, getActiveWindow } = (0, window_function_1.createWindowApi)(provider_registry_class_1.default);
exports.getWindows = getWindows;
exports.getActiveWindow = getActiveWindow;
const loadImage = provider_registry_class_1.default.getImageReader().load;
exports.loadImage = loadImage;
const saveImage = provider_registry_class_1.default.getImageWriter().store;
exports.saveImage = saveImage;
const imageResource = (fileName) => (0, imageResources_function_1.loadImageResource)(provider_registry_class_1.default, screen.config.resourceDirectory, fileName);
exports.imageResource = imageResource;
const singleWord = (word) => {
    return {
        type: "text",
        id: `word-query-${word}`,
        by: {
            word
        }
    };
};
exports.singleWord = singleWord;
const textLine = (line) => {
    return {
        type: "text",
        id: `line-query-${line}`,
        by: {
            line
        }
    };
};
exports.textLine = textLine;
const windowWithTitle = (title) => {
    return {
        type: "window",
        id: `window-by-title-query-${title}`,
        by: {
            title
        }
    };
};
exports.windowWithTitle = windowWithTitle;
const pixelWithColor = (color) => {
    return {
        type: "color",
        id: `pixel-by-color-query-RGBA(${color.R},${color.G},${color.B},${color.A})`,
        by: {
            color
        }
    };
};
exports.pixelWithColor = pixelWithColor;
var imageResources_function_2 = require("./lib/imageResources.function");
Object.defineProperty(exports, "fetchFromUrl", { enumerable: true, get: function () { return imageResources_function_2.fetchFromUrl; } });
//# sourceMappingURL=index.js.map