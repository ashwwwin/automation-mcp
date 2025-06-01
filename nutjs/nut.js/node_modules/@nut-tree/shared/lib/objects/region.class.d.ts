export declare class Region {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(left: number, top: number, width: number, height: number);
    area(): number;
    toString(): string;
}
export declare function isRegion(possibleRegion: any): possibleRegion is Region;
