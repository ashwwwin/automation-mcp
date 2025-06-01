"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPoint = exports.Point = void 0;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
exports.Point = Point;
const testPoint = new Point(100, 100);
const pointKeys = Object.keys(testPoint);
function isPoint(possiblePoint) {
    if (typeof possiblePoint !== "object") {
        return false;
    }
    for (const key of pointKeys) {
        if (!(key in possiblePoint)) {
            return false;
        }
        const possiblePointKeyType = typeof possiblePoint[key];
        const pointKeyType = typeof testPoint[key];
        if (possiblePointKeyType !== pointKeyType) {
            return false;
        }
    }
    return true;
}
exports.isPoint = isPoint;
//# sourceMappingURL=point.class.js.map