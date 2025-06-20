"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bresenham = void 0;
const shared_1 = require("@nut-tree/shared");
class Bresenham {
    static compute(from, to) {
        const result = [];
        let deltaX = to.x - from.x;
        let deltaY = to.y - from.y;
        const absoluteDeltaX = Math.abs(deltaX);
        const absoluteDeltaY = Math.abs(deltaY);
        const incrementX = Bresenham.calculateIncrementalStep(deltaX);
        const incrementY = Bresenham.calculateIncrementalStep(deltaY);
        if (deltaX < 0) {
            deltaX = -deltaX;
        }
        if (deltaY < 0) {
            deltaY = -deltaY;
        }
        let fastStepInX, fastStepInY, slowStepInX, slowStepInY, slowDelta, fastDelta;
        if (absoluteDeltaX > absoluteDeltaY) {
            fastStepInX = incrementX;
            fastStepInY = 0;
            slowStepInX = incrementX;
            slowStepInY = incrementY;
            slowDelta = absoluteDeltaY;
            fastDelta = absoluteDeltaX;
        }
        else {
            fastStepInX = 0;
            fastStepInY = incrementY;
            slowStepInX = incrementX;
            slowStepInY = incrementY;
            slowDelta = absoluteDeltaX;
            fastDelta = absoluteDeltaY;
        }
        let error = fastDelta / 2;
        for (let idx = 0, x = from.x, y = from.y; idx < fastDelta; ++idx) {
            result.push(new shared_1.Point(x, y));
            error -= slowDelta;
            if (error < 0) {
                error += fastDelta;
                x += slowStepInX;
                y += slowStepInY;
            }
            else {
                x += fastStepInX;
                y += fastStepInY;
            }
        }
        result.push(to);
        return result;
    }
    static calculateIncrementalStep(x) {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
    }
}
exports.Bresenham = Bresenham;
//# sourceMappingURL=bresenham.class.js.map