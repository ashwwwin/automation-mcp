"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window = void 0;
const shared_1 = require("@nut-tree/shared");
const timeout_function_1 = require("./util/timeout.function");
class Window {
    constructor(providerRegistry, windowHandle) {
        this.providerRegistry = providerRegistry;
        this.windowHandle = windowHandle;
        this.findHooks = new Map();
    }
    get title() {
        return this.getTitle();
    }
    async getTitle() {
        return this.providerRegistry.getWindow().getWindowTitle(this.windowHandle);
    }
    get region() {
        return this.getRegion();
    }
    async getRegion() {
        const region = await this.providerRegistry.getWindow().getWindowRegion(this.windowHandle);
        const mainWindowRegion = await this.providerRegistry.getScreen().screenSize();
        if (region.left < 0) {
            region.width = region.width + region.left;
            region.left = 0;
        }
        if (region.top < 0) {
            region.height = region.height + region.top;
            region.top = 0;
        }
        const rightWindowBound = region.left + region.width;
        if (rightWindowBound > mainWindowRegion.width) {
            const excessWidth = rightWindowBound - mainWindowRegion.width;
            region.width = region.width - excessWidth;
        }
        const bottomWindowBound = region.top + region.height;
        if (bottomWindowBound > mainWindowRegion.height) {
            const excessHeight = bottomWindowBound - mainWindowRegion.height;
            region.height = region.height - excessHeight;
        }
        if (region.width < 0) {
            region.width = 0;
        }
        if (region.height < 0) {
            region.height = 0;
        }
        return region;
    }
    async move(newOrigin) {
        return this.providerRegistry
            .getWindow()
            .moveWindow(this.windowHandle, newOrigin);
    }
    async resize(newSize) {
        return this.providerRegistry
            .getWindow()
            .resizeWindow(this.windowHandle, newSize);
    }
    async focus() {
        return this.providerRegistry.getWindow().focusWindow(this.windowHandle);
    }
    async minimize() {
        return this.providerRegistry.getWindow().minimizeWindow(this.windowHandle);
    }
    async restore() {
        return this.providerRegistry.getWindow().restoreWindow(this.windowHandle);
    }
    async getElements(maxElements) {
        return this.providerRegistry.getWindowElementInspector().getElements(this.windowHandle, maxElements);
    }
    /**
     * {@link find} will search for a single occurrence of a given search input in the current window.
     * @param searchInput A {@link WindowedFindInput} instance
     */
    async find(searchInput) {
        const needle = await searchInput;
        this.providerRegistry.getLogProvider().info(`Searching for ${needle} in window ${this.windowHandle}`);
        try {
            if ((0, shared_1.isWindowElementQuery)(needle)) {
                this.providerRegistry.getLogProvider().debug(`Running a window element search`);
                const windowElement = await this.providerRegistry
                    .getWindowElementInspector()
                    .findElement(this.windowHandle, needle.by.description);
                const possibleHooks = this.getHooksForInput(needle) || [];
                this.providerRegistry
                    .getLogProvider()
                    .debug(`${possibleHooks.length} hooks triggered for match`);
                for (const hook of possibleHooks) {
                    this.providerRegistry.getLogProvider().debug(`Executing hook`);
                    await hook(windowElement);
                }
                return windowElement;
            }
            throw new Error(`Search input is not supported. Please use a valid search input type.`);
        }
        catch (e) {
            const error = new Error(`Searching for ${needle.id} failed. Reason: '${e}'`);
            this.providerRegistry.getLogProvider().error(error);
            throw error;
        }
    }
    /**
     * {@link findAll} will search for multiple occurrence of a given search input in the current window.
     * @param searchInput A {@link WindowedFindInput} instance
     */
    async findAll(searchInput) {
        const needle = await searchInput;
        this.providerRegistry.getLogProvider().info(`Searching for ${needle} in window ${this.windowHandle}`);
        try {
            if ((0, shared_1.isWindowElementQuery)(needle)) {
                this.providerRegistry.getLogProvider().debug(`Running a window element search`);
                const windowElements = await this.providerRegistry
                    .getWindowElementInspector()
                    .findElements(this.windowHandle, needle.by.description);
                const possibleHooks = this.getHooksForInput(needle) || [];
                this.providerRegistry
                    .getLogProvider()
                    .debug(`${possibleHooks.length} hooks triggered for match`);
                for (const hook of possibleHooks) {
                    for (const windowElement of windowElements) {
                        this.providerRegistry.getLogProvider().debug(`Executing hook`);
                        await hook(windowElement);
                    }
                }
                return windowElements;
            }
            throw new Error(`Search input is not supported. Please use a valid search input type.`);
        }
        catch (e) {
            const error = new Error(`Searching for ${needle.id} failed. Reason: '${e}'`);
            this.providerRegistry.getLogProvider().error(error);
            throw error;
        }
    }
    /**
     * {@link waitFor} repeatedly searches for a query to appear in the window until it is found or the timeout is reached
     * @param searchInput A {@link WindowElementQuery} instance
     * @param timeoutMs Timeout in milliseconds after which {@link waitFor} fails
     * @param updateInterval Update interval in milliseconds to retry search
     * @param params {@link OptionalSearchParameters} which are used to fine tune search
     */
    async waitFor(searchInput, timeoutMs, updateInterval, params) {
        const needle = await searchInput;
        const timeoutValue = timeoutMs !== null && timeoutMs !== void 0 ? timeoutMs : 5000;
        const updateIntervalValue = updateInterval !== null && updateInterval !== void 0 ? updateInterval : 500;
        this.providerRegistry
            .getLogProvider()
            .info(`Waiting for ${needle.id} to appear in window. Timeout: ${timeoutValue / 1000} seconds, interval: ${updateIntervalValue} ms`);
        return (0, timeout_function_1.timeout)(updateIntervalValue, timeoutValue, () => {
            return this.find(needle);
        }, {
            signal: params === null || params === void 0 ? void 0 : params.abort
        });
    }
    /**
     * {@link on} registers a callback which is triggered once a certain searchInput image is found
     * @param searchInput to trigger the callback on
     * @param callback The {@link FindHookCallback} function to trigger
     */
    on(searchInput, callback) {
        const existingHooks = this.getHooksForInput(searchInput);
        this.findHooks.set(searchInput, [...existingHooks, callback]);
        this.providerRegistry
            .getLogProvider()
            .info(`Registered callback for image ${searchInput.id}. There are currently ${existingHooks.length + 1} hooks registered`);
    }
    getHooksForInput(input) {
        var _a;
        return (_a = this.findHooks.get(input)) !== null && _a !== void 0 ? _a : [];
    }
}
exports.Window = Window;
//# sourceMappingURL=window.class.js.map