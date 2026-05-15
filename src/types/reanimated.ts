import type { SharedValue } from 'react-native-reanimated';

/**
 * Animation state values.
 *
 * Binary animation states: 0 (hidden/collapsed/off) and 1 (visible/expanded/on).
 */
export type AnimationValue = 0 | 1;

/**
 * Reanimated shared value for animation states.
 *
 * A shared value that holds animation state (0 or 1) for use in Reanimated animations.
 */
export type AnimationSharedValue = SharedValue<AnimationValue>;

/**
 * Custom animation function type.
 *
 * Allows implementing custom animation behaviors for components.
 * The function receives a shared value, target value, and optional completion callback.
 *
 * @example
 * ```tsx
 * const customAnimation: CustomAnimation = (sharedValue, toValue, onComplete) => {
 *   sharedValue.value = withTiming(toValue, { duration: 300 }, () => {
 *     runOnJS(onComplete)();
 *   });
 * };
 * ```
 */
export type CustomAnimation<T = AnimationValue> = (
  /** Shared value to animate */
  sharedValue: AnimationSharedValue,
  /** Target value for the animation */
  toValue: T,
  /** Optional callback invoked when animation completes */
  animationCompletedCallback?: () => void
) => void;
