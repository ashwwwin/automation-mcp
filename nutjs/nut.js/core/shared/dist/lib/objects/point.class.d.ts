export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    toString(): string;
}
export declare function isPoint(possiblePoint: any): possiblePoint is Point;
