/** @internal */
import type { FC } from 'react';
import {
  useActionSheetOpts,
  useActionSheetVisible,
} from '../../../hooks/overlay';
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
  options,
  optionListProps,
  optionListItemProps,
  onDismiss,
  maxHeight,
  useModal,
  dismissible,
  wrapViewProps,
  headerShowDismissIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
  headerChildren,
  visible,
}) => {
  const { actionSheetVisible } = useActionSheetVisible(visible);
  const actionSheetInternalContextVal = useActionSheetOpts(
    title,
    expandable,
    options,
    optionListProps,
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
        <ActionSheetOptionList
          options={options}
          optionListProps={optionListProps}
          optionListItemProps={optionListItemProps}
        />
      </ActionSheetWrap>
    </ActionSheetInternalContext>
  );
};

export default ActionSheetOptions;
