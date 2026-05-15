/**
 * Scale ratios applied to buttons during press animations.
 * These values determine how much a button shrinks when pressed, creating visual feedback.
 *
 * @example
 * ```tsx
 * <Button scaleRatio={ButtonScaleRatio.Square}>
 *   Press Me
 * </Button>
 * ```
 */
export enum ButtonScaleRatio {
  /** Scale to 90% - suitable for square or circular buttons */
  Square = 0.9,
  /** Scale to 98% - subtle effect for rectangular buttons */
  Rectangle = 0.98,
  /** No scaling animation */
  None = 1,
}

/**
 * Delay strategies for handling rapid button press events.
 * Controls how multiple press events are processed over time.
 *
 * @example
 * ```tsx
 * <Button onPressDelayConfig={{ type: OnPressDelayType.Throttle, delay: 1000 }}>
 *   Submit
 * </Button>
 * ```
 */
export enum OnPressDelayType {
  /** Throttle - Execute the first press, then ignore subsequent presses for the delay period */
  Throttle,
  /** Debounce - Wait for the delay period after the last press before executing */
  Debounce,
}
