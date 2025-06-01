"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchResult = exports.getMatchResults = exports.createMatchRequest = exports.isColorMatchRequest = exports.isTextMatchRequest = exports.isImageMatchRequest = exports.isPointResultFindInput = exports.isRegionResultFindInput = void 0;
const shared_1 = require("@nut-tree/shared");
function isRegionResultFindInput(input) {
    return (0, shared_1.isImage)(input) || (0, shared_1.isTextQuery)(input);
}
exports.isRegionResultFindInput = isRegionResultFindInput;
function isPointResultFindInput(input) {
    return (0, shared_1.isColorQuery)(input);
}
exports.isPointResultFindInput = isPointResultFindInput;
function isImageMatchRequest(matchRequest) {
    return (0, shared_1.isImage)(matchRequest.needle);
}
exports.isImageMatchRequest = isImageMatchRequest;
function isTextMatchRequest(matchRequest) {
    return (0, shared_1.isTextQuery)(matchRequest.needle);
}
exports.isTextMatchRequest = isTextMatchRequest;
function isColorMatchRequest(matchRequest) {
    return (0, shared_1.isColorQuery)(matchRequest.needle);
}
exports.isColorMatchRequest = isColorMatchRequest;
function createMatchRequest(providerRegistry, needle, searchRegion, minMatch, screenImage, params) {
    if ((0, shared_1.isImage)(needle)) {
        providerRegistry
            .getLogProvider()
            .info(`Searching for image ${needle.id} in region ${searchRegion.toString()}.${minMatch != null ? ` Required confidence: ${minMatch}` : ""}`);
        return new shared_1.MatchRequest(screenImage, needle, minMatch, params === null || params === void 0 ? void 0 : params.providerData);
    }
    else if ((0, shared_1.isTextQuery)(needle)) {
        providerRegistry.getLogProvider().info(`Searching for ${(0, shared_1.isLineQuery)(needle) ? "line" : "word"} {
                        ${(0, shared_1.isLineQuery)(needle) ? needle.by.line : needle.by.word}
                    } in region ${searchRegion.toString()}.${minMatch != null
            ? ` Required confidence: ${minMatch}`
            : ""}`);
        return new shared_1.MatchRequest(screenImage, needle, minMatch, params === null || params === void 0 ? void 0 : params.providerData);
    }
    else if ((0, shared_1.isColorQuery)(needle)) {
        const color = needle.by.color;
        providerRegistry
            .getLogProvider()
            .info(`Searching for color RGBA(${color.R},${color.G},${color.B},${color.A}) in region ${searchRegion.toString()}.`);
        return new shared_1.MatchRequest(screenImage, needle, 1, params === null || params === void 0 ? void 0 : params.providerData);
    }
    throw new Error(`Unknown input type: ${JSON.stringify(needle)}`);
}
exports.createMatchRequest = createMatchRequest;
async function getMatchResults(providerRegistry, matchRequest) {
    if (isImageMatchRequest(matchRequest)) {
        return providerRegistry.getImageFinder().findMatches(matchRequest);
    }
    else if (isTextMatchRequest(matchRequest)) {
        return providerRegistry.getTextFinder().findMatches(matchRequest);
    }
    else if (isColorMatchRequest(matchRequest)) {
        return providerRegistry.getColorFinder().findMatches(matchRequest);
    }
    throw new Error(`Unknown match request type: ${JSON.stringify(matchRequest.needle)}`);
}
exports.getMatchResults = getMatchResults;
async function getMatchResult(providerRegistry, matchRequest) {
    if (isImageMatchRequest(matchRequest)) {
        return providerRegistry.getImageFinder().findMatch(matchRequest);
    }
    else if (isTextMatchRequest(matchRequest)) {
        return providerRegistry.getTextFinder().findMatch(matchRequest);
    }
    else if (isColorMatchRequest(matchRequest)) {
        return providerRegistry.getColorFinder().findMatch(matchRequest);
    }
    throw new Error("Unknown match request type");
}
exports.getMatchResult = getMatchResult;
//# sourceMappingURL=screen-helpers.function.js.map