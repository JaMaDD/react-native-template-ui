/** @internal */
import type { FC } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import {
  useActionSheetGesture,
  useActionSheetHeaderMinHeight,
  useActionSheetOnDismiss,
} from '../../../hooks/overlay';
import type { ThemedIconBtnProps } from '../../../types/btn';
import type { ActionSheetHeaderProps } from '../../../types/overlay';
import type { ThemedTextProps } from '../../../types/text';
import {
  actionSheetHeaderIconSize,
  actionSheetHeaderPadding,
} from '../../../utils/overlay/const';
import { getActionSheetContext } from '../../../utils/overlay/func';
import { BorderSize } from '../../../utils/theme/const';
import ThemedView from '../../view/ThemedView';

const ThemedText: FC<ThemedTextProps> =
  require('../../text/ThemedText').default;
const ThemedIconBtn: FC<ThemedIconBtnProps> =
  require('../../btn/ThemedIconBtn').default;

const ActionSheetHeader: FC<ActionSheetHeaderProps> = ({
  headerShowIcon = true,
  headerWrapProps,
  headerTextProps,
  headerIconBtnProps,
}) => {
  const gesture = useActionSheetGesture();
  const minHeight = useActionSheetHeaderMinHeight();
  const onDismiss = useActionSheetOnDismiss();

  const { title, headerViewRef } = getActionSheetContext();
  const onIconPress: ThemedIconBtnProps['onPress'] = () => {
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
          <ThemedIconBtn
            onPress={onIconPress}
            iconName={'cross'}
            iconSize={actionSheetHeaderIconSize}
            position={'absolute'}
            left={0}
            {...headerIconBtnProps}
          />
        )}
      </ThemedView>
    </GestureDetector>
  );
};

export default ActionSheetHeader;
