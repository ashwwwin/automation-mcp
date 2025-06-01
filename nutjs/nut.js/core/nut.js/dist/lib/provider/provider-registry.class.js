"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_image_reader_class_1 = __importDefault(require("./io/jimp-image-reader.class"));
const jimp_image_writer_class_1 = __importDefault(require("./io/jimp-image-writer.class"));
const jimp_image_processor_class_1 = __importDefault(require("./image/jimp-image-processor.class"));
const noop_log_provider_class_1 = require("./log/noop-log-provider.class");
const color_finder_class_1 = __importDefault(require("./color/color-finder.class"));
const constants_1 = require("../constants");
const wrap_logger_function_1 = require("./log/wrap-logger.function");
class DefaultProviderRegistry {
    constructor() {
        this.getClipboard = () => {
            if (this._clipboard) {
                return this._clipboard;
            }
            const error = new Error(`No ClipboardProvider registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerClipboardProvider = (value) => {
            this._clipboard = value;
            this.getLogProvider().trace("Registered new clipboard provider", value);
        };
        this.getImageFinder = () => {
            if (this._imageFinder) {
                return this._imageFinder;
            }
            const error = new Error(`No ImageFinder registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerImageFinder = (value) => {
            this._imageFinder = value;
            this.getLogProvider().trace("Registered new image finder", value);
        };
        this.getKeyboard = () => {
            if (this._keyboard) {
                return this._keyboard;
            }
            const error = new Error(`No KeyboardProvider registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerKeyboardProvider = (value) => {
            this._keyboard = value;
            this.getLogProvider().trace("Registered new keyboard provider", value);
        };
        this.getMouse = () => {
            if (this._mouse) {
                return this._mouse;
            }
            const error = new Error(`No MouseProvider registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerMouseProvider = (value) => {
            this._mouse = value;
            this.getLogProvider().trace("Registered new mouse provider", value);
        };
        this.getScreen = () => {
            if (this._screen) {
                return this._screen;
            }
            const error = new Error(`No ScreenProvider registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerScreenProvider = (value) => {
            this._screen = value;
            this.getLogProvider().trace("Registered new screen provider", value);
        };
        this.getWindow = () => {
            if (this._window) {
                return this._window;
            }
            const error = new Error(`No WindowProvider registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerWindowProvider = (value) => {
            this._window = value;
            this.getLogProvider().trace("Registered new window provider", value);
        };
        this.getTextFinder = () => {
            if (this._textFinder) {
                return this._textFinder;
            }
            const error = new Error(`No TextFinder registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerTextFinder = (value) => {
            this._textFinder = value;
            this.getLogProvider().trace("Registered new TextFinder provider", value);
        };
        this.getWindowFinder = () => {
            if (this._windowFinder) {
                return this._windowFinder;
            }
            const error = new Error(`No WindowFinder registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerWindowFinder = (value) => {
            this._windowFinder = value;
            this.getLogProvider().trace("Registered new WindowFinder provider", value);
        };
        this.getWindowElementInspector = () => {
            if (this._windowElementInspector) {
                return this._windowElementInspector;
            }
            const error = new Error(`No WindowElementInspector registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerWindowElementInspector = (value) => {
            this._windowElementInspector = value;
            this.getLogProvider().trace("Registered new WindowElementInspector provider", value);
        };
        this.getImageReader = () => {
            if (this._imageReader) {
                return this._imageReader;
            }
            const error = new Error(`No ImageReader registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerImageReader = (value) => {
            this._imageReader = value;
            this.getLogProvider().trace("Registered new image reader", value);
        };
        this.getImageWriter = () => {
            if (this._imageWriter) {
                return this._imageWriter;
            }
            const error = new Error(`No ImageWriter registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerImageWriter = (value) => {
            this._imageWriter = value;
            this.getLogProvider().trace("Registered new image writer", value);
        };
        this.getImageProcessor = () => {
            if (this._imageProcessor) {
                return this._imageProcessor;
            }
            const error = new Error(`No ImageProcessor registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerImageProcessor = (value) => {
            this._imageProcessor = value;
            this.getLogProvider().trace("Registered new image processor", value);
        };
        this.getLogProvider = () => {
            if (this._logProvider) {
                return this._logProvider;
            }
            // Fallback to avoid errors caused by logging
            return new noop_log_provider_class_1.NoopLogProvider();
        };
        this.registerLogProvider = (value) => {
            this._logProvider = (0, wrap_logger_function_1.wrapLogger)(value);
            this.getLogProvider().trace("Registered new log provider", value);
        };
        this.getColorFinder = () => {
            if (this._colorFinder) {
                return this._colorFinder;
            }
            const error = new Error(`No ColorFinder registered`);
            this.getLogProvider().error(error);
            throw error;
        };
        this.registerColorFinder = (value) => {
            this._colorFinder = value;
            this.getLogProvider().trace("Registered new ColorFinder provider", value);
        };
    }
    hasClipboard() {
        return this._clipboard != null;
    }
    hasImageFinder() {
        return this._imageFinder != null;
    }
    hasKeyboard() {
        return this._keyboard != null;
    }
    hasMouse() {
        return this._mouse != null;
    }
    hasScreen() {
        return this._screen != null;
    }
    hasWindow() {
        return this._window != null;
    }
    hasTextFinder() {
        return this._textFinder != null;
    }
    hasWindowFinder() {
        return this._windowFinder != null;
    }
    hasImageReader() {
        return this._imageReader != null;
    }
    hasImageWriter() {
        return this._imageWriter != null;
    }
    hasImageProcessor() {
        return this._imageProcessor != null;
    }
    hasLogProvider() {
        return this._logProvider != null;
    }
    hasColorFinder() {
        return this._colorFinder != null;
    }
}
const providerRegistry = new DefaultProviderRegistry();
providerRegistry.registerImageWriter(new jimp_image_writer_class_1.default());
providerRegistry.registerImageReader(new jimp_image_reader_class_1.default());
providerRegistry.registerImageProcessor(new jimp_image_processor_class_1.default());
providerRegistry.registerColorFinder(new color_finder_class_1.default());
providerRegistry.registerLogProvider(new noop_log_provider_class_1.NoopLogProvider());
if (!process.env[constants_1.DISABLE_DEFAULT_PROVIDERS_ENV_VAR]) {
    if (!process.env[constants_1.DISABLE_DEFAULT_CLIPBOARD_PROVIDER_ENV_VAR]) {
        const Clipboard = require("@nut-tree/default-clipboard-provider").default;
        providerRegistry.registerClipboardProvider(new Clipboard());
    }
    if (!process.env[constants_1.DISABLE_DEFAULT_KEYBOARD_PROVIDER_ENV_VAR]) {
        const { DefaultKeyboardAction } = require("@nut-tree/libnut");
        providerRegistry.registerKeyboardProvider(new DefaultKeyboardAction());
    }
    if (!process.env[constants_1.DISABLE_DEFAULT_MOUSE_PROVIDER_ENV_VAR]) {
        const { DefaultMouseAction } = require("@nut-tree/libnut");
        providerRegistry.registerMouseProvider(new DefaultMouseAction());
    }
    if (!process.env[constants_1.DISABLE_DEFAULT_SCREEN_PROVIDER_ENV_VAR]) {
        const { DefaultScreenAction } = require("@nut-tree/libnut");
        providerRegistry.registerScreenProvider(new DefaultScreenAction());
    }
    if (!process.env[constants_1.DISABLE_DEFAULT_WINDOW_PROVIDER_ENV_VAR]) {
        const { DefaultWindowAction } = require("@nut-tree/libnut");
        providerRegistry.registerWindowProvider(new DefaultWindowAction());
    }
}
exports.default = providerRegistry;
//# sourceMappingURL=provider-registry.class.js.map