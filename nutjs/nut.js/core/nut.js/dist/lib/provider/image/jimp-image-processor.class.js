"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const shared_1 = require("@nut-tree/shared");
class default_1 {
    async colorAt(image, point) {
        const location = await point;
        const img = await image;
        if (location.x < 0 || location.x >= img.width) {
            throw Error(`Query location out of bounds. Should be in range 0 <= x < image.width, is ${location.x}`);
        }
        if (location.y < 0 || location.y >= img.height) {
            throw Error(`Query location out of bounds. Should be in range 0 <= y < image.height, is ${location.y}`);
        }
        const jimpImage = (0, shared_1.imageToJimp)(img);
        const rgba = jimp_1.default.intToRGBA(jimpImage.getPixelColor(location.x, location.y));
        return new shared_1.RGBA(rgba.r, rgba.g, rgba.b, rgba.a);
    }
}
exports.default = default_1;
//# sourceMappingURL=jimp-image-processor.class.js.map