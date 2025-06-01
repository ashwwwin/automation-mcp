"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardClass = void 0;
const shared_1 = require("@nut-tree/shared");
const sleep_function_1 = require("./sleep.function");
const inputIsString = (input) => {
    return input.every((elem) => typeof elem === "string");
};
/**
 * {@link KeyboardClass} class provides methods to emulate keyboard input
 */
class KeyboardClass {
    /**
     * {@link KeyboardClass} class constructor
     * @param providerRegistry
     */
    constructor(providerRegistry) {
        this.providerRegistry = providerRegistry;
        /**
         * Config object for {@link KeyboardClass} class
         */
        this.config = {
            autoDelayMs: 300
        };
        if (this.providerRegistry.hasKeyboard()) {
            this.providerRegistry
                .getKeyboard()
                .setKeyboardDelay(this.config.autoDelayMs);
        }
    }
    /**
     * {@link type} types a sequence of {@link String} or single {@link Key}s via system keyboard
     * @example
     * ```typescript
     *    await keyboard.type(Key.A, Key.S, Key.D, Key.F);
     *    await keyboard.type("Hello, world!");
     * ```
     *
     * @param input Sequence of {@link String} or {@link Key} to type
     */
    async type(...input) {
        try {
            if (inputIsString(input)) {
                for (const char of input.join(" ")) {
                    await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
                    await this.providerRegistry.getKeyboard().type(char);
                    this.providerRegistry.getLogProvider().debug(`Tapped ${char}`);
                }
                this.providerRegistry.getLogProvider().info(`Typed string ${input}`);
            }
            else {
                await this.providerRegistry.getKeyboard().click(...input);
                const key = input[input.length - 1];
                const modifiers = input.slice(0, -1);
                const keyName = shared_1.Key[key];
                const modifierNames = modifiers.map((modifier) => shared_1.Key[modifier]);
                this.providerRegistry
                    .getLogProvider()
                    .info(`Tapped key ${keyName} with modifiers ${modifierNames}`);
            }
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link pressKey} presses and holds a single {@link Key} for {@link Key} combinations
     * Modifier {@link Key}s are to be given in "natural" ordering, so first modifier {@link Key}s, followed by the {@link Key} to press
     * @example
     * ```typescript
     *    // Will press and hold key combination STRG + V
     *    await keyboard.pressKey(Key.STRG, Key.V);
     * ```
     *
     * @param keys Array of {@link Key}s to press and hold
     */
    async pressKey(...keys) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getKeyboard().pressKey(...keys);
            const keyNames = keys.map((key) => shared_1.Key[key]);
            this.providerRegistry.getLogProvider().info(`Pressed keys ${keyNames}`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link pressKey} releases a single {@link Key} for {@link Key} combinations
     * Modifier {@link Key}s are to be given in "natural" ordering, so first modifier {@link Key}s, followed by the {@link Key} to press
     * @example
     * ```typescript
     *    // Will release key combination STRG + V
     *    await keyboard.releaseKey(Key.STRG, Key.V);
     * ```
     *
     * @param keys Array of {@link Key}s to release
     */
    async releaseKey(...keys) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getKeyboard().releaseKey(...keys);
            const keyNames = keys.map((key) => shared_1.Key[key]);
            this.providerRegistry.getLogProvider().info(`Released keys ${keyNames}`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
}
exports.KeyboardClass = KeyboardClass;
//# sourceMappingURL=keyboard.class.js.map