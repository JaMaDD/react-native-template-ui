/** @internal */
import { type FC } from 'react';
import {
  useActionSheetOnDismiss,
  useActionSheetOptItemSize,
} from '../../../hooks/overlay';
import type { ListKeyExtractor } from '../../../types/list';
import type {
  ActionSheetOptionListExtraData,
  ActionSheetOption,
  ActionSheetOptionListRefObj,
  ActionSheetOptionsProps,
} from '../../../types/overlay';
import { getActionSheetContext } from '../../../utils/overlay/func';
import List from '../../list/List';
import ActionSheetContentGesture from './ActionSheetContentGesture';
import ActionSheetOptionListItem from './ActionSheetOptionListItem';

const ActionSheetOptionList: FC<
  Pick<
    ActionSheetOptionsProps,
    'options' | 'optionListProps' | 'optionListItemProps'
  >
> = ({ options, optionListProps, optionListItemProps }) => {
  const { insetsStyle } = useActionSheetOptItemSize(optionListProps);
  const onDismiss = useActionSheetOnDismiss();

  const { contentAnimatedRefObj } = getActionSheetContext();
  const keyExtractor: ListKeyExtractor<ActionSheetOption> = ({ text }, index) =>
    `${text}_${index}`;
  const extraData: ActionSheetOptionListExtraData = {
    optionListItemProps,
    onDismiss,
  };

  return (
    <ActionSheetContentGesture>
      <List
        ref={contentAnimatedRefObj as ActionSheetOptionListRefObj}
        data={options}
        Item={ActionSheetOptionListItem}
        keyExtractor={keyExtractor}
        extraData={extraData}
        contentContainerStyle={insetsStyle}
        {...optionListProps}
      />
    </ActionSheetContentGesture>
  );
};

export default ActionSheetOptionList;
