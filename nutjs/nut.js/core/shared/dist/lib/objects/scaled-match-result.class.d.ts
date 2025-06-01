import { MatchResult } from "./match-result.class";
export declare class ScaledMatchResult<LOCATION_TYPE> extends MatchResult<LOCATION_TYPE> {
    readonly confidence: number;
    readonly scale: number;
    readonly location: LOCATION_TYPE;
    readonly error?: Error | undefined;
    constructor(confidence: number, scale: number, location: LOCATION_TYPE, error?: Error | undefined);
}
