/// <reference types="node" />
import { ColorMode } from "../enums/colormode.enum";
/**
 * The {@link Image} class represents generic image data
 */
export declare class Image {
    readonly width: number;
    readonly height: number;
    readonly data: Buffer;
    readonly channels: number;
    readonly id: string;
    readonly bitsPerPixel: number;
    readonly byteWidth: number;
    readonly colorMode: ColorMode;
    readonly pixelDensity: {
        scaleX: number;
        scaleY: number;
    };
    /**
     * {@link Image} class constructor
     * @param width {@link Image} width in pixels
     * @param height {@link Image} height in pixels
     * @param data Generic {@link Image} data
     * @param channels Amount of {@link Image} channels
     * @param id Image identifier
     * @param bitsPerPixel Number of bits per single pixel
     * @param byteWidth Total number of bytes per image line
     * @param colorMode An images color mode, defaults to {@link ColorMode.BGR}
     * @param pixelDensity Object containing scale info to work with e.g. Retina display data where the reported display size and pixel size differ (Default: {scaleX: 1.0, scaleY: 1.0})
     */
    constructor(width: number, height: number, data: Buffer, channels: number, id: string, bitsPerPixel: number, byteWidth: number, colorMode?: ColorMode, pixelDensity?: {
        scaleX: number;
        scaleY: number;
    });
    /**
     * {@link hasAlphaChannel} return true if an {@link Image} has an additional (fourth) alpha channel
     */
    get hasAlphaChannel(): boolean;
    /**
     * {@link toRGB} converts an {@link Image} from BGR color mode (default within nut.js) to RGB
     */
    toRGB(): Promise<Image>;
    /**
     * {@link toBGR} converts an {@link Image} from RGB color mode to RGB
     */
    toBGR(): Promise<Image>;
    /**
     * {@link fromRGBData} creates an {@link Image} from provided RGB data
     */
    static fromRGBData(width: number, height: number, data: Buffer, channels: number, id: string, bitsPerPixel: number, byteWidth: number): Image;
}
export declare function isImage(possibleImage: any): possibleImage is Image;
