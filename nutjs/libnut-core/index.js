let libnut;
if (process.platform === 'darwin') {
    libnut = require("./permissionCheck");
} else {
    libnut = require("bindings")("libnut");
}

module.exports = libnut;

module.exports.screen = {};

function bitmap(width, height, byteWidth, bitsPerPixel, bytesPerPixel, image) {
    this.width = width;
    this.height = height;
    this.byteWidth = byteWidth;
    this.bitsPerPixel = bitsPerPixel;
    this.bytesPerPixel = bytesPerPixel;
    this.image = image;
}

module.exports.screen.highlight = function (x, y, width, height, duration, opacity) {
    let highlightOpacity = (opacity < 0) ? 0 : opacity;
    highlightOpacity = (highlightOpacity > 1) ? 1 : highlightOpacity;
    const highlightDuration = (duration < 0) ? 0 : duration;

    libnut.highlight(x, y, width, height, highlightDuration, highlightOpacity);
}

module.exports.screen.capture = function (x, y, width, height) {
    let b;
    //If coords have been passed, use them.
    if (
        typeof x !== "undefined" &&
        typeof y !== "undefined" &&
        typeof width !== "undefined" &&
        typeof height !== "undefined"
    ) {
        b = libnut.captureScreen(x, y, width, height);
    } else {
        b = libnut.captureScreen();
    }

    return new bitmap(
        b.width,
        b.height,
        b.byteWidth,
        b.bitsPerPixel,
        b.bytesPerPixel,
        b.image
    );
};
