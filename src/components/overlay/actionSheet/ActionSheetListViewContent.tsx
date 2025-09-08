import { useLayoutEffect, type FC } from 'react';
import type {
  ActionSheetListViewListRefObj,
  ActionSheetListViewProps,
} from '../../../types/overlay';
import { getActionSheetContext } from '../../../utils/overlay/func';
import List from '../../list/List';
import ActionSheetContentGesture from './ActionSheetContentGesture';

const ActionSheetListViewContent: FC<
  Pick<ActionSheetListViewProps, 'listProps'>
> = ({ listProps }) => {
  const { contentAnimatedRefObj, setContentHeight } = getActionSheetContext();
  useLayoutEffect(() => {
    const contentHeight = (
      contentAnimatedRefObj as ActionSheetListViewListRefObj
    ).current?.getChildContainerDimensions().height;
    setContentHeight?.(contentHeight ?? 0);
  });

  return (
    <ActionSheetContentGesture>
      <List
        ref={contentAnimatedRefObj as ActionSheetListViewListRefObj}
        {...listProps}
      />
    </ActionSheetContentGesture>
  );
};

export default ActionSheetListViewContent;
