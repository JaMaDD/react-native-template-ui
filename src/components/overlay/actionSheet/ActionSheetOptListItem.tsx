/** @internal */
import type { FC } from 'react';
import type { ThemedButtonProps } from '../../../types/button';
import type { ListItemProps } from '../../../types/list';
import type {
  ActionSheetOpt,
  ActionSheetOptListExtraData,
} from '../../../types/overlay';
import {
  actionSheetOptListItemPadding,
  actionSheetOptListItemTextVariant,
} from '../../../utils/overlay/const';
import ThemedButton from '../../button/ThemedButton';

const ActionSheetOptListItem: FC<ListItemProps<ActionSheetOpt>> = ({
  item: { text, onPress, props },
  extraData,
}) => {
  const { optListItemProps, onDismiss } =
    extraData as ActionSheetOptListExtraData;
  const onItemPress: ThemedButtonProps['onPress'] = (event) => {
    onPress?.(event);
    onDismiss(text);
  };

  return (
    <ThemedButton
      onPress={onItemPress}
      alignItems={'flex-start'}
      paddingVertical={actionSheetOptListItemPadding}
      backgroundColor={'background'}
      text={text}
      textVariant={
        actionSheetOptListItemTextVariant as ThemedButtonProps['textVariant']
      }
      textColor={'text'}
      {...optListItemProps}
      {...props}
    />
  );
};

export default ActionSheetOptListItem;
