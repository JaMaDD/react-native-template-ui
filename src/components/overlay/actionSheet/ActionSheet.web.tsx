import type { FC } from 'react';
import type { ActionSheetProps } from '../../../types/overlay';
import ActionSheetListView from './ActionSheetListView';
import ActionSheetOptions from './ActionSheetOptions';
import ActionSheetScrollView from './ActionSheetScrollView';

/**
 * A flexible action sheet component that supports three display modes: options list, scroll view, or list view.
 * Automatically renders the appropriate variant based on provided props (options, children, or listProps).
 * Provides a native-like bottom sheet experience with dismissable backdrop and smooth animations.
 * @param props - Component props of type ActionSheetProps
 * @returns JSX element rendering the appropriate action sheet variant or null
 * @example
 * <ActionSheet
 *   visible={isVisible}
 *   title="Select an option"
 *   options={[
 *     { text: 'Option 1', onPress: () => {} },
 *     { text: 'Option 2', onPress: () => {} }
 *   ]}
 *   onDismiss={() => setVisible(false)}
 * />
 */
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
