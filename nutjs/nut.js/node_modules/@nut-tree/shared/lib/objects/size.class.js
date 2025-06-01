"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSize = exports.Size = void 0;
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    toString() {
        return `(${this.width}x${this.height})`;
    }
}
exports.Size = Size;
const testSize = new Size(100, 100);
const sizeKeys = Object.keys(testSize);
function isSize(possibleSize) {
    if (typeof possibleSize !== "object") {
        return false;
    }
    for (const key of sizeKeys) {
        if (!(key in possibleSize)) {
            return false;
        }
        const possibleSizeKeyType = typeof possibleSize[key];
        const sizeKeyType = typeof testSize[key];
        if (possibleSizeKeyType !== sizeKeyType) {
            return false;
        }
    }
    return true;
}
exports.isSize = isSize;
//# sourceMappingURL=size.class.js.map