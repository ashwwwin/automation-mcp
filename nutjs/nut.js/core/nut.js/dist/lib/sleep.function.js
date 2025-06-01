"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busyWaitForNanoSeconds = exports.sleep = void 0;
const provider_registry_class_1 = __importDefault(require("./provider/provider-registry.class"));
const sleep = async (ms) => {
    provider_registry_class_1.default.getLogProvider().debug(`Sleeping for ${ms / 1000} seconds`);
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const busyWaitForNanoSeconds = (duration) => {
    return new Promise((res) => {
        const start = process.hrtime.bigint();
        let isWaiting = true;
        while (isWaiting) {
            if (process.hrtime.bigint() - start > duration) {
                isWaiting = false;
            }
        }
        res();
    });
};
exports.busyWaitForNanoSeconds = busyWaitForNanoSeconds;
//# sourceMappingURL=sleep.function.js.map