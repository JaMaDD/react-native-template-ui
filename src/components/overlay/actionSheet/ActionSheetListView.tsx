/** @internal */
import { type FC } from 'react';
import { useActionSheetListView } from '../../../hooks/overlay';
import type { ActionSheetListViewProps } from '../../../types/overlay';
import { ActionSheetInternalContext } from '../../../utils/overlay/const';
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
  expandableOnSnapToHeight,
  listProps,
  onDismiss,
  useModal,
  dismissible,
  maxHeight,
  animated,
  wrapViewProps,
  headerShowDismissIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
  headerChildren,
  visible,
}) => {
  const { actionSheetVisible, ...actionSheetInternalContextVal } =
    useActionSheetListView(
      title,
      expandable,
      expandableOnSnapToHeight,
      listProps,
      onDismiss,
      maxHeight,
      animated,
      dismissible,
      visible
    );

  return (
    <ActionSheetInternalContext value={actionSheetInternalContextVal}>
      <ActionSheetWrap
        visible={actionSheetVisible}
        useModal={useModal}
        wrapViewProps={wrapViewProps}
      >
        <ActionSheetHeader
          headerShowDismissIcon={headerShowDismissIcon}
          headerWrapProps={headerWrapProps}
          headerTextProps={headerTextProps}
          headerIconButtonProps={headerIconButtonProps}
          headerChildren={headerChildren}
        />
        <ActionSheetListViewContent listProps={listProps} />
      </ActionSheetWrap>
    </ActionSheetInternalContext>
  );
};

export default ActionSheetListView;
