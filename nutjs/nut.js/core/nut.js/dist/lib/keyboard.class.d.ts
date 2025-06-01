import { Key } from "@nut-tree/shared";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";
type StringOrKey = string[] | Key[];
/**
 * Config object for {@link KeyboardClass} class
 */
export interface KeyboardConfig {
    /**
     * Configures the delay between single key events
     */
    autoDelayMs: number;
}
/**
 * {@link KeyboardClass} class provides methods to emulate keyboard input
 */
export declare class KeyboardClass {
    private providerRegistry;
    /**
     * Config object for {@link KeyboardClass} class
     */
    config: KeyboardConfig;
    /**
     * {@link KeyboardClass} class constructor
     * @param providerRegistry
     */
    constructor(providerRegistry: ProviderRegistry);
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
    type(...input: StringOrKey): Promise<KeyboardClass>;
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
    pressKey(...keys: Key[]): Promise<KeyboardClass>;
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
    releaseKey(...keys: Key[]): Promise<KeyboardClass>;
}
export {};
