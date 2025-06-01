import { RGBA } from "./rgba.class";
import { WindowElementDescription } from "../types";
type Query = {
    id: string;
    type: "text";
    by: {
        line: string;
    };
} | {
    id: string;
    type: "text";
    by: {
        word: string;
    };
} | {
    id: string;
    type: "window";
    by: {
        title: string | RegExp;
    };
} | {
    id: string;
    type: "color";
    by: {
        color: RGBA;
    };
} | {
    id: string;
    type: "window-element";
    by: {
        description: WindowElementDescription;
    };
};
export type TextQuery = Extract<Query, {
    type: "text";
}>;
/**
 * A word query is a text query that searches for a single word on screen.
 * It will be processed by an {@link TextFinderInterface} instance.
 */
export type WordQuery = Extract<TextQuery, {
    by: {
        word: string;
    };
}>;
/**
 * A word query is a text query that searches for a single text line on screen.
 * It will be processed by an {@link TextFinderInterface} instance.
 */
export type LineQuery = Extract<TextQuery, {
    by: {
        line: string;
    };
}>;
/**
 * A window query is a query that searches for a window on screen.
 * It will be processed by an {@link WindowFinderInterface} instance.
 */
export type WindowQuery = Extract<Query, {
    type: "window";
}>;
/**
 * A window element query is a query that searches for an element of a window.
 * It will be processed by an {@link ElementInspectionProviderInterface} instance.
 */
export type WindowElementQuery = Extract<Query, {
    type: "window-element";
}>;
/**
 * A color query is a query that searches for a certain RGBA color on screen.
 * It will be processed by an {@link ColorFinderInterface} instance.
 */
export type ColorQuery = Extract<Query, {
    type: "color";
}>;
/**
 * Type guard for {@link ColorQuery}
 * @param possibleQuery A possible color query
 */
export declare const isColorQuery: (possibleQuery: any) => possibleQuery is {
    id: string;
    type: "color";
    by: {
        color: RGBA;
    };
};
/**
 * Type guard for {@link WordQuery}
 * @param possibleQuery A possible word query
 */
export declare const isWordQuery: (possibleQuery: any) => possibleQuery is {
    id: string;
    type: "text";
    by: {
        word: string;
    };
};
/**
 * Type guard for {@link LineQuery}
 * @param possibleQuery A possible line query
 */
export declare const isLineQuery: (possibleQuery: any) => possibleQuery is {
    id: string;
    type: "text";
    by: {
        line: string;
    };
};
/**
 * Type guard for {@link TextQuery}
 * @param possibleQuery A possible line or word query
 */
export declare const isTextQuery: (possibleQuery: any) => possibleQuery is TextQuery;
/**
 * Type guard for {@link WindowQuery}
 * @param possibleQuery A possible window query
 */
export declare const isWindowQuery: (possibleQuery: any) => possibleQuery is {
    id: string;
    type: "window";
    by: {
        title: string | RegExp;
    };
};
/**
 * Type guard for {@link WindowElementQuery}
 * @param possibleQuery A possible window element query
 */
export declare const isWindowElementQuery: (possibleQuery: any) => possibleQuery is {
    id: string;
    type: "window-element";
    by: {
        description: WindowElementDescription;
    };
};
export {};
