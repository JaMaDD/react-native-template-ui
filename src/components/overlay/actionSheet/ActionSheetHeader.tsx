/** @internal */
import { lazy, type FC, type ReactNode } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import {
  useActionSheetGesture,
  useActionSheetHeaderMinHeight,
  useActionSheetInternalContext,
  useActionSheetOnDismiss,
} from '../../../hooks/overlay';
import type { ThemedIconButtonProps } from '../../../types/button';
import type { ActionSheetHeaderProps } from '../../../types/overlay';
import type { ThemedTextProps } from '../../../types/text';
import {
  actionSheetHeaderIconSize,
  actionSheetHeaderPaddingKey,
} from '../../../utils/overlay/const';
import { isPlatformWeb } from '../../../utils/react/func';
import { BorderSize } from '../../../utils/theme/const';
import ThemedView from '../../view/ThemedView';

let ThemedText: FC<ThemedTextProps>;
let ThemedIconButton: FC<ThemedIconButtonProps>;
if (isPlatformWeb()) {
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
  headerShowDismissIcon = true,
  headerWrapProps,
  headerTextProps,
  headerIconButtonProps,
  headerChildren,
}) => {
  const { title, headerViewRef } = useActionSheetInternalContext();
  const gesture = useActionSheetGesture();
  const minHeight = useActionSheetHeaderMinHeight();
  const onDismiss = useActionSheetOnDismiss();

  const onIconPress: ThemedIconButtonProps['onPress'] = () => {
    onDismiss();
  };
  const hasHeaderContent = !!title || headerShowDismissIcon;
  const headerContent: ReactNode = (
    <ThemedView
      ref={headerChildren ? undefined : headerViewRef}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={hasHeaderContent ? minHeight : undefined}
      padding={headerChildren ? undefined : actionSheetHeaderPaddingKey}
      borderBottomWidth={headerChildren ? undefined : BorderSize.S}
      borderColor={'border'}
      backgroundColor={'transparent'}
      {...(headerChildren ? undefined : headerWrapProps)}
    >
      {!!title || headerShowDismissIcon ? (
        <>
          {!!title && (
            <ThemedText variant={'textMBold'} {...headerTextProps}>
              {title}
            </ThemedText>
          )}
          {headerShowDismissIcon && (
            <ThemedIconButton
              onPress={onIconPress}
              iconName={'cross'}
              iconSize={actionSheetHeaderIconSize}
              position={'absolute'}
              left={0}
              {...headerIconButtonProps}
            />
          )}
        </>
      ) : (
        <ThemedView
          width={'10%'}
          height={BorderSize.XL}
          backgroundColor={'separator'}
        />
      )}
    </ThemedView>
  );

  return (
    <GestureDetector gesture={gesture}>
      {headerChildren ? (
        <ThemedView
          ref={headerViewRef}
          padding={actionSheetHeaderPaddingKey}
          borderBottomWidth={BorderSize.S}
          gap={actionSheetHeaderPaddingKey}
          {...headerWrapProps}
        >
          {headerContent}
          {headerChildren}
        </ThemedView>
      ) : (
        headerContent
      )}
    </GestureDetector>
  );
};

export default ActionSheetHeader;
