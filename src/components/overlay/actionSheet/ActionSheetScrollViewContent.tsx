/** @internal */
import { type FC } from 'react';
import type { ActionSheetScrollViewProps } from '../../../types/overlay';
import type {
  OnContentSizeChange,
  PropsWithRequiredChildren,
  ScrollViewRefObj,
} from '../../../types/view';
import { getActionSheetContext } from '../../../utils/overlay/func';
import ThemedScrollView from '../../view/ThemedScrollView';
import ActionSheetContentGesture from './ActionSheetContentGesture';

const ActionSheetScrollViewContent: FC<
  PropsWithRequiredChildren<Pick<ActionSheetScrollViewProps, 'scrollViewProps'>>
> = ({ scrollViewProps, children }) => {
  const { contentAnimatedRefObj, setContentHeight } = getActionSheetContext();
  const onContentSizeChange: OnContentSizeChange = (
    width: number,
    height: number
  ) => {
    setContentHeight?.(height);
    scrollViewProps?.onContentSizeChange?.(width, height);
  };

  return (
    <ActionSheetContentGesture>
      <ThemedScrollView
        ref={contentAnimatedRefObj as ScrollViewRefObj}
        {...scrollViewProps}
        onContentSizeChange={onContentSizeChange}
      >
        {children}
      </ThemedScrollView>
    </ActionSheetContentGesture>
  );
};

export default ActionSheetScrollViewContent;
