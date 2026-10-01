/**
 * Setup fake timers for tests that involve animations or delays
 */
export function setupFakeTimers() {
  jest.useFakeTimers();
  jest.spyOn(Date, 'now').mockImplementation(() => jest.now());
}

/**
 * Cleanup fake timers after each test
 */
export function cleanupFakeTimers() {
  jest.runOnlyPendingTimers();
  jest.restoreAllMocks();
  jest.useRealTimers();
}

/**
 * Advance timers by a specific duration
 * @param duration - Time in milliseconds
 */
export function advanceTimersByTime(duration: number) {
  jest.advanceTimersByTime(duration);
}
