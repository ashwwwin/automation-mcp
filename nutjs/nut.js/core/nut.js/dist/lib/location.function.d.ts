import { Point, Region } from "@nut-tree/shared";
/**
 * {@link centerOf} returns the center {@link Point} for a given {@link Region}
 * @param target {@link Region} to determine the center {@link Point} for
 */
export declare const centerOf: (target: Region | Promise<Region>) => Promise<Point>;
/**
 * {@link randomPointIn} returns a random {@link Point} within a given {@link Region}
 * @param target {@link Region} the random {@link Point} has to be within
 */
export declare const randomPointIn: (target: Region | Promise<Region>) => Promise<Point>;
