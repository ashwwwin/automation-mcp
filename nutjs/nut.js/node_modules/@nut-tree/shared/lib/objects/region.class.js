"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegion = exports.Region = void 0;
class Region {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    toString() {
        return `(${this.left}, ${this.top}, ${this.width}, ${this.height})`;
    }
}
exports.Region = Region;
const testRegion = new Region(0, 0, 100, 100);
const regionKeys = Object.keys(testRegion);
function isRegion(possibleRegion) {
    if (typeof possibleRegion !== "object") {
        return false;
    }
    for (const key of regionKeys) {
        if (!(key in possibleRegion)) {
            return false;
        }
        const possibleRegionKeyType = typeof possibleRegion[key];
        const regionKeyType = typeof testRegion[key];
        if (possibleRegionKeyType !== regionKeyType) {
            return false;
        }
    }
    return true;
}
exports.isRegion = isRegion;
//# sourceMappingURL=region.class.js.map