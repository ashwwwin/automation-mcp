"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalSearchParameters = void 0;
/**
 * {@link OptionalSearchParameters} serves as a data class holding optional parameters for search purposes
 */
class OptionalSearchParameters {
    /**
     * {@link OptionalSearchParameters} class constructor
     * @param searchRegion Optional {@link Region} to limit the search space to
     * @param confidence Optional confidence value to configure image or text match confidence
     * @param abort An {@link AbortSignal} to cancel an ongoing call to `waitFor`
     * @param providerData Optional data that gets passed onto the provider implementation
     */
    constructor(searchRegion, confidence, abort, providerData) {
        this.searchRegion = searchRegion;
        this.confidence = confidence;
        this.abort = abort;
        this.providerData = providerData;
    }
}
exports.OptionalSearchParameters = OptionalSearchParameters;
//# sourceMappingURL=optionalsearchparameters.class.js.map