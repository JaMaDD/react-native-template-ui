import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import type { ViewStyle } from 'react-native';
import { useInsetsStyle } from '../../hooks/style';
import type { ListProps } from '../../types/list';
import { composeStyles } from '../../utils/style/func';

/**
 * A high-performance list component built on Shopify's FlashList.
 * Provides optimized rendering for large lists with support for safe area insets and
 * customizable content container styling. Uses a generic type parameter for flexible item types.
 * @param props - Component props of type ListProps<T>
 * @returns JSX element rendering a performant FlashList
 * @example
 * <List
 *   data={items}
 *   Item={ListItemComponent}
 *   insetBottom={true}
 *   estimatedItemSize={50}
 * />
 */
function List<T>({
  Item,
  insets,
  insetTop,
  insetBottom = true,
  insetLeft,
  insetRight,
  insetsPadding,
  insetPaddingTop,
  insetPaddingBottom = 'm',
  insetPaddingLeft,
  insetPaddingRight,
  contentContainerStyle,
  ...props
}: ListProps<T>) {
  const insetsStyle = useInsetsStyle({
    insets,
    insetTop,
    insetBottom,
    insetLeft,
    insetRight,
    insetsPadding,
    insetPaddingTop,
    insetPaddingBottom,
    insetPaddingLeft,
    insetPaddingRight,
  });

  const renderItem: ListRenderItem<T> = (listItemProps) => (
    <Item {...listItemProps} />
  );
  const listContentContainerStyle = composeStyles<ViewStyle>(
    insetsStyle,
    contentContainerStyle
  );

  return (
    <FlashList
      renderItem={renderItem}
      overScrollMode={'always'}
      showsVerticalScrollIndicator={__DEV__}
      showsHorizontalScrollIndicator={__DEV__}
      contentContainerStyle={listContentContainerStyle}
      {...props}
    />
  );
}

export default List;
