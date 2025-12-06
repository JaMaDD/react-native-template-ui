import type { ComponentProps, ReactNode, RefObject } from 'react';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps as RNScrollViewProps,
  ScrollView,
  View,
} from 'react-native';
import type { AnimatedRef } from 'react-native-reanimated';
import type AnimatedBox from '../components/view/AnimatedBox';
import type Box from '../components/view/Box';
import type { InsetsStyleConfig } from './style';
import type { ThemeViewProps } from './theme';

export type ViewRefObj = RefObject<View | null>;

export type ScrollViewRefObj = RefObject<ScrollView | null>;

export type ScrollViewAnimatedRefObj = AnimatedRef<ScrollView>;

export type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

export type OnContentSizeChange = (width: number, height: number) => void;

export type ThemedViewProps = ComponentProps<typeof Box>;

export type AnimatedThemedViewProps = Omit<
  ComponentProps<typeof AnimatedBox>,
  'key'
>;

export type ThemedScreenWrapProps = ThemedViewProps & InsetsStyleConfig;

export type ScrollViewProps = RNScrollViewProps &
  InsetsStyleConfig & {
    ref?: ScrollViewRefObj | ScrollViewAnimatedRefObj;
  };

export type ThemedScrollViewProps = ScrollViewProps & ThemeViewProps;

export type PropsWithRequiredChildren<P = unknown> = P & {
  children: NonNullable<ReactNode>;
};
