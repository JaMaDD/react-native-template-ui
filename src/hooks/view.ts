import { useRestyle } from '@shopify/restyle';
import { useRef } from 'react';
import type { View } from 'react-native';
import type { AnimatedThemedViewProps, AnimatedViewProps } from '../types/view';
import { animatedThemedViewRestyleFuncs } from '../utils/theme/restyle';

/**
 * Hook to create a ref for a View component.
 * @returns A mutable ref object for accessing the View instance
 * @example
 * const viewRef = useViewRef();
 * <View ref={viewRef} />
 * // Later: viewRef.current?.measure(...)
 */
export function useViewRef() {
  return useRef<View>(null);
}

/**
 * Hook to create animated themed view props with reanimated support.
 * @param props - Animated themed view properties including theme props and animatedStyle
 * @param props.animatedStyle - Reanimated style object to apply to the view
 * @returns Object containing all animated view props with applied theme styles and animations
 * @example
 * const animatedStyle = useAnimatedStyle(() => ({
 *   transform: [{ translateX: progress.value * 100 }]
 * }));
 * const viewProps = useAnimatedThemedView({
 *   backgroundColor: 'themePri',
 *   padding: 'm',
 *   borderRadius: 'm',
 *   animatedStyle
 * });
 */
export function useAnimatedThemedView({
  animatedStyle,
  ...props
}: AnimatedThemedViewProps) {
  const { style, ...restyle } = useRestyle(
    animatedThemedViewRestyleFuncs,
    props
  );

  const animatedThemedViewProps: AnimatedViewProps = {
    ...restyle,
    style: [style, animatedStyle],
    accessible: true,
    role: 'group',
  };

  return animatedThemedViewProps;
}
