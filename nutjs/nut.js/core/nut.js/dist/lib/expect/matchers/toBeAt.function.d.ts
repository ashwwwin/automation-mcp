import { MouseClass } from "../../mouse.class";
import { Point } from "@nut-tree/shared";
export declare const toBeAt: (received: MouseClass, position: Point) => Promise<{
    message: () => string;
    pass: boolean;
}>;
