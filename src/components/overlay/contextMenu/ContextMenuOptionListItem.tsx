import { lazy, type FC } from 'react';
import type {
  ThemedButtonProps,
  ThemedIconTextButtonProps,
} from '../../../types/button';
import type { ListItemProps } from '../../../types/list';
import type {
  ContextMenuOption,
  ContextMenuOptionListExtraData,
} from '../../../types/overlay';
import { isPlatformWeb } from '../../../utils/common/func';

let ThemedIconTextButton: FC<ThemedIconTextButtonProps>;
let ThemedButton: FC<ThemedButtonProps>;
if (isPlatformWeb()) {
  ThemedIconTextButton = lazy(
    () => import('../../button/ThemedIconTextButton')
  );
  ThemedButton = lazy(() => import('../../button/ThemedButton'));
} else {
  ThemedIconTextButton = require('../../button/ThemedIconTextButton').default;
  ThemedButton = require('../../button/ThemedButton').default;
}

const ContextMenuOptionListItem: FC<ListItemProps<ContextMenuOption>> = ({
  item: { onPress, ...item },
  extraData,
}) => {
  const { optionListItemProps, onItemPress: extraDataOnItemPress } =
    extraData as ContextMenuOptionListExtraData;
  const onItemPress: ThemedButtonProps['onPress'] = (event) => {
    const { text } = item;
    onPress?.(event);
    if (typeof text === 'string') {
      extraDataOnItemPress(text);
    }
  };

  return 'iconName' in item ? (
    <ThemedIconTextButton
      onPress={onItemPress}
      textNumberOfLines={2}
      textColor={'text'}
      justifyContent={'flex-start'}
      {...item}
      {...optionListItemProps}
    />
  ) : (
    <ThemedButton
      onPress={onItemPress}
      textNumberOfLines={2}
      textColor={'text'}
      justifyContent={'flex-start'}
      backgroundColor={'background'}
      {...item}
      {...optionListItemProps}
    />
  );
};

export default ContextMenuOptionListItem;
