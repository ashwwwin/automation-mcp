"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogProvider = exports.ConsoleLogLevel = void 0;
var ConsoleLogLevel;
(function (ConsoleLogLevel) {
    ConsoleLogLevel[ConsoleLogLevel["TRACE"] = 0] = "TRACE";
    ConsoleLogLevel[ConsoleLogLevel["DEBUG"] = 1] = "DEBUG";
    ConsoleLogLevel[ConsoleLogLevel["INFO"] = 2] = "INFO";
    ConsoleLogLevel[ConsoleLogLevel["WARN"] = 3] = "WARN";
    ConsoleLogLevel[ConsoleLogLevel["ERROR"] = 4] = "ERROR";
})(ConsoleLogLevel || (exports.ConsoleLogLevel = ConsoleLogLevel = {}));
const defaultConfig = {
    logLevel: ConsoleLogLevel.INFO,
    withTimeStamp: true
};
class ConsoleLogProvider {
    constructor(config = defaultConfig) {
        var _a, _b;
        this.trace = this.trace.bind(this);
        this.debug = this.debug.bind(this);
        this.info = this.info.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
        this.logLevel = (_a = config.logLevel) !== null && _a !== void 0 ? _a : ConsoleLogLevel.INFO;
        this.withTimeStamp = (_b = config.withTimeStamp) !== null && _b !== void 0 ? _b : true;
    }
    log(logLevel, message, data) {
        if (logLevel >= this.logLevel) {
            const timeStampPrefix = `${new Date().toISOString()} - `;
            const extendedMessage = `${this.withTimeStamp == null || this.withTimeStamp ? timeStampPrefix : ""}${ConsoleLogLevel[logLevel]} - ${message instanceof Error ? message.message : message}`;
            switch (logLevel) {
                case ConsoleLogLevel.TRACE:
                    if (data) {
                        console.trace(extendedMessage, data);
                    }
                    else {
                        console.trace(extendedMessage);
                    }
                    break;
                case ConsoleLogLevel.DEBUG:
                    if (data) {
                        console.debug(extendedMessage, data);
                    }
                    else {
                        console.debug(extendedMessage);
                    }
                    break;
                case ConsoleLogLevel.INFO:
                    if (data) {
                        console.info(extendedMessage, data);
                    }
                    else {
                        console.info(extendedMessage);
                    }
                    break;
                case ConsoleLogLevel.WARN:
                    if (data) {
                        console.warn(extendedMessage, data);
                    }
                    else {
                        console.warn(extendedMessage);
                    }
                    break;
                case ConsoleLogLevel.ERROR:
                    message.message = extendedMessage;
                    if (data) {
                        console.error(message, data);
                    }
                    else {
                        console.error(message);
                    }
                    break;
            }
        }
    }
    trace(message, data) {
        this.log(ConsoleLogLevel.TRACE, message, data);
    }
    debug(message, data) {
        this.log(ConsoleLogLevel.DEBUG, message, data);
    }
    info(message, data) {
        this.log(ConsoleLogLevel.INFO, message, data);
    }
    warn(message, data) {
        this.log(ConsoleLogLevel.WARN, message, data);
    }
    error(message, data) {
        this.log(ConsoleLogLevel.ERROR, message, data);
    }
}
exports.ConsoleLogProvider = ConsoleLogProvider;
//# sourceMappingURL=console-log-provider.class.js.map