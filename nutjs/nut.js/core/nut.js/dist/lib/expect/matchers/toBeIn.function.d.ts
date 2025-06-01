import { MouseClass } from "../../mouse.class";
import { Region } from "@nut-tree/shared";
export declare const toBeIn: (received: MouseClass, region: Region) => Promise<{
    message: () => string;
    pass: boolean;
}>;
