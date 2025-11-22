/** @internal */
import type { FC } from 'react';
import { useActionSheetOpts } from '../../../hooks/overlay';
import type { ActionSheetOptsProps } from '../../../types/overlay';
import { ActionSheetContext } from '../../../utils/overlay/const';
import ActionSheetHeader from './ActionSheetHeader';
import ActionSheetOptList from './ActionSheetOptList';
import ActionSheetWrap from './ActionSheetWrap';

const ActionSheetOpts: FC<ActionSheetOptsProps> = ({
  title,
  expandable,
  opts,
  optListProps,
  optListItemProps,
  onDismiss,
  dismissable,
  wrapViewProps,
  headerShowIcon,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
}) => {
  const actionSheetContextVal = useActionSheetOpts(
    title,
    expandable,
    opts,
    optListProps,
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
        <ActionSheetOptList
          opts={opts}
          optListProps={optListProps}
          optListItemProps={optListItemProps}
        />
      </ActionSheetWrap>
    </ActionSheetContext.Provider>
  );
};

export default ActionSheetOpts;
