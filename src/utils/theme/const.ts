import { createTheme } from '@shopify/restyle';
import { StyleSheet } from 'react-native';

/**
 * Color palette used throughout the application.
 * Contains primary theme colors and semantic colors with transparency variants.
 *
 * @example
 * ```tsx
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: Palette.ThemePri,
 *     borderColor: Palette.Silver
 *   }
 * });
 * ```
 */
export enum Palette {
  /** Fully transparent color */
  Transparent = 'transparent',
  /** Primary theme color - bright green */
  ThemePri = '#7ccf6b',
  /** Secondary theme color - darker green */
  ThemeSec = '#5aa85a',
  /** Primary theme color with 50% transparency */
  ThemePriT = '#7ccf6b80',
  /** Near black - used for text in light mode */
  Black = '#000501',
  /** Black with 50% transparency */
  BlackT = '#00050180',
  /** Off-white - used for backgrounds in light mode */
  White = '#fafafa',
  /** White with 50% transparency */
  WhiteT = '#fafafa80',
  /** Light gray - used for disabled states */
  Silver = '#c4c4c4',
  /** Medium gray - used for borders */
  Grey = '#7a7a7a',
  /** Red - used for errors and destructive actions */
  Red = '#ff3b30',
}

/**
 * Spacing scale used for margins, padding, and gaps.
 * Based on a geometric progression for consistent spacing ratios.
 *
 * @example
 * ```tsx
 * <View style={{ padding: Spacing.M, gap: Spacing.S }}>
 *   <Text>Content</Text>
 * </View>
 * ```
 */
export enum Spacing {
  /** No spacing - 0px */
  None = 0,
  /** Extra extra extra small - 2px */
  XXXS = 2,
  /** Extra extra small - 4px */
  XXS = 4,
  /** Extra small - 6px */
  XS = 6,
  /** Small - 10px */
  S = 10,
  /** Medium - 16px */
  M = 16,
  /** Large - 26px */
  L = 26,
  /** Extra large - 42px */
  XL = 42,
  /** Extra extra large - 68px */
  XXL = 68,
  /** Extra extra extra large - 110px */
  XXXL = 110,
}

/**
 * Font size scale for text elements.
 * Provides consistent typography sizing across the application.
 *
 * @example
 * ```tsx
 * <Text style={{ fontSize: FontSize.M }}>
 *   Medium text
 * </Text>
 * ```
 */
export enum FontSize {
  /** Extra small - 12px */
  XS = 12,
  /** Small - 16px */
  S = 16,
  /** Medium - 20px */
  M = 20,
  /** Large - 24px */
  L = 24,
  /** Extra large - 28px */
  XL = 28,
}

/** @internal */
const FontLineHeightRatio = 1.4;

/**
 * Line heights calculated from font sizes with a 1.4 ratio.
 * Ensures proper vertical spacing and readability for text.
 *
 * @example
 * ```tsx
 * <Text style={{
 *   fontSize: FontSize.M,
 *   lineHeight: FontLineHeight.M
 * }}>
 *   Readable text
 * </Text>
 * ```
 */
export enum FontLineHeight {
  /** Extra small line height - 16.8px (12px * 1.4) */
  XS = FontSize.XS * FontLineHeightRatio,
  /** Small line height - 22.4px (16px * 1.4) */
  S = FontSize.S * FontLineHeightRatio,
  /** Medium line height - 28px (20px * 1.4) */
  M = FontSize.M * FontLineHeightRatio,
  /** Large line height - 33.6px (24px * 1.4) */
  L = FontSize.L * FontLineHeightRatio,
  /** Extra large line height - 39.2px (28px * 1.4) */
  XL = FontSize.XL * FontLineHeightRatio,
}

/**
 * Size options for switch components.
 * Values represent the width/height of the switch track in pixels.
 *
 * @example
 * ```tsx
 * <Switch size={SwitchSize.M} />
 * ```
 */
export enum SwitchSize {
  /** Small switch - 16px */
  S = 16,
  /** Medium switch - 22px */
  M = 22,
  /** Large switch - 28px */
  L = 28,
}

/**
 * Border width/thickness options.
 * Includes hairline width for platform-specific thin borders.
 *
 * @example
 * ```tsx
 * <View style={{ borderWidth: BorderSize.M }}>
 *   Content
 * </View>
 * ```
 */
