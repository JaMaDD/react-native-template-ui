import type { RefObject } from 'react';
import type {
  ImageStyle,
  ReactNativeElement,
  StyleProp as RNStyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { ThemeSpacing } from './theme';

/**
 * Union type for all React Native style objects.
 *
 * Combines ViewStyle, TextStyle, and ImageStyle into a single type.
 */
export type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * React Native StyleProp type alias.
 *
 * Allows for single style objects, arrays of styles, or falsy values.
 * Generic parameter T defaults to Style but can be narrowed to specific style types.
 */
export type StyleProp<T = Style> = RNStyleProp<T>;

/**
 * Style or style prop type.
 *
 * Accepts either a direct style object or a StyleProp (array/conditional styles).
 * Useful for component props that accept flexible style inputs.
 */
export type StyleOrStyleProp<T = Style> = T | StyleProp<T>;

/**
 * Configuration for safe area inset padding.
 *
 * Allows components to automatically apply padding for device safe areas
 * (notches, status bars, home indicators, etc.) with optional customization per edge.
 *
 * @example
 * ```tsx
 * const config: InsetsStyleConfig = {
 *   insets: true,              // Apply to all edges
 *   insetTop: false,           // Exclude top
 *   insetsPadding: 'md',       // Use 'md' spacing for all edges
 *   insetPaddingBottom: 'lg'   // Override bottom with 'lg'
 * };
 * ```
 */
export type InsetsStyleConfig = {
  /** Apply safe area insets to all edges */
  insets?: boolean;
  /** Apply safe area inset to top edge */
  insetTop?: boolean;
  /** Apply safe area inset to bottom edge */
  insetBottom?: boolean;
  /** Apply safe area inset to left edge */
  insetLeft?: boolean;
  /** Apply safe area inset to right edge */
  insetRight?: boolean;
  /** Default spacing value for all inset edges */
  insetsPadding?: ThemeSpacing;
  /** Spacing value for top inset (overrides insetsPadding) */
  insetPaddingTop?: ThemeSpacing;
  /** Spacing value for bottom inset (overrides insetsPadding) */
  insetPaddingBottom?: ThemeSpacing;
  /** Spacing value for left inset (overrides insetsPadding) */
  insetPaddingLeft?: ThemeSpacing;
  /** Spacing value for right inset (overrides insetsPadding) */
  insetPaddingRight?: ThemeSpacing;
};

export type ElementRefObject = RefObject<ReactNativeElement | null>;
