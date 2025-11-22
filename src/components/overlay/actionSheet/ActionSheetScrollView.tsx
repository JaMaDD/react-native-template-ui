/** @internal */
import type { FC } from 'react';
import { useActionSheetScrollView } from '../../../hooks/overlay';
import type { ActionSheetScrollViewProps } from '../../../types/overlay';
import { ActionSheetContext } from '../../../utils/overlay/const';
import ActionSheetHeader from './ActionSheetHeader';
import ActionSheetScrollViewContent from './ActionSheetScrollViewContent';
import ActionSheetWrap from './ActionSheetWrap';

const ActionSheetScrollView: FC<ActionSheetScrollViewProps> = ({
  title,
  expandable,
  scrollViewProps,
  children,
  onDismiss,
  dismissable,
  wrapViewProps,
  headerShowIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
}) => {
  const actionSheetContextVal = useActionSheetScrollView(
    title,
    expandable,
    scrollViewProps,
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
          headerIconButtonProps={headerIconButtonProps}
        />
        <ActionSheetScrollViewContent scrollViewProps={scrollViewProps}>
          {children}
        </ActionSheetScrollViewContent>
      </ActionSheetWrap>
    </ActionSheetContext.Provider>
  );
};

export default ActionSheetScrollView;
