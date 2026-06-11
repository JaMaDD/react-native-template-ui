import { Dimensions, StyleSheet } from 'react-native';
import type {
  ElementRefObject,
  Style,
  StyleOrStyleProp,
} from '../../types/style';
import { elementDefaultDOMRect } from './const';

/**
 * Creates a stylesheet from a style object with type safety.
 * Wrapper around React Native's StyleSheet.create for better type inference.
 *
 * @param styles - Object containing named styles
 * @returns A stylesheet object with optimized and frozen styles
 *
 * @example
 * ```tsx
 * const styles = createStyleSheet({
 *   container: {
 *     flex: 1,
 *     padding: 16
 *   }
 * });
 * ```
 */
export function createStyleSheet<T extends Record<string, Style>>(styles: T) {
  return StyleSheet.create<T>(styles);
}

/**
 * Composes two style objects or style props into a single style.
 * Handles arrays, objects, and null/undefined values automatically.
 *
 * @param style1 - First style to compose
 * @param style2 - Second style to compose (overrides style1 properties)
 * @returns Composed style object
 *
 * @example
 * ```tsx
 * const combinedStyle = composeStyles(baseStyle, overrideStyle);
 * ```
 */
export function composeStyles<T extends Style>(
  style1?: StyleOrStyleProp<T>,
  style2?: StyleOrStyleProp<T>
) {
  return StyleSheet.compose<T, T, T>(style1, style2);
}

/**
 * Flattens an array of styles into a single style object.
 * Useful for resolving style arrays into their final computed values.
 *
 * @param style - Style or array of styles to flatten
 * @returns Flattened style object with all properties resolved
 *
 * @example
 * ```tsx
 * const flatStyle = flattenStyle([styles.base, styles.active]);
 * console.log(flatStyle.backgroundColor); // Access resolved value
 * ```
 */
export function flattenStyle<T extends Style>(style: StyleOrStyleProp<T>) {
  return StyleSheet.flatten<T>(style);
}

/**
 * Gets the current window dimensions.
 *
 * @returns Object containing width, height, scale, and fontScale
 *
 * @example
 * ```tsx
 * const { width, height } = getWindowDimensions();
 * ```
 */
export function getWindowDimensions() {
  return Dimensions.get('window');
}

/**
 * Gets the current window width in pixels.
 *
 * @returns Window width in pixels
 *
 * @example
 * ```tsx
 * const width = getWindowDimensionsWidth();
 * ```
 */
export function getWindowDimensionsWidth() {
  return getWindowDimensions().width;
}

/**
 * Gets the current window height in pixels.
 *
 * @returns Window height in pixels
 *
 * @example
 * ```tsx
 * const height = getWindowDimensionsHeight();
 * ```
 */
export function getWindowDimensionsHeight() {
  return getWindowDimensions().height;
}

/**
 * Gets the device pixel density scale factor.
 *
 * @returns Device scale factor (e.g., 2 for @2x, 3 for @3x displays)
 *
 * @example
 * ```tsx
 * const scale = getWindowDimensionsScale();
 * const physicalPixels = logicalPixels * scale;
 * ```
 */
export function getWindowDimensionsScale() {
  return getWindowDimensions().scale;
}

/**
 * Gets the font scaling factor set by the user in device accessibility settings.
 *
 * @returns Font scale factor (typically 1.0, but can be higher for accessibility)
 *
 * @example
 * ```tsx
 * const fontScale = getWindowDimensionsFontScale();
 * const actualFontSize = baseFontSize * fontScale;
 * ```
 */
export function getWindowDimensionsFontScale() {
  return getWindowDimensions().fontScale;
}

export function getElementBoundingClientRect(ref: ElementRefObject): DOMRect {
  return ref.current?.getBoundingClientRect() ?? elementDefaultDOMRect;
}
