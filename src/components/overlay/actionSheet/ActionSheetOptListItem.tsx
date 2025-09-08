/** @internal */
import type { FC } from 'react';
import type { ThemedBtnProps } from '../../../types/btn';
import type { ListItemProps } from '../../../types/list';
import type {
  ActionSheetOpt,
  ActionSheetOptListExtraData,
} from '../../../types/overlay';
import {
  actionSheetOptListItemPadding,
  actionSheetOptListItemTextVariant,
} from '../../../utils/overlay/const';
import ThemedBtn from '../../btn/ThemedBtn';

const ActionSheetOptListItem: FC<ListItemProps<ActionSheetOpt>> = ({
  item: { text, onPress, props },
  extraData,
}) => {
  const { optListItemProps, onDismiss } =
    extraData as ActionSheetOptListExtraData;
  const onItemPress: ThemedBtnProps['onPress'] = (event) => {
    onPress?.(event);
    onDismiss(text);
  };

  return (
    <ThemedBtn
      onPress={onItemPress}
      alignItems={'flex-start'}
      paddingVertical={actionSheetOptListItemPadding}
      backgroundColor={'background'}
      text={text}
      textVariant={
        actionSheetOptListItemTextVariant as ThemedBtnProps['textVariant']
      }
      textColor={'text'}
      {...optListItemProps}
      {...props}
    />
  );
};

export default ActionSheetOptListItem;
