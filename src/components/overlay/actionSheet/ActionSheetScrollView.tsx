/** @internal */
import type { FC } from 'react';
import { useActionSheetScrollView } from '../../../hooks/overlay';
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
  expandableInitialHeightRatio,
  expandableOnSnapToHeight,
  scrollViewProps,
  children,
  onDismiss,
  useModal,
  dismissible,
  maxHeight,
  animated,
  contentGestureEnabled,
  wrapViewProps,
  headerRef,
  headerShowDismissIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
  headerChildren,
  visible,
}) => {
  const { actionSheetVisible, ...actionSheetInternalContextVal } =
    useActionSheetScrollView(
      title,
      expandable,
      expandableInitialHeightRatio,
      expandableOnSnapToHeight,
      scrollViewProps,
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
          headerRef={headerRef}
          headerShowDismissIcon={headerShowDismissIcon}
          headerWrapProps={headerWrapProps}
          headerTextProps={headerTextProps}
          headerIconButtonProps={headerIconButtonProps}
          headerChildren={headerChildren}
        />
        <ActionSheetScrollViewContent
          scrollViewProps={scrollViewProps}
          contentGestureEnabled={contentGestureEnabled}
        >
          {children}
        </ActionSheetScrollViewContent>
      </ActionSheetWrap>
    </ActionSheetInternalContext>
  );
};

export default ActionSheetScrollView;
