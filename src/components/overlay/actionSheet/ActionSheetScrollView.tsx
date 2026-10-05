/** @internal */
import type { FC } from 'react';
import {
  useActionSheetScrollView,
  useActionSheetVisible,
} from '../../../hooks/overlay';
import type { ActionSheetScrollViewProps } from '../../../types/overlay';
import { ActionSheetInternalContext } from '../../../utils/overlay/const';
import ActionSheetHeader from './ActionSheetHeader';
import ActionSheetScrollViewContent from './ActionSheetScrollViewContent';
import ActionSheetWrap from './ActionSheetWrap';

/**
 * @internal
 * Action sheet variant that displays custom scrollable content.
 * Used when the children prop is provided to ActionSheet.
 */
const ActionSheetScrollView: FC<ActionSheetScrollViewProps> = ({
  title,
  expandable,
  scrollViewProps,
  children,
  onDismiss,
  useModal,
  dismissible,
  maxHeight,
  wrapViewProps,
  headerShowDismissIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
  headerChildren,
  visible,
}) => {
  const { actionSheetVisible } = useActionSheetVisible(visible);
  const actionSheetInternalContextVal = useActionSheetScrollView(
    title,
    expandable,
    scrollViewProps,
    onDismiss,
    maxHeight,
    dismissible,
    actionSheetVisible
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
        <ActionSheetScrollViewContent scrollViewProps={scrollViewProps}>
          {children}
        </ActionSheetScrollViewContent>
      </ActionSheetWrap>
    </ActionSheetInternalContext>
  );
};

export default ActionSheetScrollView;
