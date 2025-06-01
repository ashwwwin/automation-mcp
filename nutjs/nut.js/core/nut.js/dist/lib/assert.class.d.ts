import { FindInput, Region } from "@nut-tree/shared";
import { ScreenClass } from "./screen.class";
export declare class AssertClass {
    private screen;
    constructor(screen: ScreenClass);
    isVisible(searchInput: FindInput | Promise<FindInput>, searchRegion?: Region | Promise<Region>, confidence?: number): Promise<void>;
    notVisible(searchInput: FindInput | Promise<FindInput>, searchRegion?: Region | Promise<Region>, confidence?: number): Promise<void>;
}
