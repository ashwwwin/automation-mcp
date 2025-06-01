"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./clipboard-provider.interface"), exports);
__exportStar(require("./color-finder.interface"), exports);
__exportStar(require("./data-sink.interface"), exports);
__exportStar(require("./data-source.interface"), exports);
__exportStar(require("./image-finder.interface"), exports);
__exportStar(require("./image-processor.interface"), exports);
__exportStar(require("./image-reader.type"), exports);
__exportStar(require("./image-writer.type"), exports);
__exportStar(require("./keyboard-provider.interface"), exports);
__exportStar(require("./log-provider.interface"), exports);
__exportStar(require("./mouse-provider.interface"), exports);
__exportStar(require("./screen-provider.interface"), exports);
__exportStar(require("./text-finder.interface"), exports);
__exportStar(require("./window-finder.interface"), exports);
__exportStar(require("./window-provider.interface"), exports);
__exportStar(require("./provider-registry.interface"), exports);
__exportStar(require("./element-inspection-provider.interface"), exports);
//# sourceMappingURL=index.js.map