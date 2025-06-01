import { OptionalSearchParameters, Point, Region, Size, WindowElement, WindowElementCallback, WindowElementQuery, WindowElementResultFindInput, WindowInterface } from "@nut-tree/shared";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";
export declare class Window implements WindowInterface {
    private providerRegistry;
    private windowHandle;
    private findHooks;
    constructor(providerRegistry: ProviderRegistry, windowHandle: number);
    get title(): Promise<string>;
    getTitle(): Promise<string>;
    get region(): Promise<Region>;
    getRegion(): Promise<Region>;
    move(newOrigin: Point): Promise<boolean>;
    resize(newSize: Size): Promise<boolean>;
    focus(): Promise<boolean>;
    minimize(): Promise<boolean>;
    restore(): Promise<boolean>;
    getElements(maxElements?: number): Promise<WindowElement>;
    /**
     * {@link find} will search for a single occurrence of a given search input in the current window.
     * @param searchInput A {@link WindowedFindInput} instance
     */
    find(searchInput: WindowElementResultFindInput | Promise<WindowElementResultFindInput>): Promise<WindowElement>;
    /**
     * {@link findAll} will search for multiple occurrence of a given search input in the current window.
     * @param searchInput A {@link WindowedFindInput} instance
     */
    findAll(searchInput: WindowElementResultFindInput | Promise<WindowElementResultFindInput>): Promise<WindowElement[]>;
    /**
     * {@link waitFor} repeatedly searches for a query to appear in the window until it is found or the timeout is reached
     * @param searchInput A {@link WindowElementQuery} instance
     * @param timeoutMs Timeout in milliseconds after which {@link waitFor} fails
     * @param updateInterval Update interval in milliseconds to retry search
     * @param params {@link OptionalSearchParameters} which are used to fine tune search
     */
    waitFor<PROVIDER_DATA_TYPE>(searchInput: WindowElementQuery | Promise<WindowElementQuery>, timeoutMs?: number, updateInterval?: number, params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>): Promise<WindowElement>;
    /**
     * {@link on} registers a callback which is triggered once a certain searchInput image is found
     * @param searchInput to trigger the callback on
     * @param callback The {@link FindHookCallback} function to trigger
     */
    on(searchInput: WindowElementQuery, callback: WindowElementCallback): void;
    private getHooksForInput;
}
