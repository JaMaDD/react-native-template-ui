import { useSharedValue } from 'react-native-reanimated';
import type { AnimationValue } from '../types/reanimated';

/**
 * Hook to create a shared value for animations initialized to 0.
 * @returns A shared value initialized to 0, used for controlling animations
 * @example
 * const animValue = useAnimationSharedVal();
 * const animatedStyle = useAnimatedStyle(() => ({
 *   opacity: animValue.value
 * }));
 * // Later: animValue.value = withTiming(1);
 */
export function useAnimationSharedVal() {
  return useSharedValue<AnimationValue>(0);
}
