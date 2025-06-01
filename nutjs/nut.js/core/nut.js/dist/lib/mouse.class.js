"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseClass = void 0;
const shared_1 = require("@nut-tree/shared");
const sleep_function_1 = require("./sleep.function");
const mouse_movement_function_1 = require("./mouse-movement.function");
/**
 * {@link MouseClass} class provides methods to emulate mouse input
 */
class MouseClass {
    /**
     * {@link MouseClass} class constructor
     * @param providerRegistry
     */
    constructor(providerRegistry) {
        this.providerRegistry = providerRegistry;
        this.config = {
            autoDelayMs: 100,
            mouseSpeed: 1000
        };
        if (this.providerRegistry.hasMouse()) {
            this.providerRegistry.getMouse().setMouseDelay(0);
        }
    }
    /**
     * {@link setPosition} instantly moves the mouse cursor to a given {@link Point}
     * @param target {@link Point} to move the cursor to
     */
    async setPosition(target) {
        if (!(0, shared_1.isPoint)(target)) {
            const e = new Error(`setPosition requires a Point, but received ${JSON.stringify(target)}`);
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
        this.providerRegistry
            .getLogProvider()
            .trace("Setting mouse position", target);
        try {
            await this.providerRegistry.getMouse().setMousePosition(target);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link getPosition} returns a {@link Point} representing the current mouse position
     */
    async getPosition() {
        const currentPosition = await this.providerRegistry
            .getMouse()
            .currentMousePosition();
        this.providerRegistry
            .getLogProvider()
            .debug("Retrieving current mouse position", { currentPosition });
        return currentPosition;
    }
    /**
     * {@link move} moves the mouse cursor along a given path of {@link Point}s, according to a movement type
     * @param path Array of {@link Point}s to follow
     * @param movementType Defines the type of mouse movement. Would allow to configured acceleration etc. (Default: {@link linear}, no acceleration)
     */
    async move(path, movementType = mouse_movement_function_1.linear) {
        try {
            let pathSteps = await path;
            if (!Array.isArray(pathSteps)) {
                pathSteps = [pathSteps];
            }
            this.providerRegistry
                .getLogProvider()
                .info(`Moving mouse to target point ${pathSteps[pathSteps.length - 1]}`);
            const timeSteps = (0, mouse_movement_function_1.calculateMovementTimesteps)(pathSteps.length, this.config.mouseSpeed, movementType);
            for (let idx = 0; idx < pathSteps.length; ++idx) {
                const node = pathSteps[idx];
                const minTime = timeSteps[idx];
                await (0, sleep_function_1.busyWaitForNanoSeconds)(minTime);
                await this.setPosition(node);
            }
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link leftClick} performs a click with the left mouse button
     */
    async leftClick() {
        return this.click(shared_1.Button.LEFT);
    }
    /**
     * {@link rightClick} performs a click with the right mouse button
     */
    async rightClick() {
        return this.click(shared_1.Button.RIGHT);
    }
    /**
     * {@link scrollDown} scrolls down for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollDown(amount) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().scrollDown(amount);
            this.providerRegistry
                .getLogProvider()
                .info(`Scrolled down ${amount} steps`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link scrollUp} scrolls up for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollUp(amount) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().scrollUp(amount);
            this.providerRegistry
                .getLogProvider()
                .info(`Scrolled up ${amount} steps`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link scrollLeft} scrolls left for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollLeft(amount) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().scrollLeft(amount);
            this.providerRegistry
                .getLogProvider()
                .info(`Scrolled left ${amount} steps`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link scrollRight} scrolls right for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollRight(amount) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().scrollRight(amount);
            this.providerRegistry
                .getLogProvider()
                .info(`Scrolled right ${amount} steps`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link drag} drags the mouse along a certain path
     * In summary, {@link drag} presses and holds the left mouse button, moves the mouse and releases the left button
     * @param path The path of {@link Point}s to drag along
     */
    async drag(path) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().pressButton(shared_1.Button.LEFT);
            this.providerRegistry.getLogProvider().info("Pressed left mouse button");
            await this.move(path);
            await this.providerRegistry.getMouse().releaseButton(shared_1.Button.LEFT);
            this.providerRegistry.getLogProvider().info("Released left mouse button");
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link pressButton} presses and holds a mouse button
     * @param btn The {@link Button} to press and hold
     */
    async pressButton(btn) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().pressButton(btn);
            const btnName = shared_1.Button[btn];
            this.providerRegistry
                .getLogProvider()
                .info(`Pressed ${btnName} mouse button`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link releaseButton} releases a mouse button previously pressed via {@link pressButton}
     * @param btn The {@link Button} to release
     */
    async releaseButton(btn) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().releaseButton(btn);
            const btnName = shared_1.Button[btn];
            this.providerRegistry
                .getLogProvider()
                .info(`Pressed ${btnName} mouse button`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link click} clicks a mouse button
     * @param btn The {@link Button} to click
     */
    async click(btn) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().click(btn);
            const btnName = shared_1.Button[btn];
            this.providerRegistry
                .getLogProvider()
                .info(`Pressed ${btnName} mouse button`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
    /**
     * {@link doubleClick} performs a double click on a mouse button
     * @param btn The {@link Button} to click
     */
    async doubleClick(btn) {
        try {
            await (0, sleep_function_1.sleep)(this.config.autoDelayMs);
            await this.providerRegistry.getMouse().doubleClick(btn);
            const btnName = shared_1.Button[btn];
            this.providerRegistry
                .getLogProvider()
                .info(`Pressed ${btnName} mouse button`);
            return this;
        }
        catch (e) {
            this.providerRegistry.getLogProvider().error(e);
            throw e;
        }
    }
}
exports.MouseClass = MouseClass;
//# sourceMappingURL=mouse.class.js.map