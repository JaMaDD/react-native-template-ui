import { useEffect, type FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import type { AlertProps } from '../../../types/overlay';
import type { AnimationSharedValue } from '../../../types/reanimated';
import type { PropsWithRequiredChildren } from '../../../types/view';
import { overlayMaxWidthPercent } from '../../../utils/overlay/const';
import { getAlertContext } from '../../../utils/overlay/func';
import { updateSharedValWithSpring } from '../../../utils/reanimated/func';
import AnimatedThemedView from '../../view/AnimatedThemedView';
import ThemedModal from '../modal/ThemedModal';

const AlertWrap: FC<
  PropsWithRequiredChildren<
    Pick<
      AlertProps,
      | 'customShowAnimation'
      | 'wrapProps'
      | 'title'
      | 'description'
      | 'buttons'
      | 'dismissable'
    > & {
      visible: boolean;
      showSharedVal: AnimationSharedValue;
    }
  >
> = ({
  customShowAnimation,
  wrapProps,
  title,
  description,
  buttons,
  dismissable,
  visible,
  showSharedVal,
  children,
}) => {
  const animatedStyle = useAnimatedStyle<ViewStyle>(
    () => ({
      transform: [{ scale: showSharedVal.get() }],
    }),
    [showSharedVal]
  );
  useEffect(() => {
    if (!visible) {
      return;
    }

    if (customShowAnimation) {
      customShowAnimation(showSharedVal, 1);
    } else {
      updateSharedValWithSpring(showSharedVal as SharedValue<number>, 1, {
        stiffness: 1800,
        damping: 200,
        mass: 20,
      });
    }
  }, [
    customShowAnimation,
    title,
    description,
    buttons,
    visible,
    showSharedVal,
  ]);

  const { onDismiss } = getAlertContext();
  const modalOnDismiss = () => {
    onDismiss?.();
  };

  return (
    <ThemedModal
      visible={visible}
      onDismiss={modalOnDismiss}
      dismissable={dismissable}
    >
      <AnimatedThemedView
        width={overlayMaxWidthPercent}
        padding={'l'}
        gap={'m'}
        backgroundColor={'background'}
        style={animatedStyle}
        {...wrapProps}
      >
        {children}
      </AnimatedThemedView>
    </ThemedModal>
  );
};

export default AlertWrap;
