import { LogProviderInterface } from "@nut-tree/provider-interfaces";
import { ConsoleLogLevel, ConsoleLogProviderConfig } from "./provider/log/console-log-provider.class";
export declare const useLogger: (logger: LogProviderInterface) => void;
export declare const useConsoleLogger: (config?: ConsoleLogProviderConfig) => void;
export { ConsoleLogLevel };
