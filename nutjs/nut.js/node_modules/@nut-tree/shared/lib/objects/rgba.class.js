"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RGBA = void 0;
class RGBA {
    constructor(R, G, B, A) {
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    }
    toString() {
        return `rgba(${this.R},${this.G},${this.B},${this.A})`;
    }
    toHex() {
        return `#${this.R.toString(16).padStart(2, "0")}${this.G.toString(16).padStart(2, "0")}${this.B.toString(16).padStart(2, "0")}${this.A.toString(16).padStart(2, "0")}`;
    }
}
exports.RGBA = RGBA;
//# sourceMappingURL=rgba.class.js.map