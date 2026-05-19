/** @internal */
import { lazy, type FC } from 'react';
import { Platform } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import {
  useActionSheetGesture,
  useActionSheetHeaderMinHeight,
  useActionSheetOnDismiss,
} from '../../../hooks/overlay';
import type { ThemedIconButtonProps } from '../../../types/button';
import type { ActionSheetHeaderProps } from '../../../types/overlay';
import type { ThemedTextProps } from '../../../types/text';
import {
  actionSheetHeaderIconSize,
  actionSheetHeaderPadding,
} from '../../../utils/overlay/const';
import { getActionSheetContext } from '../../../utils/overlay/func';
import { BorderSize } from '../../../utils/theme/const';
import ThemedView from '../../view/ThemedView';

let ThemedText: FC<ThemedTextProps>;
let ThemedIconButton: FC<ThemedIconButtonProps>;
if (Platform.OS === 'web') {
  ThemedText = lazy(() => import('../../text/ThemedText'));
  ThemedIconButton = lazy(() => import('../../button/ThemedIconButton'));
} else {
  ThemedText = require('../../text/ThemedText').default;
  ThemedIconButton = require('../../button/ThemedIconButton').default;
}

/**
 * @internal
 * Header component for action sheets with optional title and close button.
 * Supports gesture detection for drag-to-dismiss functionality.
 */
const ActionSheetHeader: FC<ActionSheetHeaderProps> = ({
  headerShowIcon = true,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
}) => {
  const gesture = useActionSheetGesture();
  const minHeight = useActionSheetHeaderMinHeight();
  const onDismiss = useActionSheetOnDismiss();

  const { title, headerViewRef } = getActionSheetContext();
  const onIconPress: ThemedIconButtonProps['onPress'] = () => {
    onDismiss();
  };

  return (
    <GestureDetector gesture={gesture}>
      <ThemedView
        ref={headerViewRef}
        justifyContent={'center'}
        alignItems={'center'}
        minHeight={minHeight}
        padding={actionSheetHeaderPadding}
        borderBottomWidth={BorderSize.S}
        borderColor={'border'}
        {...headerWrapProps}
      >
        {!!title && (
          <ThemedText variant={'textMBold'} {...headerTextProps}>
            {title}
          </ThemedText>
        )}
        {headerShowIcon && (
          <ThemedIconButton
            onPress={onIconPress}
            iconName={'cross'}
            iconSize={actionSheetHeaderIconSize}
            position={'absolute'}
            left={0}
            {...headerIconButtonProps}
          />
        )}
      </ThemedView>
    </GestureDetector>
  );
};

export default ActionSheetHeader;
