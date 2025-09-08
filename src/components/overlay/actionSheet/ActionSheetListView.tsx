import type { FC } from 'react';
import { useActionSheetListView } from '../../../hooks/overlay';
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
  headerIconBtnProps,
}) => {
  const actionSheetContextVal = useActionSheetListView(
    title,
    expandable,
    listProps,
    onDismiss,
    dismissable
  );

  return (
    <ActionSheetContext.Provider value={actionSheetContextVal}>
      <ActionSheetWrap wrapViewProps={wrapViewProps}>
        <ActionSheetHeader
          headerShowIcon={headerShowIcon}
          headerWrapProps={headerWrapProps}
          headerTextProps={headerTextProps}
          headerIconBtnProps={headerIconBtnProps}
        />
        <ActionSheetListViewContent listProps={listProps} />
      </ActionSheetWrap>
    </ActionSheetContext.Provider>
  );
};

export default ActionSheetListView;
