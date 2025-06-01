"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovementApi = void 0;
const shared_1 = require("@nut-tree/shared");
const createMovementApi = (providerRegistry, lineHelper) => {
    return {
        down: async (px) => {
            const pos = await providerRegistry.getMouse().currentMousePosition();
            return lineHelper.straightLine(pos, new shared_1.Point(pos.x, pos.y + px));
        },
        left: async (px) => {
            const pos = await providerRegistry.getMouse().currentMousePosition();
            return lineHelper.straightLine(pos, new shared_1.Point(pos.x - px, pos.y));
        },
        right: async (px) => {
            const pos = await providerRegistry.getMouse().currentMousePosition();
            return lineHelper.straightLine(pos, new shared_1.Point(pos.x + px, pos.y));
        },
        straightTo: async (target) => {
            const targetPoint = await target;
            if (!(0, shared_1.isPoint)(targetPoint)) {
                throw Error(`straightTo requires a Point, but received ${JSON.stringify(targetPoint)}`);
            }
            const origin = await providerRegistry.getMouse().currentMousePosition();
            return lineHelper.straightLine(origin, targetPoint);
        },
        up: async (px) => {
            const pos = await providerRegistry.getMouse().currentMousePosition();
            return lineHelper.straightLine(pos, new shared_1.Point(pos.x, pos.y - px));
        }
    };
};
exports.createMovementApi = createMovementApi;
//# sourceMappingURL=movement.function.js.map