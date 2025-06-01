"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOutputPath = void 0;
const path_1 = require("path");
const process_1 = require("process");
const shared_1 = require("@nut-tree/shared");
/**
 * {@link generateOutputPath} is used to assemble full file path from a filename and various parameters
 * @param filename The base filename
 * @param params A config object which allows to configure {@link FileType}, base path, filename prefix and filename postfix
 */
const generateOutputPath = (filename, params) => {
    const name = (0, path_1.parse)(filename).name;
    const imageType = (params === null || params === void 0 ? void 0 : params.type) ? params.type : shared_1.FileType.PNG;
    const path = (params === null || params === void 0 ? void 0 : params.path) ? params.path : (0, process_1.cwd)();
    const prefix = (params === null || params === void 0 ? void 0 : params.prefix) ? params.prefix : "";
    const postfix = (params === null || params === void 0 ? void 0 : params.postfix) ? params.postfix : "";
    return (0, path_1.join)(path, `${prefix}${name}${postfix}${imageType}`);
};
exports.generateOutputPath = generateOutputPath;
//# sourceMappingURL=generate-output-path.function.js.map