export enum BorderSize {
  /** No border - 0px */
  None = 0,
  /** Hairline border - thinnest possible border for the platform (typically 0.5-1px) */
  XS = StyleSheet.hairlineWidth,
  /** Small border - 1px */
  S = 1,
  /** Medium border - 2px */
  M = 2,
  /** Large border - 4px */
  L = 4,
  /** Extra large border - 8px */
  XL = 8,
}

/**
 * Border radius options for rounded corners.
 * Round value creates fully circular shapes when applied to square elements.
 *
 * @example
 * ```tsx
 * <View style={{ borderRadius: BorderRadius.M }}>
 *   Rounded corners
 * </View>
 * ```
 */
export enum BorderRadius {
  /** No rounding - sharp corners */
  None = 0,
  /** Small radius - 12px */
  S = 12,
  /** Medium radius - 24px */
  M = 24,
  /** Large radius - 36px */
  L = 36,
  /** Fully rounded - creates circles/pills (9999px) */
  Round = 9999,
}

/**
 * Z-index layering values for stacking order.
 * Controls which elements appear above others in the visual hierarchy.
 *
 * @example
 * ```tsx
 * <View style={{ zIndex: ZIndex.Top }}>
 *   Top layer content
 * </View>
 * ```
 */
export enum ZIndex {
  /** Base layer - 0 */
  Base = 0,
  /** Bottom layer - 1 */
  Bottom = 1,
  /** Middle layer - 2 */
  Middle = 2,
  /** Top layer - 3 */
  Top = 3,
}

/** @internal */
const textVariants = {
  textXS: {
    fontSize: FontSize.XS,
    lineHeight: FontLineHeight.XS,
    color: 'text',
  },
  textS: {
    fontSize: FontSize.S,
    lineHeight: FontLineHeight.S,
    color: 'text',
  },
  textM: {
    fontSize: FontSize.M,
    lineHeight: FontLineHeight.M,
    color: 'text',
  },
  textL: {
    fontSize: FontSize.L,
    lineHeight: FontLineHeight.L,
    color: 'text',
  },
  textXL: {
    fontSize: FontSize.XL,
    lineHeight: FontLineHeight.XL,
    color: 'text',
  },
};

/**
 * Light theme configuration for the application.
 * Contains all theme values including colors, spacing, breakpoints, and text variants.
 * Built using Shopify Restyle for type-safe styling.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@shopify/restyle';
 * import { lightTheme } from './utils/theme/const';
 *
 * <ThemeProvider theme={lightTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const lightTheme = createTheme({
  colors: {
    transparent: Palette.Transparent,
    themePri: Palette.ThemePri,
    themeSec: Palette.ThemeSec,
    themePriT: Palette.ThemePriT,
    background: Palette.White,
    backgroundOverlay: Palette.BlackT,
    text: Palette.Black,
    textOverlay: Palette.White,
    textButton: Palette.White,
    border: Palette.Grey,
    separator: Palette.Silver,
    err: Palette.Red,
  },
  spacing: {
    none: Spacing.None,
    xxxs: Spacing.XXXS,
    xxs: Spacing.XXS,
    xs: Spacing.XS,
    s: Spacing.S,
    m: Spacing.M,
    l: Spacing.L,
    xl: Spacing.XL,
    xxl: Spacing.XXL,
    xxxl: Spacing.XXXL,
  },
  breakpoints: {
    smallPhone: 0,
    phone: 300,
    smallTablet: 600,
    tablet: 900,
    desktop: 1200,
  },
  zIndices: {
    base: ZIndex.Base,
    bottom: ZIndex.Bottom,
    middle: ZIndex.Middle,
    top: ZIndex.Top,
  },
  borderRadii: {
    none: BorderRadius.None,
    s: BorderRadius.S,
    m: BorderRadius.M,
    l: BorderRadius.L,
    round: BorderRadius.Round,
  },
  textVariants: {
    ...textVariants,
    textXSBold: {
      ...textVariants.textXS,
      fontWeight: 'bold',
    },
    textSBold: {
      ...textVariants.textS,
      fontWeight: 'bold',
    },
    textMBold: {
      ...textVariants.textM,
      fontWeight: 'bold',
    },
    textLBold: {
      ...textVariants.textL,
      fontWeight: 'bold',
    },
    textXLBold: {
      ...textVariants.textXL,
      fontWeight: 'bold',
    },
    defaults: textVariants.textM,
  },
});

/**
 * Dark theme configuration for the application.
 * Extends the light theme with inverted background and text colors.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@shopify/restyle';
 * import { darkTheme } from './utils/theme/const';
 *
 * <ThemeProvider theme={darkTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: Palette.Black,
    text: Palette.White,
  },
};
