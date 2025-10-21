import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import type { ViewStyle } from 'react-native';
import { useInsetsStyle } from '../../hooks/style';
import type { ListProps } from '../../types/list';
import { composeStyles } from '../../utils/style/func';

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
