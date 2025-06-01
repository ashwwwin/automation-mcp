"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWindowElementQuery = exports.isWindowQuery = exports.isTextQuery = exports.isLineQuery = exports.isWordQuery = exports.isColorQuery = void 0;
/**
 * Type guard for {@link ColorQuery}
 * @param possibleQuery A possible color query
 */
const isColorQuery = (possibleQuery) => {
    var _a;
    return (possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.type) === "color" && ((_a = possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.by) === null || _a === void 0 ? void 0 : _a.color) != null;
};
exports.isColorQuery = isColorQuery;
/**
 * Type guard for {@link WordQuery}
 * @param possibleQuery A possible word query
 */
const isWordQuery = (possibleQuery) => {
    var _a;
    return (possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.type) === "text" && ((_a = possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.by) === null || _a === void 0 ? void 0 : _a.word) != null;
};
exports.isWordQuery = isWordQuery;
/**
 * Type guard for {@link LineQuery}
 * @param possibleQuery A possible line query
 */
const isLineQuery = (possibleQuery) => {
    var _a;
    return (possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.type) === "text" && ((_a = possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.by) === null || _a === void 0 ? void 0 : _a.line) != null;
};
exports.isLineQuery = isLineQuery;
/**
 * Type guard for {@link TextQuery}
 * @param possibleQuery A possible line or word query
 */
const isTextQuery = (possibleQuery) => {
    return (possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.type) === "text";
};
exports.isTextQuery = isTextQuery;
/**
 * Type guard for {@link WindowQuery}
 * @param possibleQuery A possible window query
 */
const isWindowQuery = (possibleQuery) => {
    return (possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.type) === "window";
};
exports.isWindowQuery = isWindowQuery;
/**
 * Type guard for {@link WindowElementQuery}
 * @param possibleQuery A possible window element query
 */
const isWindowElementQuery = (possibleQuery) => {
    return (possibleQuery === null || possibleQuery === void 0 ? void 0 : possibleQuery.type) === "window-element";
};
exports.isWindowElementQuery = isWindowElementQuery;
//# sourceMappingURL=query.class.js.map