"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindowApi = void 0;
const window_class_1 = require("./window.class");
const createWindowApi = (providerRegistry) => {
    return {
        async getActiveWindow() {
            const windowHandle = await providerRegistry.getWindow().getActiveWindow();
            providerRegistry
                .getLogProvider()
                .info("Active window handle", { windowHandle });
            return new window_class_1.Window(providerRegistry, windowHandle);
        },
        async getWindows() {
            const windowHandles = await providerRegistry.getWindow().getWindows();
            providerRegistry
                .getLogProvider()
                .info(`Retrieved ${windowHandles.length} window handles`);
            return windowHandles.map((handle) => {
                return new window_class_1.Window(providerRegistry, handle);
            });
        },
    };
};
exports.createWindowApi = createWindowApi;
//# sourceMappingURL=window.function.js.map