/** @internal */
import type { FC } from 'react';
import type { ThemedButtonProps } from '../../../types/button';
import type { ListItemProps } from '../../../types/list';
import type {
  ActionSheetOption,
  ActionSheetOptionListExtraData,
} from '../../../types/overlay';
import {
  actionSheetOptionListItemPadding,
  actionSheetOptionListItemTextVariant,
} from '../../../utils/overlay/const';
import ThemedButton from '../../button/ThemedButton';

const ActionSheetOptionListItem: FC<ListItemProps<ActionSheetOption>> = ({
  item: { text, onPress, props },
  extraData,
}) => {
  const { optionListItemProps, onDismiss } =
    extraData as ActionSheetOptionListExtraData;
  const onItemPress: ThemedButtonProps['onPress'] = (event) => {
    onPress?.(event);
    onDismiss(text);
  };

  return (
    <ThemedButton
      onPress={onItemPress}
      alignItems={'flex-start'}
      paddingVertical={actionSheetOptionListItemPadding}
      backgroundColor={'background'}
      text={text}
      textVariant={
        actionSheetOptionListItemTextVariant as ThemedButtonProps['textVariant']
      }
      textColor={'text'}
      {...optionListItemProps}
      {...props}
    />
  );
};

export default ActionSheetOptionListItem;
