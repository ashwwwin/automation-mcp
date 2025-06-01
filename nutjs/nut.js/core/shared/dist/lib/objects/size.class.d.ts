export declare class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
    area(): number;
    toString(): string;
}
export declare function isSize(possibleSize: any): possibleSize is Size;
