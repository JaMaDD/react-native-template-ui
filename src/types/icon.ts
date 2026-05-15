import type { IconName, IconSize } from '@jamadd/react-native-template-icons';
import type { TextStyle } from 'react-native';
import type { StyleOrStyleProp } from './style';
import type { ThemeBaseProps, ThemeColors } from './theme';

/**
 * Basic icon component props.
 *
 * Defines the essential properties for rendering an icon from the icon library.
 *
 * @example
 * ```tsx
 * const iconProps: IconProps = {
 *   name: 'heart',
 *   size: 24,
 *   color: 'red'
 * };
 * ```
 */
export type IconProps = {
  /** Name of the icon from the icon library */
  name: IconName;
  /** Size of the icon (predefined size or custom number) */
  size?: IconSize | number;
  /** Color from the theme colors palette */
  color?: ThemeColors;
  /** Custom style overrides for the icon */
  style?: StyleOrStyleProp<TextStyle>;
};

/**
 * Icon component with theme-aware properties.
 *
 * Extends IconProps with theme-based spacing, layout, and positioning capabilities.
 */
export type ThemedIconProps = IconProps & ThemeBaseProps;

/**
 * Customizable themed icon props with prefixed property names.
 *
 * Useful when embedding icons within other components to avoid prop name conflicts.
 * All icon-related props are prefixed with 'icon' for clarity.
 *
 * @example
 * ```tsx
 * <Component
 *   iconName="settings"
 *   iconSize={20}
 *   iconColor="primary"
 * />
 * ```
 */
export type CustomThemedIconProps = {
  /** Icon name from the icon library */
  iconName: ThemedIconProps['name'];
  /** Icon size (predefined or custom number) */
  iconSize?: ThemedIconProps['size'];
  /** Icon color from theme colors */
  iconColor?: ThemedIconProps['color'];
  /** Custom style for the icon */
  iconStyle?: ThemedIconProps['style'];
  /** Additional icon props (excluding name, size, color, style) */
  iconProps?: Omit<ThemedIconProps, 'name' | 'size' | 'color' | 'style'>;
};
