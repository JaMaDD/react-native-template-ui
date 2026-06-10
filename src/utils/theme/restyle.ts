/** @internal */
import {
  backgroundColor,
  backgroundColorShorthand,
  border,
  color,
  composeRestyleFunctions,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  spacingShorthand,
  typography,
} from '@shopify/restyle';
import type {
  AnimatedThemedPressableProps,
  ThemedPressableProps,
} from '../../types/button';
import type { IconProps, ThemedIconProps } from '../../types/icon';
import type { LoadingProps, ThemedLoadingProps } from '../../types/loading';
import type { InsetsStyleConfig } from '../../types/style';
import type {
  TextInputProps,
  ThemedTextInputProps,
} from '../../types/textInput';
import type { Theme } from '../../types/theme';
import type {
  AnimatedThemedViewProps,
  ThemedScrollViewProps,
} from '../../types/view';

const restyleBaseFuncs = [spacing, spacingShorthand, layout, position];

const restyleBackgroundFuncs = [backgroundColor, backgroundColorShorthand];

const restyleTextFuncs = [color, typography];

const restyleViewFuncs = [
  ...restyleBaseFuncs,
  ...restyleBackgroundFuncs,
  opacity,
  border,
  shadow,
];

/**
 * Composed Restyle functions for ThemedPressable components.
 * Provides type-safe theme-aware styling props for pressable elements.
 * Supports spacing, layout, background, opacity, border, and shadow properties.
 *
 * @internal
 *
 * @example
 * ```tsx
 * const StyledPressable = createRestyleComponent(
 *   themedPressableRestyleFuncs,
 *   Pressable
 * );
 * ```
 */
export const themedPressableRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedPressableProps, 'onPress' | 'scaleRatio' | 'onPressDelayConfig'>
>(restyleViewFuncs);

/**
 * Composed Restyle functions for AnimatedThemedPressable components.
 * Similar to themedPressableRestyleFuncs but for animated pressable components.
 * Excludes animatedStyle prop to prevent conflicts with Reanimated.
 *
 * @internal
 *
 * @example
 * ```tsx
 * const AnimatedStyledPressable = createRestyleComponent(
 *   animatedThemedPressableRestyleFuncs,
 *   Animated.Pressable
 * );
 * ```
 */
export const animatedThemedPressableRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<
    AnimatedThemedPressableProps,
    'onPress' | 'scaleRatio' | 'onPressDelayConfig' | 'animatedStyle'
  >
>(restyleViewFuncs);

/**
 * Composed Restyle functions for ThemedLoading components.
 * Provides theme-aware styling props for loading indicators.
 * Supports spacing, layout, and position properties (no background or color).
 *
 * @internal
 *
 * @example
 * ```tsx
 * const StyledLoading = createRestyleComponent(
 *   themedLoadingRestyleFuncs,
 *   ActivityIndicator
 * );
 * ```
 */
export const themedLoadingRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedLoadingProps, keyof LoadingProps>
>(restyleBaseFuncs);

/**
 * Composed Restyle functions for ThemedLoading color prop.
 * Handles only the color property for loading indicators.
 * Separated to allow independent color theming.
 *
 * @internal
 *
 * @example
 * ```tsx
 * const { color } = useRestyle(themedLoadingColorRestyleFuncs, props);
 * ```
 */
export const themedLoadingColorRestyleFuncs = composeRestyleFunctions<
  Theme,
  Pick<ThemedLoadingProps, 'color'>
>([
  // @ts-expect-error
  color,
]);

/**
 * Composed Restyle functions for ThemedIcon components.
 * Provides theme-aware styling props for icon elements.
 * Supports spacing, layout, and position properties (no color here).
 *
 * @internal
 *
 * @example
 * ```tsx
 * const StyledIcon = createRestyleComponent(
 *   themedIconRestyleFuncs,
 *   Icon
 * );
 * ```
 */
export const themedIconRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedIconProps, keyof IconProps>
>(restyleBaseFuncs);

/**
 * Composed Restyle functions for ThemedIcon color prop.
 * Handles only the color property for icons.
 * Separated to allow independent color theming.
 *
 * @internal
 *
 * @example
 * ```tsx
 * const { color } = useRestyle(themedIconColorRestyleFuncs, props);
 * ```
 */
export const themedIconColorRestyleFuncs = composeRestyleFunctions<
  Theme,
  Pick<ThemedIconProps, 'color'>
>([
  // @ts-expect-error
  color,
]);

/**
 * Composed Restyle functions for AnimatedThemedView components.
 * Provides theme-aware styling props for animated view elements.
 * Supports full view styling including spacing, layout, background, opacity, border, and shadow.
 * Excludes animatedStyle prop to prevent conflicts with Reanimated.
 *
 * @internal
 *
 * @example
 * ```tsx
 * const AnimatedStyledView = createRestyleComponent(
 *   animatedThemedViewRestyleFuncs,
 *   Animated.View
 * );
 * ```
 */
export const animatedThemedViewRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<AnimatedThemedViewProps, 'animatedStyle'>
>(restyleViewFuncs);

/**
 * Composed Restyle functions for ThemedScrollView components.
 * Provides theme-aware styling props for scroll view containers.
 * Supports spacing, layout, and position properties (base functions only).
 * Excludes insets and ref props which are handled separately.
 *
 * @internal
 *
 * @example
 * ```tsx
 * const StyledScrollView = createRestyleComponent(
 *   themedScrollViewRestyleFuncs,
 *   ScrollView
 * );
 * ```
 */
export const themedScrollViewRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedScrollViewProps, keyof InsetsStyleConfig | 'ref'>
>(restyleBaseFuncs);

export const themedTextInputRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedTextInputProps, keyof TextInputProps | 'ref' | 'variant'>
>([...restyleTextFuncs, ...restyleViewFuncs]);
