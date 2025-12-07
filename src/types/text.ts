import type { TextProps } from '@shopify/restyle';
import type { TextProps as RNTextProps } from 'react-native';
import type { CustomThemedIconProps } from './icon';
import type { Theme } from './theme';
import type { ThemedViewProps } from './view';

export type ThemedTextProps = RNTextProps & TextProps<Theme>;

export type CustomThemedTextProps = {
  text: ThemedTextProps['children'];
  textVariant?: ThemedTextProps['variant'];
  textFontSize?: ThemedTextProps['fontSize'];
  textFontWeight?: ThemedTextProps['fontWeight'];
  textColor?: ThemedTextProps['color'];
  textStyle?: ThemedTextProps['style'];
  textProps?: Omit<
    ThemedTextProps,
    'children' | 'variant' | 'fontSize' | 'fontWeight' | 'color' | 'style'
  >;
};

export type IconTextProps = CustomThemedIconProps &
  CustomThemedTextProps & { flip?: boolean };

export type ThemedIconTextProps = IconTextProps & ThemedViewProps;
