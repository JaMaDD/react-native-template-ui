import { useRestyle } from '@shopify/restyle';
import type { TextInputProps, ThemedTextInputProps } from '../types/textInput';
import type { ThemeTextVariants } from '../types/theme';
import { textInputDefaultTextVariant } from '../utils/textInput/const';
import { themedTextInputRestyleFuncs } from '../utils/theme/restyle';
import {
  useThemeBreakpoint,
  useThemeColors,
  useThemeTextVariants,
} from './theme';

/** @internal */
export function useThemedTextInput({
  cursorColor,
  selectionHandleColor,
  underlineColorAndroid,
  placeholderTextColor,
  selectionColor,
  variant = textInputDefaultTextVariant,
  ...props
}: ThemedTextInputProps) {
  const themeTextVariants = useThemeTextVariants();
  const themeColors = useThemeColors();
  const breakpoint = useThemeBreakpoint();
  const restyle = useRestyle(themedTextInputRestyleFuncs, {
    ...themeTextVariants[
      typeof variant === 'object'
        ? (variant[breakpoint] ??
          (textInputDefaultTextVariant as ThemeTextVariants))
        : (variant as ThemeTextVariants)
    ],
    ...props,
  } as Omit<ThemedTextInputProps, keyof TextInputProps | 'ref' | 'variant'>);

  return {
    cursorColor: themeColors[cursorColor ?? 'themePri'],
    selectionHandleColor: themeColors[selectionHandleColor ?? 'themePri'],
    underlineColorAndroid: underlineColorAndroid
      ? themeColors[underlineColorAndroid]
      : undefined,
    placeholderTextColor: themeColors[placeholderTextColor ?? 'text'],
    selectionColor: themeColors[selectionColor ?? 'themePriT'],
    restyle,
  };
}
