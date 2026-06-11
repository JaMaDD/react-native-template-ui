import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type DependencyList,
} from 'react';
import {
  useWindowDimensions as useRNWindowDimensions,
  type ReactNativeElement,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { InsetsStyleConfig } from '../types/style';
import type { ThemeColors } from '../types/theme';
import {
  elementDefaultDOMRect,
  ElementScreenPosition,
  Orientation,
  shadowDefaultBlurRadius,
  shadowDefaultOffset,
  ShadowDirection,
} from '../utils/style/const';
import { getElementBoundingClientRect } from '../utils/style/func';
import { useThemeColors, useThemeSpacing } from './theme';

/**
 * Hook to calculate padding styles based on safe area insets.
 * @param config - Configuration object specifying which insets to apply and optional padding values
 * @param config.insets - If true, applies all insets (top, bottom, left, right)
 * @param config.insetTop - If true, applies top inset
 * @param config.insetBottom - If true, applies bottom inset
 * @param config.insetLeft - If true, applies left inset
 * @param config.insetRight - If true, applies right inset
 * @param config.insetsPadding - Additional padding to apply to all insets
 * @param config.insetPaddingTop - Additional padding to apply to top inset
 * @param config.insetPaddingBottom - Additional padding to apply to bottom inset
 * @param config.insetPaddingLeft - Additional padding to apply to left inset
 * @param config.insetPaddingRight - Additional padding to apply to right inset
 * @returns ViewStyle object with calculated padding values for safe areas
 * @example
 * const insetsStyle = useInsetsStyle({
 *   insets: true,
 *   insetsPadding: 'm'
 * });
 * // Returns: { paddingTop: 44 + 16, paddingBottom: 34 + 16, ... }
 */
export function useInsetsStyle({
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
}: InsetsStyleConfig) {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const spacing = useThemeSpacing();

  const insetsStyle: Pick<
    ViewStyle,
    'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'
  > = JSON.parse(
    JSON.stringify({
      paddingTop:
        (insetTop ?? insets)
          ? top + spacing[insetPaddingTop ?? insetsPadding ?? 'none']
          : undefined,
      paddingBottom:
        (insetBottom ?? insets)
          ? bottom + spacing[insetPaddingBottom ?? insetsPadding ?? 'none']
          : undefined,
      paddingLeft:
        (insetLeft ?? insets)
          ? left + spacing[insetPaddingLeft ?? insetsPadding ?? 'none']
          : undefined,
      paddingRight:
        (insetRight ?? insets)
          ? right + spacing[insetPaddingRight ?? insetsPadding ?? 'none']
          : undefined,
    })
  );

  return insetsStyle;
}

/**
 * Hook to get the window dimensions including width, height, scale, and fontScale.
 * @returns Object containing window dimensions { width, height, scale, fontScale }
 * @example
 * const { width, height } = useWindowDimensions();
 * console.log(`Screen size: ${width}x${height}`);
 */
export function useWindowDimensions() {
  return useRNWindowDimensions();
}

/**
 * Hook to get the current window width in pixels.
 * @returns The width of the window in pixels
 * @example
 * const width = useWindowDimensionsWidth();
 * console.log(`Window width: ${width}px`);
 */
export function useWindowDimensionsWidth() {
  return useWindowDimensions().width;
}

/**
 * Hook to get the current window height in pixels.
 * @returns The height of the window in pixels
 * @example
 * const height = useWindowDimensionsHeight();
 * console.log(`Window height: ${height}px`);
 */
export function useWindowDimensionsHeight() {
  return useWindowDimensions().height;
}

/**
 * Hook to get the pixel density scale of the device.
 * @returns The scale factor (e.g., 2 for @2x, 3 for @3x displays)
 * @example
 * const scale = useWindowDimensionsScale();
 * console.log(`Device scale: ${scale}x`);
 */
export function useWindowDimensionsScale() {
  return useWindowDimensions().scale;
}

/**
 * Hook to get the font scaling factor set by the user in device settings.
 * @returns The font scale factor (1.0 is default, >1.0 means larger text is enabled)
 * @example
 * const fontScale = useWindowDimensionsFontScale();
 * const adjustedFontSize = 16 * fontScale;
 */
export function useWindowDimensionsFontScale() {
  return useWindowDimensions().fontScale;
}

/**
 * Hook to determine the current device orientation.
 * @returns The current orientation ('portrait' or 'landscape')
 * @example
 * const orientation = useOrientation();
 * if (orientation === Orientation.Landscape) {
 *   // Render landscape layout
 * }
 */
export function useOrientation() {
  const { width, height } = useWindowDimensions();

  const orientation =
    width > height ? Orientation.Landscape : Orientation.Portrait;

  return orientation;
}

/**
 * Hook to generate a box shadow style based on the specified direction and theme color.
 * @param direction - The direction of the shadow (top, bottom, left, right, all)
 * @param color - The theme color to use for the shadow (default is 'themePriT')
 * @returns A ViewStyle object containing the calculated boxShadow property
 * @example
 * const shadowStyle = useShadowStyle(ShadowDirection.Bottom, 'themeSecT');
 * // Returns: { boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }
 */
export function useShadowStyle(
  direction: ShadowDirection,
  color: ThemeColors = 'themePriT'
): ViewStyle {
  const themeColors = useThemeColors();
  const boxShadow = useMemo(() => {
    const shadowColor = themeColors[color];
    switch (direction) {
      case ShadowDirection.Top:
        return `0px -${shadowDefaultOffset}px ${shadowDefaultBlurRadius}px ${shadowColor}`;
      case ShadowDirection.Bottom:
        return `0px ${shadowDefaultOffset}px ${shadowDefaultBlurRadius}px ${shadowColor}`;
      case ShadowDirection.Left:
        return `-${shadowDefaultOffset}px 0px ${shadowDefaultBlurRadius}px ${shadowColor}`;
      case ShadowDirection.Right:
        return `${shadowDefaultOffset}px 0px ${shadowDefaultBlurRadius}px ${shadowColor}`;
      case ShadowDirection.All:
        return `0px 0px ${shadowDefaultBlurRadius}px ${shadowColor}`;
      default:
        return undefined;
    }
  }, [direction, color, themeColors]);

  return { boxShadow };
}

export function useElementBoundingClientRect<T extends ReactNativeElement>(
  refreshElementBoundingClientRectDeps: DependencyList = []
) {
  const windowHeight = useWindowDimensionsHeight();
  const ref = useRef<T>(null);
  const [elementBoundingClientRect, setElementBoundingClientRect] = useState(
    elementDefaultDOMRect
  );
  const [elementScreenPosition, setElementScreenPosition] =
    useState<ElementScreenPosition>(ElementScreenPosition.Lower);
  const refreshElementBoundingClientReact = () => {
    const tempElementScreenPosition = getElementBoundingClientRect(ref);
    setElementBoundingClientRect(tempElementScreenPosition);
    setElementScreenPosition(
      tempElementScreenPosition.y > windowHeight / 2
        ? ElementScreenPosition.Upper
        : ElementScreenPosition.Lower
    );
  };
  useLayoutEffect(() => {
    refreshElementBoundingClientReact();
  }, [
    refreshElementBoundingClientReact,
    ...refreshElementBoundingClientRectDeps,
  ]);

  return {
    ref,
    elementBoundingClientRect,
    elementScreenPosition,
    refreshElementBoundingClientReact,
  };
}
