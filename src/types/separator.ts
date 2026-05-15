import type { BorderSize } from '../utils/theme/const';
import type { ThemeBackgroundColorProps, ThemeSpacingProps } from './theme';

/**
 * Props for themed separator component.
 *
 * A separator is a visual divider line used to separate content sections.
 * Can be horizontal (default) or vertical, with customizable size, color, and margins.
 *
 * @example
 * ```tsx
 * // Horizontal separator
 * <ThemedSeparator
 *   size="sm"
 *   backgroundColor="border"
 *   marginVertical="md"
 * />
 *
 * // Vertical separator
 * <ThemedSeparator
 *   vertical
 *   size={2}
 *   backgroundColor="divider"
 *   marginHorizontal="sm"
 * />
 * ```
 */
export type ThemedSeparatorProps = ThemeBackgroundColorProps &
  Pick<
    ThemeSpacingProps,
    | 'margin'
    | 'marginVertical'
    | 'marginHorizontal'
    | 'marginTop'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginStart'
    | 'marginEnd'
    | 'm'
    | 'my'
    | 'mx'
    | 'mt'
    | 'mb'
    | 'ml'
    | 'mr'
    | 'ms'
    | 'me'
  > & {
    /** Thickness of the separator (predefined size or custom number) */
    size?: BorderSize | number;
    /** Whether the separator is vertical (default is horizontal) */
    vertical?: boolean;
  };
