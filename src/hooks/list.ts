import { useRef } from 'react';
import type {
  ListItemSeparatorComponent,
  ListItemSeparatorProps,
  ListRef,
} from '../types/list';
import { useThemedSeparator } from './separator';

/**
 * Hook to create a ref for a FlatList or SectionList component.
 * @template T - The type of items in the list
 * @returns A mutable ref object for accessing the list instance
 * @example
 * const listRef = useListRef<MyItemType>();
 * <FlatList ref={listRef} />
 * // Later: listRef.current?.scrollToEnd()
 */
export function useListRef<T>() {
  return useRef<ListRef<T>>(null);
}

/**
 * Hook to create a customizable list item separator component with conditional rendering.
 * @param props - Configuration for the separator appearance
 * @param props.size - The size/thickness of the separator
 * @param props.vertical - Whether the separator is vertical (default: false)
 * @param props.backgroundColor - The background color of the separator
 * @param props.style - Additional styles for the separator
 * @param hideForLeadingItemTypes - Array of item type strings to hide separator after
 * @param hideForTrailingItemTypes - Array of item type strings to hide separator before
 * @returns A ListItemSeparatorComponent that renders conditionally based on adjacent items
 * @example
 * const ItemSeparator = useListItemSeparatorComponent(
 *   { size: BorderSize.S, backgroundColor: 'separator' },
 *   ['header'],
 *   ['footer']
 * );
 * <FlatList ItemSeparatorComponent={ItemSeparator} />
 */
export function useListItemSeparatorComponent(
  props: ListItemSeparatorProps = {},
  hideForLeadingItemTypes: string[] = [],
  hideForTrailingItemTypes: string[] = []
) {
  const ThemedSeparator = useThemedSeparator(
    props.size,
    props.vertical,
    props.backgroundColor,
    props.style
  );

  const ListItemSeparatorComponent: ListItemSeparatorComponent = ({
    leadingItem,
    trailingItem,
  }) => {
    if (
      (typeof leadingItem === 'object' &&
        hideForLeadingItemTypes.includes(leadingItem.type)) ||
      (typeof trailingItem === 'object' &&
        hideForTrailingItemTypes.includes(trailingItem.type))
    ) {
      return null;
    }

    return ThemedSeparator;
  };

  return ListItemSeparatorComponent;
}
