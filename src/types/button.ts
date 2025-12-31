import type { PropsWithChildren } from 'react';
import type {
  GestureResponderEvent,
  PressableProps as RNPressableProps,
  ViewStyle,
} from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';
import type { ButtonScaleRatio, OnPressDelayType } from '../utils/button/const';
import type { CustomThemedIconProps } from './icon';
import type { StyleOrStyleProp } from './style';
import type { CustomThemedTextProps, IconTextProps } from './text';
import type { ThemeViewProps } from './theme';
import type { ThemedViewProps } from './view';

export type PressableOnPress = (event: GestureResponderEvent) => void;

export type PressableStyle = RNPressableProps['style'];

export type OnPressDelayConfig<T = OnPressDelayType> = {
  type: T;
  wait: number;
};

export type PressableProps = Omit<RNPressableProps, 'style'> & {
  scaleRatio?: ButtonScaleRatio | number;
  style?: StyleOrStyleProp<ViewStyle>;
  onPressDelayConfig?: OnPressDelayConfig;
};

export type ThemedPressableProps = Omit<PressableProps, 'onPress'> &
  Required<Pick<PressableProps, 'onPress'>> &
  ThemeViewProps;

export type AnimatedThemedPressableProps = Omit<
  ThemedPressableProps,
  'scaleRatio'
> & {
  style?: AnimatedStyle<ViewStyle>;
};

type ButtonProps = PropsWithChildren<Omit<ThemedPressableProps, 'children'>>;

export type ThemedButtonProps = ButtonProps & CustomThemedTextProps;

export type ThemedIconButtonProps = ButtonProps & CustomThemedIconProps;

export type ThemedIconTextButtonProps = PropsWithChildren<
  ButtonProps & IconTextProps & { iconTextProps?: ThemedViewProps }
>;
