import type { ComponentProps } from 'react';
import type Text from '../components/text/Text';
import type { CustomThemedIconProps } from './icon';
import type { ThemeTextProps, ThemeViewProps } from './theme';

export type ThemedTextProps = ComponentProps<typeof Text>;

export type CustomThemedTextProps = {
  text: ThemedTextProps['children'];
  textVariant?: ThemedTextProps['variant'];
  textFontSize?: ThemedTextProps['fontSize'];
  textFontWeight?: ThemedTextProps['fontWeight'];
  textColor?: ThemedTextProps['color'];
  textStyle?: ThemedTextProps['style'];
  textProps?: Omit<
    ThemeTextProps,
    'children' | 'variant' | 'fontSize' | 'fontWeight' | 'color' | 'style'
  >;
};

/** @internal */
export type IconTextProps = CustomThemedIconProps &
  CustomThemedTextProps & { flip?: boolean };

export type ThemedIconTextProps = IconTextProps & ThemeViewProps;
