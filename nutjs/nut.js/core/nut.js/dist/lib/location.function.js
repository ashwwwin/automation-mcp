"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPointIn = exports.centerOf = void 0;
const shared_1 = require("@nut-tree/shared");
/**
 * {@link centerOf} returns the center {@link Point} for a given {@link Region}
 * @param target {@link Region} to determine the center {@link Point} for
 */
const centerOf = async (target) => {
    const targetRegion = await target;
    if (!(0, shared_1.isRegion)(targetRegion)) {
        throw Error(`centerOf requires a Region, but received ${JSON.stringify(targetRegion)}`);
    }
    const x = Math.floor(targetRegion.left + targetRegion.width / 2);
    const y = Math.floor(targetRegion.top + targetRegion.height / 2);
    return new shared_1.Point(x, y);
};
exports.centerOf = centerOf;
/**
 * {@link randomPointIn} returns a random {@link Point} within a given {@link Region}
 * @param target {@link Region} the random {@link Point} has to be within
 */
const randomPointIn = async (target) => {
    const targetRegion = await target;
    if (!(0, shared_1.isRegion)(targetRegion)) {
        throw Error(`randomPointIn requires a Region, but received ${JSON.stringify(targetRegion)}`);
    }
    const x = Math.floor(targetRegion.left + Math.random() * targetRegion.width);
    const y = Math.floor(targetRegion.top + Math.random() * targetRegion.height);
    return new shared_1.Point(x, y);
};
exports.randomPointIn = randomPointIn;
//# sourceMappingURL=location.function.js.map