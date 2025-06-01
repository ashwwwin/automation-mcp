"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_libnut_1 = require("../import_libnut");
const shared_1 = require("@nut-tree/shared");
class ScreenAction {
    static determinePixelDensity(screen, screenShot) {
        return {
            scaleX: screenShot.width / screen.width,
            scaleY: screenShot.height / screen.height,
        };
    }
    constructor() {
    }
    grabScreen() {
        return new Promise((resolve, reject) => {
            const screenShot = import_libnut_1.libnut.screen.capture();
            if (screenShot) {
                const screenSize = import_libnut_1.libnut.getScreenSize();
                const pixelScaling = ScreenAction.determinePixelDensity(new shared_1.Region(0, 0, screenSize.width, screenSize.height), screenShot);
                resolve(new shared_1.Image(screenShot.width, screenShot.height, screenShot.image, 4, "grabScreenResult", screenShot.bitsPerPixel, screenShot.byteWidth, shared_1.ColorMode.BGR, pixelScaling));
            }
            else {
                reject("Unable to fetch screen content.");
            }
        });
    }
    grabScreenRegion(region) {
        return new Promise((resolve, reject) => {
            const screenShot = import_libnut_1.libnut.screen.capture(region.left, region.top, region.width, region.height);
            if (screenShot) {
                const pixelScaling = ScreenAction.determinePixelDensity(region, screenShot);
                resolve(new shared_1.Image(screenShot.width, screenShot.height, screenShot.image, 4, "grabScreenRegionResult", screenShot.bitsPerPixel, screenShot.byteWidth, shared_1.ColorMode.BGR, pixelScaling));
            }
            else {
                reject("Unable to fetch screen content.");
            }
        });
    }
    highlightScreenRegion(region, duration, opacity) {
        return new Promise((resolve) => {
            import_libnut_1.libnut.screen.highlight(region.left, region.top, region.width, region.height, duration, opacity);
            resolve();
        });
    }
    screenWidth() {
        return new Promise((resolve, reject) => {
            try {
                const size = import_libnut_1.libnut.getScreenSize();
                resolve(size.width);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    screenHeight() {
        return new Promise((resolve, reject) => {
            try {
                const size = import_libnut_1.libnut.getScreenSize();
                resolve(size.height);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    screenSize() {
        return new Promise((resolve, reject) => {
            try {
                const screenSize = import_libnut_1.libnut.getScreenSize();
                resolve(new shared_1.Region(0, 0, screenSize.width, screenSize.height));
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.default = ScreenAction;
//# sourceMappingURL=libnut-screen.class.js.map