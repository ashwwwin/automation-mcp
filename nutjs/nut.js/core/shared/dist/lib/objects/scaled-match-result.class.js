"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaledMatchResult = void 0;
const match_result_class_1 = require("./match-result.class");
class ScaledMatchResult extends match_result_class_1.MatchResult {
    constructor(confidence, scale, location, error) {
        super(confidence, location, error);
        this.confidence = confidence;
        this.scale = scale;
        this.location = location;
        this.error = error;
    }
}
exports.ScaledMatchResult = ScaledMatchResult;
//# sourceMappingURL=scaled-match-result.class.js.map