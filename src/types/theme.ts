import type {
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  BoxProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  SpacingProps,
  SpacingShorthandProps,
  TextProps,
} from '@shopify/restyle';

export type Theme = globalThis.ReactNativeTemplateTheme;

export type ThemeColors = keyof Theme['colors'];

export type ThemeSpacing = keyof Theme['spacing'];

export type ThemeBreakpoints = keyof Theme['breakpoints'];

export type ThemeZIndices = keyof Theme['zIndices'];

export type ThemeBorderRadii = keyof Theme['borderRadii'];

export type ThemeTextVariants = keyof Theme['textVariants'];

export type ThemeViewProps = BoxProps<Theme>;

export type ThemeTextProps = TextProps<Theme>;

export type ThemeColorProps = ColorProps<Theme>;

export type ThemeSpacingProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme>;

export type ThemeBackgroundColorProps = BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme>;

export type ThemeBaseProps = ThemeSpacingProps &
  ThemeBackgroundColorProps &
  LayoutProps<Theme> &
  PositionProps<Theme>;
