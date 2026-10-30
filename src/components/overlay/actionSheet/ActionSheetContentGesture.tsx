/** @internal */
import type { FC } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import { useActionSheetContentGesture } from '../../../hooks/overlay';
import type { PropsWithRequiredChildren } from '../../../types/view';

/**
 * @internal
 * Wraps action sheet content with gesture detection for drag-to-dismiss functionality.
 */
const ActionSheetContentGesture: FC<
  PropsWithRequiredChildren<{ contentGestureEnabled?: boolean }>
> = ({ children, contentGestureEnabled = true }) => {
  const gesture = useActionSheetContentGesture();

  return contentGestureEnabled ? (
    <GestureDetector gesture={gesture}>{children}</GestureDetector>
  ) : (
    <>{children}</>
  );
};

export default ActionSheetContentGesture;
