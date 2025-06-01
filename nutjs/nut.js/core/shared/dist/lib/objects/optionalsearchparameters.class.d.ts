import { Region } from "./region.class";
import { AbortSignal } from "node-abort-controller";
/**
 * {@link OptionalSearchParameters} serves as a data class holding optional parameters for search purposes
 */
export declare class OptionalSearchParameters<PROVIDER_DATA_TYPE> {
    searchRegion?: Region | Promise<Region> | undefined;
    confidence?: number | undefined;
    abort?: AbortSignal | undefined;
    providerData?: PROVIDER_DATA_TYPE | undefined;
    /**
     * {@link OptionalSearchParameters} class constructor
     * @param searchRegion Optional {@link Region} to limit the search space to
     * @param confidence Optional confidence value to configure image or text match confidence
     * @param abort An {@link AbortSignal} to cancel an ongoing call to `waitFor`
     * @param providerData Optional data that gets passed onto the provider implementation
     */
    constructor(searchRegion?: Region | Promise<Region> | undefined, confidence?: number | undefined, abort?: AbortSignal | undefined, providerData?: PROVIDER_DATA_TYPE | undefined);
}
