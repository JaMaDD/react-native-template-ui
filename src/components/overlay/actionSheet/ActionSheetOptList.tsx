/** @internal */
import { type FC } from 'react';
import {
  useActionSheetOnDismiss,
  useActionSheetOptItemSize,
} from '../../../hooks/overlay';
import type { ListKeyExtractor } from '../../../types/list';
import type {
  ActionSheetOptListExtraData,
  ActionSheetOpt,
  ActionSheetOptListRefObj,
  ActionSheetOptsProps,
} from '../../../types/overlay';
import { getActionSheetContext } from '../../../utils/overlay/func';
import List from '../../list/List';
import ActionSheetContentGesture from './ActionSheetContentGesture';
import ActionSheetOptListItem from './ActionSheetOptListItem';

const ActionSheetOptList: FC<
  Pick<ActionSheetOptsProps, 'opts' | 'optListProps' | 'optListItemProps'>
> = ({ opts, optListProps, optListItemProps }) => {
  const { insetsStyle } = useActionSheetOptItemSize(optListProps);
  const onDismiss = useActionSheetOnDismiss();

  const { contentAnimatedRefObj } = getActionSheetContext();
  const keyExtractor: ListKeyExtractor<ActionSheetOpt> = ({ text }, index) =>
    `${text}_${index}`;
  const extraData: ActionSheetOptListExtraData = {
    optListItemProps,
    onDismiss,
  };

  return (
    <ActionSheetContentGesture>
      <List
        ref={contentAnimatedRefObj as ActionSheetOptListRefObj}
        data={opts}
        Item={ActionSheetOptListItem}
        keyExtractor={keyExtractor}
        extraData={extraData}
        contentContainerStyle={insetsStyle}
        {...optListProps}
      />
    </ActionSheetContentGesture>
  );
};

export default ActionSheetOptList;
