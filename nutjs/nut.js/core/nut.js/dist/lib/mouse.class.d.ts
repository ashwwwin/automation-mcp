import { Button, Point } from "@nut-tree/shared";
import { EasingFunction } from "./mouse-movement.function";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";
/**
 * Config object for {@link MouseClass} class
 */
export interface MouseConfig {
    /**
     * Configures the delay between single mouse events
     */
    autoDelayMs: number;
    /**
     * Configures the speed in pixels/second for mouse movement
     */
    mouseSpeed: number;
}
/**
 * {@link MouseClass} class provides methods to emulate mouse input
 */
export declare class MouseClass {
    private providerRegistry;
    config: MouseConfig;
    /**
     * {@link MouseClass} class constructor
     * @param providerRegistry
     */
    constructor(providerRegistry: ProviderRegistry);
    /**
     * {@link setPosition} instantly moves the mouse cursor to a given {@link Point}
     * @param target {@link Point} to move the cursor to
     */
    setPosition(target: Point): Promise<MouseClass>;
    /**
     * {@link getPosition} returns a {@link Point} representing the current mouse position
     */
    getPosition(): Promise<Point>;
    /**
     * {@link move} moves the mouse cursor along a given path of {@link Point}s, according to a movement type
     * @param path Array of {@link Point}s to follow
     * @param movementType Defines the type of mouse movement. Would allow to configured acceleration etc. (Default: {@link linear}, no acceleration)
     */
    move(path: Point[] | Promise<Point[]>, movementType?: EasingFunction): Promise<MouseClass>;
    /**
     * {@link leftClick} performs a click with the left mouse button
     */
    leftClick(): Promise<MouseClass>;
    /**
     * {@link rightClick} performs a click with the right mouse button
     */
    rightClick(): Promise<MouseClass>;
    /**
     * {@link scrollDown} scrolls down for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollDown(amount: number): Promise<MouseClass>;
    /**
     * {@link scrollUp} scrolls up for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollUp(amount: number): Promise<MouseClass>;
    /**
     * {@link scrollLeft} scrolls left for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollLeft(amount: number): Promise<MouseClass>;
    /**
     * {@link scrollRight} scrolls right for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollRight(amount: number): Promise<MouseClass>;
    /**
     * {@link drag} drags the mouse along a certain path
     * In summary, {@link drag} presses and holds the left mouse button, moves the mouse and releases the left button
     * @param path The path of {@link Point}s to drag along
     */
    drag(path: Point[] | Promise<Point[]>): Promise<MouseClass>;
    /**
     * {@link pressButton} presses and holds a mouse button
     * @param btn The {@link Button} to press and hold
     */
    pressButton(btn: Button): Promise<MouseClass>;
    /**
     * {@link releaseButton} releases a mouse button previously pressed via {@link pressButton}
     * @param btn The {@link Button} to release
     */
    releaseButton(btn: Button): Promise<MouseClass>;
    /**
     * {@link click} clicks a mouse button
     * @param btn The {@link Button} to click
     */
    click(btn: Button): Promise<MouseClass>;
    /**
     * {@link doubleClick} performs a double click on a mouse button
     * @param btn The {@link Button} to click
     */
    doubleClick(btn: Button): Promise<MouseClass>;
}
