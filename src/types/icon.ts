import type { IconName, IconSize } from '@jamadd/react-native-template-icons';
import type { TextStyle } from 'react-native';
import type { StyleOrStyleProp } from './style';
import type { ThemeBaseProps, ThemeColors } from './theme';

export type IconProps = {
  name: IconName;
  size?: IconSize;
  color?: ThemeColors;
  style?: StyleOrStyleProp<TextStyle>;
};

export type ThemedIconProps = IconProps & ThemeBaseProps;

export type CustomThemedIconProps = {
  iconName: ThemedIconProps['name'];
  iconSize?: ThemedIconProps['size'];
  iconColor?: ThemedIconProps['color'];
  iconStyle?: ThemedIconProps['style'];
  iconProps?: Omit<ThemedIconProps, 'name' | 'size' | 'color' | 'style'>;
};
