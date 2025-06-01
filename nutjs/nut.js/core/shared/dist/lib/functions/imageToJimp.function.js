"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageToJimp = void 0;
const jimp_1 = __importDefault(require("jimp"));
const colormode_enum_1 = require("../enums/colormode.enum");
function imageToJimp(image) {
    const jimpImage = new jimp_1.default({
        data: image.data,
        width: image.width,
        height: image.height
    });
    if (image.colorMode === colormode_enum_1.ColorMode.BGR) {
        // Image treats data in BGR format, so we have to switch red and blue color channels
        jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, function (_, __, idx) {
            const red = this.bitmap.data[idx];
            this.bitmap.data[idx] = this.bitmap.data[idx + 2];
            this.bitmap.data[idx + 2] = red;
        });
    }
    return jimpImage;
}
exports.imageToJimp = imageToJimp;
//# sourceMappingURL=imageToJimp.function.js.map