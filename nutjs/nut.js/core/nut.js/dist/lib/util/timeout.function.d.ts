import { AbortSignal } from "node-abort-controller";
export interface TimoutConfig {
    signal?: AbortSignal;
}
export declare function timeout<R>(updateIntervalMs: number, maxDurationMs: number, action: (...params: any) => Promise<R>, config?: TimoutConfig): Promise<R>;
