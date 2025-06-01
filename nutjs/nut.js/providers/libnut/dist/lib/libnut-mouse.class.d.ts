import { Button, Point } from "@nut-tree/shared";
import { MouseProviderInterface } from "@nut-tree/provider-interfaces";
export default class MouseAction implements MouseProviderInterface {
    static buttonLookup(btn: Button): any;
    private static ButtonLookupMap;
    constructor();
    setMouseDelay(delay: number): void;
    setMousePosition(p: Point): Promise<void>;
    currentMousePosition(): Promise<Point>;
    click(btn: Button): Promise<void>;
    doubleClick(btn: Button): Promise<void>;
    leftClick(): Promise<void>;
    rightClick(): Promise<void>;
    middleClick(): Promise<void>;
    pressButton(btn: Button): Promise<void>;
    releaseButton(btn: Button): Promise<void>;
    scrollUp(amount: number): Promise<void>;
    scrollDown(amount: number): Promise<void>;
    scrollLeft(amount: number): Promise<void>;
    scrollRight(amount: number): Promise<void>;
}
