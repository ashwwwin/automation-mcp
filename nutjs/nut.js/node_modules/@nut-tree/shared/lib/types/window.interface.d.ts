import { OptionalSearchParameters, Point, Region, Size, WindowElementQuery } from "../objects";
import { WindowElement } from "./window-element.interface";
import { PointResultFindInput, RegionResultFindInput, WindowElementResultFindInput } from "./index";
export interface WindowInterface {
    getTitle(): Promise<string>;
    getRegion(): Promise<Region>;
    move(newOrigin: Point): Promise<boolean>;
    resize(newSize: Size): Promise<boolean>;
    focus(): Promise<boolean>;
    getElements(maxElements?: number): Promise<WindowElement>;
    find(searchInput: WindowElementResultFindInput | Promise<WindowElementResultFindInput>): Promise<WindowElement>;
    findAll(searchInput: WindowElementResultFindInput | Promise<WindowElementResultFindInput>): Promise<WindowElement[]>;
    waitFor<PROVIDER_DATA_TYPE>(searchInput: WindowElementQuery | Promise<WindowElementQuery>, timeoutMs?: number, updateInterval?: number, params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>): Promise<WindowElement>;
    on(searchInput: WindowElementQuery, callback: WindowElementCallback): void;
}
export type WindowedFindInput = RegionResultFindInput | WindowElementResultFindInput | PointResultFindInput;
export type WindowedFindResult = Region | Point | WindowElement;
export type WindowElementCallback = (target: WindowElement) => void | Promise<void>;
