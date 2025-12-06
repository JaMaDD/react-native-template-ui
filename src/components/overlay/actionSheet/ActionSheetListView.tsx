import { type FC } from 'react';
import {
  useActionSheetListView,
  useActionSheetVisible,
} from '../../../hooks/overlay';
import type { ActionSheetListViewProps } from '../../../types/overlay';
import { ActionSheetContext } from '../../../utils/overlay/const';
import ActionSheetHeader from './ActionSheetHeader';
import ActionSheetListViewContent from './ActionSheetListViewContent';
import ActionSheetWrap from './ActionSheetWrap';

const ActionSheetListView: FC<ActionSheetListViewProps> = ({
  title,
  expandable,
  listProps,
  onDismiss,
  dismissable,
  wrapViewProps,
  headerShowIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
  visible,
}) => {
  const { actionSheetVisible } = useActionSheetVisible(visible);
  const actionSheetContextVal = useActionSheetListView(
    title,
    expandable,
    listProps,
    onDismiss,
    dismissable,
    actionSheetVisible
  );

  return (
    <ActionSheetContext.Provider value={actionSheetContextVal}>
      <ActionSheetWrap
        wrapViewProps={wrapViewProps}
        actionSheetVisible={actionSheetVisible}
      >
        <ActionSheetHeader
          headerShowIcon={headerShowIcon}
          headerWrapProps={headerWrapProps}
          headerTextProps={headerTextProps}
          headerIconButtonProps={headerIconButtonProps}
        />
        <ActionSheetListViewContent listProps={listProps} />
      </ActionSheetWrap>
    </ActionSheetContext.Provider>
  );
};

export default ActionSheetListView;
