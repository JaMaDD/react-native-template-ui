import type { TextProps } from '@shopify/restyle';
import type { TextProps as RNTextProps } from 'react-native';
import type { CustomThemedIconProps } from './icon';
import type { Theme } from './theme';
import type { ThemedViewProps } from './view';

/**
 * Props for themed text component.
 *
 * Combines React Native TextProps with Restyle theme-based styling capabilities.
 * Supports text variants, colors, spacing, and typography from the theme.
 *
 * @example
 * ```tsx
 * <ThemedText
 *   variant="heading"
 *   color="primary"
 *   fontSize={18}
 *   fontWeight="bold"
 * >
 *   Hello World
 * </ThemedText>
 * ```
 */
export type ThemedTextProps = RNTextProps & TextProps<Theme>;

/**
 * Customizable themed text props with prefixed property names.
 *
 * Useful when embedding text within other components to avoid prop name conflicts.
 * All text-related props are prefixed with 'text' for clarity.
 *
 * @example
 * ```tsx
 * <Button
 *   text="Click Me"
 *   textVariant="button"
 *   textColor="white"
 *   textFontSize={16}
 * />
 * ```
 */
export type CustomThemedTextProps = {
  /** Text content to display */
  text: ThemedTextProps['children'];
  /** Text style variant from theme */
  textVariant?: ThemedTextProps['variant'];
  /** Font size (from theme or custom number) */
  textFontSize?: ThemedTextProps['fontSize'];
  /** Font weight (e.g., 'normal', 'bold', '600') */
  textFontWeight?: ThemedTextProps['fontWeight'];
  /** Text color from theme colors */
  textColor?: ThemedTextProps['color'];
  /** Custom style overrides for text */
  textStyle?: ThemedTextProps['style'];
  /** Additional text props (excluding specified ones) */
  textProps?: Omit<
    ThemedTextProps,
    'children' | 'variant' | 'fontSize' | 'fontWeight' | 'color' | 'style'
  >;
};

/**
 * Combined icon and text props.
 *
 * Used for components that display an icon alongside text.
 * Includes a flip option to control icon placement (left/right of text).
 *
 * @example
 * ```tsx
 * const props: IconTextProps = {
 *   iconName: 'check',
 *   text: 'Confirmed',
 *   flip: false // Icon on left
 * };
 * ```
 */
export type IconTextProps = CustomThemedIconProps &
  CustomThemedTextProps & {
    /** Whether to flip icon and text positions (default: icon left, text right) */
    flip?: boolean;
  };

/**
 * Themed icon-text combination with view wrapper.
 *
 * Combines icon and text with a themed container that supports spacing and layout props.
 *
 * @example
 * ```tsx
 * <ThemedIconText
 *   iconName="star"
 *   text="Favorite"
 *   gap="sm"
 *   padding="md"
 * />
 * ```
 */
export type ThemedIconTextProps = IconTextProps & ThemedViewProps;
