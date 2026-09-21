/** @internal */
import { type FC } from 'react';
import {
  useActionSheetInternalContext,
  useActionSheetOnDismiss,
  useActionSheetOptItemSize,
} from '../../../hooks/overlay';
import type { ListKeyExtractor } from '../../../types/list';
import type {
  ActionSheetOption,
  ActionSheetOptionListExtraData,
  ActionSheetOptionListRefObj,
  ActionSheetOptionsProps,
} from '../../../types/overlay';
import List from '../../list/List';
import ActionSheetContentGesture from './ActionSheetContentGesture';
import ActionSheetOptionListItem from './ActionSheetOptionListItem';

/**
 * @internal
 * Renders the list of option items within an action sheet.
 * Uses FlashList for performance with gesture handling.
 */
const ActionSheetOptionList: FC<
  Pick<
    ActionSheetOptionsProps,
    'options' | 'optionListProps' | 'optionListItemProps'
  >
> = ({ options, optionListProps, optionListItemProps }) => {
  const { contentAnimatedRefObj } = useActionSheetInternalContext();
  const { insetsStyle } = useActionSheetOptItemSize(optionListProps);
  const onDismiss = useActionSheetOnDismiss();

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
