import type { BoxProps } from '@shopify/restyle';
import type { ComponentProps, ReactNode, RefObject } from 'react';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps as RNScrollViewProps,
  ScrollView,
  View,
  ViewProps,
} from 'react-native';
import type { AnimatedRef } from 'react-native-reanimated';
import type AnimatedBox from '../components/view/AnimatedBox';
import type { InsetsStyleConfig } from './style';
import type { Theme } from './theme';

export type ViewRefObj = RefObject<View | null>;

export type ScrollViewRefObj = RefObject<ScrollView | null>;

export type ScrollViewAnimatedRefObj = AnimatedRef<ScrollView>;

export type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

export type OnContentSizeChange = (width: number, height: number) => void;

export type ThemedViewProps = ViewProps &
  BoxProps<Theme> & {
    ref?: ViewRefObj;
  };

export type AnimatedThemedViewProps = Omit<
  ComponentProps<typeof AnimatedBox>,
  'key'
>;

export type ThemedScreenWrapProps = ThemedViewProps & InsetsStyleConfig;

export type ScrollViewProps = RNScrollViewProps &
  InsetsStyleConfig & { ref?: ScrollViewRefObj };

export type ThemedScrollViewProps = ScrollViewProps &
  Omit<ThemedViewProps, 'ref'>;

export type PropsWithRequiredChildren<P = unknown> = P & {
  children: NonNullable<ReactNode>;
};
