import type { ComponentProps, PropsWithChildren } from 'react';
import type {
  GestureResponderEvent,
  PressableProps as RNPressableProps,
} from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type AnimatedPressable from '../components/button/AnimatedPressable';
import type { ButtonScaleRatio, OnPressDelayType } from '../utils/button/const';
import type { CustomThemedIconProps } from './icon';
import type { CustomThemedTextProps, IconTextProps } from './text';
import type { ThemeViewProps } from './theme';
import type { ThemedViewProps, ViewRefObj } from './view';

export type PressableOnPress = (
  event: GestureResponderEvent
) => void | SharedValue<(event: GestureResponderEvent) => void>;

export type OnPressDelayConfig<T = OnPressDelayType> = {
  type: T;
  wait: number;
};

export type PressableProps = Omit<RNPressableProps, 'onPress'> &
  Required<Pick<RNPressableProps, 'onPress'>> & {
    scaleRatio?: ButtonScaleRatio | number;
    onPressDelayConfig?: OnPressDelayConfig;
    ref?: ViewRefObj;
  };

export type ThemedPressableProps = PressableProps & ThemeViewProps;

export type AnimatedPressableProps = ComponentProps<typeof AnimatedPressable>;

export type AnimatedThemedPressableProps = Omit<
  ThemedPressableProps,
  'ref' | 'scaleRatio'
> &
  Omit<AnimatedPressableProps, 'key' | 'style'> & {
    animatedStyle?: AnimatedPressableProps['style'];
  };

type ButtonProps = PropsWithChildren<Omit<ThemedPressableProps, 'children'>>;

export type ThemedButtonProps = ButtonProps & CustomThemedTextProps;

export type ThemedIconButtonProps = ButtonProps & CustomThemedIconProps;

export type ThemedIconTextButtonProps = PropsWithChildren<
  ButtonProps & IconTextProps & { iconTextProps?: ThemedViewProps }
>;
