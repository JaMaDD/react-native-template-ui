/** @internal */
import type { FC } from 'react';
import { useActionSheetOpts } from '../../../hooks/overlay';
import type { ActionSheetOptionsProps } from '../../../types/overlay';
import { ActionSheetInternalContext } from '../../../utils/overlay/const';
import ActionSheetHeader from './ActionSheetHeader';
import ActionSheetOptionList from './ActionSheetOptionList';
import ActionSheetWrap from './ActionSheetWrap';

/**
 * @internal
 * Action sheet variant that displays a list of selectable options.
 * Used when the options prop is provided to ActionSheet.
 */
const ActionSheetOptions: FC<ActionSheetOptionsProps> = ({
  title,
  expandable,
  expandableInitialHeightRatio,
  expandableOnSnapToHeight,
  options,
  optionListProps,
  optionListItemProps,
  onDismiss,
  maxHeight,
  animated,
  contentGestureEnabled,
  useModal,
  dismissible,
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
    useActionSheetOpts(
      title,
      expandable,
      expandableInitialHeightRatio,
      expandableOnSnapToHeight,
      options,
      optionListProps,
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
        <ActionSheetOptionList
          options={options}
          optionListProps={optionListProps}
          optionListItemProps={optionListItemProps}
          contentGestureEnabled={contentGestureEnabled}
        />
      </ActionSheetWrap>
    </ActionSheetInternalContext>
  );
};

export default ActionSheetOptions;
