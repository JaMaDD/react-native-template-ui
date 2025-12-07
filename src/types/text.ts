import type { TextProps } from '@shopify/restyle';
import type { ComponentProps } from 'react';
import type Text from '../components/text/Text';
import type { CustomThemedIconProps } from './icon';
import type { Theme } from './theme';
import type { ThemedViewProps } from './view';

export type ThemedTextProps = ComponentProps<typeof Text> & TextProps<Theme>;

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
