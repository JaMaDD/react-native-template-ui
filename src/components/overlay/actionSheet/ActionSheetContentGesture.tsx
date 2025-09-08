/** @internal */
import type { FC } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import { useActionSheetContentGesture } from '../../../hooks/overlay';
import type { PropsWithRequiredChildren } from '../../../types/view';

const ActionSheetContentGesture: FC<PropsWithRequiredChildren> = ({
  children,
}) => {
  const gesture = useActionSheetContentGesture();

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
};

export default ActionSheetContentGesture;
