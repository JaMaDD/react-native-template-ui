import type { FC } from 'react';
import type { ActionSheetProps } from '../../../types/overlay';
import ActionSheetListView from './ActionSheetListView';
import ActionSheetOptions from './ActionSheetOptions';
import ActionSheetScrollView from './ActionSheetScrollView';

const ActionSheet: FC<ActionSheetProps> = ({
  dismissable = true,
  ...props
}) => {
  if (props.options?.length) {
    return <ActionSheetOptions dismissable={dismissable} {...props} />;
  } else if (props.children) {
    return <ActionSheetScrollView dismissable={dismissable} {...props} />;
  } else if (props.listProps) {
    return <ActionSheetListView dismissable={dismissable} {...props} />;
  } else {
    return null;
  }
};

export default ActionSheet;
