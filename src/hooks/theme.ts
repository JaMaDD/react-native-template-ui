import {
  useResponsiveProp,
  useTheme as useRestyleTheme,
  type PropValue,
  type ResponsiveValue,
} from '@shopify/restyle';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import type { Theme, ThemeBreakpoints } from '../types/theme';
import { darkTheme, lightTheme } from '../utils/theme/const';

/**
 * Hook to access the current theme object.
 * @returns The current theme configuration including colors, spacing, breakpoints, etc.
 * @example
 * const theme = useTheme();
 * console.log(theme.colors.themePri);
 */
export function useTheme(): Theme {
  return useRestyleTheme<Theme>();
}

/**
 * Hook to access the theme's color palette.
 * @returns Object containing all theme colors (themePri, themeSec, background, text, etc.).
 * @example
 * const colors = useThemeColors();
 * console.log(colors.themePri); // '#7ccf6b'
 */
export function useThemeColors(): Theme['colors'] {
  return useTheme().colors;
}

/**
 * Hook to access the theme's spacing scale.
 * @returns Object containing spacing values (none, xxxs, xxs, xs, s, m, l, xl, xxl, xxxl).
 * @example
 * const spacing = useThemeSpacing();
 * console.log(spacing.m); // 16
 */
export function useThemeSpacing(): Theme['spacing'] {
  return useTheme().spacing;
}

/**
 * Hook to access the theme's responsive breakpoints.
 * @returns Object containing breakpoint values (smallPhone, phone, smallTablet, tablet, desktop).
 * @example
 * const breakpoints = useThemeBreakpoints();
 * console.log(breakpoints.tablet); // 900
 */
export function useThemeBreakpoints(): Theme['breakpoints'] {
  return useTheme().breakpoints;
}

/**
 * Hook to resolve a responsive prop value based on the current breakpoint.
 * @template T - The type of the prop value
 * @param propValue - A responsive value object with breakpoint keys
 * @returns The resolved value for the current breakpoint
 * @example
 * const fontSize = useThemeBreakpointValues({ phone: 14, tablet: 16, desktop: 18 });
 */
export function useThemeBreakpointValues<T extends PropValue>(
  propValue: ResponsiveValue<T, Theme['breakpoints']>
) {
  return useResponsiveProp(propValue);
}

/**
 * Hook to get the current active breakpoint name.
 * @returns The name of the current breakpoint ('smallPhone' | 'phone' | 'smallTablet' | 'tablet' | 'desktop')
 * @example
 * const breakpoint = useThemeBreakpoint();
 * if (breakpoint === 'phone') {
 *   // Render mobile layout
 * }
 */
export function useThemeBreakpoint() {
  const responsiveVal: ResponsiveValue<PropValue, Theme['breakpoints']> = {
    smallPhone: 'smallPhone',
    phone: 'phone',
    smallTablet: 'smallTablet',
    tablet: 'tablet',
    desktop: 'desktop',
  };

  return useThemeBreakpointValues(responsiveVal) as ThemeBreakpoints;
}

/**
 * Hook to access the theme's z-index scale.
 * @returns Object containing z-index values (base, bottom, middle, top).
 * @example
 * const zIndices = useThemeZIndices();
 * console.log(zIndices.top); // 3
 */
export function useThemeZIndices(): Theme['zIndices'] {
  return useTheme().zIndices;
}

/**
 * Hook to access the theme's border radius scale.
 * @returns Object containing border radius values (none, s, m, l, round).
 * @example
 * const borderRadii = useThemeBorderRadii();
 * console.log(borderRadii.m); // 24
 */
export function useThemeBorderRadii(): Theme['borderRadii'] {
  return useTheme().borderRadii;
}

/**
 * Hook to access the theme's text style variants.
 * @returns Object containing text variant definitions (textXS, textS, textM, textL, textXL and their bold versions).
 * @example
 * const textVariants = useThemeTextVariants();
 * console.log(textVariants.textM);
 */
export function useThemeTextVariants(): Theme['textVariants'] {
  return useTheme().textVariants;
}

/**
 * Hook to determine if the current color scheme is dark mode.
 * @param overrideColorScheme - Optional color scheme to override the system's color scheme
 * @returns True if the color scheme is 'dark', false otherwise
 * @example
 * const isDark = useIsDarkColorScheme();
 * const backgroundColor = isDark ? '#000' : '#fff';
 */
export function useIsDarkColorScheme(overrideColorScheme?: ColorSchemeName) {
  const colorScheme = useColorScheme();

  return (overrideColorScheme ?? colorScheme) === 'dark';
}

/**
 * Hook to get the appropriate theme (light or dark) based on the current color scheme.
 * @param overrideColorScheme - Optional color scheme to override the system's color scheme
 * @returns The dark theme if in dark mode, otherwise the light theme
 * @example
 * const theme = useColorSchemeTheme();
 * // Returns darkTheme or lightTheme based on system preference
 */
export function useColorSchemeTheme(overrideColorScheme?: ColorSchemeName) {
  return useIsDarkColorScheme(overrideColorScheme) ? darkTheme : lightTheme;
}
