import { useRef } from 'react';
import type {
  ListItemSeparatorComponent,
  ListItemSeparatorProps,
  ListRef,
} from '../types/list';
import { useThemedSeparator } from './separator';

export function useListRef<T>() {
  return useRef<ListRef<T>>(null);
}

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
