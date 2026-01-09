/**
 * Common test helper functions for UI component testing
 */

/**
 * Setup fake timers for tests that need precise timing control
 * Use this in beforeEach/afterEach blocks for components with animations
 * @example
 * beforeEach(() => {
 *   setupFakeTimers();
 * });
 * afterEach(() => {
 *   cleanupFakeTimers();
 * });
 */
export function setupFakeTimers() {
  jest.useFakeTimers();
  jest.spyOn(Date, 'now').mockImplementation(() => jest.now());
}

/**
 * Cleanup fake timers after tests
 */
export function cleanupFakeTimers() {
  jest.runOnlyPendingTimers();
  jest.restoreAllMocks();
  jest.useRealTimers();
}

/**
 * Advance fake timers by specified duration
 * @param milliseconds - Time to advance in milliseconds
 */
export function advanceTimers(milliseconds: number) {
  jest.advanceTimersByTime(milliseconds);
}

/**
 * Common test IDs for UI components
 */
export const TestIds = {
  BUTTON: 'test-button',
  ICON: 'test-icon',
  TEXT: 'test-text',
  VIEW: 'test-view',
  MODAL: 'test-modal',
  LOADING: 'test-loading',
  SLIDER: 'test-slider',
  SWITCH: 'test-switch',
} as const;

/**
 * Common test data
 */
export const TestData = {
  SAMPLE_TEXT: 'Sample Text',
  SAMPLE_TITLE: 'Sample Title',
  SAMPLE_DESCRIPTION: 'Sample Description',
} as const;
