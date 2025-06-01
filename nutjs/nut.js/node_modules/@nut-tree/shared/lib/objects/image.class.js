"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImage = exports.Image = void 0;
const imageToJimp_function_1 = require("../functions/imageToJimp.function");
const colormode_enum_1 = require("../enums/colormode.enum");
/**
 * The {@link Image} class represents generic image data
 */
class Image {
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
    constructor(width, height, data, channels, id, bitsPerPixel, byteWidth, colorMode = colormode_enum_1.ColorMode.BGR, pixelDensity = {
        scaleX: 1.0,
        scaleY: 1.0,
    }) {
        this.width = width;
        this.height = height;
        this.data = data;
        this.channels = channels;
        this.id = id;
        this.bitsPerPixel = bitsPerPixel;
        this.byteWidth = byteWidth;
        this.colorMode = colorMode;
        this.pixelDensity = pixelDensity;
        if (channels <= 0) {
            throw new Error("Channel <= 0");
        }
    }
    /**
     * {@link hasAlphaChannel} return true if an {@link Image} has an additional (fourth) alpha channel
     */
    get hasAlphaChannel() {
        return this.channels > 3;
    }
    /**
     * {@link toRGB} converts an {@link Image} from BGR color mode (default within nut.js) to RGB
     */
    async toRGB() {
        if (this.colorMode === colormode_enum_1.ColorMode.RGB) {
            return this;
        }
        const rgbImage = (0, imageToJimp_function_1.imageToJimp)(this);
        return new Image(this.width, this.height, rgbImage.bitmap.data, this.channels, this.id, this.bitsPerPixel, this.byteWidth, colormode_enum_1.ColorMode.RGB, this.pixelDensity);
    }
    /**
     * {@link toBGR} converts an {@link Image} from RGB color mode to RGB
     */
    async toBGR() {
        if (this.colorMode === colormode_enum_1.ColorMode.BGR) {
            return this;
        }
        const rgbImage = (0, imageToJimp_function_1.imageToJimp)(this);
        return new Image(this.width, this.height, rgbImage.bitmap.data, this.channels, this.id, this.bitsPerPixel, this.byteWidth, colormode_enum_1.ColorMode.BGR, this.pixelDensity);
    }
    /**
     * {@link fromRGBData} creates an {@link Image} from provided RGB data
     */
    static fromRGBData(width, height, data, channels, id, bitsPerPixel, byteWidth) {
        const rgbImage = new Image(width, height, data, channels, id, bitsPerPixel, byteWidth);
        const jimpImage = (0, imageToJimp_function_1.imageToJimp)(rgbImage);
        return new Image(width, height, jimpImage.bitmap.data, channels, id, bitsPerPixel, byteWidth);
    }
}
exports.Image = Image;
const testImage = new Image(100, 100, Buffer.from([]), 4, "typeCheck", 4, 100 * 4);
const imageKeys = Object.keys(testImage);
function isImage(possibleImage) {
    if (typeof possibleImage !== "object") {
        return false;
    }
    for (const key of imageKeys) {
        if (!(key in possibleImage)) {
            return false;
        }
        const possibleImageKeyType = typeof possibleImage[key];
        const imageKeyType = typeof testImage[key];
        if (possibleImageKeyType !== imageKeyType) {
            return false;
        }
    }
    return true;
}
exports.isImage = isImage;
//# sourceMappingURL=image.class.js.map