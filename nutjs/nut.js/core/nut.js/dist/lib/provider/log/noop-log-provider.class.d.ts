import { LogProviderInterface } from "@nut-tree/provider-interfaces";
export declare class NoopLogProvider implements LogProviderInterface {
    trace(_: string, __?: {}): void;
    debug(_: string, __?: {}): void;
    info(_: string, __?: {}): void;
    warn(_: string, __?: {}): void;
    error(_: Error, __?: {}): void;
}
