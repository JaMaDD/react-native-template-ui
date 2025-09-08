import { useEffect, type FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import type { AlertProps, ThemedModalProps } from '../../../types/overlay';
import type { SetState } from '../../../types/react';
import type { AnimationSharedValue } from '../../../types/reanimated';
import type { PropsWithRequiredChildren } from '../../../types/view';
import { getAlertContext } from '../../../utils/overlay/func';
import { updateSharedValWithSpring } from '../../../utils/reanimated/func';
import { overlayMaxWidthPercent } from '../../../utils/theme/const';
import AnimatedThemedView from '../../view/AnimatedThemedView';
import ThemedModal from '../modal/ThemedModal';

const AlertWrap: FC<
  PropsWithRequiredChildren<
    Pick<
      AlertProps,
      | 'customShowAnimation'
      | 'wrapProps'
      | 'title'
      | 'desc'
      | 'btns'
      | 'dismissable'
    > & {
      visible: boolean;
      setVisible: SetState<boolean>;
      showSharedVal: AnimationSharedValue;
    }
  >
> = ({
  customShowAnimation,
  wrapProps,
  title,
  desc,
  btns,
  dismissable,
  visible,
  setVisible,
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
    setVisible(true);
    if (customShowAnimation) {
      customShowAnimation(showSharedVal, 1);
    } else {
      updateSharedValWithSpring(showSharedVal as SharedValue<number>, 1, {
        stiffness: 1800,
        damping: 200,
        mass: 20,
      });
    }
  }, [title, desc, btns]);

  const { onDismiss } = getAlertContext();
  const modalProps: ThemedModalProps['modalProps'] = { visible };
  const modalOnDismiss = () => {
    onDismiss?.();
  };

  return (
    <ThemedModal
      modalProps={modalProps}
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
