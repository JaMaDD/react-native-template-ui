/** @internal */
import type { FC } from 'react';
import {
  useActionSheetOpts,
  useActionSheetVisible,
} from '../../../hooks/overlay';
import type { ActionSheetOptionsProps } from '../../../types/overlay';
import { ActionSheetContext } from '../../../utils/overlay/const';
import ActionSheetHeader from './ActionSheetHeader';
import ActionSheetOptionList from './ActionSheetOptionList';
import ActionSheetWrap from './ActionSheetWrap';

const ActionSheetOptions: FC<ActionSheetOptionsProps> = ({
  title,
  expandable,
  options,
  optionListProps,
  optionListItemProps,
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
  const actionSheetContextVal = useActionSheetOpts(
    title,
    expandable,
    options,
    optionListProps,
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
        <ActionSheetOptionList
          options={options}
          optionListProps={optionListProps}
          optionListItemProps={optionListItemProps}
        />
      </ActionSheetWrap>
    </ActionSheetContext.Provider>
  );
};

export default ActionSheetOptions;
