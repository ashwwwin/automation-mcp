"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jestMatchers = void 0;
const toBeAt_function_1 = require("./matchers/toBeAt.function");
const toBeIn_function_1 = require("./matchers/toBeIn.function");
const toShow_function_1 = require("./matchers/toShow.function");
const toHaveColor_function_1 = require("./matchers/toHaveColor.function");
exports.jestMatchers = {
    toBeAt: toBeAt_function_1.toBeAt,
    toBeIn: toBeIn_function_1.toBeIn,
    toShow: toShow_function_1.toShow,
    toHaveColor: toHaveColor_function_1.toHaveColor
};
//# sourceMappingURL=jest.matcher.function.js.map