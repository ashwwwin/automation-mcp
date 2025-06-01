import { LogProviderInterface } from "@nut-tree/provider-interfaces";
export declare enum ConsoleLogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}
export interface ConsoleLogProviderConfig {
    logLevel?: ConsoleLogLevel;
    withTimeStamp?: boolean;
}
export declare class ConsoleLogProvider implements LogProviderInterface {
    private readonly logLevel;
    private readonly withTimeStamp;
    constructor(config?: ConsoleLogProviderConfig);
    private log;
    trace(message: string, data?: {}): void;
    debug(message: string, data?: {}): void;
    info(message: string, data?: {}): void;
    warn(message: string, data?: {}): void;
    error(message: Error, data?: {}): void;
}
