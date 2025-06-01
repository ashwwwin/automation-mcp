"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_libnut_1 = require("../import_libnut");
const shared_1 = require("@nut-tree/shared");
class MouseAction {
    static buttonLookup(btn) {
        return this.ButtonLookupMap.get(btn);
    }
    constructor() {
    }
    setMouseDelay(delay) {
        import_libnut_1.libnut.setMouseDelay(delay);
    }
    setMousePosition(p) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.moveMouse(p.x, p.y);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    currentMousePosition() {
        return new Promise((resolve, reject) => {
            try {
                const position = import_libnut_1.libnut.getMousePos();
                resolve(new shared_1.Point(position.x, position.y));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    click(btn) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.mouseClick(MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    doubleClick(btn) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.mouseClick(MouseAction.buttonLookup(btn), true);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    leftClick() {
        return this.click(shared_1.Button.LEFT);
    }
    rightClick() {
        return this.click(shared_1.Button.RIGHT);
    }
    middleClick() {
        return this.click(shared_1.Button.MIDDLE);
    }
    pressButton(btn) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.mouseToggle("down", MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    releaseButton(btn) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.mouseToggle("up", MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollUp(amount) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.scrollMouse(0, amount);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollDown(amount) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.scrollMouse(0, -amount);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollLeft(amount) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.scrollMouse(-amount, 0);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollRight(amount) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.scrollMouse(amount, 0);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
MouseAction.ButtonLookupMap = new Map([
    [shared_1.Button.LEFT, "left"],
    [shared_1.Button.MIDDLE, "middle"],
    [shared_1.Button.RIGHT, "right"]
]);
exports.default = MouseAction;
//# sourceMappingURL=libnut-mouse.class.js.map