"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogLevel = exports.useConsoleLogger = exports.useLogger = void 0;
const console_log_provider_class_1 = require("./provider/log/console-log-provider.class");
Object.defineProperty(exports, "ConsoleLogLevel", { enumerable: true, get: function () { return console_log_provider_class_1.ConsoleLogLevel; } });
const provider_registry_class_1 = __importDefault(require("./provider/provider-registry.class"));
const useLogger = (logger) => {
    provider_registry_class_1.default.registerLogProvider(logger);
};
exports.useLogger = useLogger;
const useConsoleLogger = (config) => {
    provider_registry_class_1.default.registerLogProvider(new console_log_provider_class_1.ConsoleLogProvider(config));
};
exports.useConsoleLogger = useConsoleLogger;
//# sourceMappingURL=logging.function.js.map