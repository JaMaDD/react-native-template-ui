/** @internal */
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

/**
 * @internal
 * Action sheet variant that displays a FlashList with custom items.
 * Used when the listProps prop is provided to ActionSheet.
 */
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
        visible={actionSheetVisible}
        wrapViewProps={wrapViewProps}
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
