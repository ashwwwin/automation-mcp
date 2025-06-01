"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linear = exports.calculateMovementTimesteps = exports.calculateStepDuration = void 0;
const nanoSecondsPerSecond = 1000000000;
const calculateStepDuration = (speedInPixelsPerSecond) => (1 / speedInPixelsPerSecond) * nanoSecondsPerSecond;
exports.calculateStepDuration = calculateStepDuration;
const calculateMovementTimesteps = (amountOfSteps, speedInPixelsPerSecond, easingFunction = exports.linear) => {
    const isEasingFunction = typeof easingFunction === "function";
    return Array(amountOfSteps)
        .fill(speedInPixelsPerSecond)
        .map((speed, idx) => {
        let speedInPixels = speed;
        if (isEasingFunction) {
            speedInPixels += easingFunction(idx / amountOfSteps) * speedInPixels;
        }
        const stepDuration = (0, exports.calculateStepDuration)(speedInPixels);
        return isFinite(stepDuration) && stepDuration > 0 ? stepDuration : 0;
    });
};
exports.calculateMovementTimesteps = calculateMovementTimesteps;
const linear = (_) => {
    return 0;
};
exports.linear = linear;
//# sourceMappingURL=mouse-movement.function.js.map