"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineHelper = void 0;
const bresenham_class_1 = require("./bresenham.class");
class LineHelper {
    constructor() { }
    straightLine(from, to) {
        return bresenham_class_1.Bresenham.compute(from, to);
    }
}
exports.LineHelper = LineHelper;
//# sourceMappingURL=linehelper.class.js.map