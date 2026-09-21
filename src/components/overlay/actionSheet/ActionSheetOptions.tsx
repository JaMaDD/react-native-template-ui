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
  useModal,
  dismissible,
  wrapViewProps,
  headerShowIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
  visible,
}) => {
  const { actionSheetVisible } = useActionSheetVisible(visible);
  const actionSheetInternalContextVal = useActionSheetOpts(
    title,
    expandable,
    options,
    optionListProps,
    onDismiss,
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
          headerShowIcon={headerShowIcon}
          headerWrapProps={headerWrapProps}
          headerTextProps={headerTextProps}
          headerIconButtonProps={headerIconButtonProps}
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
