import type {
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  BoxProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  SpacingProps,
  SpacingShorthandProps,
} from '@shopify/restyle';

/**
 * Global theme type for the UI library.
 *
 * References the globally augmented ReactNativeTemplateTheme interface.
 * This type is defined in your theme configuration file.
 */
export type Theme = globalThis.ReactNativeTemplateTheme;

/**
 * Union type of all available theme color keys.
 *
 * Provides type-safe color selection from the theme's color palette.
 *
 * @example
 * ```tsx
 * const color: ThemeColors = 'primary'; // Type-safe
 * ```
 */
export type ThemeColors = keyof Theme['colors'];

/**
 * Union type of all available theme spacing keys.
 *
 * Provides type-safe spacing values from the theme's spacing scale.
 *
 * @example
 * ```tsx
 * const spacing: ThemeSpacing = 'md'; // Type-safe
 * ```
 */
export type ThemeSpacing = keyof Theme['spacing'];

/**
 * Union type of all available theme breakpoint keys.
 *
 * Provides type-safe responsive breakpoint selection.
 *
 * @example
 * ```tsx
 * const breakpoint: ThemeBreakpoints = 'tablet'; // Type-safe
 * ```
 */
export type ThemeBreakpoints = keyof Theme['breakpoints'];

/**
 * Union type of all available theme z-index keys.
 *
 * Provides type-safe z-index layer selection for stacking contexts.
 *
 * @example
 * ```tsx
 * const zIndex: ThemeZIndices = 'modal'; // Type-safe
 * ```
 */
export type ThemeZIndices = keyof Theme['zIndices'];

/**
 * Union type of all available theme border radius keys.
 *
 * Provides type-safe border radius selection from the theme.
 *
 * @example
 * ```tsx
 * const radius: ThemeBorderRadii = 'md'; // Type-safe
 * ```
 */
export type ThemeBorderRadii = keyof Theme['borderRadii'];

/**
 * Union type of all available theme text variant keys.
 *
 * Provides type-safe text style variant selection.
 *
 * @example
 * ```tsx
 * const variant: ThemeTextVariants = 'heading'; // Type-safe
 * ```
 */
export type ThemeTextVariants = keyof Theme['textVariants'];

/**
 * Theme-aware view/box props from Restyle.
 *
 * Provides comprehensive styling props including spacing, layout, position, etc.
 * All props automatically resolve values from the theme.
 */
export type ThemeViewProps = BoxProps<Theme>;

/**
 * Theme-aware color props from Restyle.
 *
 * Provides color-related styling props that resolve from the theme color palette.
 */
export type ThemeColorProps = ColorProps<Theme>;

/**
 * Theme-aware spacing props from Restyle.
 *
 * Provides margin and padding props with both full names and shorthand notation.
 *
 * @example
 * ```tsx
 * const props: ThemeSpacingProps = {
 *   padding: 'md',    // Full name
 *   p: 'md',          // Shorthand
 *   marginTop: 'lg',  // Full name
 *   mt: 'lg'          // Shorthand
 * };
 * ```
 */
export type ThemeSpacingProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme>;

/**
 * Theme-aware background color props from Restyle.
 *
 * Provides background color styling with both full names and shorthand notation.
 *
 * @example
 * ```tsx
 * const props: ThemeBackgroundColorProps = {
 *   backgroundColor: 'primary',  // Full name
 *   bg: 'primary'                // Shorthand
 * };
 * ```
 */
export type ThemeBackgroundColorProps = BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme>;

/**
 * Base theme props combining spacing, color, layout, and position.
 *
 * Common props used across most themed components in the library.
 * Includes spacing, background color, layout, and positioning capabilities.
 */
export type ThemeBaseProps = ThemeSpacingProps &
  ThemeBackgroundColorProps &
  LayoutProps<Theme> &
  PositionProps<Theme>;
