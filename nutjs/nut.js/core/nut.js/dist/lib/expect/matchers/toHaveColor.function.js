"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHaveColor = void 0;
const index_1 = require("../../../index");
const toHaveColor = async (received, needle) => {
    const color = await index_1.screen.colorAt(received);
    const match = color.toHex() === needle.toHex();
    if (match) {
        return {
            message: () => `Expected pixel ${received.toString()} not to to have color ${needle.toHex()}`,
            pass: true
        };
    }
    else {
        return {
            message: () => `Expected pixel ${received.toString()} to have color ${needle.toHex()} but is ${color.toHex()}`,
            pass: false
        };
    }
};
exports.toHaveColor = toHaveColor;
//# sourceMappingURL=toHaveColor.function.js.map