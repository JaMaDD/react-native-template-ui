import type { FC } from 'react';
import type {
  ActionSheetListViewProps,
  ActionSheetOptsProps,
  ActionSheetProps,
  ActionSheetScrollViewProps,
} from '../../../types/overlay';

const ActionSheetOpts: FC<ActionSheetOptsProps> =
  require('./ActionSheetOpts').default;
const ActionSheetScrollView: FC<ActionSheetScrollViewProps> =
  require('./ActionSheetScrollView').default;
const ActionSheetListView: FC<ActionSheetListViewProps> =
  require('./ActionSheetListView').default;

const ActionSheet: FC<ActionSheetProps> = ({
  dismissable = true,
  ...props
}) => {
  if (props.opts?.length) {
    return <ActionSheetOpts dismissable={dismissable} {...props} />;
  } else if (props.children) {
    return <ActionSheetScrollView dismissable={dismissable} {...props} />;
  } else if (props.listProps) {
    return <ActionSheetListView dismissable={dismissable} {...props} />;
  } else {
    return null;
  }
};

export default ActionSheet;
