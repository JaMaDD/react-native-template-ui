import type {
  FlashListProps,
  FlashListRef,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import type { ComponentType, FC, RefObject } from 'react';
import type { ViewStyle } from 'react-native';
import type { AnimatedRef } from 'react-native-reanimated';
import type { ThemedSeparatorProps } from './separator';
import type { InsetsStyleConfig } from './style';
import type { ThemeColors } from './theme';
import type { PropsWithRequiredChildren } from './view';

export type ListRef<T> = FlashListRef<T>;

export type ListRefObj<T> = RefObject<ListRef<T> | null>;

export type ListAnimatedRefObj<T> = AnimatedRef<ListRef<T>>;

export type ListItemProps<T> = ListRenderItemInfo<T>;

export type ListKeyExtractor<T> = (item: T, index: number) => string;

export type ListGetItemType<T> = (
  item: T,
  index: number,
  extraData?: any
) => string | number | undefined;

export type ListProps<T> = Omit<
  FlashListProps<T>,
  'renderItem' | 'keyExtractor'
> &
  InsetsStyleConfig & {
    ref?: ListRefObj<T> | ListAnimatedRefObj<T>;
    Item: ComponentType<ListItemProps<T>>;
    keyExtractor: ListKeyExtractor<T>;
  };

export type ListItemSeparatorProps = Partial<
  Pick<ThemedSeparatorProps, 'size' | 'vertical'> & {
    backgroundColor: ThemeColors;
    style: Omit<
      ThemedSeparatorProps,
      'size' | 'vertical' | 'backgroundColor' | 'bg'
    >;
  }
>;

/** @internal */
export type ListItemSeparatorComponent = FC<{
  leadingItem?: { type: string };
  trailingItem?: { type: string };
}>;

export type ListCellRendererComponentProps = PropsWithRequiredChildren<{
  onLayout: () => void;
  index: number;
  style: ViewStyle;
}>;
