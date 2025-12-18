import {
  useResponsiveProp,
  useTheme as useRestyleTheme,
  type PropValue,
  type ResponsiveValue,
} from '@shopify/restyle';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import type { Theme, ThemeBreakpoints } from '../types/theme';
import { darkTheme, lightTheme } from '../utils/theme/const';

export function useTheme<T extends Theme>() {
  return useRestyleTheme<T>();
}

export function useThemeColors<T extends Theme>() {
  return useTheme<T>().colors;
}

export function useThemeSpacing<T extends Theme>() {
  return useTheme<T>().spacing;
}

export function useThemeBreakpoints<T extends Theme>() {
  return useTheme<T>().breakpoints;
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

export function useThemeZIndices<T extends Theme>() {
  return useTheme<T>().zIndices;
}

export function useThemeBorderRadii<T extends Theme>() {
  return useTheme<T>().borderRadii;
}

export function useThemeTextVariants<T extends Theme>() {
  return useTheme<T>().textVariants;
}

export function useIsDarkColorScheme(overrideColorScheme?: ColorSchemeName) {
  const colorScheme = useColorScheme();

  return (overrideColorScheme ?? colorScheme) === 'dark';
}

export function useColorSchemeTheme(overrideColorScheme?: ColorSchemeName) {
  return useIsDarkColorScheme(overrideColorScheme) ? darkTheme : lightTheme;
}
