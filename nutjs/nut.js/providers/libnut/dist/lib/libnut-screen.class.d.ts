import { Image, Region } from "@nut-tree/shared";
import { ScreenProviderInterface } from "@nut-tree/provider-interfaces";
export default class ScreenAction implements ScreenProviderInterface {
    private static determinePixelDensity;
    constructor();
    grabScreen(): Promise<Image>;
    grabScreenRegion(region: Region): Promise<Image>;
    highlightScreenRegion(region: Region, duration: number, opacity: number): Promise<void>;
    screenWidth(): Promise<number>;
    screenHeight(): Promise<number>;
    screenSize(): Promise<Region>;
}
