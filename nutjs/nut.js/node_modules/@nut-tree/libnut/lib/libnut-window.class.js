"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_libnut_1 = require("../import_libnut");
const shared_1 = require("@nut-tree/shared");
class WindowAction {
    getWindows() {
        return new Promise((resolve, reject) => {
            try {
                resolve(import_libnut_1.libnut.getWindows());
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getActiveWindow() {
        return new Promise((resolve, reject) => {
            try {
                resolve(import_libnut_1.libnut.getActiveWindow());
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getWindowRegion(windowHandle) {
        return new Promise((resolve, reject) => {
            try {
                const windowRect = import_libnut_1.libnut.getWindowRect(windowHandle);
                resolve(new shared_1.Region(windowRect.x, windowRect.y, windowRect.width, windowRect.height));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getWindowTitle(windowHandle) {
        return new Promise((resolve, reject) => {
            try {
                resolve(import_libnut_1.libnut.getWindowTitle(windowHandle));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    focusWindow(windowHandle) {
        return new Promise((resolve, reject) => {
            try {
                resolve(import_libnut_1.libnut.focusWindow(windowHandle));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    moveWindow(windowHandle, newOrigin) {
        return new Promise((resolve, reject) => {
            try {
                resolve(import_libnut_1.libnut.moveWindow(windowHandle, newOrigin));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    resizeWindow(windowHandle, newSize) {
        return new Promise((resolve, reject) => {
            try {
                resolve(import_libnut_1.libnut.resizeWindow(windowHandle, newSize));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    minimizeWindow(_) {
        throw new Error("Method not implemented in libnut.");
    }
    restoreWindow(_) {
        throw new Error("Method not implemented in libnut.");
    }
}
exports.default = WindowAction;
//# sourceMappingURL=libnut-window.class.js.map