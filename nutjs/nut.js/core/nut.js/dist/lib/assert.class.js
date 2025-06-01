"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertClass = void 0;
class AssertClass {
    constructor(screen) {
        this.screen = screen;
    }
    async isVisible(searchInput, searchRegion, confidence) {
        const needle = await searchInput;
        const identifier = needle.id;
        try {
            await this.screen.find(needle, {
                searchRegion,
                confidence
            });
        }
        catch (err) {
            if (searchRegion !== undefined) {
                throw new Error(`Element '${identifier}' not found in region ${searchRegion.toString()}. Reason: ${err}`);
            }
            else {
                throw new Error(`Element '${identifier}' not found. Reason: ${err}`);
            }
        }
    }
    async notVisible(searchInput, searchRegion, confidence) {
        const needle = await searchInput;
        const identifier = needle.id;
        try {
            await this.screen.find(needle, {
                searchRegion,
                confidence
            });
        }
        catch (err) {
            return;
        }
        throw new Error(`'${identifier}' is visible`);
    }
}
exports.AssertClass = AssertClass;
//# sourceMappingURL=assert.class.js.map