/** @internal */
import type { FC } from 'react';
import { lazy } from 'react';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useActionSheetOnDismiss } from '../../../hooks/overlay';
import { useShadowStyle } from '../../../hooks/style';
import type {
  ActionSheetWrapProps,
  ThemedModalProps,
} from '../../../types/overlay';
import type { AnimatedThemedViewProps } from '../../../types/view';
import { isPlatformWeb } from '../../../utils/common/func';
import {
  getActionSheetContext,
  getActionSheetMaxHeight,
} from '../../../utils/overlay/func';
import { ShadowDirection } from '../../../utils/style/const';
import AnimatedThemedView from '../../view/AnimatedThemedView';

let ThemedModal: FC<ThemedModalProps>;
if (isPlatformWeb()) {
  ThemedModal = lazy(() => import('../modal/ThemedModal'));
} else {
  ThemedModal = require('../modal/ThemedModal').default;
}

/**
 * @internal
 * Wrapper component that handles action sheet animations, positioning, and modal presentation.
 * Manages height calculations and translate animations for smooth sheet appearance.
 */
const ActionSheetWrap: FC<ActionSheetWrapProps> = ({
  useModal = true,
  wrapViewProps,
  children,
  visible,
}) => {
  const {
    expandable,
    dismissible,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
  } = getActionSheetContext();
  const onDismiss = useActionSheetOnDismiss();
  const shadowStyle = useShadowStyle(ShadowDirection.Top);
  const outerWrapAnimatedStyle = useAnimatedStyle(
    () => ({
      height: heightSharedVal?.get() ?? 0,
      transform: [{ translateY: translateYSharedVal?.get() ?? 0 }],
    }),
    [translateYSharedVal, heightSharedVal]
  );
  const innerWrapAnimatedStyle = useAnimatedStyle(
    () => ({
      height: expandable
        ? (expandableHeightSharedVal?.get() ?? 0)
        : (heightSharedVal?.get() ?? 0),
    }),
    [expandable, heightSharedVal, expandableHeightSharedVal]
  );

  const contentWrapProps: ThemedModalProps['contentWrapProps'] = {
    justifyContent: 'flex-end',
  };
  const onModalDismiss: ThemedModalProps['onDismiss'] = () => {
    onDismiss();
  };
  const outerWrapStyle: AnimatedThemedViewProps['style'] = [
    shadowStyle,
    wrapViewProps?.style,
  ];
  const actionSheet = (
    <AnimatedThemedView
      position={'absolute'}
      bottom={0}
      width={'100%'}
      maxHeight={getActionSheetMaxHeight(expandable)}
      overflow={'hidden'}
      {...wrapViewProps}
      style={outerWrapStyle}
      animatedStyle={outerWrapAnimatedStyle}
    >
      <AnimatedThemedView animatedStyle={innerWrapAnimatedStyle}>
        {children}
      </AnimatedThemedView>
    </AnimatedThemedView>
  );

  return useModal ? (
    <ThemedModal
      visible={visible}
      contentWrapProps={contentWrapProps}
      onDismiss={onModalDismiss}
      dismissible={dismissible}
    >
      {actionSheet}
    </ThemedModal>
  ) : (
    actionSheet
  );
};

export default ActionSheetWrap;
