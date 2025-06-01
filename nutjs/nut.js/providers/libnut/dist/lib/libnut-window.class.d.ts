import { Point, Region, Size } from "@nut-tree/shared";
import { WindowProviderInterface } from "@nut-tree/provider-interfaces";
export default class WindowAction implements WindowProviderInterface {
    getWindows(): Promise<number[]>;
    getActiveWindow(): Promise<number>;
    getWindowRegion(windowHandle: number): Promise<Region>;
    getWindowTitle(windowHandle: number): Promise<string>;
    focusWindow(windowHandle: number): Promise<boolean>;
    moveWindow(windowHandle: number, newOrigin: Point): Promise<boolean>;
    resizeWindow(windowHandle: number, newSize: Size): Promise<boolean>;
    minimizeWindow(_: number): Promise<boolean>;
    restoreWindow(_: number): Promise<boolean>;
}
