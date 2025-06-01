import { Image } from "./image.class";
export declare class MatchRequest<NEEDLE_TYPE, PROVIDER_DATA_TYPE> {
    readonly haystack: Image;
    readonly needle: NEEDLE_TYPE;
    readonly confidence: number | undefined;
    readonly providerData?: PROVIDER_DATA_TYPE | undefined;
    constructor(haystack: Image, needle: NEEDLE_TYPE, confidence: number | undefined, providerData?: PROVIDER_DATA_TYPE | undefined);
}
