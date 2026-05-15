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

/**
 * Reference to a FlashList component.
 *
 * Provides access to FlashList methods like scrollToIndex, scrollToEnd, etc.
 */
export type ListRef<T> = FlashListRef<T>;

/**
 * RefObject for a FlashList component.
 *
 * Used to store and access the list reference in React components.
 */
export type ListRefObj<T> = RefObject<ListRef<T> | null>;

/**
 * Animated RefObject for a FlashList component.
 *
 * Used with Reanimated for animated list operations and scroll handling.
 */
export type ListAnimatedRefObj<T> = AnimatedRef<ListRef<T>>;

/**
 * Props provided to list item render functions.
 *
 * Contains item data, index, and additional metadata for rendering list items.
 */
export type ListItemProps<T> = ListRenderItemInfo<T>;

/**
 * Function to extract unique keys from list items.
 *
 * Required by FlashList for efficient item tracking and updates.
 *
 * @example
 * ```tsx
 * const keyExtractor: ListKeyExtractor<User> = (user) => user.id;
 * ```
 */
export type ListKeyExtractor<T> = (item: T, index: number) => string;

/**
 * Function to determine item types for heterogeneous lists.
 *
 * Used by FlashList to optimize rendering of lists with different item types.
 *
 * @example
 * ```tsx
 * const getItemType: ListGetItemType<Message> = (item) => item.type;
 * ```
 */
export type ListGetItemType<T> = (
  item: T,
  index: number,
  extraData?: any
) => string | number | undefined;

/**
 * Props for the themed list component.
 *
 * Extends FlashList with theme support, insets handling, and type-safe item rendering.
 * Requires data array, Item component, and keyExtractor function.
 *
 * @example
 * ```tsx
 * <List
 *   data={users}
 *   Item={UserItem}
 *   keyExtractor={(user) => user.id}
 *   estimatedItemSize={100}
 * />
 * ```
 */
export type ListProps<T> = Omit<
  FlashListProps<T>,
  'data' | 'renderItem' | 'keyExtractor'
> &
  InsetsStyleConfig & {
    /** Reference to the list instance */
    ref?: ListRefObj<T> | ListAnimatedRefObj<T>;
    /** Array of items to render */
    data: T[];
    /** Component to render each list item */
    Item: ComponentType<ListItemProps<T>>;
    /** Function to extract unique key from each item */
    keyExtractor: ListKeyExtractor<T>;
  };

/**
 * Props for customizing list item separators.
 *
 * Allows configuration of separator appearance between list items.
 *
 * @example
 * ```tsx
 * const separatorProps: ListItemSeparatorProps = {
 *   size: 'sm',
 *   backgroundColor: 'border',
 *   vertical: false
 * };
 * ```
 */
export type ListItemSeparatorProps = Partial<
  Pick<ThemedSeparatorProps, 'size' | 'vertical'> & {
    /** Background color from theme colors */
    backgroundColor: ThemeColors;
    /** Additional style props for the separator */
    style: Omit<
      ThemedSeparatorProps,
      'size' | 'vertical' | 'backgroundColor' | 'bg'
    >;
  }
>;

/**
 * Component type for rendering separators between list items.
 *
 * @internal
 */
export type ListItemSeparatorComponent = FC<{
  leadingItem?: { type: string };
  trailingItem?: { type: string };
}>;

/**
 * Props for custom cell renderer components.
 *
 * Used when implementing custom list item wrappers with FlashList.
 */
export type ListCellRendererComponentProps = PropsWithRequiredChildren<{
  /** Callback when the cell layout changes */
  onLayout: () => void;
  /** Index of the item in the list */
  index: number;
  /** Style object for the cell container */
  style: ViewStyle;
}>;
