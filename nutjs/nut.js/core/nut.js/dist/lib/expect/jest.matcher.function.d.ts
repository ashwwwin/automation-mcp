import { FindInput, OptionalSearchParameters, Point, Region, RGBA } from "@nut-tree/shared";
import { toBeAt } from "./matchers/toBeAt.function";
import { toBeIn } from "./matchers/toBeIn.function";
import { toShow } from "./matchers/toShow.function";
import { toHaveColor } from "./matchers/toHaveColor.function";
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeAt: (position: Point) => ReturnType<typeof toBeAt>;
            toBeIn: (region: Region) => ReturnType<typeof toBeIn>;
            toShow: <PROVIDER_DATA>(needle: FindInput, parameters?: OptionalSearchParameters<PROVIDER_DATA>) => ReturnType<typeof toShow>;
            toHaveColor: (color: RGBA) => ReturnType<typeof toHaveColor>;
        }
    }
}
export declare const jestMatchers: {
    toBeAt: (received: import("../mouse.class").MouseClass, position: Point) => Promise<{
        message: () => string;
        pass: boolean;
    }>;
    toBeIn: (received: import("../mouse.class").MouseClass, region: Region) => Promise<{
        message: () => string;
        pass: boolean;
    }>;
    toShow: <PROVIDER_DATA>(received: Region | import("../screen.class").ScreenClass, needle: FindInput, parameters?: OptionalSearchParameters<PROVIDER_DATA> | undefined) => Promise<{
        message: () => string;
        pass: boolean;
    }>;
    toHaveColor: (received: Point, needle: RGBA) => Promise<{
        message: () => string;
        pass: boolean;
    }>;
};
