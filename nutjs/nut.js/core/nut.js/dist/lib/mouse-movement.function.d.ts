/**
 * {@link EasingFunction}s are used to modify movement behaviour.
 *
 * See https://easings.net/ for reference
 */
export interface EasingFunction {
    (progressPercentage: number): number;
}
export declare const calculateStepDuration: (speedInPixelsPerSecond: number) => number;
export declare const calculateMovementTimesteps: (amountOfSteps: number, speedInPixelsPerSecond: number, easingFunction?: EasingFunction) => number[];
export declare const linear: EasingFunction;
