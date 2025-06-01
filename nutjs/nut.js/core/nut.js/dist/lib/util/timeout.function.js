"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = void 0;
function timeout(updateIntervalMs, maxDurationMs, action, config) {
    return new Promise((resolve, reject) => {
        let interval;
        let timerCleaned = false;
        let lastResult;
        let lastRejectionReason;
        if (config === null || config === void 0 ? void 0 : config.signal) {
            config.signal.onabort = () => {
                cleanupTimer();
                reject(`Action aborted by signal`);
            };
        }
        function executeInterval() {
            action().then(validateResult).catch(handleRejection);
        }
        function validateResult(result) {
            if (!result && !timerCleaned) {
                interval = setTimeout(executeInterval, updateIntervalMs);
            }
            else {
                lastResult = result;
                lastRejectionReason = null;
                cleanupTimer();
                resolve(result);
            }
        }
        function handleRejection(reason) {
            lastRejectionReason = reason;
            lastResult = null;
            if (!timerCleaned) {
                interval = setTimeout(executeInterval, updateIntervalMs);
            }
        }
        function cleanupTimer() {
            timerCleaned = true;
            if (maxTimeout) {
                clearTimeout(maxTimeout);
            }
            if (interval) {
                clearTimeout(interval);
            }
        }
        const maxTimeout = setTimeout(() => {
            cleanupTimer();
            let additionalInformation;
            if (lastResult == null && lastRejectionReason != null) {
                additionalInformation = `Last rejection reason was: ${lastRejectionReason}.`;
            }
            else if (lastResult == null && lastRejectionReason == null) {
                additionalInformation = `Didn't receive a result within timeout.`;
            }
            reject(`Action timed out after ${maxDurationMs} ms.${additionalInformation ? ` ${additionalInformation}` : ""}`);
        }, maxDurationMs);
        executeInterval();
    });
}
exports.timeout = timeout;
//# sourceMappingURL=timeout.function.js.map