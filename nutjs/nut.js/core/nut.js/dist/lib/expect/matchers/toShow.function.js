"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toShow = void 0;
const shared_1 = require("@nut-tree/shared");
const index_1 = require("../../../index");
const toShow = async (received, needle, parameters) => {
    const identifier = (await needle).id;
    if ((0, shared_1.isRegion)(received)) {
        if (parameters != null) {
            parameters.searchRegion = received;
        }
        else {
            parameters = { searchRegion: received };
        }
        try {
            await index_1.screen.find(needle, parameters);
            return {
                message: () => `Expected screen to not show ${identifier}`,
                pass: true
            };
        }
        catch (err) {
            return {
                message: () => `Screen is not showing ${identifier}: ${err}`,
                pass: false
            };
        }
    }
    else {
        try {
            await received.find(needle, parameters);
            return {
                message: () => `Expected screen to not show ${identifier}`,
                pass: true
            };
        }
        catch (err) {
            return {
                message: () => `Screen is not showing ${identifier}: ${err}`,
                pass: false
            };
        }
    }
};
exports.toShow = toShow;
//# sourceMappingURL=toShow.function.js.map