import { useRestyle } from '@shopify/restyle';
import { useEffect, useRef } from 'react';
import type { View, ViewStyle } from 'react-native';
import type { InsetsStyleConfig } from '../types/style';
import type {
  AnimatedThemedViewProps,
  AnimatedViewProps,
  ThemedScreenWrapProps,
} from '../types/view';
import { composeStyles } from '../utils/style/func';
import { animatedThemedViewRestyleFuncs } from '../utils/theme/restyle';
import { useInsetsStyle } from './style';

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

/**
 * Hook to create themed screen wrap styles with safe area inset support and effect management.
 * @param props - Themed screen wrap properties including effect setup/cleanup and inset styles
 * @returns Style object combining themed screen wrap styles with calculated inset styles
 * @example
 * const style = useThemedScreenWrap({
 *   effectSetup: () => console.log('Mounted'),
 *   effectCleanup: () => console.log('Unmounted'),
 *   insets: true,
 *   insetPaddingTop: 'm',
 * });
 */
export function useThemedScreenWrap({
  effectSetup,
  effectCleanup,
  effectDependencies = [],
  style: themedScreenWrapStyle,
  insets,
  insetTop,
  insetBottom,
  insetLeft,
  insetRight,
  insetsPadding,
  insetPaddingTop,
  insetPaddingBottom,
  insetPaddingLeft,
  insetPaddingRight,
}: Pick<
  ThemedScreenWrapProps,
  | 'effectSetup'
  | 'effectCleanup'
  | 'effectDependencies'
  | 'style'
  | keyof InsetsStyleConfig
>) {
  const insetsStyle = useInsetsStyle({
    insets,
    insetTop,
    insetBottom,
    insetLeft,
    insetRight,
    insetsPadding,
    insetPaddingTop,
    insetPaddingBottom,
    insetPaddingLeft,
    insetPaddingRight,
  });
  useEffect(() => {
    effectSetup?.();

    return effectCleanup;
  }, effectDependencies);

  return composeStyles<ViewStyle>(themedScreenWrapStyle, insetsStyle);
}
