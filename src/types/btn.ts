import type { PropsWithChildren } from 'react';
import type {
  GestureResponderEvent,
  PressableProps as RNPressableProps,
  ViewStyle,
} from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';
import type { BtnScaleRatio, OnPressDelayType } from '../utils/btn/const';
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
  scaleRatio?: BtnScaleRatio;
  style?: StyleOrStyleProp<ViewStyle>;
  onPressDelayConfig?: OnPressDelayConfig;
};

export type ThemedPressableProps = PressableProps & ThemeViewProps;

export type AnimatedThemedPressableProps = Omit<
  ThemedPressableProps,
  'scaleRatio'
> & {
  style?: AnimatedStyle<ViewStyle>;
};

type BtnProps = Omit<ThemedPressableProps, 'onPress' | 'children'> &
  Required<Pick<ThemedPressableProps, 'onPress'>>;

export type ThemedBtnProps = BtnProps & CustomThemedTextProps;

export type ThemedIconBtnProps = BtnProps & CustomThemedIconProps;

export type ThemedIconTextBtnProps = PropsWithChildren<
  BtnProps & IconTextProps & { iconTextProps?: ThemedViewProps }
>;
