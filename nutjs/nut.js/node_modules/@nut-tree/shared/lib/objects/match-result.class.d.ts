export declare class MatchResult<LOCATION_TYPE> {
    readonly confidence: number;
    readonly location: LOCATION_TYPE;
    readonly error?: Error | undefined;
    constructor(confidence: number, location: LOCATION_TYPE, error?: Error | undefined);
}
