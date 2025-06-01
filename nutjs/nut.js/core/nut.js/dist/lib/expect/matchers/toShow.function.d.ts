import { ScreenClass } from "../../screen.class";
import { FindInput, OptionalSearchParameters, Region } from "@nut-tree/shared";
export declare const toShow: <PROVIDER_DATA>(received: ScreenClass | Region, needle: FindInput, parameters?: OptionalSearchParameters<PROVIDER_DATA> | undefined) => Promise<{
    message: () => string;
    pass: boolean;
}>;
