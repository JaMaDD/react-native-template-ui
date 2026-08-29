import type { RefObject } from 'react';
import type {
  TextInputProps as RNTextInputProps,
  TextInputInstance,
} from 'react-native';
import type { ThemedTextProps } from './text';
import type { ThemeColors } from './theme';
import type { ThemedViewProps } from './view';

export type TextInputRefObj = RefObject<TextInputInstance | null>;

/** @internal */
export type TextInputProps = {
  cursorColor?: ThemeColors;
  selectionHandleColor?: ThemeColors;
  underlineColorAndroid?: ThemeColors;
  placeholderTextColor?: ThemeColors;
  selectionColor?: ThemeColors;
};

export type ThemedTextInputProps = TextInputProps &
  Omit<
    RNTextInputProps,
    | 'cursorColor'
    | 'selectionHandleColor'
    | 'underlineColorAndroid'
    | 'placeholderTextColor'
    | 'selectionColor'
  > &
  Omit<ThemedTextProps, 'children'> &
  Omit<ThemedViewProps, 'ref' | 'children'> & {
    ref?: TextInputRefObj;
  };
