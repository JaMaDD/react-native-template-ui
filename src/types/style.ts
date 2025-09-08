import type {
  ImageStyle,
  StyleProp as RNStyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { ThemeSpacing } from './theme';

export type Style = ViewStyle | TextStyle | ImageStyle;

export type StyleProp<T = Style> = RNStyleProp<T>;

export type StyleOrStyleProp<T = Style> = T | StyleProp<T>;

export type InsetsStyleConfig = {
  insets?: boolean;
  insetTop?: boolean;
  insetBottom?: boolean;
  insetLeft?: boolean;
  insetRight?: boolean;
  insetsPadding?: ThemeSpacing;
  insetPaddingTop?: ThemeSpacing;
  insetPaddingBottom?: ThemeSpacing;
  insetPaddingLeft?: ThemeSpacing;
  insetPaddingRight?: ThemeSpacing;
};
