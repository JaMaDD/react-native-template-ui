import {
  useResponsiveProp,
  useTheme as useRestyleTheme,
  type PropValue,
  type ResponsiveValue,
} from '@shopify/restyle';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import type { Theme, ThemeBreakpoints } from '../types/theme';
import { darkTheme, lightTheme } from '../utils/theme/const';

/** @internal */
export function useTheme() {
  return useRestyleTheme<Theme>();
}

export function useThemeColors() {
  return useTheme().colors;
}

export function useThemeSpacing() {
  return useTheme().spacing;
}

export function useThemeBreakpoints() {
  return useTheme().breakpoints;
}

export function useThemeBreakpointValues<T extends PropValue>(
  propValue: ResponsiveValue<T, Theme['breakpoints']>
) {
  return useResponsiveProp(propValue);
}

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

export function useThemeZIndices() {
  return useTheme().zIndices;
}

export function useThemeBorderRadii() {
  return useTheme().borderRadii;
}

export function useThemeTextVariants() {
  return useTheme().textVariants;
}

export function useIsDarkColorScheme(overrideColorScheme?: ColorSchemeName) {
  const colorScheme = useColorScheme();

  return (overrideColorScheme ?? colorScheme) === 'dark';
}

export function useColorSchemeTheme(overrideColorScheme?: ColorSchemeName) {
  return useIsDarkColorScheme(overrideColorScheme) ? darkTheme : lightTheme;
}
