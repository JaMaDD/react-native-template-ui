import { useRestyle } from '@shopify/restyle';
import { useRef } from 'react';
import type { TextInput } from 'react-native';
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
  cursorColor = 'themePri',
  selectionHandleColor = 'themePri',
  underlineColorAndroid,
  placeholderTextColor = 'textDesc',
  selectionColor = 'themePriT',
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
  } as Omit<ThemedTextInputProps, keyof TextInputProps | 'variant'>);

  return {
    cursorColor: themeColors[cursorColor],
    selectionHandleColor: themeColors[selectionHandleColor],
    underlineColorAndroid: underlineColorAndroid
      ? themeColors[underlineColorAndroid]
      : undefined,
    placeholderTextColor: themeColors[placeholderTextColor],
    selectionColor: themeColors[selectionColor],
    restyle,
  };
}

export function useTextInputRef() {
  return useRef<TextInput>(null);
}
