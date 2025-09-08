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
} from '@shopify/restyle';
import type { PressableProps, ThemedPressableProps } from '../../types/btn';
import type { IconProps, ThemedIconProps } from '../../types/icon';
import type { LoadingProps, ThemedLoadingProps } from '../../types/loading';
import type { InsetsStyleConfig } from '../../types/style';
import type { Theme } from '../../types/theme';
import type { ThemedScrollViewProps } from '../../types/view';

const restyleBaseFuncs = [spacing, spacingShorthand, layout, position];

const restyleBackgroundFuncs = [backgroundColor, backgroundColorShorthand];

export const themedPressableRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedPressableProps, keyof PressableProps>
>([...restyleBaseFuncs, ...restyleBackgroundFuncs, opacity, border, shadow]);

export const themedLoadingRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedLoadingProps, keyof LoadingProps>
>(restyleBaseFuncs);

export const themedLoadingColorRestyleFuncs = composeRestyleFunctions<
  Theme,
  Pick<ThemedLoadingProps, 'color'>
>([
  // @ts-expect-error
  color,
]);

export const themedIconRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedIconProps, keyof IconProps>
>(restyleBaseFuncs);

export const themedIconColorRestyleFuncs = composeRestyleFunctions<
  Theme,
  Pick<ThemedIconProps, 'color'>
>([
  // @ts-expect-error
  color,
]);

export const themedScrollViewRestyleFuncs = composeRestyleFunctions<
  Theme,
  Omit<ThemedScrollViewProps, keyof InsetsStyleConfig | 'ref'>
>(restyleBaseFuncs);
